# Copyright (C) 2023 Ethan Uppal All rights reserved.

PY = python3
PORT = 8001
MINIFIED = lib/overlay.min.js lib/syntax.js lib/footnotes.min.js
serve:
	${PY} -m http.server ${PORT}

lib: ${MINIFIED}

lib/overlay.js:
lib/overlay.min.js: lib/overlay.js
	echo "// Copyright (C) 2023 Ethan Uppal. All rights reserved." > lib/overlay.min.js && cat lib/overlay.js | uglifyjs --compress --mangle >> lib/overlay.min.js

lib/footnotes.js:
lib/footnotes.min.js:
	echo "// Copyright (C) 2023 Ethan Uppal. All rights reserved." > lib/footnotes.min.js && cat lib/footnotes.js | uglifyjs --compress --mangle >> lib/footnotes.min.js

lib/syntax-dev.js:
lib/syntax.js: lib/syntax-dev.js
	echo "// Copyright (C) 2022 Ethan Uppal. All rights reserved." > lib/syntax.js && cat lib/syntax-dev.js | uglifyjs --compress --mangle >> lib/syntax.js

clean:
	rm -rf ${MINIFIED}
