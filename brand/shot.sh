#!/bin/bash
# shot.sh <svg> <out.png> <w> <h>  -- renders an SVG with headless Chrome, transparent background
svg=$(realpath "$1"); out=$(realpath -m "$2"); w=$3; h=$4
html=$(mktemp --suffix=.html -p "$(dirname "$out")")
echo "<html><body style='margin:0;background:transparent'><img src='file://$svg' style='width:${w}px;height:${h}px;display:block'></body></html>" > "$html"
google-chrome --headless=new --disable-gpu --no-sandbox --hide-scrollbars --default-background-color=00000000 \
  --window-size=$w,$h --screenshot="$out" "file://$html" >/dev/null 2>&1
rm -f "$html"
