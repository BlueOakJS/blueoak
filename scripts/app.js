function smoothScrollTo(elementId) {
    document.querySelector(`#${elementId}`).scrollIntoView({
        behavior: 'smooth'
    });
    return false;
}

function scroll(direction) {
    $('.carousel').animate({
        scrollLeft: direction === 'left' ? '-=200' : '+=200'
    }, 500);
}

function openLink(url = 'https://www.pointsource.com/contact-us') {
    var win = window.open(url, '_blank');
    win.focus();
}
