// Copyright (C) 2023 Ethan Uppal All rights reserved.

// https://github.com/mdn/web-components-examples/blob/main/word-count-web-component/main.js

class FootnoteUserElement {
    static counter = 1;
    static list = [];

    constructor(elem) {
        // Either use custom numbering or default counter.
        const nAttr = elem.getAttribute('n');
        if (!nAttr) {
            this.number = FootnoteUserElement.counter;
            FootnoteUserElement.counter++;
        } else {
            this.number = parseInt(nAttr, 10);
        }

        // Ensure it has text and/or link.
        this.text = elem.getAttribute('text');
        this.href = elem.getAttribute('href')
        if (!this.href && !this.text) {
            return;
        }
        this.rel = elem.getAttribute('rel') || '';
        this.targetID = elem.getAttribute('target') || '';

        // Style the element to look like a footnote.
        elem.style.verticalAlign = 'super';
        elem.style.fontSize = '12px';

        // Set the actual content of the inline footnote.
        this.targetID = `footnote-${this.number}`;
        elem.innerHTML = `<a href="#${this.targetID}">[${this.number}]</a>`;

        // Add the referenced citation to the list.
        const citationList = document.getElementById('citation-list');
        this.citationElement = document.createElement('li');
        this.citationElement.id = this.targetID;
        this.citationElement.value = this.number;
        this.citationElement.innerHTML = '';
        if (this.text) {
            this.citationElement.innerHTML = `${this.text}`;
        }
        if (this.text && this.href) {
            this.citationElement.innerHTML += ' ';
        }
        if (this.href) {
            this.citationElement.innerHTML += `<a href="${this.href}" rel="${this.rel}" target="${this.target}">${this.href}</a>.`
        }
        citationList.appendChild(this.citationElement);

        FootnoteUserElement.list.push(this);
    }
}

window.addEventListener('load', function() {
    for (const footnoteElem of document.querySelectorAll('[data-cite]')) {
        new FootnoteUserElement(footnoteElem);
    }
}, false);
