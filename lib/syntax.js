// Copyright (C) 2022 Ethan Uppal. All rights reserved.

const SyntaxHighlighter = {
    cSyntaxHighlight: function(code) {
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
    },

    highlight: function(element) {
        if (element.classList.contains('code-c')) {
            Syntax.cSyntaxHighlight(element);
        }
    }
}
