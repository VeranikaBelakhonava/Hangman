/*-----------------------------
 * GUESS A WORD function.
 * ------------------------*/
var friends_list = [];
function hangman() {
	var word = chooseWord(friends_list);
	friends_list = jQuery.grep(friends_list, function(a) {
	
	
		return a.toUpperCase() !== word;
	});
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
			$('#score_value_block').append($('<span class="score_value">' + parseInt(open_letters / word_length * 100, 10) + '%</span>'));
			$('#score_value_block').css('background', '#f0596f');
			$('.score_list').append($('<li style="background: #f0596f"><a>' + word + ' ' + parseInt(open_letters / word_length * 100, 10) + '%</a></li>'));
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
			$('#score_value_block').append($('<span class="score_value">' + parseInt(max_chance_number / total_chance_number * 100, 10) + '%</span>'));
			$('#score_value_block').css('background', '#48ea9f');
			$('.score_list').append($('<li style="background: #48ea9f"><a>' + word + ' ' + parseInt(max_chance_number / total_chance_number * 100, 10) + '%</a></li>'));
			$('.lose_win').text("WIN");
			$('.guess').unbind('click');
			$('.play_again_button').css('visibility', 'visible');
		}
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

	if (!friends_list || friends_list.length == 0) {
		friends_list = ["Zdanovich", "Guglya", "Levusov", "Bobrovich", "Kartashova", "Rapovets", "Baranova", "Maslyuk", "Worobjova"];
		alert("List of friends is empty!");
	}
	var lastname = friends_list[Math.floor(Math.random() * friends_list.length)].toUpperCase();

	return lastname;
}

function initFB() {
	window.fbAsyncInit = function() {
		FB.init({
			appId : '265535743612006',
			status : true,
			xfbml : true
		});
	};
	( function(d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {
				return;
			}
			js = d.createElement(s);
			js.id = id;
			js.src = "//connect.facebook.net/en_US/all.js";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
}

function getFriends() {
	FB.login(function(response) {
		if (response.authResponse) {
			console.log('Welcome!  Fetching your information.... ');

			FB.api('/me/friends?fields=last_name', function(response) {
				if (response.data) {
					//var friends_list = [];
					$.each(response.data, function(index, friend) {
						friends_list.push(friend.last_name);
					});
					hangman();
				} else {
					alert("Error!");
				}
			});
		} else {
			console.log('User cancelled login or did not fully authorize.');
		}
	});
}


$(document).ready(function() {
	initFB();
	$('#BUT').click(function() {
		getFriends();
		$('.start_button').css('display', 'none');
		$('#hangman-jquery').css('display', 'block');

		/* Drawing general elements(gibbet)*/
		gibbetDraw();

	});
	/*------------------------
	 * Replay the game.
	 ------------------------*/
	$('.play_again_button').on('click', function() {
		$('.score_value').remove();
		$('.lose_win').text("");
		$('.play_again_button').css('visibility', 'hidden');
		clearDrawArea();
		hangman();
	});
	/*	$('#nav li').hover(function() {
	 //show its submenu
	 $('ul', this).stop().slideDown(100);
	 }, function() {
	 //hide its submenu
	 $('ul', this).stop().slideUp(100);
	 });*/
});
