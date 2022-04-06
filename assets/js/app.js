// Nav toggle

;(function() {
    document.addEventListener('click', function(e) {
        if (e.target.getAttribute('data-toggle') === 'true'){
            e.preventDefault();
            e.stopPropagation();

            const el = e.target.getAttribute('data-toggle-class');
            const elClass = document.querySelectorAll("[data-toggle-class]");

            for(var i = 0; i < elClass.length; i++) {
                if(elClass[i].getAttribute('data-toggle-class') == el){
                    elClass[i].classList.toggle(el);
                }
            }
        }
    });

    function cursorFollow() {
        const cursor = document.querySelector('.cursor.stylus');

        document.addEventListener('mousemove', (e) => {
            if (window.innerWidth > 1280) {
                var x = e.clientX;
                var y = e.clientY;

                const cursorMove = gsap.to(cursor, {
                duration: 1,
                    x: x,
                    y: y,
                    opacity: 1,
                    ease: Expo.easeOut
                });
            } else {
                cursor.style.opacity = 0;
            }
        }, false);
    }
  
    function cursorExpand() {
        const hoverable = document.querySelectorAll('a, [data-toggle], button, input, textarea, select, .th__checkbox');
        const cursor = document.querySelector('#th__cursor');
        
        for (var i = 0; i < hoverable.length; i++) {
            hoverable[i].addEventListener('mouseover', (e) => {
                const cursorMove = gsap.to(cursor, .5, {
                    width: '108px',
                    height: '108px',
                    marginLeft: '-54px',
                    marginTop: '-54px',
                    opacity: .75,
                    ease: Expo.easeOut
                });
            }, false);
            hoverable[i].addEventListener('mouseout', (e) => {
                const cursorMove = gsap.to(cursor, .5, {
                    width: '48px',
                    height: '48px',
                    marginLeft: '-24px',
                    marginTop: '-24px',
                    opacity: .5,
                    ease: Expo.easeOut
                });
            }, false);
        }
    }

    cursorFollow();
    cursorExpand();
})();



// Really unorganized navigation reveal

;(function() {
    const navAnchors = document.querySelectorAll('#th__navbar ol a[data-id]');

    for (let anchor of navAnchors) {
        anchor.addEventListener('mouseover', (e) => {
            const bgElement = document.querySelector(`#th__navbar-bg li[data-id="${e.target.dataset.id}"]`);

            gsap.to(bgElement, .5, {
                opacity: 1,
                scale: 1.1
            })
        }, false);
        anchor.addEventListener('mouseout', (e) => {
            const bgElement = document.querySelector(`#th__navbar-bg li[data-id="${e.target.dataset.id}"]`);

            gsap.to(bgElement, .5, {
                opacity: 0,
                scale: 1
            })
        }, false);
    }
})();



// Really unorganized Parallax

(() => {
    
    var rect = document.querySelector("#th__hero").getBoundingClientRect();
    var mouse = {x: 0, y: 0, moved: false};

    document.querySelector("#th__hero").addEventListener('mousemove', function(e) {
        mouse.moved = true;
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });
    
    // Ticker event will be called on every frame
    gsap.ticker.add(function(){
        if (window.innerWidth > 1280) {
            if (mouse.moved){    
                parallaxIt("[data-layer='1']", -175);
                parallaxIt("[data-layer='2']", -120);
                parallaxIt("[data-layer='3']", -120);
                parallaxIt("[data-layer='4']", -70);
                parallaxIt("[data-layer='5']", -30);
            }
            mouse.moved = false;
        } else {
            document.querySelector("[data-layer='1']").removeAttribute('style');
            document.querySelector("[data-layer='2']").removeAttribute('style');
            document.querySelector("[data-layer='3']").removeAttribute('style');
            document.querySelector("[data-layer='4']").removeAttribute('style');
            document.querySelector("[data-layer='5']").removeAttribute('style');
        }
    });

    function parallaxIt(target, movement) {
        gsap.to(target, 0.5, {
            x: (mouse.x - rect.width / 2) / rect.width * movement,
            y: (mouse.y - rect.height / 2) / rect.height * movement
        });
    }

    window.addEventListener('resize scroll', function(){
        rect = document.querySelector("#th__hero").getBoundingClientRect();

        if (window.innerWidth < 1280) {
            document.querySelectorAll("[data-layer").removeAttribute('style')
        }
    }, false);

})();



// Content reveals

;(function() {
    const cards = document.querySelectorAll(`#th__hero-content, #th__hero-image`);
    const imgs = document.querySelectorAll(`#th__services .col`);

    if (cards.length > 0) {
        ScrollTrigger.batch(cards, {
            onEnter: batch => gsap.to(batch, {
                opacity: 1, 
                stagger: 0.5, 
                duration: 1.5
            }),
        });
    }

    if (imgs.length > 0) {
        ScrollTrigger.batch(imgs, {
            onEnter: batch => gsap.to(batch, {
                opacity: 1, 
                y: 0,
                stagger: 0.15, 
                duration: 1
            }),
        });
    }

    gsap.to("#th__services h2", {
        x: () => {
            if (window.innerWidth > 1280) {
                return 108;
            } else {
                return 0
            }
        },
        y: () => {
            if (window.innerWidth > 1280) {
                return 0;
            } else {
                return 36
            }
        },
        ease: "power1",
        scrollTrigger: {
          start: "top top",
          end: "bottom top",
          scrub: 1
        }, 
    });
})();