// Copyright (C) 2022 Ethan Uppal. All rights reserved.

const SyntaxHighlighter = {
    cSyntaxHighlight: function(code) {
        var html = code.innerHTML;
        html = html.replaceAll(/'.+'/g, `<span class='number'>$&</span>`);
        html = html.replaceAll(/(?<=[^a-zA-Z_]|^)(-|\+)?[0-9]+(\.[0-9]+)?/g, `<span class='number'>$&</span>`);
        // https://stackoverflow.com/questions/249791/regex-for-quoted-string-with-escaping-quotes
        html = html.replaceAll(/"(?:[^"\\]|\\.)*"/g, '<span class="string">$&</span>');
        html = html.replaceAll(/(#include)(\s+)(\&lt;.+\&gt;)/g, '<span class="keyword">$1</span>$2<span class="include">$3</span>');
        html = html.replaceAll(/\w+(?=\()/g, '<span class="function">$&</span>');
        html = html.replaceAll(/([A-Z_][A-Z0-9_]+)/g, '<span class="constant">$&</span>');
        html = html.replaceAll(/(void|int|char|long|short|unsigned|bool|float|double|(struct\s+\w+)|([a-zA-Z_][a-zA-Z0-9_]+_t))(?=\W)/g, '<span class="type">$&</span>');
        html = html.replaceAll(/(#include|#define|#if|#endif|#else|#pragma|enum|if|for|while|do|return|const|typedef|struct|true|false)(?=\W)/g, '<span class="keyword">$&</span>');
        html = html.replaceAll(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '<span class="comment">$&</span>');
        code.innerHTML = html;
    },

    htmlSyntaxHighlight: function(code) {
        var html = code.innerHTML;
        // https://stackoverflow.com/questions/249791/regex-for-quoted-string-with-escaping-quotes
        html = html.replaceAll(/([a-zA-Z_]\w*)\=("(?:[^"\\]|\\.)*")/g, '<span class="attribute">$1</span>=<span class="string">$2</span>');
        html = html.replaceAll(/data-([a-zA-Z_]\w*)(\s|&gt;)/g, '<span class="attribute">$&</span>');
        // https://gist.github.com/gavin-asay/6cd089ca72b9810957254ec6a0cfced7
        html = html.replaceAll(/(?<=&lt;(\/?))[a-zA-Z_]\w+(?=(\s|&gt;))/g, '<span class="tag">$&</span>');
        // https://stackoverflow.com/questions/52211108/regex-to-match-html-comments-in-javascript
        html = html.replaceAll(/&lt;!--[^]*?--&gt;/gm, '<span class="comment">$&</span>');
        html = html.replaceAll(/(async|defer|open)(?=\W)/g, '<span class="attribute">$&</span>');
        code.innerHTML = html;
    },
//

    jsSyntaxHighlight: function(code) {
        var html = code.innerHTML;
        // https://stackoverflow.com/questions/28958761/regular-expression-to-find-all-string-literals
        html = html.replaceAll(/(['"\`])(?:(?!(?:\\|\1)).|\\.)*\1/g, '<span class="string">$&</span>');
        html = html.replaceAll(/(var|let|if|for|while|do|return|const|async|(class )|function|continue|of|true|false)(?=\W)/g, '<span class="keyword">$&</span>');
        html = html.replaceAll(/(?<=[^a-zA-Z_]|^)(-|\+)?[0-9]+(\.[0-9]+)?/g, `<span class='number'>$&</span>`);
        html = html.replaceAll(/\w+(?=\()/g, '<span class="function">$&</span>');
        html = html.replaceAll(/(window|document|navigator|(?<=\.)\w+|\w+(?=:))/g, '<span class="var">$&</span>');
        html = html.replaceAll(/(\W|^)([A-Z][a-z0-9]+)((\d)|([A-Z0-9][a-z0-9]+))*([A-Z])?/g, '<span class="type">$&</span>');
        html = html.replaceAll(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '<span class="comment">$&</span>');
        code.innerHTML = html;
    },

    cssSyntaxHighlight: function(code) {
        var html = code.innerHTML;
        html = html.replaceAll(/(?<=[^a-zA-Z_]|^)(-|\+)?[0-9]+(\.[0-9]+)?([a-z]+)?/g, `<span class='number'>$&</span>`);
        html = html.replaceAll(/(auto|calc)(?=\W)/g, '<span class="keyword">$&</span>');
        html = html.replaceAll(/\.\w+/g, '<span class="css-class">$&</span>');
        html = html.replaceAll(/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, '<span class="comment">$&</span>');
        code.innerHTML = html;
    },

    highlight: function(element) {
        async function asyncHighlight() {
            if (element.classList.contains('code-c')) {
                SyntaxHighlighter.cSyntaxHighlight(element);
            } else if (element.classList.contains('code-html')) {
                SyntaxHighlighter.htmlSyntaxHighlight(element);
            } else if (element.classList.contains('code-js') || element.classList.contains('code-json')) {
                SyntaxHighlighter.jsSyntaxHighlight(element);
            } else if (element.classList.contains('code-css')) {
                SyntaxHighlighter.cssSyntaxHighlight(element);
            }
        }
        asyncHighlight();
    }
}
