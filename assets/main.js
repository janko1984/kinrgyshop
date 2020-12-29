
// SMOOTH SCROLL
let scroll;

window.addEventListener("DOMContentLoaded", function(){
  
  // *********************
  // MAIN NAV
  // *********************
  let loop = () => {
    let header = document.querySelector('#shopify-section-header');
    let contentWrap = document.querySelector('.page-wrap')
    let countentNumber = contentWrap.getBoundingClientRect().top;

    if (countentNumber <= -100) {
      header.classList.add('sticked');
    } else if (countentNumber >= -99) {
      header.classList.remove('sticked');
    }
    requestAnimationFrame(loop)
  }

  // setTimeout(function(){
    if (window.innerWidth > 768) {
      scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        lerp: 0.1,
        smoothMobile: false,
      })
    } else if (window.innerWidth < 1025) {
      scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: false,
        lerp: 1,
        smoothMobile: false,
      })
    }

    // Sticky Nav
    loop();

    // scroll.on('scroll', () => {
    //   const siteHeader = document.querySelector("#shopify-section-header");
    //   const wrapper = document.querySelector("main");
      
    //   if (wrapper.getBoundingClientRect().top < -100){
    //     siteHeader.classList.add('sticked');
    //   }
    //   else {
    //     siteHeader.classList.remove('sticked');
        
    //     // Anouncement Bar - add background to header
    //     if (siteHeader.classList.contains('sticked')) {
    //       siteHeader.classList.remove('sticked-announcement');
    //     }
    //   }
    // });
    
  // }, 100);

  if (document.querySelectorAll('.js-modal-button').length > 0) {
    let modalButton = new Modal();
  }


  if (document.querySelector('body').classList.contains('index')) {
    // HOME SLIDERs
    // if (document.querySelector('.splide-1')) {
    //   new Splide( '.splide-1', {
    //     type   : 'loop',
    //     perPage: 4,
    //     perMove: 4,
    //     gap: 20,
    //     speed: 800,
    //     easing: 'cubic-bezier(0.255, 0.195, 0.135, 0.99)',
    //     //arrows: false,
    //     pagination: false,
    //     breakpoints: {
    //       640: {
    //         perPage: 1,
    //         perMove: 1,
    //       },
    //     }
    //   } ).mount();
    // }

    // if (document.querySelector('.splide-2')) {
    //   new Splide( '.splide-2', {
    //     type   : 'loop',
    //     perPage: 4,
    //     perMove: 4,
    //     gap: 20,
    //     speed: 800,
    //     easing: 'cubic-bezier(0.255, 0.195, 0.135, 0.99)',
    //     //arrows: false,
    //     pagination: false,
    //     breakpoints: {
    //       640: {
    //         perPage: 1,
    //         perMove: 1,
    //       },
    //     }
    //   } ).mount();
    // }

    // if (document.querySelector('.splide-3')) {
    //   new Splide( '.splide-3', {
    //     type   : 'loop',
    //     perPage: 3,
    //     perMove: 3,
    //     gap: 20,
    //     speed: 800,
    //     easing: 'cubic-bezier(0.255, 0.195, 0.135, 0.99)',
    //     //arrows: false,
    //     pagination: false,
    //     breakpoints: {
    //       640: {
    //         perPage: 1,
    //         perMove: 1,
    //       },
    //     }
    //   } ).mount();
    // }

    // const slideButtons = document.querySelectorAll('.slide-control .button-arrow');
    // slideButtons.forEach(item => {
    //   item.addEventListener('click', event => {
    //     event.preventDefault();
        
    //     if (item.classList.contains('prev')) {
    //       item.closest('.product-slider').querySelector('.splide__arrow--prev').click();
    //     }else {
    //       item.closest('.product-slider').querySelector('.splide__arrow--next').click();
    //     }
        
    //   })
    // });
  }


  if (document.body.classList.contains('collection')) {
    // AJAX LOAD MORE
    function loadProducts() {
      let nextUrl = document.querySelector('.collection-product-list .btn-wrapper a').href;
      document.querySelector('.collection-product-list .btn-wrapper').remove();
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          //console.log(this.responseText);
          var tmpdiv = document.createElement("div");
          tmpdiv.innerHTML = this.responseText;
          var wantedDiv = tmpdiv.querySelector('.collection-product-list').innerHTML;
          //console.log(wantedDiv);
          document.querySelector('.master > .collection-product-list').innerHTML += wantedDiv;
          scroll.update();
        }
      };
      xmlhttp.open('GET', nextUrl);
      xmlhttp.send();
    }

    // document.addEventListener("click", event => {

    //   let el = document.querySelector('.load-more');
    //   if (el && el.contains(event.target)) {
    //     event.preventDefault();
    //     event.stopPropagation();
    //     loadProducts();
    //   }
    // });

    // Filter APP Edits 
    let filterButtons = document.querySelectorAll('.boost-pfs-filter-button, .boost-pfs-filter-button span');

    // Update Locomotive scroll - on filter click
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        setTimeout(() => {
          scroll.update();
        }, 500)
      })
    })


    // Mutation Observer - trying to fix scroll when the filter app laods
    let targetNode = document.querySelector('.collection-section');
    
    // Mutation obbservewr
    const config = { attributes: true, childList: true, subtree: true };
    const callback = function(mutationsList, observer) {
      mutationsList.forEach(mutation => {
        console.log(mutation)
          // console.log(scroll)
          if (mutation.type == "attributes") {
            scroll.update()
          }
      })
    }

    // Create an observer instance linked to the callback function
    let observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
  }


  // AJAX CART REQUEST
  $(document).on('cart.requestComplete', function(event, cart) {
    // $('#cartCount').html(cart.item_count);
    // if (cart['item_count'] > 0) {
    //   $('.cart-dd').addClass('active');
    //   $('.col-form').removeClass('hidden');
    //   $('.col-empty').addClass('hidden');
    //   $('.cart-dd').removeClass('empty');
    // }else{
    //   $('.col-form').addClass('hidden');
    //   $('.col-empty').removeClass('hidden');
    //   $('.cart-dd').addClass('empty');
    // }

    $('#cartCount').html(cart.item_count);
      if (cart['item_count'] > 0) {

        $('#cartCount').removeClass('empty');
        $('#cartCount').text(cart.item_count);

        $('.cart-dd').addClass('active');
        $('.col-form').removeClass('hidden');
        $('.col-empty').addClass('hidden');
        $('.cart-dd').removeClass('empty');
      }else{
        $('#cartCount').addClass('empty');
        $('#cartCount').text(cart.item_count);

        $('.col-form').addClass('hidden');
        $('.col-empty').removeClass('hidden');
        $('.cart-dd').addClass('empty');
      }
    // });

    console.log(cart)
  });

  // When cart is ready 
  $(document).on('cart.ready', function(event, cart) {

    console.log('ready',cart, cart.item_count)
    let navBasket = document.querySelector('#cartCount');

    if (cart.item_count > 0) {
      navBasket.classList.remove('empty');
      navBasket.textContent = cart.item_count;
    }
    else if (cart.item_count == 0) {
      navBasket.classList.add('empty');
      navBasket.textContent = cart.item_count;
    }
    
    if (document.querySelector('body').classList.contains('cart')) {
      console.log(CartJS.cart)
    }    
  });

  // CART DROPDOWN
  $('.js_cart').click(function(e){
    //console.log('woooork');
    e.preventDefault();
    e.stopPropagation();
    $('.cart-dd').toggleClass('active');
    $('body').addClass('oh');
  });

  $('.js-dd-close').click(function(){
    $('.cart-dd').removeClass('active');
    $('body').removeClass('oh');
  });

  $('#input-quantity').on('change keyup', function() {
    var newValue = $(this).val();
    //console.log(newValue);
    $('.js-quantity option').text(newValue);
  });

  // SEARCH
  const search = document.querySelector('.main-header .js_search');
  let closeSearch = document.querySelector('.js-close-search');
  const inputCheck = document.querySelector('.search-form__input');
  const submitCheck = document.querySelector('.search-form__submit');
  const bodyTag = document.querySelector('body');

  search.addEventListener('click', (event) => {
    event.preventDefault();

    let searchModal = document.querySelector('#SearchDrawer');
    console.log(searchModal)
    searchModal.classList.add('active');

    gsap.to(searchModal, {
      alpha: 1,
      duration: 0.4,
      ease: "power1.inOut",
      onComplete: () => {
        inputCheck.focus();
      }
    })
  })

  inputCheck.addEventListener('focus', event => {
    event.target.parentElement.classList.add('focused');
  })

  inputCheck.addEventListener('blur', event => {
    event.target.parentElement.classList.add('focused');
  })

  closeSearch.addEventListener('click', event => {
    event.preventDefault();

    let searchModal = event.target.closest('.bws-modal.active');
    gsap.to(searchModal, {
      alpha: 0,
      duration: 0.4,
      ease: "power1.inOut",
      onComplete: () => {
        searchModal.classList.remove('active');
      }
    })
  })

  // document.onclick = function(event) {
  //   //console.log(clickCounter);
  //   let isClickOnIcon = search.contains(event.target);
  //   let isClickOnInput = inputCheck.contains(event.target);
  //   let isClickOnSubmit = submitCheck.contains(event.target);

  //   if (isClickOnIcon || isClickOnInput || isClickOnSubmit ) {
  //     search.classList.add('active');
  //     bodyTag.classList.add('active-search');
  //   }else{
  //     search.classList.remove('active');
  //     bodyTag.classList.remove('active-search');
  //   }
  // };

  // document.addEventListener('mousemove', (event) => {
  //   console.log(event.pageY)
  // })

  function subNavHover() {
    if (document.querySelectorAll('#shopify-section-header .site-nav--has-dropdown').length != 0) {
      let liWithSubMenu = document.querySelectorAll('#shopify-section-header .site-nav--has-dropdown');
      let liSubMenu = document.querySelectorAll('#shopify-section-header .site-nav__dropdown ul');
      let header = document.querySelector('#shopify-section-header');

      liWithSubMenu.forEach(li => {
        li.addEventListener('mouseenter', (event) => {
          event.target.classList.add('active-hover');
          let subMenu = event.target.querySelector('.site-nav__dropdown');
          subMenu.classList.add('active');
        })

        li.addEventListener('mouseleave', (event) => {
          
          // If leaving the top of the li - header sticked or not
          if ( ! header.classList.contains('sticked')) {
            if (event.pageY <= 35) {
              event.target.classList.remove('active-hover')
            }
          } else if (header.classList.contains('sticked')) {
            if (event.pageY <= 10) {
              event.target.classList.remove('active-hover')
            }
          } 

          // Out left
          if (event.pageX < event.target.getBoundingClientRect().left) {
            event.target.classList.remove('active-hover')
          } 

          // Out right
          if (event.pageX > (event.target.getBoundingClientRect().right - 0.5)) {
            event.target.classList.remove('active-hover')
          }
        })
      })

      // Leaving sub menu
      liSubMenu.forEach(menu => {
        menu.addEventListener('mouseleave', (event) => {
          event.target.closest('.site-nav--has-dropdown').classList.remove('active-hover');
          event.target.classList.remove('active');
        })
      })
    }
  }
  subNavHover();

  // ACCORDION
  // const accordion = {
  //   el: $('.js-accordion li'),
  //   config: {
  //     speed: 300,
  //     class: 'active'
  //   },
  //   init: function() {
  //     accordion.el.click(accordion.condition);
  //   },
  //   condition: function() {
  //     accordion.$this = $(this);
  //     if (accordion.$this.hasClass(accordion.config.class)) {
  //       accordion.caseOne();
  //     }else{
  //       accordion.caseTwo();
  //     }
  //   },
  //   caseOne: function() {
  //     accordion.$this.removeClass(accordion.config.class);
  //     accordion.$this.find('.bottom').slideUp(accordion.config.speed);
  //   },
  //   caseTwo: function() {
  //     accordion.$this.siblings().removeClass(accordion.config.class);
  //     accordion.$this.siblings().find('.bottom').slideUp(accordion.config.speed);
  //     accordion.$this.addClass(accordion.config.class);
  //     accordion.$this.find('.bottom').slideDown(accordion.config.speed);
  //   }
  // };
  // accordion.init();

  // MENU OPEN
  document.querySelector('.js-menu').onclick = function() {
    this.classList.toggle('is-active');
    document.querySelector('body').classList.toggle('menu-open');
  }
  
