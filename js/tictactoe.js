//  var squares = "#a, #b, #c, 
// 				   #d, #e, #f,
// 				   #g, #h, #i"
var game = {
	player: '',
	ai: '',
	squares: document.querySelectorAll(".squares"),
	turn: '',
	countSqrs:0,
	winner: '',
	over: false,
	freeMoves:[]
};
console.log(game.squares)
for (var i = 0; i < game.squares.length; i++) {
	game.freeMoves.push(game.squares[i])
}{
	
}


 // win conditions
var horizWin =  [
	['a','b','c'], // top
	['d','e','f'], // middle
	['g','h','i']  // bottom
];
var vertWin =  [
	['a','d','g'], // right
	['b','e','h'], // middle
	['c','f','i']  // left
];
var diagWin =  [
	['a','e','i'], // left to right
	['c','e','g']  // right to left
];

function fillMove(button, player){
	if (!game.over){


	console.log(game.countSqrs)
	console.log(button)
	button.removeEventListener('click', gameplay)
	button.innerHTML = player;
	game.countSqrs += 1;
	game.turn = game.turn == game.player? game.ai : game.player;
	horizWin.forEach(check);
	vertWin.forEach(check);
	diagWin.forEach(check);
//console.log(button, player)	
	if (game.turn == game.ai){
		aiMove()
	}
		}
}

function modal(option){
	// when the "X" or "O" button is pressed the "modal" screen will be hidden
	var elem = document.getElementById("modal");
	elem.style.visibility = "hidden";

	init(option.id);													// start the game
}

// check if the win conditions are reached
function check(condition){
	var con1 = document.getElementById(condition[0]).innerHTML;
	var con2 = document.getElementById(condition[1]).innerHTML;
	var con3 = document.getElementById(condition[2]).innerHTML;
	if (con1 == con2 && con2 == con3 && con1 != ''){
		console.log(con1 + ' GANHO');
		game.winner = con1;
		game.over = true;
		winScreen(con1);

	}
	else if (game.countSqrs == 9){
		game.over = true;
		console.log('IMPATO');
		winScreen();
	}
}

function init(chosenOption){
	// init who starts
	game.player = chosenOption;								// defines Player option (X or O)
	game.ai = game.player == 'X' ? 'O' : 'X';				// defines AI option
	game.turn = game.player == 'X'? game.player : game.ai;  // defines first player (the "X")
	// init the AI first move (if first player)
	// start listening all squares events for clicks

	for (var i = 0; i < game.squares.length; i++) {
		game.squares[i].addEventListener("click", gameplay);
	}
	if (game.turn == game.ai){
		aiMove()
	}

}	
function gameplay(event){

	fillMove(event.target, game.turn);		
	

}
// SHOW WHO WON
function winScreen(winner){
	var screen = document.getElementById("endScreen");
	var winMsg = document.getElementById("winMsg");
	if (typeof winner === 'undefined'){
		winMsg.innerHTML = "Draw!";
	}
	else{
		winMsg.innerHTML = winner + " WON!";
	}	
	var playAgain = document.getElementById("playAgain");
	screen.insertBefore(winMsg, playAgain)
	screen.style.visibility = "visible";
	restart(winMsg, screen, playAgain);
}

// RESTART THE GAME AFTER WIN/LOSE
function restart(winMsg, screen, playAgain){
	playAgain.addEventListener("click", function(){
		winMsg.innerHTML = '';
		screen.style.visibility = "hidden";
		var elem = document.getElementById("modal");
		elem.style.visibility = "visible";
		game.over = false;
		game.countSqrs = 0;
				for (var i = 0; i < game.squares.length; i++) {
					game.squares[i].innerHTML = "";
			}	
		});
}

