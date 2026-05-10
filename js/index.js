fetch('../components/header.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('header-container').innerHTML = data;
    setActiveLink();
});

function setActiveLink() {
    const links = document.querySelectorAll('.links a');
    console.log('Links found:', links);
    const currentPath = window.location.pathname;

    console.log('Current path:', currentPath);

    links.forEach(link => {
        console.log('Checking link:', link.getAttribute('href'));
        if ("/" + link.getAttribute('href') === currentPath) {
            console.log('Active link found:', link);
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