//   function announcementBar() {
// //     if (window.history.length <= 2 && document.querySelector('.announcement-bar') != null) {
//       		let announcementBar = document.querySelector('.announcement-bar');
//     		let header = document.querySelector('#shopify-section-header');
//     	    let main = document.querySelector('main');
          
//           startAnnouncementBar(announcementBar, header, main)
    
//        	let close = document.querySelector('.announcement-bar .close-announcement-bar');
//         close.addEventListener('click', (event) => {
// 			event.preventDefault();
//           	announcementBar.classList.remove('active');
//           	header.setAttribute('style','');
// 	        header.classList.remove('sticked-announcement');
//           	main.setAttribute('style','');
//        });
//   }

//   function startAnnouncementBar(announcementBar, header, main) {
//       announcementBar.classList.add('active');
//       header.style.transform = `translateY(${announcementBar.getBoundingClientRect().height}px)`;
//       header.classList.add('sticked-announcement');

//       if (window.innerWidth < 769) {
//         main.style.transform = `translateY(${announcementBar.getBoundingClientRect().height}px)`;
//       }

//   }
  
//   if (document.querySelector('.announcement-bar') != null || document.querySelector('.announcement-bar') != undefined) {
//     announcementBar();
//   }








// *********************
// Full Width Slider
// *********************
// class FullWidthSlider {
//   constructor({slider, rowId, counter, dots}) {
//     this.slider = slider;
//     this.rowId = rowId;
//     this.content = this.slider.querySelector('.slider-one-content');
//     this.slides = this.slider.querySelectorAll('.slide');
//     this.slideWidth = this.slides[0].getBoundingClientRect().width;
//     this.wrapWidth = this.content.getBoundingClientRect().width;
//     this.wrapVal;
//     this.viewWidth = window.innerWidth;
//     this.counter = counter;
//     this.active = 0;
//     this.currentCount = document.querySelector(`#${this.rowId} .current p`);
//     this.totalCount = document.querySelector(`#${this.rowId} .total p`);
//     this.slidePositions;

