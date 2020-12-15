$(document).ready(function () {

  // setTimeout(function(){
  //   var thumbHeight = $('.md-up .product-single__image').outerHeight();
  //   console.log(thumbHeight);
  //   $('.thumbs-wrapper').css('max-height', thumbHeight);
  // }, 500);

  $('.swatch-element label').click(function () {
    $('.swatch-color input').prop('checked', false);
    $(this).prev().prop('checked', true);
  });

  function ajaxCartPDP(qty, id) {
    //console.log(qty);
    //console.log(id);

    CartJS.addItem(id, qty, {}, {

      // Define a success callback to display a success message.
      "success": function (data, textStatus, jqXHR) {
        //console.log('SUCCESSSSS');
        jQuery('.added-cart').show(1000);
        setTimeout(function () {
          $('.added-cart').hide(1000);
        }, 1000)
      },

      // Define an error callback to display an error message.
      "error": function (jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseJSON.description);
        //console.log('FAILED');
      }

    });
  }

  function productContainer(container) {
    //console.log(container);
    var color = container.find('.swatch-color input:checked').val();
    console.log(color);
    var size = container.find('.select-Size').val();
    console.log(size);
    var qty = container.find('.select-qty').val().toString();
    console.log(qty);
    var option = container.find('.selected-option option');
    var productId;

    if (color && size) {
      console.log('color and size');
      color = color.toString();
      size = size.toString();

      for (var i = 0; i < option.length; i++) {
        var attrOption = $(option[i]).attr('option').split(' / ');
        if ((attrOption[0].toString() == color && attrOption[1].toString() == size) || (attrOption[0].toString() == size && attrOption[1].toString() == color)) {
          productId = $(option[i]).val();
          console.log(productId);
          ajaxCartPDP(qty, productId);
          break;
        }
      }
    } else if (color) {
      console.log('color only')
      color = color.toString();
      for (var i = 0; i < option.length; i++) {
        var attrOption = $(option[i]).attr('option').split(' / ');
        if ((attrOption[0].toString() == color)) {
          productId = $(option[i]).val();
          ajaxCartPDP(qty, productId);
          break;
        }
      }
    } else if (size) {
      console.log('size only')
      size = size.toString();
      for (var i = 0; i < option.length; i++) {
        var attrOption = $(option[i]).attr('option').split(' / ');
        if ((attrOption[1].toString() == size)) {
          productId = $(option[i]).val();
          ajaxCartPDP(qty, productId);
          break;
        }
      }
    } else {
      //console.log('else');
      productId = option.val();
      ajaxCartPDP(qty, productId);
    }
  }
  $('body.product button.submit').click(function (e) {
    console.log('clicked desktop button');
    e.preventDefault();
    e.stopPropagation();
    var productWrapper = $('.product-form');
    productContainer(productWrapper);
  });

  function updated_text(item, change_value) {
    item.innerHTML = change_value;
  }

  function change_product_template_color_text() {
    let colors = document.querySelectorAll('body.product .swatch-color input');
    let colors_text = document.querySelectorAll('body.product .swatch-color .header .current-color');
    let current_color;
  
    for (let a = 0 ; a < colors.length; a++) {
      colors[a].addEventListener('click', function() {
        current_color = colors[a].getAttribute('value');
        
        for (let b = 0; b < colors_text.length; b++) {
          updated_text(colors_text[b], current_color);
        }
      });
    }
  }change_product_template_color_text();

});