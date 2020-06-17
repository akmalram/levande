const ready = (callback) => {
    window.addEventListener('DOMContentLoaded', (e) => {
        callback(e);
    })
}

window.onload = () => {
    const preloader = document.querySelector('.preloader');
    preloader.style.cssText = `
        transition: all .5s ease;
        opacity: 0;
        visibility: hidden;
    `;
}

function getCoords(elem) {
    let box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
}

ready(() => {
    let reviewsSwiper = new Swiper('.reviews .swiper-container', {
        speed: 400,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            dynamicBullets: true
        },
        loop: true,
        slidesPerView: 1,
        breakpoints: {
            768: {
              slidesPerView: 2
            }
        }
    });
});

ready(() => {
    const MenuClassToggler = () => {
        const btn = document.querySelector('.navbar-toggler .btn');
        const menu = document.querySelector('.navbar-menu');

        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
            menu.classList.toggle('active');
            document.querySelector('body').classList.toggle('overhidden');
        });
    }

    MenuClassToggler();
});

ready(() => {
    // const navbar = document.querySelector('.navbar');

    // window.addEventListener('scroll', () => {
    //     if(scrollY > 50) navbar.classList.add('scrolled');
    //     else if (scrollY < 50) navbar.classList.remove('scrolled');
    // });

    // if(scrollY > 50) navbar.classList.add('scrolled');
    // else if (scrollY < 50) navbar.classList.remove('scrolled');
});

ready(() => {
    const servicesTabs = () => {
        const items = document.querySelectorAll('.services .service-list .item');
        const tabWrapper = document.querySelector('.services .service-info');

        items.forEach(item => {
            item.addEventListener('click', () => {
                tabWrapper.setAttribute('data-active', item.getAttribute('data-for'));
            });
        })
    }

    servicesTabs();
});

ready(() => {
    const form = document.querySelector('.contacts-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "../send.php",
            data: $(form).serialize(),
        })
        .done(function() {
            alert("Ваша заявка принята!");
            form.reset();
        });
    });
});

ready(() => {
    const closeMenu = () => {
        const btn = document.querySelector('.navbar-toggler .btn');
        const menu = document.querySelector('.navbar-menu');

        btn.classList.remove('active');
        menu.classList.remove('active');
        document.querySelector('body').classList.remove('overhidden');
    }
    let scrollToAnchor = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                closeMenu();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }

    scrollToAnchor();
});

ready(() => {
    document.querySelector('header').style.cssText = `background-position-y: calc(50% - ${window.scrollY / 8}px);`;

    window.addEventListener('scroll', () => {
        document.querySelector('header').style.cssText = `background-position-y: calc(50% - ${window.scrollY / 8}px);`;
    });
});

ready(() => {
    AOS.init({
        duration: 1200,
        easing: 'ease',
        offset: 220
    });
});

ready(() => {
    const titles = [...document.querySelectorAll(".title-primary span"),...document.querySelectorAll(".title-secondary span"),...document.querySelectorAll(".title-tertiary span")];

    titles.forEach(one => {
        const pageY = window.innerHeight * .75;

        const theHeight = window.scrollY + pageY;

        if(theHeight > getCoords(one).top) {
            one.classList.add('open');
        }

        window.addEventListener('scroll', () => {
            const pageY = window.innerHeight * .75;

            const theHeight = window.scrollY + pageY;

            if(theHeight > getCoords(one).top) {
                one.classList.add('open');
            }
        })
    });
});

ready(() => {
    const element = document.querySelector('.aboutus .left');

    window.addEventListener('scroll', () => {
        const pageY = window.innerHeight * .75;

        const theHeight = window.scrollY + pageY;

        if(theHeight > getCoords(element).top) {
            element.style.cssText = `transform: translateY(-${(theHeight - getCoords(element).top) / 6}px)`;
        }
    });
});

window.addEventListener('load', () => {
    $('#map_iframe').attr('src', $('#map_iframe').attr('data-map-src'));
});

ready(() => {

    $('.online-btn').click(() => {
        $('.online').toggleClass('active');
    });

    $('.open-online').click(() => {
        $('.online').toggleClass('active');
    });
});

ready(() => {
    function canUseWebP() {
        var elem = document.createElement('canvas');
    
        if (!!(elem.getContext && elem.getContext('2d'))) {
            // was able or not to get WebP representation
            return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
        }
    
        // very old browser like IE 8, canvas not supported
        return false;
    }
    if(canUseWebP()) {
        // Supports webp
        document.querySelectorAll('img[data-img-webp]').forEach(one => {
            $(one).attr('src', $(one).attr('data-img-webp'));
        });
    } else {
        // Doesnt support webp
        document.querySelectorAll('img[data-img-webp]').forEach(one => {
            $(one).attr('src', $(one).attr('data-img-src'));
        });
    }
});