//     this.singleSlideBool = false;

//     this.dotLinks;
//     this.dots = dots;
//     if (this.dots) {
//       this.dotLinks  = document.querySelectorAll(`#${this.rowId} .dots a`);
//       this.dotsClick();
//     } else {
//       this.dots = false;
//     }

//     // Det total counter value
//     if (this.counter) {

//       // If not just one slide
//       if (this.slides.length != 1) {

//         // If less than 10
//         if (this.slides.length < 10) {
//           this.totalCount.textContent = '0' + this.slides.length;
//         } else {
//           this.totalCount.textContent = this.slides.length;
//         }
//         } else {
//           // Remove drag
//           this.singleSlideBool = true;
//         }
//     }
  
//     setTimeout(() => {
//       this.init();
//       this.resize();
      
//       // If more than one slide - enable drag
//       if (! this.singleSlideBool) {
//         setTimeout(() => {
//           this.move();
//         }, 200)
//       } else {
//         // For regular mouse events
//         this.content.classList.add('normal-cursor');
//       }

//     }, 1000)
//   }

//   init() {
//     // console.log('a104')
//     this.slidePositions = new Array();

//     // Get slide widths
//     this.slides.forEach((slide, index) => {
//       if (index == 0) {
//         this.slidePositions.push(this.slideWidth * index);
//       } else {
//         this.slidePositions.push(-this.slideWidth * index);
//       }
//     })
//   }

//   move() {
//     // set width
//     let wrapWidth = this.content.getBoundingClientRect().width;

//     let slideWidth = this.slides[0].getBoundingClientRect().width;

//     // Find draggable el
//     let dragId = '#' + this.content.id;

//     // Set dots vars
//     let dotsBool = this.dots;
//     let dotsList;
//     if (dotsBool) {
//       dotsList = this.dotLinks;
//     }

//     // Controls drag of slider
//     let dragEl = Draggable.create(dragId, {
//       type: "x",
//       trigger: dragId,
//       inertia: true,
//       minimumMovement: 1,
//       edgeResistance: 1,
//       dragResistance: 0,
//       zIndexBoost: false,
//       zIndex: 1000,
//       bounds: {
//         minX: 1, 
//         maxX: -this.wrapWidth + (this.slideWidth), 
//         minY: 0, 
//         maxY: 0
//       },
//       onDrag: updateProgress,
//       onThrowUpdate: updateProgress,
//       snap: { 
//         // sx: snap(x)
//         x: (x) => {

//           // Next slide
//           let nextSlide = Math.round(x / this.slideWidth) * this.slideWidth;

//           // Find closest slide to next slide
//           var closest = this.slidePositions.reduce(function(prev, curr) {
//             return (Math.abs(curr - nextSlide) < Math.abs(prev - nextSlide) ? curr : nextSlide);
//           });

//           let nextCount = Number(this.slidePositions.indexOf(closest));

//           this.active = nextCount;

//           if (this.counter) {
//             // Update Current Count
//             if (nextCount <= 0) {
//               this.currentCount.textContent = '01';  
//             } else if (nextCount != 0) {
//               this.currentCount.textContent = '0' + (nextCount + 1);
//             }
//           }

//           // If dots
//           if (dotsBool) {
//             // Remove active
//             dotsList.forEach( a => { a.classList.remove('active') });

//             // Switch active
//             if (this.active <= 0) {
//               dotsList[0].classList.add('active')
//             } else if (this.active != 0) {
//               dotsList[this.active].classList.add('active')
//             }
//           }
          
//           return nextSlide;
//         } 
//       },
//     })[0];
//     this.dragEl = dragEl;


