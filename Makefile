# Copyright (C) 2023 Ethan Uppal All rights reserved.

PY = python3
PORT = 8001

serve:
	${PY} -m http.server ${PORT}
