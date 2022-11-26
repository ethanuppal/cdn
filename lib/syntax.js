// Copyright (C) 2022 Ethan Uppal. All rights reserved.

const CSS = `.code {
    overflow: scroll;
    background-color: black;
    color: white;
    padding: 5px;
    font-size: 16px;
    max-width: calc(100vw - 60px);
}

.code > .function {
    color: pink;
}

.code > .constant {
    font-weight: bold;
}

.code > .type {
    color: #D080D0;
}

.code > .keyword, .code > .include > .keyword {
    color: #80C000;
    font-weight: bold;
}

.code > .number {
    color: yellow;
}

.code > .string, .code > .include {
    color: orange;
}`

function cSyntaxHighlight(code) {
    var html = code.innerHTML;

    // Characters
    html = html.replaceAll(/'.+'/g, `<span class='number'>$&</span>`);

    // Numbers
    html = html.replaceAll(/[0-9]+/g, `<span class='number'>$&</span>`);

    // https://stackoverflow.com/questions/249791/regex-for-quoted-string-with-escaping-quotes
    html = html.replaceAll(/"(?:[^"\\]|\\.)*"/g, '<span class="string">$&</span>');

    // Includes
    html = html.replaceAll(/#include\s+\&lt;.+\&gt;/g, '<span class="include">$&</span>');

    // Functions
    html = html.replaceAll(/\w+(?=\()/g, '<span class="function">$&</span>');

    // Constants
    html = html.replaceAll(/([A-Z0-9_]+)/g, '<span class="constant">$&</span>');

    // Types
    html = html.replaceAll(/(void|int|char|long|short|unsigned|bool|(struct\s+\w+))(?=\W)/g, '<span class="type">$&</span>');

    // Keywords
    html = html.replaceAll(/(#include|#define|#if|#endif|#else|#pragma|enum|if|for|while|do)(?=\W)/g, '<span class="keyword">$&</span>');

    code.innerHTML = html;
}

window.addEventListener('load', function() {
    const style = document.createElement('style');
    style.innerHTML = CSS;
    document.getElementsByTagName('head')[0].appendChild(style);

    const cCodeBlocks = document.getElementsByClassName('code-c');
    for (const cCodeBlock of cCodeBlocks) {
        cSyntaxHighlight(cCodeBlock);
    }
}, false);
