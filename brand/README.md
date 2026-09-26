# A-To-Do brand assets

A glass check mark in front of a snowy mountain, on a night-sky tile. The
check's left part is the app's semi-transparent timer green
(`rgba(57, 200, 20, 0.5)` in `style.css`'s `.todo-timer-bar`); the rest is
bright glass, as if the task's pomodoro timer were running.

| File | Use |
|---|---|
| `icon.svg` | The icon, rounded tile. Also served as `/favicon.svg`. |
| `icon-square.svg` | The same, full-bleed square — for places that round corners themselves. |
| `icon-square-512.png` | **Stripe → Settings → Branding → Icon.** |
| `logo.png` / `logo.svg` | Icon + wordmark, dark text — for light backgrounds. |
| `logo-on-dark.png` / `logo-on-dark.svg` | Icon + wordmark, light text — for dark backgrounds. The SVG is also served as `/logo-on-dark.svg`, in `landing.html`'s header. |

Colors: night sky `#0e1f35`, timer green `#39c814`.

The site root holds the favicons actually served: `favicon.svg`,
`favicon.ico` (16/32/48 px) and `apple-touch-icon.png` (180 px, from
`icon-square.svg`).

## Regenerating

`icon.py` writes `icon.svg`/`icon-square.svg`; `logo.py` writes both logos,
with the "A-To-Do" wordmark converted to outlines (Noto Sans ExtraBold,
kerned from the font's own GPOS table — needs `fontTools` and the font at
`/usr/share/fonts/truetype/noto/`). `shot.sh <svg> <png> <w> <h>` renders
an SVG to PNG with headless Chrome. From this directory:

```bash
python3 icon.py && python3 logo.py
./shot.sh icon-square.svg icon-square-512.png 512 512
./shot.sh logo.svg logo.png 1720 512
./shot.sh logo-on-dark.svg logo-on-dark.png 1720 512
./shot.sh icon-square.svg ../apple-touch-icon.png 180 180
for n in 16 32 48; do ./shot.sh icon.svg /tmp/f$n.png $n $n; done
convert /tmp/f16.png /tmp/f32.png /tmp/f48.png ../favicon.ico
cp icon.svg ../favicon.svg
cp logo-on-dark.svg ../logo-on-dark.svg
```
