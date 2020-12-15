window.addEventListener("load", function(){
  // SMOOTH SCROLL
  let scroll;

  setTimeout(function(){
    scroll = new LocomotiveScroll({
      el: document.querySelector('[data-scroll-container]'),
      smooth: true,
    });

    scroll.on('scroll', () => {
      const siteHeader = document.querySelector("#shopify-section-header");
      const wrapper = document.querySelector("main");
      
      if (wrapper.getBoundingClientRect().top < -100){
        siteHeader.classList.add('sticked');
      }
      else {
        siteHeader.classList.remove('sticked');
        
        // Anouncement Bar - add background to header
        if (siteHeader.classList.contains('sticked')) {
          siteHeader.classList.remove('sticked-announcement');
        }
      }
    });
  }, 100);

  if (document.querySelector('body').classList.contains('index')) {
    // HOME SLIDERs
    if (document.querySelector('.splide-1')) {
      new Splide( '.splide-1', {
        type   : 'loop',
        perPage: 4,
        perMove: 4,
        gap: 20,
        speed: 800,
        easing: 'cubic-bezier(0.255, 0.195, 0.135, 0.99)',
        //arrows: false,
        pagination: false,
        breakpoints: {
          640: {
            perPage: 1,
            perMove: 1,
          },
        }
      } ).mount();
    }

    if (document.querySelector('.splide-2')) {
      new Splide( '.splide-2', {
        type   : 'loop',
        perPage: 4,
        perMove: 4,
        gap: 20,
        speed: 800,
        easing: 'cubic-bezier(0.255, 0.195, 0.135, 0.99)',
        //arrows: false,
        pagination: false,
        breakpoints: {
          640: {
            perPage: 1,
            perMove: 1,
          },
        }
      } ).mount();
    }

    if (document.querySelector('.splide-3')) {
      new Splide( '.splide-3', {
        type   : 'loop',
        perPage: 3,
        perMove: 3,
        gap: 20,
        speed: 800,
        easing: 'cubic-bezier(0.255, 0.195, 0.135, 0.99)',
        //arrows: false,
        pagination: false,
        breakpoints: {
          640: {
            perPage: 1,
            perMove: 1,
          },
        }
      } ).mount();
    }

    const slideButtons = document.querySelectorAll('.slide-control .button-arrow');
    slideButtons.forEach(item => {
      item.addEventListener('click', event => {
        event.preventDefault();
        
        if (item.classList.contains('prev')) {
          item.closest('.product-slider').querySelector('.splide__arrow--prev').click();
        }else {
          item.closest('.product-slider').querySelector('.splide__arrow--next').click();
        }
        
      })
    });
  }

  if (document.querySelector('body').classList.contains('collection')) {
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

    document.addEventListener("click", event => {

      let el = document.querySelector('.load-more');
      if (el && el.contains(event.target)) {
        event.preventDefault();
        event.stopPropagation();
        loadProducts();
      }
    });
  }


  // AJAX CART REQUEST
  $(document).on('cart.requestComplete', function(event, cart) {
    $('#cartCount').html(cart.item_count);
    if (cart['item_count'] > 0) {
      $('.cart-dd').addClass('active');
      $('.col-form').removeClass('hidden');
      $('.col-empty').addClass('hidden');
      $('.cart-dd').removeClass('empty');
    }else{
      $('.col-form').addClass('hidden');
      $('.col-empty').removeClass('hidden');
      $('.cart-dd').addClass('empty');
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
  const search = document.querySelector('.js_search');
  const inputCheck = document.querySelector('.search-form__input');
  const submitCheck = document.querySelector('.search-form__submit');
  const bodyTag = document.querySelector('body');

  document.onclick = function(event) {
    //console.log(clickCounter);
    let isClickOnIcon = search.contains(event.target);
    let isClickOnInput = inputCheck.contains(event.target);
    let isClickOnSubmit = submitCheck.contains(event.target);

    if (isClickOnIcon || isClickOnInput || isClickOnSubmit ) {
      search.classList.add('active');
      bodyTag.classList.add('active-search');
    }else{
      search.classList.remove('active');
      bodyTag.classList.remove('active-search');
    }
  };

  // ACCORDION
  const accordion = {
    el: $('.js-accordion li'),
    config: {
      speed: 300,
      class: 'active'
    },
    init: function() {
      accordion.el.click(accordion.condition);
    },
    condition: function() {
      accordion.$this = $(this);
      if (accordion.$this.hasClass(accordion.config.class)) {
        accordion.caseOne();
      }else{
        accordion.caseTwo();
      }
    },
    caseOne: function() {
      accordion.$this.removeClass(accordion.config.class);
      accordion.$this.find('.bottom').slideUp(accordion.config.speed);
    },
    caseTwo: function() {
      accordion.$this.siblings().removeClass(accordion.config.class);
      accordion.$this.siblings().find('.bottom').slideUp(accordion.config.speed);
      accordion.$this.addClass(accordion.config.class);
      accordion.$this.find('.bottom').slideDown(accordion.config.speed);
    }
  };
  accordion.init();

  // MENU OPEN
  document.querySelector('.js-menu').onclick = function() {
    this.classList.toggle('is-active');
    document.querySelector('body').classList.toggle('menu-open');
  }
  
  function announcementBar() {
//     if (window.history.length <= 2 && document.querySelector('.announcement-bar') != null) {
      		let announcementBar = document.querySelector('.announcement-bar');
    		let header = document.querySelector('#shopify-section-header');
    	    let main = document.querySelector('main');
          
          startAnnouncementBar(announcementBar, header, main)
    
       	let close = document.querySelector('.announcement-bar .close-announcement-bar');
        close.addEventListener('click', (event) => {
			event.preventDefault();
          	announcementBar.classList.remove('active');
          	header.setAttribute('style','');
	        header.classList.remove('sticked-announcement');
          	main.setAttribute('style','');
       });
  }

  function startAnnouncementBar(announcementBar, header, main) {
      announcementBar.classList.add('active');
      header.style.transform = `translateY(${announcementBar.getBoundingClientRect().height}px)`;
      header.classList.add('sticked-announcement');

      if (window.innerWidth < 769) {
        main.style.transform = `translateY(${announcementBar.getBoundingClientRect().height}px)`;
      }

  }
  
    if (document.querySelector('.announcement-bar') != null || document.querySelector('.announcement-bar') != undefined) {
      announcementBar();
    }
});

window.addEventListener('resize', (event) => {
  console.log(event)
  let announcementBar = document.querySelector('.announcement-bar');
  let header = document.querySelector('#shopify-section-header');
  let main = document.querySelector('main');
  
  if (window.innerWidth != window.innerWidth) {
    header.style.transform = `translateY(${announcementBar.getBoundingClientRect().height}px)`;
    if (window.innerWidth < 769) {
      main.style.transform = `translateY(${announcementBar.getBoundingClientRect().height}px)`;
    }
  }
});
