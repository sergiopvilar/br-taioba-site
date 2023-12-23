rm *.min.js; for f in *.js; do short=${f%.js}; uglifyjs $f > $short.min.js; done
