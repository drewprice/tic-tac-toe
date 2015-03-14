// ---- FUNCTIONS ----

// The 'winner' function checks for a winner
function winner() {
	// Get text value of each square
	var one = $('.one').text();
	var two = $('.two').text();
	var three = $('.three').text();
	var four = $('.four').text();
	var five = $('.five').text();
	var six = $('.six').text();
	var seven = $('.seven').text();
	var eight = $('.eight').text();
	var nine = $('.nine').text();

	// Check for winning combinations, based on text values
		// Where 3-in-a-row are equal, and not empty
	if (
		(one == two && one == three && one != "") ||
		(one == five && one == nine && one != "") ||
		(one == four && one == seven && one != "") ||
		(two == five && two == eight && two != "") ||
		(three == five && three == seven && three != "") ||
		(three == six && three == nine && three != "") ||
		(four == five && four == six && four != "") ||
		(seven == eight && seven == nine && seven != "")
		) {
		return true
	};

	// Default to return false
	return false
}

// This function checks for a fullboard without a winner
function draw() {
	if (
		$('.one').hasClass('occupied') &&
		$('.two').hasClass('occupied') &&
		$('.three').hasClass('occupied') &&
		$('.four').hasClass('occupied') &&
		$('.five').hasClass('occupied') &&
		$('.six').hasClass('occupied') &&
		$('.seven').hasClass('occupied') &&
		$('.eight').hasClass('occupied') &&
		$('.nine').hasClass('occupied')
		) {
		return true
	};

	return false
};

function cleanUp() {
	// Clear grid
	$('.square')
		.empty()
		.removeClass('occupied');

	// Update score board
	$('.total_games')
		.text(gameCount)
		.hide()
		.appendTo('.total_games').fadeIn(1000);
	$('.x_wins')
		.text(xWins)
		.hide()
		.appendTo('.x_wins').fadeIn(1000);
	$('.o_wins')
		.text(oWins)
		.hide()
		.appendTo('.o_wins').fadeIn(1000);
	$('.total_draws')
		.text(drawCount)
		.hide()
		.appendTo('.total_draws').fadeIn(1000);
};

function totalWins(p) {
	if (p == "X") {
		xWins++;
	} else{
		oWins++;
	};
};

function totalGames() {
	gameCount++;
};

function totalDraws() {
	drawCount++;
};

function togglePlayer(p) {
	if (p == "X") {
		player = "O";
	} else {
		player = "X";
	};
}

// ---- APPLICATION STARTS HERE ----
$(document).ready(function() {

	// Define initial player & counts
	player = "X";
	gameCount = 0;
	drawCount = 0;
	xWins = 0;
	oWins = 0;

	$('.square')
		.on("click", function(event) {
			// Avoid following href "#", which makes app jumpy
			event.preventDefault()
			
			// First make sure it is an open square
			if ($(this).hasClass('occupied')) {
				alert("This space is occupied, try another.")
			} else {
				// Occupy the square, and add the players mark
				$(this)
					.addClass('occupied')
					.hide().text(player).appendTo(this).fadeIn(500);

				// Check for a winner
				if (winner()) {
					alert("Game over! " + player + " wins!");
					// Update counts
					totalWins(player);
					totalGames();
					// Reset board
					cleanUp();
					// Winner starts next round, so no player toggle here

				// Check for a draw
				} else if (draw()) {
					alert("It's a draw!");
					// Update counts
					totalDraws();
					totalGames();
					// Reset board
					cleanUp();
					togglePlayer(player);

				// Prepare for next turn
				} else {
					togglePlayer(player)
					$('.player').hide().text(player).appendTo('.player').fadeIn(500);
				};
			};
		});
	});