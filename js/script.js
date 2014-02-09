/*-----------------------------
 * GUESS A WORD function.
 * ------------------------*/
function hangman(word) {
	var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	$('.guess').remove();
	$('.letter').remove();
	var total_chance_number = 6;
	var max_chance_number = 6;
	var open_letters = 0;
	
	$('.chance_value').text(total_chance_number - max_chance_number + '/' + max_chance_number);
	$.each(alpha.split(''), function(i, val) {
		$('#alpha').append($('<span class="guess">' + val + '</span>'));
	});
	var word_length = word.length;
	var letters_array = [];
	$.each(word.split(''), function(i, val) {
		letters_array[i] = val;
		$('#word').append($('<span class="letter">_</span>'));
	});
	/*------------------------
	 * Guess a letter.
	 ------------------------*/
	$('.guess').click(function() {
		var count = 0;
		for (var i = 0; i < word_length; i++) {
			if (letters_array[i] == $(this).text()) {
				$('.letter').eq(i).text($(this).text());
				count++;
			}
		}
		open_letters += count;
		if (!count) {
			max_chance_number = max_chance_number - 1;
			humanDraw(max_chance_number);
		}
		$('.chance_value').text(total_chance_number - max_chance_number + '/' + total_chance_number);
		$(this).css('visibility', (count > 0 ? 'hidden' : 'hidden')).unbind('click');

		/*------------------------
		 * Display red score block if you lose
		 ------------------------*/
		if (!max_chance_number) {
			$('#score_value_block').append($('<span class="score_value">' + parseInt(open_letters / word_length * 100, 10) + '</span>'));
			$('#score_value_block').css('background', 'red');
			$('.lose_win').text("LOSE");
			$('.guess').unbind('click');
			$('.play_again_button').css('visibility', 'visible');
			for (var i = 0; i < word_length; i++) {
				if ($('.letter').eq(i).text() != letters_array[i]) {
					$('.letter').eq(i).text(letters_array[i]);
					$('.letter').eq(i).css('color', '#414456');
				}
			}

		}
		/*------------------------
		 * Display green score block if you win
		 ------------------------*/
		if (open_letters == word_length) {
			$('#score_value_block').append($('<span class="score_value">' + parseInt(max_chance_number / total_chance_number * 100, 10) + '</span>'));
			$('#score_value_block').css('background', 'green');
			$('.lose_win').text("WIN");
			$('.guess').unbind('click');
			$('.play_again_button').css('visibility', 'visible');
		}
	});
	/*------------------------
	 * Replay the game.
	 ------------------------*/
	$('.play_again_button').on('click', function() {
		$('.score_value').remove();
		$('.lose_win').text("");
		$('.play_again_button').css('visibility', 'hidden');
		clearDrawArea();
		hangman(chooseWord());
	});
}

/*-------------------------------------
 * DRAW ELEMENTS USING CANVAS
 --------------------------------------*/
function gibbetDraw() {
	var object = document.getElementById("hangman");
	var context = object.getContext("2d");
	context.beginPath();
	context.moveTo(50, 390);
	/**context.quadraticCurveTo(controlX, controlY, endX, endY);**/
	context.quadraticCurveTo(150, 250, 210, 390);
	context.moveTo(140, 320);
	context.lineTo(145, 20);
	context.moveTo(120, 20);
	context.quadraticCurveTo(200, 90, 350, 30);
	context.moveTo(300, 43);
	context.lineTo(300, 110);
	context.lineWidth = 10;
	// line color
	context.strokeStyle = "white";
	context.stroke();

}

function humanDraw(max_chance_number) {
	var object = document.getElementById("hangman");
	var context = object.getContext("2d");
	context.beginPath();
	switch (max_chance_number) {
		/* draw head */
		case 5 :
			context.arc(300, 140, 30, 0, Math.PI * 2, false);
			context.closePath();
			context.stroke();
			break;
		case 4 :
			context.moveTo(300, 170);
			context.quadraticCurveTo(320, 200, 300, 270);
			context.stroke();
			break;
		case 3 :
			context.moveTo(310, 190);
			context.quadraticCurveTo(280, 220, 250, 210);
			context.stroke();
			break;
		case 2 :
			context.moveTo(310, 190);
			context.quadraticCurveTo(330, 220, 370, 230);
			context.stroke();
			break;
		case 1 :
			context.moveTo(302, 265);
			context.quadraticCurveTo(250, 300, 260, 350);
			context.stroke();
			break;
		case 0 :
			context.moveTo(302, 265);
			context.quadraticCurveTo(350, 300, 350, 340);
			context.stroke();
			break;

	}

}

function clearDrawArea() {
	var object = document.getElementById("hangman");
	var context = object.getContext("2d");
	context.beginPath();
	context.clearRect(245, 105.1, 150, 290);
}

function chooseWord() {
	var lastname_list = ["Zdanovich", "Guglya", "Levusov", "Bobrovich", "Kartashova", "Rapovets", "Baranova", "Maslyuk", "Worobjova"];
	return lastname_list[Math.floor(Math.random() * lastname_list.length)].toUpperCase();
}


$(document).ready(function() {
	$('#BUT').click(function() {
		$('.start_button').css('display', 'none');
		$('#hangman-jquery').css('display', 'block');
		
		/* Drawing general elements(gibbet)*/
		gibbetDraw();
		
		/*CALL FUNCTION for choosing a random word(lastname)!*/
		hangman(chooseWord());
	});
});
