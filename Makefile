# Copyright (C) 2023 Ethan Uppal All rights reserved.

PY = python3
PORT = 8001

serve:
	${PY} -m http.server ${PORT}

lib: lib/overlay.min.js lib/syntax.js

lib/overlay.js:
lib/overlay.min.js: lib/overlay.js
	echo "// Copyright (C) 2023 Ethan Uppal. All rights reserved." > lib/overlay.min.js && cat lib/overlay.js | uglifyjs --compress >> lib/overlay.min.js

lib/syntax-dev.js:
lib/syntax.js: lib/syntax-dev.js
	echo "// Copyright (C) 2022 Ethan Uppal. All rights reserved." > lib/syntax.js && cat lib/syntax-dev.js | uglifyjs --compress >> lib/syntax.js
