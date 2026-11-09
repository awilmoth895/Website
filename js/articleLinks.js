import projects from "../content/projects.json" with { type: "json" };
import writings from "../content/writings.json" with { type: "json" };

async function getArticleContent(path) {
    let content = await fetch(path);
    content = await content.text();
    return content.length > 300 ? content.substring(0, 300) : content;

}

async function fillArticleLink(content) {
    content.articles.forEach(function(article) {
        if (!article.public) {
            return;
        }

        const contentContainer = document.querySelector('.article-link-container');

        const id = article.title.replace(/\s+/g, '-').toLowerCase();
        const date = article.date ? article.date : '';

        const articleHTML = `
            <div class="article-link" id="${id}">
                <div class="image-container">
                    <img class="image" src="${article.image}" alt="${article.title}"/>
                </div>
                <div class="info">
                    <div class="container">
                        <h3 class="title">${article.title}</h3>
                        <div class="date">${date}</div>
                    </div>
                    <div class="description">${article.description}</div>
                    <a href="${article.link}" class="link-text">Read More</a>
                </div>
            </div>`
        contentContainer.insertAdjacentHTML('beforeend', articleHTML);

        const articleLinkElement = document.getElementById(id);
        articleLinkElement.addEventListener('click', () => {
            window.location.href = article.link;
        });
    });

}

if (document.location.pathname.includes('writing')) {
    fillArticleLink(writings);
} else if (document.location.pathname.includes('projects')) {
    fillArticleLink(projects);
}