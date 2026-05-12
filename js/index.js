let HEADER_TYPE = 'header.html';

const isMobile = () => {
  // Check if the new API is supported
  if (navigator.userAgentData) {
    return navigator.userAgentData.mobile;
  }
  
  // Fallback for Safari/Firefox (see Solution 3)
  return /Mobi|Android/i.test(navigator.userAgent);
};

if (isMobile()) {
  console.log("Mobile device detected via Client Hints");
}

console.log('Window width:', window.innerWidth);
if (isMobile()) {
    console.log('Mobile view detected');
    HEADER_TYPE = 'mobileHeader.html';
} else {
    console.log('Desktop view detected');
}

let HEADER_PATH = `../components/${HEADER_TYPE}`;
let FOOTER_PATH = '../components/footer.html';
let META_PATH = '../components/meta.html';

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
    }
);

fetch(FOOTER_PATH)
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-container').innerHTML = data;
    }
);

fetch(META_PATH)
    .then(response => response.text())
    .then(data => {
        document.head.innerHTML += data;
    }
);

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
