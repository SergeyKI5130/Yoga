$(document).ready(function(){

    
    ////SKROL_%_////////
    window.onscroll = function() {myFunction()};
    function myFunction() {
        var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrolled = (winScroll / height) * 100;
        document.getElementById("myBar").style.width = scrolled + "%";
    }
    /////HAMBURGER/////
    const hamburger = document.querySelector('.hamburger'),
      menu = document.querySelector('.menu'),
      closeElem = document.querySelector('.menu__close');

    hamburger.addEventListener('click', () => {
        menu.classList.add('active');
    });

    closeElem.addEventListener('click', () => {
        menu.classList.remove('active');
    });

  ////////////// slick-slider/////////////////
    $('.travel').slick({
        dots:true,
        slidesToShow:1,
        slidesToScroll:1,
        speed:300,
        rows:1,
        arrows:false
    });

    $('.program__slider').slick({
        dots:true,
        slidesToShow:1,
        slidesToScroll:1,
        speed:300,
        rows:1,
        arrows:false
    });
  
  $('.instructor__carusel').slick({
    dots: true,
    // infinite: true,
    speed: 300,
    slidesToShow: 1,
    arrows: false,
    adaptiveHeight: true
    
  });

  $('.review__carusel').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true,
    prevArrow: '<button type="button" class="slick-prev"> <img src="img/review/1.svg"> </button>',
    nextArrow: '<button type="button" class="slick-next"> <img src="img/review/2.svg"> </button>',
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                arrows:false
            }
        }
    ]

  });

 ////__SPOLR__///

  $('.contacts__mapDESCR').click(function(event) {
      if($('.contacts').hasClass('one')){
          $('.contacts__mapDESCR').not($(this)).removeClass('active');
          $('.contacts__spoil').not($(this).next()).slideUp(300);
      }

    $(this).toggleClass('active').next().slideToggle(300);
  });



  // Modal
  
  $('[data-modal=consultation]').on('click', function() {
      $('.overlay, #consultation').fadeIn('slow');
  });
  
  $('[data-modal=schedule]').on('click', function() {
    $('.overlay, #order').fadeIn('slow');
  });

  $('[data-modal=econom]').on('click', function() {
    $('.overlay, #orderECONOM').fadeIn('slow');
  });
  
  $('.modal__close').on('click', function() {
      $('.overlay, #consultation, #thanks, #order, #orderECONOM').fadeOut('slow');
  });


  $('[data-modal=schedule]').each(function(i) {
      $(this).on('click', function() {
          $('#order .modal__descr').text($('.schedule__name').eq(i).text());
          $('.overlay, #order').fadeIn('slow');
      })
  });

  function validateForms(form){
      $(form).validate({
          rules: {
              name: {
                  required: true,
                  minlength: 2
              },
              phone: "required",
              email: {
                  required: true,
                  email: true
              }
          },
          messages: {
              name: {
                  required: "Пожалуйста, введите свое имя",
                  minlength: jQuery.validator.format("Введите {0} символа!")
              },
              phone: "Пожалуйста, введите свой номер телефона",
              email: {
                required: "Пожалуйста, введите свою почту",
                email: "Неправильно введен адрес почты"
              }
          }
      });
  };

  validateForms('#consultation');
  validateForms('#order');
  validateForms('#orderECONOM');
  
  

  $('input[name=phone]').mask("+7 (999) 999-99-99");

  $('form').submit(function(e) {
      e.preventDefault();
      $.ajax({
          type: "POST",
          url: "mailer/smart.php",
          data: $(this).serialize()
      }).done(function () {
          $(this).find("input").val("");
          $('#consultation, #order, #orderECONOM').fadeOut();
          $('.overlay, #thanks').fadeIn('slow');
          $('form').trigger('reset');
      });
      return false;
  });

  //smooth scroll

  $("a[href^='#']").click(function(){
      const _href = $(this).attr("href");
      $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
      return false;
  });  

});

