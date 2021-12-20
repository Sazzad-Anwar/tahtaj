$(document).ready(() => {
    console.log('jQuery initialized');
    new WOW().init();
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

    // if (window.innerWidth < 992) {
    //     $('.bi-chevron-right').removeClass('bi-chevron-right').addClass('bi-plus-lg');
    // } else {
    //     $('.bi-plus-lg').removeClass('bi-plus-lg').addClass('bi-chevron-right');
    // }

    let dropdown = document.querySelectorAll('.dropdown');

    dropdown.forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            element.classList.toggle('open');
            if (element.children[1].children[0].classList.contains('bi-plus-lg')) {

                element.children[1].children[0].classList.add('bi-dash-lg');
                element.children[1].children[0].classList.remove('bi-plus-lg');
            } else if (element.children[1].children[0].classList.contains('bi-dash-lg')) {

                element.children[1].children[0].classList.add('bi-plus-lg');
                element.children[1].children[0].classList.remove('bi-dash-lg');
            } else if (element.children[1].children[0].classList.contains('bi-chevron-right')) {

                element.children[1].children[0].classList.add('bi-chevron-down');
                element.children[1].children[0].classList.remove('bi-chevron-right');
            } else if (element.children[1].children[0].classList.contains('bi-chevron-down')) {

                element.children[1].children[0].classList.add('bi-chevron-right');
                element.children[1].children[0].classList.remove('bi-chevron-down');
            }
        })
    });

});

$('.go-top').on('click', () => {
    $('html, body').animate({
        scrollTop: 0
    });
})


// tailwind modal
const modal = (modalId) => {
    if (document.getElementById(modalId).classList.contains('opacity-0')) {
        document.getElementById(modalId).classList.remove('opacity-0');
        document.getElementById(modalId).classList.remove('invisible');
        document.getElementById(modalId).classList.add('opacity-100');
    } else {
        document.getElementById(modalId).classList.add('opacity-0');
        document.getElementById(modalId).classList.add('invisible');
        document.getElementById(modalId).classList.remove('opacity-100');
    }
};