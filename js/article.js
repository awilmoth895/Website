import projects from "../content/projects.json" with { type: "json" };
import writings from "../content/writings.json" with { type: "json" };


const PAGE_ID = window.location.pathname.split('/').pop().replace(".html", "");


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
            <figure id="${imageID}" class="article-image">
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
        addSidebar();
    } else {
        const contentContainer = document.querySelector('.article-container');
        contentContainer.innerHTML = `<h2>Article not found</h2>`;
    }
}

let modified = 0;


function addSidebar() {
    const sections = document.querySelectorAll("h2, h3, h4, h5, h6");
    
    let links = ``;
    let enabled = ["", "", "⟪"]

    if (window.innerWidth < 1300) {
        enabled = [
            "disable", "hidden", "⟫"
        ];
    }

    sections.forEach(function (section) {
        console.log("Section: ", section);
        
        links += 
            `<li class="${section.localName}">
                <a class="${enabled[0]}" href=#${section.id}>${section.innerHTML}</a>
            </li>`;
    });


    const sidebar = 
        `<div class="links-container sidebar ${enabled[1]}">
            <ul class="links">
                <li class="sidebar-header"><div class="sidebar-title">Article Sections</div><div class="close">${enabled[2]}</div></li>
                ${links}
            </ul>
        <div>`

    document.getElementById("content-container").insertAdjacentHTML('beforebegin', sidebar);

    document.querySelector(".sidebar").addEventListener("click",function (e) {
        let sidebar = document.querySelector(".sidebar");
        let close = document.querySelector(".close");
        modified = 1;

        if (sidebar.classList.contains("hidden")) {
            close.textContent = "⟪"
        } else if (e.target == close) {
            close.textContent = "⟫";
        } else { return; }

        let seclink = document.querySelectorAll(".sidebar li a");
        seclink.forEach(function (sl) {
            sl.classList.toggle("disable");
        });
        sidebar.classList.toggle("hidden");
        document.getElementById("content-container").classList.toggle("sidebar-spacing");

    });
}


// single function that can toggle or set the value
// if user interacts then no changing

window.addEventListener("resize", function (e) {
    // console.log(window.innerWidth);
    // if (window.innerWidth < 1300 ) {
    if (window.innerWidth < 1000) {
        modified = 0;
    }

    if (!modified) {
        let sidebar = document.querySelector(".sidebar");
        let close = document.querySelector(".close");
        
        if (sidebar.classList.contains("hidden") && window.innerWidth > 1300) {
            close.textContent = "⟪"
        } else if (!sidebar.classList.contains("hidden") && window.innerWidth < 1300) {
            close.textContent = "⟫";
        } else { return; }


        let seclink = document.querySelectorAll(".sidebar li a");
        seclink.forEach(function (sl) {
            sl.classList.toggle("disable");
        });
        sidebar.classList.toggle("hidden");
        document.getElementById("content-container").classList.toggle("sidebar-spacing");
    }

});


await buildArticle();
