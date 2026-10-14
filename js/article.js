import projects from "../content/projects.json" with { type: "json" };

const pageID = window.location.hash.substring(1);
const article = projects.articles.find(article => article.title.replace(/\s+/g, '-').toLowerCase() === pageID);

function renderMardown(content) {
    var converter = new showdown.Converter();
    return converter.makeHtml(content);
}


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
} else {
    const contentContainer = document.querySelector('.article-container');
    contentContainer.innerHTML = `<h2>Article not found</h2>`;
}