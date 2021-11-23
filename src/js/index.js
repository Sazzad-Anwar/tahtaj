$(document).ready(() => {
    console.log('jQuery initialized');

    const menuBtn = document.querySelector(".menu-btn");
    const menuItems = document.querySelector(".menu-items");
    const expandBtn = document.querySelectorAll(".expand-btn");

    // humburger toggle
    menuBtn.addEventListener("click", () => {
        menuBtn.classList.toggle("open");
        menuItems.classList.toggle("open");
        document.body.classList.toggle("overflow-hidden");
    });

    // mobile menu expand
    expandBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
            btn.classList.toggle("open");
            if (btn.children[0].classList[1] === 'bi-plus-lg') {
                btn.children[0].classList.replace('bi-plus-lg', 'bi-dash-lg');
            } else {
                btn.children[0].classList.replace('bi-dash-lg', 'bi-plus-lg');
            }
        });
    });

    if (window.innerWidth < 992) {
        $('.bi-chevron-right').removeClass('bi-chevron-right').addClass('bi-plus-lg');
    } else {
        ('.bi-plus-lg').removeClass('bi-plus-lg').addClass('bi-chevron-right');
    }
});

$('.go-top').on('click', () => {
    $('html, body').animate({
        scrollTop: 0
    });
})