// AI LOGIC
function aiMove(){
// 	W
	var number = Math.floor(Math.random() * (game.freeMoves.length));
	while (game.freeMoves[number].innerHTML != "" && game.countSqrs < 9){
		number = Math.floor(Math.random() * (game.freeMoves.length));
	}
	for (var j = 0; j < horizWin.length; j++) {
		var con1 = document.getElementById(horizWin[j][0]).innerHTML;
		var con2 = document.getElementById(horizWin[j][1]).innerHTML;
		var con3 = document.getElementById(horizWin[j][2]).innerHTML;
		if (con1 == con2 && con1 != "" && con3 == ""){
			var buttonToFill  = document.getElementById(horizWin[j][2])
			var buttonToBlock = game.freeMoves.indexOf(buttonToFill)
			console.log(game.freeMoves.indexOf(buttonToFill))
			number = buttonToBlock
		}
		else if (con1 == con3 && con1 != "" && con2 == ""){
			var buttonToFill  = document.getElementById(horizWin[j][1])
			var buttonToBlock = game.freeMoves.indexOf(buttonToFill)
			console.log(game.freeMoves.indexOf(buttonToFill))
			number = buttonToBlock
		}
		else if (con2 == con3 && con2 != "" && con1 == ""){
			var buttonToFill  = document.getElementById(horizWin[j][0])
			var buttonToBlock = game.freeMoves.indexOf(buttonToFill)
			console.log(game.freeMoves.indexOf(buttonToFill))
			number = buttonToBlock
		}
	}
	for (var j = 0; j < vertWin.length; j++) {
		var con1 = document.getElementById(vertWin[j][0]).innerHTML;
		var con2 = document.getElementById(vertWin[j][1]).innerHTML;
		var con3 = document.getElementById(vertWin[j][2]).innerHTML;
		if (con1 == con2 && con1 != "" && con3 == ""){
			var buttonToFill  = document.getElementById(vertWin[j][2])
			var buttonToBlock = game.freeMoves.indexOf(buttonToFill)
			console.log(game.freeMoves.indexOf(buttonToFill))
			number = buttonToBlock
		}
		else if (con1 == con3 && con1 != "" && con2 == ""){
			var buttonToFill  = document.getElementById(vertWin[j][1])
			var buttonToBlock = game.freeMoves.indexOf(buttonToFill)
			console.log(game.freeMoves.indexOf(buttonToFill))
			number = buttonToBlock
		}
		else if (con2 == con3 && con2 != "" && con1 == ""){
			var buttonToFill  = document.getElementById(vertWin[j][0])
			var buttonToBlock = game.freeMoves.indexOf(buttonToFill)
			console.log(game.freeMoves.indexOf(buttonToFill))
			number = buttonToBlock
		}
	}
	for (var j = 0; j < diagWin.length; j++) {
		var con1 = document.getElementById(diagWin[j][0]).innerHTML;
		var con2 = document.getElementById(diagWin[j][1]).innerHTML;
		var con3 = document.getElementById(diagWin[j][2]).innerHTML;
		if (con1 == con2 && con1 != "" && con3 == ""){
			var buttonToFill  = document.getElementById(diagWin[j][2])
			var buttonToBlock = game.freeMoves.indexOf(buttonToFill)
			console.log(game.freeMoves.indexOf(buttonToFill))
			number = buttonToBlock
		}
		else if (con1 == con3 && con1 != "" && con2 == ""){
			var buttonToFill  = document.getElementById(diagWin[j][1])
			var buttonToBlock = game.freeMoves.indexOf(buttonToFill)
			console.log(game.freeMoves.indexOf(buttonToFill))
			number = buttonToBlock
		}
		else if (con2 == con3 && con2 != "" && con1 == ""){
			var buttonToFill  = document.getElementById(diagWin[j][0])
			var buttonToBlock = game.freeMoves.indexOf(buttonToFill)
			console.log(game.freeMoves.indexOf(buttonToFill))
			number = buttonToBlock
		}
	}
	fillMove(game.freeMoves[number], game.ai)
}


//TODO: CLEAN THE CODE, REFACTOR THE AI LOGIC CODE