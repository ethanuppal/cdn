// Copyright (C) Ethan Uppal 2022. All rights reserved.

window.addEventListener('load', function() {
    if (SyntaxHighlighter && 'highlight' in SyntaxHighlighter) {
        for (const codeBlocks of document.getElementsByClassName('code')) {
            SyntaxHighlighter.highlight(codeBlocks);
        }
    }
}, false);
