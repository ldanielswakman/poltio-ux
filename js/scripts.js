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
    const card = this.parentElement.parentElement;

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
      card.classList.add("isAnswered");
    }
  }

  links.forEach(link => link.addEventListener("click", animate));

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
    $(this).closest('.hasDropdown').toggleClass('isActive');;
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