//     // Animate Slider
//     function updateProgress() {
//       let test = animation.progress(this.x / wrapWidth);
//     }


//     // Find box el
//     let temp = '#' + this.rowId + ' .box';

//     // Move slider
//     const animation = gsap.to(temp, {
//       duration: 0.6,
//       x: `+=${wrapWidth}`, 
//       ease: "power4.easeOut",
//       overwrite: true,
//       paused: true,
//       modifiers: {
//         x: function(x, target) {
//           x = parseInt(x) % wrapWidth;
//             return `${x}px`;
//         }
//       },
//     });
//   }


//   // On dot click - move the slider
//   dotsClick() {
//     this.changeSlides = event => {
//       event.preventDefault();

//       let active = event.target.dataset.count;

//       this.active = active;

//       this.dotLinks.forEach( (a,index) => {
//         a.classList.remove('active');

//         if (index == active) {
//           a.classList.add('active');
//         }
//       })

//       // Move the slider - via dots
//       gsap.to(this.content, {
//         duration: 0.4,
//         ease: "power1.inOut",
//         x: this.slidePositions[this.active],
//       })
//     }


//     this.dotLinks.forEach(a => {
//       a.addEventListener('click', event => { this.changeSlides(event) });
//     })
//   }

//   resize() {
//     window.addEventListener("resize", () => { this.resizeSlider() });

//     this.resizeSlider = () => {
      
//       // Re find values
//       this.slideWidth = this.slides[0].getBoundingClientRect().width;
//       this.wrapWidth = this.content.getBoundingClientRect().width;
//       this.init();

//       // Keep slider at current slide
//       gsap.to(this.content, {x: this.slidePositions[this.active] + 'px' })
//     }
//   }
// }

// FULL SLIDER V2
class FullWidthSlider {
  constructor({slider, rowId, counter, dots}) {
    this.slider = slider;
    this.rowId = rowId;
    this.content = this.slider.querySelector('.slider-one-content');
    this.slides = this.slider.querySelectorAll('.slide');
    this.slideWidth = this.slides[0].getBoundingClientRect().width;
    this.wrapWidth = this.content.getBoundingClientRect().width;
    this.wrapVal;
    this.viewWidth = window.innerWidth;
    this.counter = counter;
    this.active = 0;
    this.currentCount = document.querySelector(`#${this.rowId} .current p`);
    this.totalCount = document.querySelector(`#${this.rowId} .total p`);
    this.slidePositions;

    this.singleSlideBool = false;

    this.dotLinks;
    this.dots = dots;
    if (this.dots) {
      this.dotLinks  = document.querySelectorAll(`#${this.rowId} .dots a`);
      this.dotsClick();
    } else {
      this.dots = false;
    }

    // Det total counter value
    if (this.counter) {

      // If not just one slide
      if (this.slides.length != 1) {

        // If less than 10
        if (this.slides.length < 10) {
          this.totalCount.textContent = '0' + this.slides.length;
        } else {
          this.totalCount.textContent = this.slides.length;
        }
        } else {
          // Remove drag
          this.singleSlideBool = true;
        }
    }
  
    setTimeout(() => {
      this.init();
      this.resize();
      
      // If more than one slide - enable drag
      if (! this.singleSlideBool) {
        setTimeout(() => {
          this.move();
        }, 200)
      } else {
        // For regular mouse events
        this.content.classList.add('normal-cursor');
      }

    }, 1000)
  }

  init() {
    // console.log('a104')
    this.slidePositions = new Array();

    // Get slide widths
    this.slides.forEach((slide, index) => {
      if (index == 0) {
        this.slidePositions.push(this.slideWidth * index);
      } else {
        this.slidePositions.push(-this.slideWidth * index);
      }
    })
  }

  move() {
    // set width
    let wrapWidth = this.content.getBoundingClientRect().width;

    let slideWidth = this.slides[0].getBoundingClientRect().width;

    // Find draggable el
    let dragId = '#' + this.content.id;

    // Set dots vars
    let dotsBool = this.dots;
    let dotsList;
    if (dotsBool) {
      dotsList = this.dotLinks;
    }

    // Controls drag of slider
    let dragEl = Draggable.create(dragId, {
      type: "x",
      trigger: dragId,
      inertia: true,
      maxDuration: 0.6,
   
      minimumMovement: 1,
      edgeResistance: 1,
      dragResistance: 0,
      zIndexBoost: false,
      zIndex: 1000,
      bounds: {
        minX: 1, 
        maxX: -this.wrapWidth + (this.slideWidth), 
        minY: 0, 
        maxY: 0
      },
      onDrag: updateProgress,
      onThrowUpdate: updateProgress,
      snap: { 
        x: (x) => {
      
          // Next slide
          let nextSlide = Math.round(x / this.slideWidth) * this.slideWidth;

          // Find closest slide to next slide
          var closest = this.slidePositions.reduce(function(prev, curr) {
            return (Math.abs(curr - nextSlide) < Math.abs(prev - nextSlide) ? curr : nextSlide);
          });

          let nextCount = Number(this.slidePositions.indexOf(closest));

          this.active = nextCount;

          if (this.counter) {
            // Update Current Count
            if (nextCount <= 0) {
              this.currentCount.textContent = '01';  
            } else if (nextCount != 0) {
              this.currentCount.textContent = '0' + (nextCount + 1);
            }
          }

          // If dots
          if (dotsBool) {
            // Remove active
            dotsList.forEach( a => { a.classList.remove('active') });

            // Switch active
            if (this.active <= 0) {
              dotsList[0].classList.add('active')
            } else if (this.active != 0) {
              dotsList[this.active].classList.add('active')
            }
          }

          console.log(nextSlide)
          
          return nextSlide;
        }
      },
    })[0];
    this.dragEl = dragEl;


    // Animate Slider
    function updateProgress() {
      let test = animation.progress(this.x / wrapWidth);
    }


    // Find box el
    let temp = '#' + this.rowId + ' .box';

    // Move slider
    const animation = gsap.to(temp, {
      duration: 0.4,
      x: `+=${wrapWidth}`, 
      // ease: "power4.easeOut",
      ease: "expo.out",
      overwrite: true,
      paused: true,
      modifiers: {
        x: function(x, target) {
          x = parseInt(x) % wrapWidth;
            return `${x}px`;
        },
      },
    });
  }


