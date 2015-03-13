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
		.appendTo('.total_games');
	$('.x_wins')
		.text(xWins)
		.appendTo('.x_wins');
	$('.o_wins')
		.text(oWins)
		.appendTo('.o_wins');
	$('.total_draws')
		.text(drawCount)
		.appendTo('.total_draws');
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

$(document).ready(function() {

	// Define initial player
	player = "X";
	gameCount = 0;
	drawCount = 0;
	xWins = 0;
	oWins = 0;

	$('.square')
		.on("click", function() {
			// First make sure it is an open square
			if ($(this).hasClass('occupied')) {
				alert("This space is occupied, try another.")
			// If square is open...
			} else {
				// Occupy the square, and add the players mark
				$(this)
					.addClass('occupied')
					.text(player).appendTo(this);

				// Check for a winner
				if (winner()) {
					alert("Game over! " + player + " wins!");
					// Update counts
					totalWins(player);
					totalGames();
					// Reset board
					cleanUp();

				// Check for a draw
				} else if (draw()) {
					alert("It's a draw!");
					// Update counts
					totalDraws();
					totalGames();
					// Reset board
					cleanUp();

				// Prepare for next turn
				} else {
					if (player == "X") {
						player = "O";
					} else {
						player = "X";
					};
					$('.player').text(player).appendTo('.player');
				};
			};
		});
	});