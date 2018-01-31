$(document).ready(function() {

	$('body').addClass('isLoaded');

	startCountdown( $('.card--sequence-active .countdown') );
	
});

function nextCard(card) {
	nextCard = card.next('.card--sequence');

	if(nextCard.length > 0) {
		card.addClass('isShiftingOut');
		nextCard.addClass('isShiftingIn');

		timeout = 600; // should be the same as css transition on card
		setTimeout(function() {
			card.removeClass('card--sequence-active');
			nextCard.addClass('card--sequence-active').removeClass('isShiftingIn');

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

	return answerState;
}

function startCountdown(countdown) {

	countdown.each(function() {

		duration = (typeof($(this).attr('data-duration')) !== 'undefined') ? $(this).attr('data-duration') : 10000; // duration in ms
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
				nextTimeout = (card.find('.card__followup-timerbar').length > 0) ? 5000 : 0;
				setTimeout(function() { nextCard(card) }, nextTimeout);

			}

		}, (duration / 360));

	});

}