  // On dot click - move the slider
  dotsClick() {
    this.changeSlides = event => {
      event.preventDefault();

      let active = event.target.dataset.count;

      this.active = active;

      this.dotLinks.forEach( (a,index) => {
        a.classList.remove('active');

        if (index == active) {
          a.classList.add('active');
        }
      })

      // Move the slider - via dots
      gsap.to(this.content, {
        duration: 0.4,
        ease: "power1.inOut",
        x: this.slidePositions[this.active],
      })
    }


    this.dotLinks.forEach(a => {
      a.addEventListener('click', event => { this.changeSlides(event) });
    })
  }

  resize() {
    window.addEventListener("resize", () => { this.resizeSlider() });

    this.resizeSlider = () => {
      
      // Re find values
      this.slideWidth = this.slides[0].getBoundingClientRect().width;
      this.wrapWidth = this.content.getBoundingClientRect().width;
      this.init();

      // Keep slider at current slide
      gsap.to(this.content, {x: this.slidePositions[this.active] + 'px' })
    }
  }
}

// *************************
// Mult iItem Slider
// *************************
class MultiItemSlider {
  constructor({slider, rowId, counter, dots, toSlide}) {
    this.slider = slider;
    this.rowId = rowId;
    this.content = this.slider.querySelector('.slider-one-content');
    this.slides = this.slider.querySelectorAll('.slide');
    this.slideWidth = this.slides[0].getBoundingClientRect().width;
    this.wrapWidth = this.content.getBoundingClientRect().width;
    this.wrapVal;
    this.viewWidth = window.innerWidth;
    this.counter = counter;
    this.active = 0;
    this.currentCount = document.querySelector(`#${this.rowId} .current p`);
    this.totalCount = document.querySelector(`#${this.rowId} .total p`);
    this.slidePositions;

    // Device - move slides Object
    this.toSlide = toSlide;

    // this.singleSlideBool = false;

    // Screen Size
    this.screenSize;

    // Finds window width - against toSlide - how many slides to move
    this.screenDetermineScreenSize = () => {
      let screenSize;

      if (window.innerWidth > this.toSlide.desktop.width) {
        screenSize = 'desktop';
      } else if (window.innerWidth < this.toSlide.desktop.width && window.innerWidth > this.toSlide.mobile.width) {
        screenSize = 'tablet';
      } else if (window.innerWidth <= this.toSlide.mobile.width) {
        screenSize = 'mobile';
      }

      this.screenSize = screenSize;
    }

  
    // Dots
    this.dotLinks;
    this.dots = dots;
    this.dotUl;
   
    if (! this.dots) {
      this.dots = false;
    }

    // Get total counter value
    if (this.counter) {

      // If not just one slide
      if (this.slides.length != 1) {

        // If less than 10
        if (this.slides.length < 10) {
          this.totalCount.textContent = '0' + this.slides.length;
        } else {
          this.totalCount.textContent = this.slides.length;
        }
        } else {
          // Remove drag
          this.singleSlideBool = true;
        }
    }
  
    setTimeout(() => {
      this.init();
      this.resize();
      
      // If more than one slide - enable drag
      if (! this.singleSlideBool) {
        setTimeout(() => {
          this.move();
        }, 200)
      } else {
        // For regular mouse events
        this.content.classList.add('normal-cursor');
      }

    }, 1000)
  }

  init(event) {
    // Get screen size - determines slides to move number
    this.screenDetermineScreenSize();

    if (this.dots) {
      
      if (event != null && event.type == "resize") {
          this.dotLi  = document.querySelectorAll(`#${this.rowId} .dots li`);
          console.log(this.dotLi)
          this.dotLi.forEach(li => { li.remove() });

          this.dotUl  = document.querySelector(`#${this.rowId} .dots`);
          // this.dotsClick();
          this.dotsCreateLi();
      } else {
        this.dotUl  = document.querySelector(`#${this.rowId} .dots`);
        this.dotsCreateLi();
      }
    } 

    this.slidePositions = new Array();

    // WORK ON **********
      // if not even - adjust total slide - for not full slide counts
      // console.log( (this.slides.length % this.toSlide.desktop.move) != 0)

    // Get slide widths
    this.slides.forEach((slide, index) => {
      if (index == 0) {
        this.slidePositions.push(this.slideWidth * index);
      }
      else if (index % this.toSlide[this.screenSize].move == 0) {
        this.slidePositions.push(-this.slideWidth * index);
      }
    })

    console.log(this)
  }

