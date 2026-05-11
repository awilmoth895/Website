let HEADER_TYPE = 'header.html';

if (window.innerWidth <= 768) {
    console.log('Mobile view detected');
    HEADER_TYPE = 'mobileHeader.html';
} else {
    console.log('Desktop view detected');
}

let HEADER_PATH = `../components/${HEADER_TYPE}`;
let FOOTER_PATH = '../components/footer.html';

console.log('Current URL:', window.location.hostname);
if (window.location.href.hostname === 'awilmoth895.github.io') {
    HEADER_PATH = `website/components/${HEADER_TYPE}`;
    FOOTER_PATH = 'website/components/footer.html';    
}

fetch(HEADER_PATH)
  .then(response => response.text())
  .then(data => {
    document.getElementById('header-container').innerHTML = data;
    setActiveLink();
});

fetch(FOOTER_PATH)
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-container').innerHTML = data;
    });

function setActiveLink() {
    const links = document.querySelectorAll('.links a');
    console.log('Links found:', links);
    const currentPath = window.location.pathname;

    links.forEach(link => {
        if (link.getAttribute('href') === ".." + currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
