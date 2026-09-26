# Builds logo SVGs: the icon + the "A-To-Do" wordmark as outlines (Noto Sans
# ExtraBold, OFL), so the files look identical without the font installed.
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from icon import icon_defs, icon_body, icon_svg

FONT = "/usr/share/fonts/truetype/noto/NotoSans-ExtraBold.ttf"
font = TTFont(FONT)
cmap = font.getBestCmap()
glyphs = font.getGlyphSet()
upm = font["head"].unitsPerEm

def pair_kern(left, right):
    """Horizontal kerning between two glyph names from GPOS 'kern' PairPos lookups."""
    gpos = font["GPOS"].table
    lookups = set()
    for fr in gpos.FeatureList.FeatureRecord:
        if fr.FeatureTag == "kern":
            lookups.update(fr.Feature.LookupListIndex)
    total = 0
    for li in sorted(lookups):
        lk = gpos.LookupList.Lookup[li]
        subs = lk.SubTable
        if lk.LookupType == 9:
            subs = [s.ExtSubTable for s in subs]
        for st in subs:
            if getattr(st, "LookupType", 2) != 2 or left not in st.Coverage.glyphs:
                continue
            if st.Format == 1:
                idx = st.Coverage.glyphs.index(left)
                for rec in st.PairSet[idx].PairValueRecord:
                    if rec.SecondGlyph == right and rec.Value1 is not None:
                        return getattr(rec.Value1, "XAdvance", 0) or 0
            elif st.Format == 2:
                c1 = st.ClassDef1.classDefs.get(left, 0)
                c2 = st.ClassDef2.classDefs.get(right, 0)
                v = st.Class1Record[c1].Class2Record[c2].Value1
                val = getattr(v, "XAdvance", 0) if v is not None else 0
                if val:
                    return val
    return total

def text_paths(text, size, x0, baseline, colors):
    """One <path> per glyph; colors: function(index, char) -> fill."""
    scale = size / upm
    x = 0
    out = []
    names = [cmap[ord(c)] for c in text]
    for i, (c, name) in enumerate(zip(text, names)):
        pen = SVGPathPen(glyphs)
        glyphs[name].draw(TransformPen(pen, (scale, 0, 0, -scale, x0 + x * scale, baseline)))
        d = pen.getCommands()
        if d:
            out.append(f'<path d="{d}" fill="{colors(i, c)}"/>')
        x += glyphs[name].width
        if i + 1 < len(names):
            x += pair_kern(name, names[i + 1])
    return "\n    ".join(out), x * scale

TEXT = "A-To-Do"
GREEN = "#39c814"

def logo_svg(text_color, pad=0):
    size = 300
    gap = 56
    paths, width = text_paths(TEXT, size, 512 + gap, 256 + size * 0.714 / 2 + 4, lambda i, c: GREEN if c == "-" else text_color)
    total = round(512 + gap + width + pad)
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {total} 512" width="{total}" height="512">
  <title>A-To-Do</title>
  <defs>{icon_defs()}
  </defs>{icon_body()}
  <g>
    {paths}
  </g>
</svg>
""", total

if __name__ == "__main__":
    for name, color in (("logo.svg", "#0e1f35"), ("logo-on-dark.svg", "#f2f7fc")):
        svg, w = logo_svg(color, pad=8)
        open(name, "w").write(svg)
        print(name, w)
    print("kern T-o:", pair_kern(cmap[ord('T')], cmap[ord('o')]), "D-o:", pair_kern(cmap[ord('D')], cmap[ord('o')]))
