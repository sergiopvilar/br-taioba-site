rm *.min.css; for f in *.css; do short=${f%.css}; uglifycss $f > $short.min.css; done
