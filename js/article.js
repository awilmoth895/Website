import projects from "../content/projects.json" with { type: "json" };
import writings from "../content/writings.json" with { type: "json" };

const PAGE_ID = window.location.hash.substring(1);


function checkUrlHash() {
    const hash = window.location.hash.split('#');
    if (hash.length > 2) {
        window.location.hash = '#' + hash[1];
        return true;
    }
    return false;
}

function renderMardown(content) {
    var converter = new showdown.Converter({"tables": true});
    return converter.makeHtml(content);
}

function createImageOrg() {
    var images = document.querySelectorAll('.article-container img');
    var imageNum = 1;

    images.forEach(function (image) {
        var imageSrcSplit = image.src.split('/');
        var imageID = imageSrcSplit[imageSrcSplit.length - 1];

        var container = `
            <figure id="${PAGE_ID}#${imageID}" class="article-image">
                <img src="${image.src}" alt="${image.alt}">
                <figcaption>Image ${imageNum} </figcaption>
            </figure>
        `;
        image.outerHTML = container;
        setImageRefs(imageID, imageNum);
        imageNum++;
    });
}

function setImageRefs(imageID, imageNum) {
    var imageLink = document.querySelectorAll(`a[href="#${imageID}"]`);

    if (imageLink) {
        imageLink.forEach(function (link) {
            link.href = `#${PAGE_ID}#${imageID}`; 
            link.innerHTML = `Image ${imageNum}`;
        });
    }
}

async function buildArticle() {
    const article = [...projects.articles, ...writings.articles].find(article => article.title.replace(/\s+/g, '-').toLowerCase() === PAGE_ID);

    if (article) {
        const contentContainer = document.querySelector('.article-container');
        window.document.title += ` - ${article.title}`;
        document.querySelector('.page-title h2').textContent = article.title;
        document.querySelector('.page-title .parent-title').textContent = article.date;

        const path = article.content;
        const content = await fetch(path);

        const articleHTML = `
            <div class="article-content">
                ${renderMardown(await content.text())}
            </div>
        `;
        contentContainer.innerHTML = articleHTML;
        createImageOrg();
    } else {
        const contentContainer = document.querySelector('.article-container');
        contentContainer.innerHTML = `<h2>Article not found</h2>`;
    }
}


if (checkUrlHash()) {
    location.reload();
} else {
    await buildArticle();
}
