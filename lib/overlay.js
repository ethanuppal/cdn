// Copyright (C) 2023 Ethan Uppal. All rights reserved.

class ImageOverlay {
    constructor() {
        throw new Error('ImageOverlay cannot be constructed');
    }

    static KEY_PREFIX = 'ethanuppal|overlay.js|';
    static ID_PREFIX = 'ethanuppal-overlayjs-';
    static div;
    static urlA;
    static image;

    static createModal(style) {
        style = style || {};
        var borderColor = style.borderColor || 'inherit';
        var borderWidth = style.borderWidth || '3px';
        var imageBorderColor = style.imageBorderColor || 'inherit';
        var imageBorderWidth = style.imageBorderWidth || '1px';
        var backgroundColor = style.backgroundColor || 'inherit';
        ImageOverlay.persists = style.persists || false;
        // CSS inpsired from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_overlay
        var div = document.createElement('div');
        div.style = 'display:none;position:fixed;width:100%;height:100%;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,0.8);z-index:10;cursor:pointer;';
        div.addEventListener('click', () => {
            ImageOverlay.dismiss();
        });
        div.appendChild((() => {
            const container = document.createElement('div');
            container.style = `position:fixed;max-width:calc(600px);width:calc(100% - 64px);left:50%;top:50%;transform:translate(calc(-50% - 32px), calc(-50% - 32px));padding:8px;margin:32px;border-color:${borderColor};border-width:${borderWidth};border-style:solid;border-radius:15px;background-color:${backgroundColor};`;

            const labelSubcontainer = document.createElement('div');
            labelSubcontainer.style = 'padding: 0px 16px;';
            const labelP = document.createElement('p');
            labelP.style = 'border-style:none;';
            labelP.innerHTML = `Viewing <b><a id="${ImageOverlay.ID_PREFIX + 'url'}"></a></b>. Click anywhere to close.`;
            labelSubcontainer.appendChild(labelP);

            const imageSubcontainer = document.createElement('div');
            imageSubcontainer.style = 'display:flex;justify-content:center;padding:0 16px 16px;';
            var image = document.createElement('img');
            image.style = `width:100%;border-color:${imageBorderColor};border-style:solid;border-width:${imageBorderWidth};`;
            imageSubcontainer.appendChild(image);
            ImageOverlay.image = image;

            container.appendChild(labelSubcontainer);
            container.appendChild(imageSubcontainer);

            return container;
        })());
        document.body.appendChild(div);
        ImageOverlay.div = div;
        ImageOverlay.urlA = document.getElementById(ImageOverlay.ID_PREFIX + 'url');
    }

    static attachTriggers() {
        const overlayTriggers = document.getElementsByClassName('overlay-trigger');
        for (const overlayTrigger of overlayTriggers) {
            const overlayImage = Array.from(overlayTrigger.children).find(element => {
                return element.nodeName == 'IMG' || element.classList.contains('overlay-image');
            });
            if (overlayImage) {
                overlayTrigger.addEventListener('click', () => {
                    ImageOverlay.present({
                        image: overlayImage
                    });
                });
            }
        }
    }

    static restoreModal() {
        var imageSrc;
        if ((imageSrc = ImageOverlay.get('image_src'))) {
            ImageOverlay.present({
                src: imageSrc
            });
        }
    }

    static load(style) {
        ImageOverlay.createModal(style);
        ImageOverlay.attachTriggers();
        if (ImageOverlay.persists) {
            ImageOverlay.restoreModal();
        }
    }

    static present(data) {
        function lastPathComponent(u) {
            // https://stackoverflow.com/questions/4758103/last-segment-of-url-with-javascript
            return u.substring(u.lastIndexOf('/') + 1);
        }

        var overlayImageSrc, overlayImageAlt;
        if ('src' in data) {
            overlayImageSrc = data.src;
        } else if ('image' in data) {
            overlayImageSrc = data.image.src;
            overlayImageAlt = data.image.alt;
        }

        var overlayImage = ImageOverlay.image;
        var overlayUrlA = ImageOverlay.urlA;

        overlayImage.src = overlayImageSrc;
        overlayImage.alt = overlayImageAlt;

        overlayUrlA.href = overlayImageSrc;
        overlayUrlA.innerText = lastPathComponent(overlayImageSrc);

        ImageOverlay.div.style.display = 'block';
        ImageOverlay.set('image_src', overlayImageSrc);
    }

    static dismiss() {
        ImageOverlay.div.style.display = 'none';
        ImageOverlay.remove('image_src');
    }

    static set(key, value) {
        window.localStorage.setItem(ImageOverlay.KEY_PREFIX + key, value);
    }
    static get(key) {
        return window.localStorage.getItem(ImageOverlay.KEY_PREFIX + key);
    }
    static remove(key) {
        return window.localStorage.removeItem(ImageOverlay.KEY_PREFIX + key);
    }
}
