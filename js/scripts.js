// Owl Carousel
$(document).ready(function() {

  // init
  var $carousel = $(".owl-carousel");
  $carousel.owlCarousel({
    items: 1,
    autoWidth: true,
    nav: false,
    dots: true,
    dotsEach: 1,
    smartSpeed: 500
  });

  // next on vote button
  $('.owl-carousel .card__answer .button').click(function() {
    setTimeout(function() { $carousel.trigger('next.owl.carousel') }, 2000);
  });
});





/* Adapted from http://thecodeplayer.com/walkthrough/ripple-click-effect-google-material-design */ 
$(document).ready(function() {
  // "use strict";

  const links = document.querySelectorAll(".button");

  function animate (e) {

    const parent = this;
    const card = this.closest('.card');

    if (this.querySelectorAll(".ink").length === 0) {
      const span = document.createElement("span");
      span.classList.add("ink");
      parent.insertBefore(span, this.firstChild);
    }

    const ink = this.querySelectorAll(".ink")[0];

    ink.classList.remove("animate");

    if (!ink.offsetHeight && !ink.offsetWidth) {
      const d = Math.max(parent.offsetHeight, parent.offsetWidth);
      ink.style.height = `${d}px`;
      ink.style.width = `${d}px`;
    }

    const rect = parent.getBoundingClientRect();

    const offset = {
      top: rect.top + document.documentElement.scrollTop,
      left: rect.left + document.documentElement.scrollLeft
    }

    const x = e.pageX - offset.left - ink.offsetWidth / 2;
    const y = e.pageY - offset.top - ink.offsetHeight / 2;

    ink.style.top = `${y}px`;
    ink.style.left = `${x}px`;
    ink.classList.add("animate");

    // add selecting/answering logic for answer buttons
    if(this.classList.contains('button--answer')) {
      const buttons = card.querySelectorAll(".button");

      buttons.forEach(link => link.classList.remove("isSelected"));

      this.classList.toggle("isSelected");

      if(!card.classList.contains('card--countdown')) {
        card.classList.add("isAnswered");
      }
    }
  }

  links.forEach(link => link.addEventListener("click", animate));

});



// Multipunch interaction
$(document).ready(function() {
  $('.button--multipunch').click(function() {

    $(this).toggleClass('isSelected');

    $card = $(this).closest('.card');
    $max_answers = ($card.attr('data-max-answers') && $card.attr('data-max-answers').length > 0) ? parseInt($card.attr('data-max-answers')) : 100;
    $countSelected = $card.find('.button--multipunch.isSelected').length;

    switch($countSelected) {
      case 1:
        $card.find('.multipunch-info').html('Select up to 2 more answers');
        break;
      case 2:
        $card.find('.multipunch-info').html('Select up to 1 more answer');
        break;
      case 3:
      case 4:
        $card.find('.multipunch-info').html('Maximum answers selected');
        break;
      default:
        $card.find('.multipunch-info').html('Select up to 3 answers');
    }
    console.log($countSelected);

    if($countSelected > 0) {
      $card.find('.button.button--answer').removeClass('isDisabled');
    } else {
      $card.find('.button.button--answer').addClass('isDisabled');
    }

    if($countSelected > $max_answers) {
      $(this).removeClass('isSelected');
    }
    
  });
});



// init Timer
$(document).ready(function() {

  $('.card__timer').addClass('isRunning');


  // start timer counter
  var seconds = 5;
  var cardTimer = setInterval(function () {

    $('.card__timer .card__timer--label').html('0:0' + seconds);
    seconds--;
    if (seconds === -1) {
      window.clearInterval(cardTimer);
      $('.card__timer').addClass('isFinished');
    }
  }, 1000);

});



// Prevent any click
$(document).ready(function() {
  $('a[href="#"]').click(function(e) {
    e.preventDefault();
  });
});





// Link Icon Click
$(document).ready(function() {
  $('.link--icon').click(function() {

    $(this).toggleClass('isActive');

    if($(this).hasClass('isActive')) {
      var src = $(this).find('img').attr('src').replace('_outline.svg', '.svg');
      $(this).find('img').attr('src', src);
    } else {
      var src = $(this).find('img').attr('src').replace('.svg', '_outline.svg');
      $(this).find('img').attr('src', src);
    }
  });
});






// Dropdown Click
$(document).ready(function() {
  $('.hasDropdown a').click(function() {
    $wrapper = $(this).closest('.hasDropdown');

    $wrapper.toggleClass('isActive');
    // Add
    if($wrapper.hasClass('isActive')) {
      $wrapper.find('input, textarea').first().focus();
    }
  });
});





// Question Toggle
$(document).ready(function() {
  $('.card__question--toggle').click(function() {

    $q = $(this).closest('.card__question');

    if ($q.hasClass('isExpanded')) {
      $q.removeAttr('style');
      $q.removeClass('isExpanded');
    } else {
      $q.attr('style', 'transition-delay: 0s;');
      $q.addClass('isExpanded');
    }
  });
});





// Notify answer toggle
function toggleNotify($clicked) {
  $container = $clicked.closest('.hasDropdown');
  $container.removeClass('isActive');
  $container.find('.link--icon').removeClass('isActive');
}




// Lead Response Overlay interaction
$(document).ready(function() {
  $('.card--hasLead .button--answer').click(function() {
    $card = $(this).closest('.card');
    setTimeout(function() {
      $card.addClass('card--leadActive');
    }, 1800);
  });
  $('.card--hasLead .card__overlay--close').click(function() {
    $card = $(this).closest('.card');
    $card.removeClass('card--leadActive');
  });
});



// Lead Gen Modal scroll trigger
$(document).ready(function() {
  $('.card__overlay').each(function() {
    leadGenScroll($(this));
  });  
  $('.card__overlay').scroll(function() {
    leadGenScroll($(this));
  });
});
function leadGenScroll($overlay) {
  $header = $overlay.find('.card__overlay--header');
  $footer = $overlay.find('.card__overlay--footer');
  scroll = $overlay.scrollTop();
  contentHeight = $overlay[0].scrollHeight;
  if(scroll < 48) {
    value = scroll/48 * 0.2;
    $header.css('box-shadow', '0px 4px 16px rgba(20, 36, 51, ' + value + ')');
  } else {
    $header.css('box-shadow', '0px 4px 16px rgba(20, 36, 51, 0.2)');
  }
  if((scroll + $overlay.outerHeight()) > (contentHeight - 48)) {
    value = (contentHeight - scroll - $overlay.outerHeight())/48 * 0.2;
    $footer.css('box-shadow', '0px -4px 16px rgba(20, 36, 51, ' + value + ')');
  } else {
    $footer.css('box-shadow', '0px -4px 16px rgba(20, 36, 51, 0.2)');
  }
  if((scroll + $overlay.outerHeight()) > (contentHeight - 16)) {
    $footer.find('.button--primary').removeClass('isDisabled');
    $footer.find('.button .hint').hide();
    $footer.find('.button .action').show();
  } else {
    $footer.find('.button--primary').addClass('isDisabled');
    $footer.find('.button .hint').show();
    $footer.find('.button .action').hide();
  }
}




// Open answer: Enable submit button
$(document).ready(function() {
  $('.card__answer--open input, .card__answer--open textarea').each(function() {
    $(this).keyup(function() {
      $length = $(this).val().length;
      $(this).parent().find('.indicator .counter').html($length);
      if($length > 0) {
        $(this).parent().find('.button').removeClass('isDisabled');
      } else {
        $(this).parent().find('.button').addClass('isDisabled');
      }
    });
  });
});