  move() {
    // set width
    let wrapWidth = this.content.getBoundingClientRect().width;

    let slideWidth = this.slides[0].getBoundingClientRect().width;

    // Find draggable el
    let dragId = '#' + this.content.id;

    // Set dots vars
    let dotsBool = this.dots;
    let dotsList;

    if (dotsBool) {
      // dotsList = this.dotLinks;
      dotsList = document.querySelectorAll(`#${this.rowId} .dots a`);
    }

    // Controls drag of slider
    let dragEl = Draggable.create(dragId, {
      type: "x",
      trigger: dragId,
      inertia: true,
      maxDuration: 0.6,
      dragClickables: true,

      clickableTest: function(e) {
        console.log('clcikable',e)
      },
   
      minimumMovement: 1,
      edgeResistance: 1,
      dragResistance: 0,
      zIndexBoost: false,
      zIndex: 1000,
      bounds: {
        minX: 1, 
        maxX: -this.wrapWidth + (this.slideWidth), 
        minY: 0, 
        maxY: 0
      },
      onDrag: updateProgress,
      onThrowUpdate: updateProgress,
      snap: { 
        x: (x) => {
      
          // Next slide
          let nextSlide;
          nextSlide = Math.round( (x / this.slideWidth) * this.slideWidth);

          // Find closest slide to next slide
          var closest = this.slidePositions.reduce(function(prev, curr) {
            return (Math.abs(curr - nextSlide) < Math.abs(prev - nextSlide) ? curr : prev);
          });

          let nextCount = Number(this.slidePositions.indexOf(closest));

          // Check if number os negative
          function convert_positive(a) { 
            // Check the number is negative 
            if (a < 0) { 
                // Multiply number with -1 
                // to make it positive 
                a = a * -1; 
            } 
            // Return the positive number 
            return a; 
          } 

          nextCount = convert_positive(nextCount);

          if (nextCount <= 0) {
            this.active = 0;
          } else {
            this.active = nextCount;
          }

          if (this.counter) {
            // Update Current Count
            if (nextCount <= 0) {
              this.currentCount.textContent = '01';  
            } else if (nextCount != 0) {
              this.currentCount.textContent = '0' + (nextCount + 1);
            }
          }

          // If dots
          if (this.dots) {

            // Remove active
            this.dotsList.forEach( a => { a.classList.remove('active') });

            // Switch active
            if (this.active <= 0) {
              this.dotsList[0].classList.add('active')
            } else if (this.active != 0) {
              this.dotsList[this.active].classList.add('active')
            }
          }

          nextSlide = this.slidePositions[this.active];
          return nextSlide;
        }
      },
    })[0];
    this.dragEl = dragEl;


    // Animate Slider
    function updateProgress() {
      let test = animation.progress(this.x / wrapWidth);
    }

    // Find box el
    let temp = '#' + this.rowId + ' .box';

    // Move slider
    const animation = gsap.to(temp, {
      duration: 0.4,
      x: `+=${wrapWidth}`, 
      ease: "expo.out",
      overwrite: true,
      paused: true,
      modifiers: {
        x: function(x, target) {
          x = parseInt(x) % wrapWidth;
            return `${x}px`;
        },
      },
    });
  }


  // On dot click - move the slider
  dotsClick(slideMove) {
    let dotLinks = document.querySelectorAll(`#${this.rowId} .dots a`);

    // Set dot links
    this.dotsList = dotLinks;

    this.changeSlides = event => {
      event.preventDefault();

      // Clicked a
      let active = event.target.dataset.count;
      
      // Get current a
      let current = Array.from(dotLinks);
      current.filter(a => {
        if (a.dataset.count == active) {
          active = Array.from(dotLinks).indexOf(a);
        }
      })

      // Set main active - to current a
      this.active = active;

      // Change active class on dot links
      dotLinks.forEach( (a,index) => {
        a.classList.remove('active');
        
        if (index == active) {
          a.classList.add('active');
        }
      })

      // Move the slider - via dots
      gsap.to(this.content, {
        duration: 0.4,
        ease: "power1.inOut",
        x: this.slidePositions[this.active],
      })
    }

    // Dot click event
    dotLinks.forEach(a => {
      a.addEventListener('click', event => { this.changeSlides(event) });
    })
  }

  dotsCreateLi() {
    let count = this.slides.length;
    let dotsCount = Math.ceil(count / this.toSlide[this.screenSize].move);
    let newLi = [];
    let dotCount = 0;
    let slideMove = this.toSlide[this.screenSize].move;

    for(let a = 0; a < dotsCount; a++) {
      let li = document.createElement('li');

      if (a == 0) {
        li.innerHTML = `<a href="#" class="active" data-count="${ 0 }"></a>`;
      }
      else if (a == 1) { 
        li.innerHTML = `<a href="#" data-count="${ slideMove }"></a>`;
      } else {
        // li.innerHTML = `<a href="#" data-count="${ slideMove = slideMove + 3  }"></a>`;
        li.innerHTML = `<a href="#" data-count="${ slideMove = slideMove + this.toSlide[this.screenSize].move  }"></a>`;
      }

      this.dotUl.append(li)
      newLi.push(li)
    }

    // slideMove = 3;
    slideMove = this.toSlide[this.screenSize].move;
    this.dotsClick(slideMove);

  }

  resize() {
    window.addEventListener("resize", (event) => { this.resizeSlider(event) });

    

    this.resizeSlider = (event) => {

      console.log(event)
      
      // Re find values
      this.slideWidth = this.slides[0].getBoundingClientRect().width;
      this.wrapWidth = this.content.getBoundingClientRect().width;
      this.init(event);

      // Keep slider at current slide
      gsap.to(this.content, {x: this.slidePositions[this.active] + 'px' })

      // this.screenDetermineScreenSize();
      // console.log(this.screenSize)
    }
  }
}


  // Index
  if (document.querySelector('body').classList.contains('index')) {

    // Home Slider
    let sliderOne = new FullWidthSlider({
      slider: document.querySelector('#full-width-slider-row-home'),
      rowId: 'full-width-slider-row-home',
      counter: false,
      dots: true,
    });
    console.log(sliderOne)
 }

 // Product
 if (document.body.classList.contains('product')) {
  let productJS = new GeneralProduct();

  // Product Slider One
  let sliderOne = new MultiItemSlider({
    slider: document.querySelector('#product-slider-related-one'),
    rowId: 'product-collection-slider',
    counter: false,
    dots: true,
    toSlide: {
      desktop: {
        width: 769,
        move: 3,
      },
      tablet: {
        width: 768,
        move: 2,
      },
      mobile: {
        width: 576,
        move: 1,
      }
    }
  });
  console.log(sliderOne)

  tooltips();

  // Mobile Product Slider
  if (document.querySelector('#product-slider-one .slider-one')) {
    let productSliderOne = new FullWidthSlider({
      slider: document.querySelector('#product-slider-one'),
      rowId: 'product-section-top',
      counter: true,
      dots: false,
    });
    console.log(productSliderOne)
  }
}
});

// window.addEventListener('resize', (event) => {
//   console.log(event)
//   let announcementBar = document.querySelector('.announcement-bar');
//   let header = document.querySelector('#shopify-section-header');
//   let main = document.querySelector('main');
  
//   if (window.innerWidth != window.innerWidth) {
//     header.style.transform = `translateY(${announcementBar.getBoundingClientRect().height}px)`;
//     if (window.innerWidth < 769) {
//       main.style.transform = `translateY(${announcementBar.getBoundingClientRect().height}px)`;
//     }
//   }
// });

