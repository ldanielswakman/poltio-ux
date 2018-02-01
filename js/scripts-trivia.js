$(document).ready(function() {

	quizPresenterState = false;

	$('body').addClass('isLoaded');

	startCountdown( $('.card--sequence-active .countdown') );

	$('.card--sequence-active').on('click touchstart touchend', function() {
		prepNextCard($(this));
	});

	$('body').bind('keyup', (function(e) {
		if(e.keyCode == 13 || e.keyCode == 32) { // Enter or Spacebar
			prepNextCard($('.card.card--sequence-active'));
		}
		e.preventDefault();
	}));
	
});



function prepNextCard(card) {
	if(quizPresenterState == true) {
		quizPresenterState = false;
		card.find('.card__followup-overlay').removeClass('isVisible');
		card.addClass('isPrepForNextQ');
		setTimeout(function() {
			goNextCard(card);
		}, nextTimeout);
	// } else {
	// 	console.log('Quiz not interactable at this stage...');
	}
}



function goNextCard(card) {
	nextCard = card.next('.card--sequence');

	if(nextCard.length > 0) {
		card.addClass('isShiftingOut');
		nextCard.addClass('isShiftingIn');

		timeout = 600; // should be the same as css transition on card
		setTimeout(function() {
			card.removeClass('card--sequence-active');
			nextCard.addClass('card--sequence-active').removeClass('isShiftingIn');

			// re-assign click event
			$('.card--sequence-active').on('click touchstart touchend', function() {
				prepNextCard($(this));
			});

			startCountdown(nextCard.find('.countdown'));

		}, timeout);
	} else {
		alert('This was the last card in the sequence');
	}
}



function answerCard(card) {

	answerState = false;

	card.addClass('isAnswered');
	card.find('.button:not(.isSelected)').addClass('isDisabled');

	// determine answer
	if(card.find('.button.isSelected').attr('data-correct') == 'true') {
		card.find('.button.isSelected').addClass('isCorrect');
		answerState = true;
	} else {
		card.find('.button.isSelected').addClass('isWrong');
		card.find('.button[data-correct="true"]').addClass('isCorrect');
	}

	if (answerState == true) {
		card.find('.card__followup-overlay .text--correct').addClass('isVisible');
	} else {
		card.find('.card__followup-overlay .text--wrong').addClass('isVisible');
	}
	card.find('.card__followup-overlay').addClass('isVisible');

	return answerState;
}



function startCountdown(countdown) {

	countdown.each(function() {

		attrDur = $(this).attr('data-duration');
		duration = (typeof(attrDur) !== 'undefined') ? attrDur : 10000; // duration in ms
		alertThreshold = 7000;

		var timer = $(this),
			card = $(this).closest('.card'),
			pie = timer.find('.countdown__pie'),
			slices = pie.find('.countdown__slice'),
			spinner = pie.find('.countdown__spinner'),
			timerValue = 0;

		var countdownRunner = setInterval(function() {

			spinner.css({
				'webkitTransform': 'rotate('+timerValue+'deg)',
				'oTransform': 'rotate('+timerValue+'deg)',
				'mozTransform': 'rotate('+timerValue+'deg)',
				'msTransform': 'rotate('+timerValue+'deg)',
				'transform': 'rotate('+timerValue+'deg)'
			});

			// set remaining value
			floatRemaining = (1 - timerValue / 360);
			msRemaining = floatRemaining * duration;
			secRemaining = Math.ceil(msRemaining/1000);
			$('.countdown__content .value').html(secRemaining);

			// set Half time class
			if(timerValue > 180) {
				pie.addClass('isFull');
			}
			else {
				pie.removeClass('isFull');
			}

			// set Alert Threshold class
			if(timerValue > (360 * alertThreshold/duration )) {
				pie.addClass('isAlert');
			} else {
				pie.removeClass('isAlert');
			}

			// set Complete actions
			if(++timerValue > 360) {

				// timer actions
				timerValue = 0;
				timer.addClass('isComplete');
				clearInterval(countdownRunner);

				// initial message
				card.find('.card__status .message--timeup').addClass('isActive');
				setTimeout(function() {
					card.find('.card__status .message--timeup').removeClass('isActive');
				}, 1500);

				// card actions
				answerCard(card);
				nextTimeout = (card.find('.card__followup-timerbar').length > 0) ? 5000 : 0; // value based on followup timerbar duration+delay

				// if cover card
				if(card.attr('id') == 'q0') {
					goNextCard(card);
				} else {
					quizPresenterState = true;
				}

			}

		}, (duration / 360));

	});

}