// Copyright (C) 2022 Ethan Uppal. All rights reserved.

const SyntaxHighlighter = {
    cSyntaxHighlight: function(code) {
        var html = code.innerHTML;
        html = html.replaceAll(/'.+'/g, `<span class='number'>$&</span>`);
        html = html.replaceAll(/(?<=[^a-zA-Z_]|^)(-|\+)?[0-9]+(\.[0-9]+)?/g, `<span class='number'>$&</span>`);
        // https://stackoverflow.com/questions/249791/regex-for-quoted-string-with-escaping-quotes
        html = html.replaceAll(/"(?:[^"\\]|\\.)*"/g, '<span class="string">$&</span>');
        html = html.replaceAll(/#include\s+\&lt;.+\&gt;/g, '<span class="include">$&</span>');
        html = html.replaceAll(/\w+(?=\()/g, '<span class="function">$&</span>');
        html = html.replaceAll(/([A-Z_][A-Z0-9_]+)/g, '<span class="constant">$&</span>');
        html = html.replaceAll(/(void|int|char|long|short|unsigned|bool|(struct\s+\w+)|([a-zA-Z_][a-zA-Z0-9_]+_t))(?=\W)/g, '<span class="type">$&</span>');
        html = html.replaceAll(/(#include|#define|#if|#endif|#else|#pragma|enum|if|for|while|do|return|const|typedef|struct)(?=\W)/g, '<span class="keyword">$&</span>');
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
        code.innerHTML = html;
    },

    highlight: function(element) {
        if (element.classList.contains('code-c')) {
            SyntaxHighlighter.cSyntaxHighlight(element);
        } else if (element.classList.contains('code-html')) {
            SyntaxHighlighter.htmlSyntaxHighlight(element);
        }
    }
}
