
// Head
document.head.innerHTML +=
    `<link rel="stylesheet" type="text/css" href="../css/style.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Kablammo&display=swap" rel="stylesheet">`;


function isMobile() {
    // Check if the new API is supported
    if (navigator.userAgentData) {
        return navigator.userAgentData.mobile;
    }
    // Fallback for Safari/Firefox (see Solution 3)
    return /Mobi|Android/i.test(navigator.userAgent);
}


function addHeader() {
    let header = ``;
    if (isMobile()) {
        header = 
            `<div class="header">
                <div class="title-container">
                    <img class="logo" src="../assets/leaf_t.gif" alt="">
                    <h1 class="title"><a href="../index.html">Autumn's Website!</a></h1>
                    <!-- <img class="logo" src="../assets/leaf_t.gif" alt=""> -->
                </div>
            </div>
            <div class="mobile-links">
                <ul class="links">
                    <li><a href="../pages/about.html">About</a></li>
                    <li><a href="../pages/projects.html">Projects</a></li>
                    <li><a href="../pages/writing.html">Writing</a></li>
                    <li><a href="../pages/music.html">Music</a></li>
                    <li><a href="../pages/resources.html">Resources</a></li>
                </ul>
            </div>`;
    } else {
        header =
            `<div class="header">
                <div class="title-container">
                    <img class="logo" src="../assets/leaf_t.gif" alt="">
                    <h1 class="title"><a href="../index.html">Autumn's Website</a></h1>
                </div>
            </div>
            <div class="links-container">
                <ul class="links">
                    <li><a href="../pages/about.html">About</a></li>
                    <li><a href="../pages/projects.html">Projects</a></li>
                    <li><a href="../pages/writing.html">Writing</a></li>
                    <li><a href="../pages/music.html">Music</a></li>
                    <li><a href="../pages/resources.html">Resources</a></li>
                </ul>
            </div>`;
    }

    document.getElementById('header-container').innerHTML = header;

    setActiveLink();
}

function addFooter() {
    document.getElementById('footer-container').innerHTML = 
        `<footer class="footer">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

            <div class="contact-container">
                <div class="contact">Contact: <a href="mailto:autumn@oakparkna.com">autumn@oakparkna.com</a></div>
                <a href="#" class="fa fa-instagram"></a>
            </div>
        </footer>`;
}

function setActiveLink() {
    const links = document.querySelectorAll('.links a');
    const currentPath = window.location.pathname;
    const currentlocation = currentPath.substring(currentPath.lastIndexOf('/') + 1);

    links.forEach(link => {
        if (link.getAttribute('href') === ".." + currentPath || link.getAttribute('href').includes(currentlocation)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

 window.onload = function(){
    addHeader();
    addFooter();
}