// *********************
// PRODUCT JS
// *********************
class GeneralProduct {
  constructor() {
    
    this.size;
    if (document.querySelector('#productSize') != null) {
      this.size = document.querySelector('#productSize');

      this.changeSize();
    } else {
      this.size = null;
    }

    this.colorSwatch;
    this.currentSwatch;
    this.colorSwatchInputs;
    if (document.querySelector('#swatchSelect') != null) {
      this.colorSwatch = document.querySelector('#swatchSelect');
      this.currentSwatch = document.querySelector('#productCurrentSwatch .current-color').textContent; 
      this.colorSwatchInputs = document.querySelectorAll('#swatchSelect input'); 

      this.changeSwatch();
    } else {
      this.colorSwatch = null;
      this.currentSwatch = null;
    }

    this.quantity = document.querySelector('#productQuantity');
    this.master = document.querySelector('#masterSelect');
    this.buttons = document.querySelectorAll('body.product .product-section-one form .regular-button');

    this.buttonSubmit();

    this.checkInitalValues();
  }

  checkInitalValues() {
    // If first varriant is sold out
    if (this.master.children[0].hasAttribute('disabled')) {

      // If color swatch - add sold out
      if (this.colorSwatch != null) {
        this.colorSwatch.children[1].classList.add('soldout');

        if (this.colorSwatch.children.length > 2) {
          // CHanges to next color - chanages current color value
          this.currentSwatch = this.colorSwatchInputs[1].value;
          this.colorSwatchInputs[1].setAttribute('checked', '');
        }
      }

      this.setQuantityOutOfStock();
      
      this.setVariantSizeOutOfStock();

      this.buttonsSoldOut(this.buttons)
    }
  }

  // Disabled out of stock sizes
  setVariantSizeOutOfStock() {

    if (this.size != null) {

      // Go through master select
      this.master.children.forEach( option => {
        // Get sizes
        let sizes = Array.from(this.size.children);

        // If not instock and current color
        if (option.dataset.inventory == 0 && option.dataset.variantTwo == this.currentSwatch) {
          
          // Find matching sizes and disable
          sizes.forEach(size => {
            if (size.value == option.dataset.variantOne) {
              size.setAttribute('disabled', 'disabled');
            } 
          })
        }
      })
    }
  }

  // Changes quantity of current - color and size
  setVariantQuantityOutOfStock(currentSize) {
    let currentInventory = 0;

    if (currentSize != '') {
      currentSize = this.size.value;
    }

    
    // Go through master select
    this.master.children.forEach( option => {
      
      // Find current size and color - get inventory
      if (option.dataset.variantOne === currentSize && option.dataset.variantTwo === this.currentSwatch) {
        currentInventory = Number(option.dataset.inventory);
      }
    })

    // Disabled quantity options if less then inventory
    this.quantity.children.forEach(num => {
      if (Number(num.value) > currentInventory) {
        num.setAttribute('disabled', 'disabled');
      } 
    })
  }

  // Change swatch on click
  changeSwatch() {
    this.colorSwatchInputs.forEach(swatch => {
      swatch.addEventListener('click', event => {
        
        this.currentSwatch = event.target.value;

        this.resetQuantity();

        if (this.size != null) {
          this.setVariantQuantityOutOfStock();

          // let optionValue = this.size.value + ' / ' + this.currentSwatch;
          // this.changeMasterSelect(optionValue);

          // Update Master Select
          this.changeMasterSelectValue();

          this.resetSizeSelect();

          this.setVariantSizeOutOfStock()
        } else {

          // Change master select color
          this.master.children.forEach((option, index) => {
            if (option.dataset.option == this.currentSwatch) {
              this.master.selectedIndex = index;
            }
          })
        }

      })
    })
  }

  changeSize() {
    let currentSize;
    this.size.addEventListener('change', event => {
      currentSize = event.target.value;

      this.resetSizeSelect();

      this.resetQuantity();

      this.setVariantSizeOutOfStock()
      

      if (this.currentSwatch != null) {
        this.setVariantQuantityOutOfStock(currentSize);

        // Update Master Select
        this.changeMasterSelectValue();
      }
      
      this.buttonsAddToCart(this.buttons);
    })
  }

  // changeMasterSelect(optionValue) {
  //   this.master.children.forEach(option => {
  //     if (optionValue == option.dataset.option) {
  //       if (option.hasAttribute('disabled')) {
  //         this.buttonsSoldOut(this.buttons)
  //       } else if (! option.hasAttribute('disabled')) {
  //         this.buttonsAddToCart(this.buttons);
  //       }
  //     } 
  //   })
  // }

  changeMasterSelectValue() {
    // Find matching - size and color variants
    this.master.children.forEach((option, index) => {
      if (option.dataset.option == this.size.value + ' / ' + this.currentSwatch) {
        this.master.selectedIndex = index;
      }
    })
  }

  // Disable out of stock quantities
  setQuantityOutOfStock() {
    this.quantity.children.forEach(option => {
      option.setAttribute('disabled', 'disabled');
    })
  }

  // Removes all disabled attriburtes from options
  resetSizeSelect() {
    this.size.children.forEach(size => {
      size.removeAttribute('disabled');
    })
  }

  resetQuantity() {
    this.quantity.children.forEach(num => {
      num.removeAttribute('disabled');
    })
    console.log('reset')
  }

  buttonSubmit() {
    // if (! document.body.classList.contains('product-membership')) {
      this.buttons.forEach(button => {
        button.addEventListener('click', event => {
          event.preventDefault();

          let id = this.master.value;
          let quantity = this.quantity.value;
          let size, color, sellingPlan;
          
          if (this.size != null) {
            size = this.size.value;
          } else if (this.size == null){
            size = "";
          }

          if (this.colorSwatch != null) {
            color = this.currentSwatch;
          } else if (this.colorSwatch == null) {
            color = "";
          }

          if (document.querySelector('.paywhirl-plan-selector-plan select') != null) {
            sellingPlan = document.querySelector('.paywhirl-plan-selector-plan select').value;
            console.log('hi',sellingPlan.value)
          } else {
            sellingPlan = "";
          }


          if (sellingPlan != null) {
            CartJS.addItem(id, 1, {
              "size": size,
              "color": color,
              "selling_plan": sellingPlan
            }, { })
          } 
          else if (sellingPlan == null){
            CartJS.addItem(id, 1, {
            "size": size,
            "color": color
          }, { })
          }
        })
      })
  }

