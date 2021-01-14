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

  // ***********************
  // Locomotive Scroll
  // ***********************
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
    

  if (document.querySelectorAll('.js-modal-button').length > 0) {
    let modalButton = new Modal();
  }

  if (document.body.classList.contains('collection')) {
    // AJAX LOAD MORE
    // function loadProducts() {
    //   let nextUrl = document.querySelector('.collection-product-list .btn-wrapper a').href;
    //   document.querySelector('.collection-product-list .btn-wrapper').remove();
    //   var xmlhttp = new XMLHttpRequest();
    //   xmlhttp.onreadystatechange = function() {
    //     if (this.readyState === 4 && this.status === 200) {
    //       //console.log(this.responseText);
    //       var tmpdiv = document.createElement("div");
    //       tmpdiv.innerHTML = this.responseText;
    //       var wantedDiv = tmpdiv.querySelector('.collection-product-list').innerHTML;
    //       //console.log(wantedDiv);
    //       document.querySelector('.master > .collection-product-list').innerHTML += wantedDiv;
    //       scroll.update();
    //     }
    //   };
    //   xmlhttp.open('GET', nextUrl);
    //   xmlhttp.send();
    // }

    // document.addEventListener("click", event => {
      // console.log(event)
      // console.log(event.target)

      // if (event.target.classList.contains('boost-pfs-quickview-cart-btn')) {
      //   event.preventDefault();
      //   event.stopPropagation();


      //   let qucikViewForm = document.querySelector('#boost-pfs-quickview-cart-form');
      //   let productId, color, size, quantity, optionZero, optionZeroInputsChecked, optionOne, optionOneInputsChecked;


      //   quantity = document.querySelector('#boost-pfs-quickview-cart-quantity').value;

      //   productId = qucikViewForm.querySelector('#boost-pfs-quickview-variants-selector').value;

      //   if (document.querySelector('#ProductSelect-option-0') != null) {
      //     optionZero = document.querySelector('#ProductSelect-option-0');
      //     optionZeroInputsChecked = document.querySelector('#ProductSelect-option-0 input[checked]');

      //     if (optionZero.attributes.name.value == 'color' || optionZero.attributes.name.value == 'Color' && optionZeroInputsChecked.value != null) {
      //       color = optionZeroInputsChecked.value;
      //     } else {
      //       color = '';  
      //     }
      //   } else {
      //     color = '';
      //   }

      //   if (document.querySelector('#ProductSelect-option-1') != null) {
      //     optionOne = document.querySelector('#ProductSelect-option-1');
      //     optionOneInputsChecked = document.querySelector('#ProductSelect-option-1 input[checked]');

      //     if (optionOne.attributes.name.value == 'size' || optionOne.attributes.name.value == 'Size' && optionOneInputsChecked.value != null) {
      //       size = optionOneInputsChecked.value;
      //     } else {
      //       size = '';  
      //     }
      //   } else {
      //     size = '';
      //   }

        
        // console.log(optionOne)
        // console.log(optionOne.attributes.name.value, optionOneInputsChecked)

        // optionTwo = document.querySelector('#ProductSelect-option-1');
        // optionTwoInputsChecked = document.querySelector('#ProductSelect-option-1 input[checked]');

        // console.log('=============')
        // console.log(optionTwo)
        // console.log(optionTwo.attributes.name.value, optionTwoInputsChecked)
        // console.log('=============')
        // console.log(productId, color, size, quantity)

        /*
          color
          size
          quantity 
          id

          check for null
        */
      // }

      
    //   let el = document.querySelector('.load-more');
    //   if (el && el.contains(event.target)) {
    //     event.preventDefault();
    //     event.stopPropagation();
    //     loadProducts();
    //   }
    // });

    // Not in use - addCtaToCollectionAll()
      // Find and add cta content to collection list 
      function addCtaToCollectionAll() {
        // if collection all
        if (window.location.pathname == "/collections/all") {

          // Search & Filter app collection list
          let list = document.querySelectorAll('.boost-pfs-filter-products .boost-pfs-filter-product-item')

          // CTAs - at bottom the of the collection
          let ctaTwo = cloneCTA('#collectionCtaHolder #ctaTwoWrap');
          let ctaThree = cloneCTA('#collectionCtaHolder #ctaThreeWrap');

          // Wait for search & filter app to finish
          setTimeout(()=> {
            list[2].outerHTML += ctaTwo.innerHTML + ctaThree.innerHTML;
          }, 1000)
          
        }
      }
      // addCtaToCollectionAll();

      // Clone element - and return its HTML in a wrapper div 
      function cloneCTA(el) {
        let element = document.querySelector(el);
        let clondedEl = element.children[0].cloneNode(true);
        let newDiv = document.createElement('div');
        newDiv.innerHTML = `<div class="${ clondedEl.classList }">${ clondedEl.innerHTML }</div>`;

        return newDiv;
      }

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
        // console.log(mutation)
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


  

  // CART DROPDOWN
  jQuery('.js_cart').click(function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.cart-dd').toggleClass('active');
    $('body').addClass('of-h');
  });

  $('.js-dd-close').click(function(){
    $('.cart-dd').removeClass('active');
    $('body').removeClass('of-h');
  });

  $('#input-quantity').on('change keyup', function() {
    var newValue = $(this).val();
    $('.js-quantity option').text(newValue);
  });

  // SEARCH
  // const search = document.querySelector('.main-header .js_search');
  const searchs = document.querySelectorAll('.main-header .js_search, #mobile-nav .js_search');
  let closeSearch = document.querySelector('.js-close-search');
  const inputCheck = document.querySelector('.search-form__input');
  const submitCheck = document.querySelector('.search-form__submit');
  const bodyTag = document.querySelector('body');
  let pfsOverlay, appOverlay;
  // let pfsOverlay

  // Wait for app to load
  // setTimeout(() => {}, 400);

  searchs.forEach(search => {
    search.addEventListener('click', (event) => {
      event.preventDefault();

      // Make search drawer active
      let searchModal = document.querySelector('#SearchDrawer');
      searchModal.classList.add('active');

      // Search and filter app overlay
      appOverlay = document.querySelector('.boost-pfs-search-suggestion-mobile-overlay');


      // Hide search and filter app - if not null
      if (! document.body.classList.contains('cart') && appOverlay != null) {
        pfsOverlay = document.querySelector('.boost-pfs-search-suggestion-mobile-overlay');
        pfsOverlay.classList.add('hidden-el');
      }

      // Animate in
      gsap.to(searchModal, {
        alpha: 1,
        duration: 0.4,
        ease: "power1.inOut",
        onComplete: () => {
          inputCheck.focus();
          inputCheck.click();
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
          document.body.classList.remove('boost-pfs-search-suggestion-mobile-open');

          // unhide search and filter app - if not null
          if (! document.body.classList.contains('cart') && appOverlay != null) {
            pfsOverlay.setAttribute('style', '');
            pfsOverlay.classList.remove('hidden-el');
          }

          searchModal.classList.remove('active');
        }
      })
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

  // MENU OPEN
  // document.querySelector('.js-menu').onclick = function() {
  //   this.classList.toggle('is-active');
  //   document.querySelector('body').classList.toggle('menu-open');
  // }

  // Open and close mobile menu
  function mobileNavigation() {
    let trigger = document.querySelector('.main-header .js-menu');
    // let nav = document.querySelector('#mobile-nav');
    // let mobileNav = document.querySelector('#shopify-section-mobile-nav');
    let mobileNav = document.querySelector('#shopify-section-header #mobile-nav');
    let header = document.querySelector('#shopify-section-header');

    trigger.addEventListener('click', event => {
      event.preventDefault();

      if (! mobileNav.classList.contains('active')) {
        
        mobileNav.classList.add('active');
        trigger.classList.add('active');
        header.classList.add('open-mobile-nav');
        document.body.classList.add('of-h');

        let tl = gsap.timeline();
        tl.to(mobileNav, {
          duration: 0.3,
          ease: 'power1.inOut',
          alpha: 1
        })
        tl.to(mobileNav.children[0], {
          duration: 0.3,
          ease: 'power1.inOut',
          // y: 0,
          alpha: 1
        })

      } else if (mobileNav.classList.contains('active')) {

        let tl = gsap.timeline();
        tl.to(mobileNav.children[0], {
          duration: 0.3,
          ease: 'power1.inOut',
          // y: -20,
          alpha: 0
        })
        tl.to(mobileNav, {
          duration: 0.3,
          ease: 'power1.inOut',
          alpha: 0
        })
        
        mobileNav.classList.remove('active')
        trigger.classList.remove('active')
        header.classList.remove('open-mobile-nav');
        document.body.classList.remove('of-h');
      }
    });    
  }
  mobileNavigation();
  mobileMenuAccordions();

  // Mobile menu accordion
  function mobileMenuAccordions() {
    if (document.querySelectorAll('#mobile-nav li.site-nav--has-dropdown').length > 0) {
      let acc = document.querySelectorAll('#mobile-nav li.site-nav--has-dropdown button');

      acc.forEach(li => {
        li.addEventListener('click', event => {
          let current = event.target;

          // Sub menu li
          let accLi = Array.from(event.target.nextElementSibling.children[0].children);

          if (! current.classList.contains('active')) {
            let tl = gsap.timeline();
        
            current.classList.add('active')

            tl.to(current.nextElementSibling, {
              duration: 0.4,
              height: 'auto',
              ease: 'power1.inOut',
            })
            tl.to(accLi, {
              duration: 0.4,
              alpha: 1,
              ease: 'power1.in',
              stagger: 0.1,
            },'-=0.2')
          } else if (current.classList.contains('active')) {
            
            let tl = gsap.timeline();
            
            tl.to(accLi, {
              duration: 0.4,
              alpha: 0,
              ease: 'power1.out',
              stagger: {
                each: 0.1,
                from: "end"
              }
            })
            tl.to(current.nextElementSibling, {
              duration: 0.4,
              height: 0,
              ease: 'power1.inOut',
              onComplete: () => {
                current.classList.remove('active')
              }
            },'-=0.2')
          }
        }) 
      })
    }
  }

  // Add click event for general accordions
  function generalAccordion() {
    if (document.querySelectorAll('.accordion-list .accordion-link').length > 0) {
      let accordionsLinks = document.querySelectorAll('.accordion-list .accordion-link');

      accordionsLinks.forEach(acc => {
        acc.addEventListener('click', event => { toggleAccordions(event) });
      })
    }
  }

  // Open and close accordions
  function toggleAccordions(event) {
    event.preventDefault();


    let current = event.target;

    if (! current.classList.contains('active')) {
      current.classList.add('active')

      let tl = gsap.timeline();

      tl.to(current.nextElementSibling, {
        duration: 0.4,
        height: 'auto',
        ease: 'power1.inOut',
        onComplete: () => {
          scroll.update();
        }
      })
      tl.to(current.nextElementSibling.children[0], {
        duration: 0.4,
        ease: 'power1.in',
        alpha: 1
      }, '-=0.3')
    } else if (current.classList.contains('active')) {
      
      current.classList.remove('active');
      
      let tl = gsap.timeline();

      tl.to(current.nextElementSibling.children[0], {
        duration: 0.4,
        ease: 'power1.in',
        alpha: 0
      })
      tl.to(current.nextElementSibling, {
        duration: 0.4,
        height: 0,
        ease: 'power1.out',
        onComplete: () => {
          current.classList.remove('active');
          scroll.update();
        }
      }, '-=0.25')
    }
  }

  // Single open accordions
  function productAccordions() {
    let accordions = Array.from(document.querySelectorAll('.accordion-list .accordion-link'));
  
    // Open first accordion
    gsap.set(accordions[0].nextElementSibling, {
      height: 'auto',
    })
    gsap.set(accordions[0].nextElementSibling.children[0], {
      alpha: 1
    })
  
    accordions.forEach(a => {
      a.addEventListener('click', event => { changeAccordion(event, accordions) });
    })
  }
  // Single open accordions - click event
  function changeAccordion(event, accordions) {
    event.preventDefault();
  
    if (! event.target.classList.contains('active')) {
      accordions.forEach(a => {
        a.classList.remove('active');
  
        gsap.to(a.nextElementSibling, {
          height: 0,
          duration: 0.4,
          ease: "power1.inOut",
        })
      })
  
      event.target.classList.add('active');
      gsap.to(event.target.nextElementSibling, {
        height: 'auto',
        duration: 0.4,
        ease: "power1.inOut",
        // onComplete: () => {
        //   scroll.update()
        //   scroll.scrollTo(currentScroll)
        // }
      })      
    }
  }


  // *************************
  // Footer Form - Hubspot
  // *************************

  // Hubspot Submit - footer
  function footerHubspotFakeOut() {

  // Hidden hubspot form
   let hubspot = {
     form: document.querySelector('.hbspt-form'),
     iframe: document.querySelector('.hbspt-form iframe'),
   }
   hubspot.email = hubspot.iframe.contentWindow.document.querySelector('input[type="email"]')
   hubspot.submit = hubspot.iframe.contentWindow.document.querySelector('input[type="submit"]')
   hubspot.innerForm = hubspot.iframe.contentWindow.document.querySelector('form')
   hubspot.innerFormWrapper = hubspot.iframe.contentWindow.document.querySelector('.hbspt-form')

   // Visible footer form
   let visibleForm = {
     form: document.querySelector('#footer-form'),
     formInner: document.querySelector('#footer-form .form-inner'),
    //  messages: document.querySelector('#footer-form .form-response p'),
     email: document.querySelector('#footer-form input[type="email"]'),
     submit: document.querySelector('#footer-form input[type="submit"]'),
     success: document.querySelector('#footer-form .form-success'),
   }
   
   // Visible form keyup - make hubspot email value match
   visibleForm.email.addEventListener('keyup', event => {
     hubspot.email.setAttribute('value', event.target.value);
   })

   // VisibleForm submit - then submit hubspot form
   visibleForm.form.addEventListener('submit', event => {
    event.preventDefault();
    hubspot.innerFormWrapper.classList.add('is-submitting')
    appendProcessingMessage(visibleForm);
    
    setTimeout(() => {
      hubspot.submit.click();
    }, 1000)
  })


   // Mutation observer - target
  //  let targetNode = hubspot.innerForm;
   let targetNode = hubspot.form;
    
   // Mutation obbserver
   const config = { attributes: true, childList: true, subtree: true };
   const callback = function(mutationsList, observer) {
     mutationsList.forEach(mutation => {
      //  console.log(mutation)

      // Email error
      //  if (mutation.type == "childList" && mutation.target.classList.contains('hs_email')) {
      //     if (mutation.addedNodes.length > 0 && mutation.addedNodes[0].classList.contains('hs-error-msgs')) {
      //       visibleForm.messages.innerText = mutation.addedNodes[0].innerText;
      //     }
      //  }
      
      // On submit - wait until form is sent - show success
      if (mutation.target.nodeName == "IFRAME" && hubspot.innerFormWrapper.classList.contains('is-submitting')) {
        // hubspot.innerFormWrapper.children[0].classList.add('submitted-message');

        // Wait for form submit
        let waitForSumbit = setInterval(() => {

          // If submitted
          // if (hubspot.innerFormWrapper.children[0].classList.contains('submitted-message')) {

            // Success animation
            footerFormSuccess(visibleForm);

            // Clear interval
            clearInterval(waitForSumbit);
          // }
        }, 1000)
      }
     })
   }

   // Create an observer instance linked to the callback function
   let observer = new MutationObserver(callback);

   // Start observing the target node for configured mutations
   observer.observe(targetNode, config);
  }
  
  setTimeout(() => {
    footerHubspotFakeOut();
  }, 1200)
  
  // Footer form success animation
  function footerFormSuccess(formObj) {
    let form = formObj;
    let tl = gsap.timeline();

    console.log('footerFormSuccess', form)

    tl.to(form.formInner, {
      duration: 0.4,
      ease: "power.inOut",
      alpha: 0,
    })
    tl.to(form.formInner, {
      duration: 0.4,
      ease: "power.inOut",
      height: 0,
    }, '-=0.3')
    tl.to(form.success, {
      duration: 0.4,
      ease: "power.inOut",
      height: 'auto'
    }, '-=0.5')
    tl.to(form.success.children[0], {
      duration: 0.4,
      ease: "power.inOut",
      alpha: 1,
      onComplete: () => {
        scroll.update();
      }
    }, '-=0.2')
  }

  function appendProcessingMessage(visibleForm) {
    let formEl = visibleForm;

    let para = document.createElement('p');
    para.textContent = "Processing...";
    formEl.formInner.append(para);
  }

// Safari adjustment
if (window.navigator.userAgent.toLowerCase().indexOf('iphone') > -1) {
  let cart = document.querySelector('#cart-dd');
  cart.classList.add('safari-adjust');
}


// *********************
// Full Width Slider
// *********************
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
      edgeResistance: 0,
      dragResistance: 0,
      zIndexBoost: false,
      zIndex: 1000,
      bounds: {
        minX: 0, 
        maxX: -this.wrapWidth + (this.slideWidth), 
        minY: 0, 
        maxY: 0
      },
      onDrag: updateProgress,
      onThrowUpdate: updateProgress,
      onMove: function(e) {
        // Stops drag - left and right ends
        if (this.x >= 0 || this.x <= this.vars.bounds.maxX) {
          this.endDrag();
        }
      },
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

          // console.log(nextSlide)
          
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
  constructor({slider, rowId, counter, dots, toSlide, arrows}) {
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
    
    this.slidePositions;

    // Device - move slides Object
    this.toSlide = toSlide;

    // For counter - ?
    this.singleSlideBool = false;

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

    // Arrows
    this.arrows = arrows;
    this.arrowLinks;
    if (this.arrows) {
      this.arrowLinks = document.querySelectorAll('.arrows .arrow');
      this.arrowClick();
    }

    // Dots
    this.dotLinks;
    this.dots = dots;
    this.dotUl;
   
    if (! this.dots) {
      this.dots = false;
    }

    // Counter
    this.currentCount;
    this.totalCount;
    if (this.counter) {

      this.currentCount = document.querySelector(`#${this.rowId} .slider-count .current p`);
      this.totalCount = document.querySelector(`#${this.rowId} .slider-count .total p`);

      // If not just one slide
      if (this.slides.length != 1) {
        
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
        // this.slidePositions.push(this.slideWidth * index);
      }
    })

    // Start Counter
    if (this.counter) {
      this.setCounter();
    }
  }

  move() {
    // set width
    let wrapWidth = this.content.getBoundingClientRect().width;

    let slideWidth = this.slides[0].getBoundingClientRect().width;

    // Find draggable el
    let dragId = '#' + this.content.id;

    let rowId = '#' + this.rowId;

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
      minimumMovement: 1,
      edgeResistance: 0,
      dragResistance: 0,
      zIndexBoost: false,
      zIndex: 1000,
      bounds: {
        minX: 1, 
        maxX: -this.wrapWidth + (this.slideWidth), 
        minY: 0, 
        maxY: 0,
      },
      onDrag: updateProgress,
      onThrowUpdate: updateProgress,
      onMove: function(e) {
        // Stops drag - left and right ends
        if (this.x >= 0 || this.x <= this.vars.bounds.maxX) {
          this.endDrag();
        }
      },
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
            // if (nextCount <= 0) {
            //   this.currentCount.textContent = '01';  
            // } else if (nextCount != 0) {
            //   this.currentCount.textContent = '0' + (nextCount + 1);
            // }
            this.updateCounterCurrent();
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

          if (this.arrows) {
            this.changeArrowsClasses();
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
      this.changeDotsToActive();

      if (this.arrows) {
        this.changeArrowsClasses();
      }

      // Move the slider - via dots
      gsap.to(this.content, {
        duration: 0.4,
        ease: "power1.inOut",
        x: this.slidePositions[this.active],
        onComplete: () => {
          if (this.counter) {
            // Update counter
            this.updateCounterCurrent();
          }
        }
      })
    }

    // Dot click event
    dotLinks.forEach(a => {
      a.addEventListener('click', event => { this.changeSlides(event) });
    })
  }

  changeDotsToActive() {
    this.dotsList.forEach( (dot, index) => {
      dot.classList.remove('active');

      if (index == this.active) {
        dot.classList.add('active');
      }
    })
  }

  // Init counter
  setCounter() {
    let count = 0;

    // Per screen size - get total slides
    this.slides.forEach((slide, index) => {
      if (index % this.toSlide[this.screenSize].move == 0) {
        count++;
      }
    })

    // Set total count
    if (count < 10) {
      this.totalCount.textContent = '0' + count;
    } else if (count > 10) {
      this.totalCount.textContent = count;
    }
  }

  // Update counter - ot active count
  updateCounterCurrent() {
    if (this.active == 0) {
      this.currentCount.textContent = '01';
    }
    else if (this.active + 1 >= 10) {
      this.currentCount.textContent = (this.active + 1);
    }
    else if (this.active + 1 < 10) {
      this.currentCount.textContent = '0' + (this.active + 1);
    } 
  }

  arrowClick() {
    this.onArrowClick = (event) => {
      event.preventDefault();

      // let currentDirection;

      if (event.target.classList.contains('prev')) {
        // currentDirection = 'prev';
        this.active = this.active - 1;  
      }

      if (event.target.classList.contains('next')) {

        if (this.dots) {
          if (this.dotsList.length - 1 != this.active) {
            this.active = this.active + 1;
          }  
        } else {
          if (this.slidePositions.length - 1 != this.active) {
            this.active = this.active + 1;
          }  
        }
        
      }

      this.changeArrowsClasses();

      if (this.dots) {
        this.changeDotsToActive();
      }
      
      // Move the slider
      gsap.to(this.content, {
        duration: 0.4,
        ease: "power1.inOut",
        x: this.slidePositions[this.active],
        onComplete: () => {
          if (this.counter) {
            // Update counter
            this.updateCounterCurrent();
          }
        }
      })
    }

    this.arrowLinks.forEach(a => {
      a.addEventListener('click', (event) => {
        this.onArrowClick(event);
      })
    });
  }

  changeArrowsClasses() {
    // Prev arrow - disabled on/off
    if (this.active == 0) {
      this.arrowLinks[0].classList.add('disabled');
    } else {
      this.arrowLinks[0].classList.remove('disabled');
    }

    // If dots - or use slide positions (this.slider)
    if (this.dots) {
      // Make next not disabled
      if (this.dotsList.length - 1 != this.active) {
        this.arrowLinks[1].classList.remove('disabled');
      } 

      // Disabled Next
      if (this.dotsList.length - 1 == this.active) {
        this.arrowLinks[1].classList.add('disabled');
      }
    } else {
      if (this.slidePositions.length - 1 != this.active) {
        this.arrowLinks[1].classList.remove('disabled');
      } 

      // Disabled Next
      if (this.slidePositions.length - 1 == this.active) {
        this.arrowLinks[1].classList.add('disabled');
      }
    }
    
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
      
      // Re find values
      this.slideWidth = this.slides[0].getBoundingClientRect().width;
      this.wrapWidth = this.content.getBoundingClientRect().width;
      this.init(event);

      // Keep slider at current slide
      gsap.to(this.content, {x: this.slidePositions[this.active] + 'px' })
    }
  }
}

  // Index
  if (document.body.classList.contains('index')) {

    // Home Slider
    let sliderOne = new FullWidthSlider({
      slider: document.querySelector('#full-width-slider-row-home'),
      rowId: 'full-width-slider-row-home',
      counter: false,
      dots: true,
    });

    if (document.querySelector('#home-product-collection-slider') != null) {
      // Product Slider One
      let sliderFeatured = new MultiItemSlider({
        slider: document.querySelector('#product-slider-featured-one'),
        rowId: 'home-product-collection-slider',
        counter: true,
        dots: true,
        arrows: true,
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
    }
 }


  // Faq page
  if (document.body.classList.contains('page-faq')) {
    generalAccordion();
  }

 // Products
 if (document.body.classList.contains('product')) {

  // Material and care 
  tooltips();
 }

 if (document.body.classList.contains('product-kit')) {
  if (document.querySelector('.accordion-list') != null) {
    // generalAccordion();
    productAccordions();
  }
 }

 if (document.body.classList.contains('product') || document.body.classList.contains('product-kit')) {
  let productJS = new GeneralProduct();
  console.log(productJS)

    // Mobile Product Slider
    if (document.querySelector('.mobile-image-slider #product-slider-one') != null) {
      let productSliderOne = new FullWidthSlider({
        slider: document.querySelector('#product-slider-one'),
        rowId: 'product-section-top',
        counter: true,
        dots: false,
      });
    }

    if (document.querySelector('#product-collection-slider') != null) {
      // Related Slider
      let sliderOne = new MultiItemSlider({
        slider: document.querySelector('#product-slider-related-one'),
        rowId: 'product-collection-slider',
        counter: true,
        dots: true,
        arrows: true,
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
    }

  }

  if (document.body.classList.contains('cart')) {
    // Product Slider One
    let sliderFeatured = new MultiItemSlider({
      slider: document.querySelector('#cart-slider'),
      rowId: 'main-cart-section',
      counter: true,
      dots: false,
      arrows: true,
      toSlide: {
        desktop: {
          width: 769,
          move: 1,
        },
        tablet: {
          width: 768,
          move: 1,
        },
        mobile: {
          width: 576,
          move: 1,
        }
      }
    });

    console.log(sliderFeatured)
    setTimeout(() => {
      scroll.update()
    }, 200)

    if (document.querySelector('.slider-one') != null) {
      // quickAddFromMultiItemSlider();
      MultiItemSlider.quickAddFromMultiItemSlider = () => {
        let quickAddButtons = document.querySelectorAll('.slider-one a.quick-add');

        console.log(quickAddButtons)

        quickAddButtons.forEach(button => {
          button.addEventListener('click', event => { quickAddToCart(event) })
        })
      }

      // console.log()
      MultiItemSlider.quickAddFromMultiItemSlider();
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

// AJAX CART REQUEST
jQuery(document).on('cart.requestComplete', function(event, cart) {
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

  jQuery('#cartCount').html(cart.item_count);
    console.log('cart', cart['item_count']);

    if (cart['item_count'] > 0) {

      $('.cart-count').removeClass('empty');
      $('.cart-count').text(cart.item_count);

      $('.cart-dd').addClass('active');
      $('.col-form').removeClass('hidden');
      $('.col-empty').addClass('hidden');
      $('.cart-dd').removeClass('empty');
    }else{
      $('.cart-count').addClass('empty');
      $('.cart-count').text(cart.item_count);

      $('.col-form').addClass('hidden');
      $('.col-empty').removeClass('hidden');
      $('.cart-dd').addClass('empty');
    }
  // });

  console.log(cart)
});


// When cart is ready 
jQuery(document).on('cart.ready', function(event, cart) {
  // console.log('ready',cart, cart.item_count, typeof cart.item_count, cart['item_count'])
  
  let navBasket = document.querySelectorAll('.main-header .js_cart .cart-count');

  // hide or show cart count
  navBasket.forEach(basket => {
    if (cart.item_count > 0) {
      basket.classList.remove('empty');
      basket.textContent = cart.item_count;
    }
    else if (cart.item_count == 0) {
      basket.classList.add('empty');
      basket.textContent = cart.item_count;
    }
  })
  
  
  if (document.body.classList.contains('cart')) {
    console.log(CartJS.cart)
  }    
});

// *********************
// Quick Add to Cart
// *********************
function quickAddToCart(event) {
  event.preventDefault();

  let masterSelect = event.target.parentElement.parentElement.querySelector('#masterSelect');
  let options = Array.from(masterSelect.children);
  let quantity = 1;
  let productId, color, size, sellingPlan, firstAvaliableOption;
  let optionIndex;


  // Find first non disabled select option
  for (let a = 0; a < options.length; a++) {
    if (! options[a].hasAttribute('disabled')) {
      optionIndex = a;
      break;
    }
  }

  // Get that option
  firstAvaliableOption = options[optionIndex];
  
  // Product ID
  productId = firstAvaliableOption.value;

  // Color - Variant One
  if (firstAvaliableOption.hasAttribute('data-variant-one-name')) {
    if (firstAvaliableOption.dataset.variantOneName.toLowerCase() == 'color') {
      color = firstAvaliableOption.dataset.variantOne;
    } else {
      color = '';  
    }
  } else {
    color = '';
  }

  // Size - Variant Two
  if (firstAvaliableOption.hasAttribute('data-variant-two-name')) {
    if (firstAvaliableOption.dataset.variantTwoName.toLowerCase() == 'size') {
      size = firstAvaliableOption.dataset.variantTwo;
    } else {
      size = '';  
    }
  } else {
    size = '';
  }
  
  // Selling Plan
  if (firstAvaliableOption.hasAttribute('data-selling-plan-0')) {
    sellingPlan = firstAvaliableOption.dataset['sellingPlan-0'];
  } else {
    sellingPlan = '';
  }

  // console.log('===========')
  // console.log('final pId', productId)
  // console.log('final q', quantity)
  // console.log('final s', size)
  // console.log('final c', color)
  // console.log('final sp', sellingPlan)
  // console.log('===========')

  // Add to cart
  if (sellingPlan != '') {
    CartJS.addItem(productId, quantity, {
      "size": size,
      "color": color,
      "selling_plan": sellingPlan
    }, { })
  } 
  else if (sellingPlan == ''){
    CartJS.addItem(productId, quantity, {
      "size": size,
      "color": color
    }, { })
  }
}

// *********************
// PRODUCT JS
// *********************
class GeneralProduct {
  constructor() {
    
    this.size;
    this.isNumberSizing;
    if (document.querySelector('#productSize') != null) {
      this.size = document.querySelector('#productSize');
      
      this.isNumberSizing = this.checkIfSizeIsInteger();
      console.log('isNumberSizing',this.isNumberSizing )

      this.changeSize();
    } else {
      this.size = null;
      this.isNumberSizing == false;
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
    this.buttons = document.querySelectorAll('.product-section-one form .regular-button');

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

      this.buttonsSoldOut(this.buttons);
    }

    this.setVariantSizeOutOfStock();
  }

  // Disabled out of stock sizes
  setVariantSizeOutOfStock() {

    // If size variant
    if (this.size != null) {

      // let isNumberSizing = this.checkIfSizeIsInteger();
      // console.log('isNumberSizing',isNumberSizing )

      // Go through master select
      this.master.children.forEach( option => {
        // Get sizes
        let sizes = Array.from(this.size.children);

        // If not instock and current color
        if (option.dataset.inventory == 0 && option.dataset.variantOne == this.currentSwatch) {
          
          // Find matching sizes and disable
          sizes.forEach(size => {
            if (size.value == option.dataset.variantTwo) {
              size.setAttribute('disabled', 'disabled');
            } 
          })
        }

        if (this.size.children[this.size.selectedIndex].hasAttribute('disabled')) {
          this.buttonsSoldOut(this.buttons)
        } else if (! this.size.children[this.size.selectedIndex].hasAttribute('disabled')) {
          this.buttonsAddToCart(this.buttons)
        }
      })

      if (this.isNumberSizing == true) {
        this.varyingSizesPerSwatch();
      //   console.log('varyingSizesPerSwatch')
      }
    } 
    // No size variant
    else {
      this.setVariantQuantityOutOfStock();

      if (! this.master.children[this.master.selectedIndex].hasAttribute('disabled')) {
        this.buttonsAddToCart(this.buttons)
        this.setVariantQuantityOutOfStock();
      }

    }

    // if (this.size != null && this.isNumberSizing == true) {
    //   this.varyingSizesPerSwatch();
    // //   console.log('varyingSizesPerSwatch')
    // }
  }

  // Changes quantity of current - color and size
  setVariantQuantityOutOfStock(currentSize) {
    let currentInventory = 0;

    if (this.size != null) {
      if (currentSize != '') {
        currentSize = this.size.value;
      }
    }
    
    
    // Go through master select
    this.master.children.forEach( option => {
      
      if (this.size != null) {
        // Find current size and color - get inventory
        if (option.dataset.variantTwo === currentSize && option.dataset.variantOne === this.currentSwatch) {
          currentInventory = Number(option.dataset.inventory);
        }
      }

      // If just color
      if (this.size == null && this.currentSwatch != undefined) {
        if (option.dataset.variantOne === this.currentSwatch) {
          currentInventory = Number(option.dataset.inventory);
        }
      }

      // If just quantity
      if (this.size == null && this.currentSwatch == null) {
        currentInventory = Number(option.dataset.inventory);
      }
    }) 

    // Disabled quantity options if less then inventory
    this.quantity.children.forEach(num => {
      if (Number(num.value) > currentInventory) {
        num.setAttribute('disabled', 'disabled');
      } 
      else {
        num.removeAttribute('disabled');
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

          this.resetSizeSelect();

          this.setVariantQuantityOutOfStock();


          // let optionValue = this.size.value + ' / ' + this.currentSwatch;
          // this.changeMasterSelect(optionValue);
          // this.changeMasterSelectValue(optionValue);

          // Update Master Select
          this.changeMasterSelectValue();

          this.setVariantSizeOutOfStock();
          
          if (this.isNumberSizing == true) {
            this.varyingSizesPerSwatch();
          }
          
        } else if (this.size == null){

          // Change master select color
          this.master.children.forEach((option, index) => {
            if (option.dataset.option == this.currentSwatch) {
              this.master.selectedIndex = index;
            }
          })

          this.setVariantSizeOutOfStock()
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
      
      if (this.isNumberSizing == true) {
        this.buttonsAddToCart(this.buttons);
      }

      if (this.currentSwatch != null) {
        this.setVariantQuantityOutOfStock(currentSize);

        // Update Master Select
        this.changeMasterSelectValue();
      }
      
      // this.buttonsAddToCart(this.buttons);
      if (this.isNumberSizing == false) {
        this.buttonsAddToCart(this.buttons);
      }
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
      if (option.dataset.option == this.currentSwatch + ' / ' + this.size.value) {
        this.master.selectedIndex = index;
      }
    })

    if (this.isNumberSizing == true) {
      setTimeout(() => {
        if (this.size.children[this.size.selectedIndex].hasAttribute('disabled')) {
          this.buttonsSoldOut(this.buttons)
        }
      }, 100)
    }
    
  }

  // Checks if size is an integer
  checkIfSizeIsInteger() {
    let x = parseFloat(this.size.children[0].value);

    if (isNaN(x)) {
      return false;
    } else {
      return true;
    }
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

  // If product has different sizes for different colors
  varyingSizesPerSwatch() {
    let currentSizes = new Array();
    let sizing = new Array();
    let sizingPosition = new Array();

    let sizingStock = new Array();
    let sizingStockPosition = new Array();

    this.master.children.forEach( (option, index) => {
      // Get avaliable Sizes - per color
      if (option.dataset.variantOne === this.currentSwatch) {
        currentSizes.push(option.dataset.variantTwo);

        // Find out of stock elemens
        if (option.dataset.inventory == 0) {
          sizingStock.push(option.dataset.variantTwo);
        }
      } 
    })

    // Disable and gather all sizes for product
    this.size.children.forEach((option, index) => {
      sizing.push(option.value);
      option.setAttribute('disabled', 'disabled')
    })

    // Find the index of the current color sizes
    currentSizes.forEach(s => {
      let temp = sizing.findIndex(el => el === s);
      sizingPosition.push(temp);
    })

    // Finds maxching index if out of stock
    sizingStock.forEach(s => {
      let temp = sizing.findIndex(el => el === s);
      sizingStockPosition.push(temp);
    })

    // Make the avaliable sizes clickable
    sizingPosition.forEach(pos => {
      this.size.children[pos].removeAttribute('disabled')
    })

    // Disabled out of stock items
    sizingStockPosition.forEach(pos => {
      this.size.children[pos].setAttribute('disabled', 'disabled')
    })
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
            CartJS.addItem(id, quantity, {
              "size": size,
              "color": color,
              "selling_plan": sellingPlan
            }, { })
          } 
          else if (sellingPlan == null){
            CartJS.addItem(id, quantity, {
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

// Show and hide tool tips
function tooltips() {
  if (document.querySelector('#product-material-and-care') != null) {
    let list = document.querySelectorAll('#product-material-and-care .care-icons .tooltip-icon');
    let listText = document.querySelectorAll('#product-material-and-care .care-icons .tooltip-text');

    list.forEach(li => {

      // Desktop mouse enter and leave
      if (window.innerWidth > 1024) {
        li.addEventListener('mouseenter', event => {
          event.target.nextElementSibling.classList.add('active')
        })

        li.addEventListener('mouseleave', event => {
          event.target.nextElementSibling.classList.remove('active')
        })
      }

      // Add and remove active - for mobile sizes (less than 1024px)
      li.addEventListener('click', event => {
        if ( ! event.target.nextElementSibling.classList.contains('active')) {

          // Remove sibling active class
          listText.forEach(list => { list.classList.remove('active') });
          event.target.nextElementSibling.classList.add('active')
        } 
        else if (event.target.nextElementSibling.classList.contains('active')) {
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


