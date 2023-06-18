# Copyright (C) 2023 Ethan Uppal All rights reserved.

PY = python3
PORT = 8001
YEAR = $(shell date +%Y)

JS_SRC = $(shell find ./lib -name "*.js" -not -name "*.min.js" -type f)
JS_MINIFIED = $(JS_SRC:.js=.min.js)

serve:
	$(PY) -m http.server $(PORT)

lib: $(JS_MINIFIED)
	rm -f lib/syntax.min.js
	mv lib/syntax-dev.min.js lib/syntax.min.js

%.min.js: %.js
	echo "// Copyright (C) 2022-$(YEAR) Ethan Uppal. All rights reserved." > $@ \
		&& cat $< | uglifyjs --compress --mangle >> $@

clean:
	rm -rf $(JS_MINIFIED)