  // Make buttons - sold out
  buttonsSoldOut(arr) {
    arr.forEach(button => {
      button.classList.add('soldout');
      button.innerHTML = '<span data-submit-button-text>Sold out</span>';
    })
  }

  // Make buttons - regular
  buttonsAddToCart(arr) {
    arr.forEach(button => {
      button.classList.remove('soldout');
      button.innerHTML = '<span data-submit-button-text>add to cart</span>';
    })
  }
}


// **************************
// Tooltips
// **************************
function tooltips() {
  if (document.querySelector('#product-material-and-care') != null) {
    let list = document.querySelectorAll('#product-material-and-care .care-icons .tooltip-icon');

    list.forEach(li => {
      li.addEventListener('mouseenter', event => {
        event.target.nextElementSibling.classList.add('active')
      })

      li.addEventListener('mouseleave', event => {
        event.target.nextElementSibling.classList.remove('active')
      })

      li.addEventListener('click', event => {
        if ( ! event.target.nextElementSibling.classList.contains('active')) {
          event.target.nextElementSibling.classList.add('active')
        } else if (event.target.nextElementSibling.classList.contains('active')) {
          event.target.nextElementSibling.classList.remove('active')
        }
      })
    })
  }
}

// *********************
// Modals
// *********************
class Modal {
  constructor() {
    this.buttons = document.querySelectorAll('.js-modal-button');
    this.close = document.querySelectorAll('.bws-modal .js-close-modal');
    this.modalCopy = document.querySelector('#modal-content-wrapper-product');
    this.init();
  }

  init() {
    this.buttons.forEach(button => {
      button.addEventListener('click', event => {
        this.openModal(event);
      });
    })

    this.close.forEach(close => {
      close.addEventListener('click', event => {
        this.closeModal(event)
      })
    })
  }

  openModal(event, _contentId, _modalId, _copyId) {
    let contentId, modalId;

    if (event != undefined) {
      event.preventDefault();
    
      // Find modal and content id's
      contentId = event.target.dataset.content;
      modalId = event.target.dataset.modalId;
    } else if (event == undefined) {
      contentId = _contentId;
      modalId = _modalId;
    }

    console.log(contentId, modalId)
    
    document.body.classList.add('of-h');
    document.documentElement.classList.add('of-h');

    // If general modal
    if (modalId == 'general-modal') {
      modalId = 'shopify-section-general-modal';
    } else if (modalId == 'cta-modal') {
      modalId = 'shopify-section-general-modal';
    }

    // Make the modal active
    let modal = document.querySelector(`#${ modalId }`);
    modal.classList.add('active')

    let tl = gsap.timeline();
    tl.to(modal, {
      duration: 0.3,
      ease: 'power1.inOut',
      alpha: 1
    })
    tl.to(modal.children[0], {
      duration: 0.3,
      ease: 'power1.inOut',
      y: 0,
      alpha: 1
    })


    // Find the modal content div - clone it
    let copy;

    console.log('a',_copyId, contentId)

    if (event != undefined) {
      copy = this.modalCopy.querySelector(`#${ contentId }`);
    }
    else if (event == undefined) {
      copy = document.querySelector(`#${ _copyId + ' #' + contentId}`);
    }

    console.log(_copyId, copy)

    let cloneCopy = copy.children[0].cloneNode(true);

    // Find modal content
    // let modalContent = modal.querySelector('.content-col .content');
    let modalContent = modal.querySelector('.content-col');
    let modalContentDiv = modal.querySelector('.content-col #modal-content-space');

    // Remove current content placeholder div
    modalContentDiv.remove();

    // Go over children and clone them - then ad to modal
    cloneCopy.children.forEach(div => {
      let currentChild = div.cloneNode(true);
      console.log(currentChild)
      modalContent.append(currentChild);
    })

    // Set modal width with classes
    modalContent.parentElement.classList += ' ' + cloneCopy.dataset.contentWidth; 
  }

  closeModal(event) {
    event.preventDefault();

    // Find current modal - make it not active
    let currentModal = event.target.closest('.bws-modal');
    // currentModal.parentElement.classList.remove('active');

    // Find content part of modal
    let content = currentModal.querySelector('.content-col');
    let contentWrapper = currentModal.querySelector('.content-col-wrapper');

    // Create replacement content div
    let replacementDiv = document.createElement('div');
    replacementDiv.setAttribute('class', 'row content');
    replacementDiv.setAttribute('id', 'modal-content-space');

    let t2 = gsap.timeline();
    t2.to(currentModal, {
      duration: 0.3,
      ease: 'power1.inOut',
      y: -20,
      alpha: 0
    })
    t2.to(currentModal.parentElement, {
      duration: 0.3,
      ease: 'power1.inOut',
      alpha: 0,
      onComplete: () => {
        currentModal.parentElement.classList.remove('active');
        document.body.classList.remove('of-h');
        document.documentElement.classList.remove('of-h');

        // Wait - remove modal content
        setTimeout(() => {
          content.innerHTML = '';
          content.append(replacementDiv);
          contentWrapper.classList = 'content-col-wrapper';
        }, 410)
      }
    })
  }
}

/*
  Modal - setTimeout

  // Add to Modal class
  modalButton.timedModalCta = (_contentId, _modalId, _copyId) => {

    // Define modal information
    _contentId = 'size-guide-content';
    _modalId =  'general-modal';
    _copyId = 'modal-content-wrapper-product';

    // Pass arguments to function
    modalButton.openModal(undefined, _contentId, _modalId, _copyId);
  }

  // On timeout show modal
  setTimeout(() => {
    modalButton.timedModalCta()
  }, 1000);

*/


