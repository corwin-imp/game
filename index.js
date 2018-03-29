let state = {
	step: 0,
	history: [],
	redo: []
};
let undoElement = document.querySelectorAll('.undo-btn')[0];
let redoElement = document.querySelectorAll('.redo-btn')[0];
let element = document.querySelectorAll('.field')[0];
let elements = document.querySelectorAll('.cell');
let players = [
	{
		id: 'ch',
		won: 'Crosses won!'
	},
	{
		id: 'r',
		won: "It's a draw!"
	}
];
redoElement.addEventListener("click", function (e) {

	let fromRedo = state.redo.pop();
	state.history.push(fromRedo); 

	elements[fromRedo.number].classList.add(fromRedo.value);
	if(!state.redo.length){
		redoElement.setAttribute('disabled', 'disabled');
	}
	state.step++;
	if(state.step){
		undoElement.removeAttribute('disabled');
	}



});
undoElement.addEventListener("click", function (e) {

	let toRedo = state.history.pop();
	console.log('redo',toRedo);
	elements[toRedo.number].classList.remove(toRedo.value);

	if(!state.redo.length){
		redoElement.removeAttribute('disabled');
	}
	
	state.redo.push(toRedo) ;
	state.step--;

	if(!state.step){
		undoElement.setAttribute('disabled', 'disabled');
	}
});

element.addEventListener("click", function (e) {
	if (e.target.className == 'cell') {
		let numb =  e.target.getAttribute('data-id');
		if (state.step % 2) {
			e.target.classList.add("r");
			state.history.push({
				number: numb,
				value: 'r'
			});
		} else {
			e.target.classList.add("ch");
			state.history.push({
				number: numb,
				value: 'ch'
			});
		}
		undoElement.removeAttribute('disabled');
		state.step++;
		
		checkWinner();
	}

});

let winsCombo = [
	[0, 1, 2], [3, 4, 5], [6, 7, 8],
	[0, 3, 6], [1, 4, 7], [2, 5, 8],
	[0, 4, 8], [2, 4, 6]
];

function isWinning(value) {
      let combination, i, j;

      for (i = 0; i < winsCombo.length; i++) {
        combination = winsCombo[i];
          
        for (j = 0; j < combination.length; j++) {
          if (!elements[combination[j]].classList.contains(value)) break;
        }
        if (j == 3) return true;
      }
      return false;
    }
function checkWinner() {
	
	let winnerElem = document.querySelectorAll('.won-title')[0];
	let wonElem = document.querySelectorAll('.won-message')[0];
	
	for (i = 0; i < players.length; i++) {
        if (isWinning(players[i]['id'])) {
        	
		winnerElem.innerHTML =	players[i]['won'];
        	winnerElem.classList.remove("hidden");
        	state = {
				step: 0,
				history: []
			};
		for(let i = 0; i < elements.length;i++){
			elements[i].classList.remove('r');
			elements[i].classList.remove('ch');
		}
			
		redoElement.setAttribute('disabled', 'disabled');
		undoElement.setAttribute('disabled', 'disabled');
          	return;
        }
    }

	/*
	for(let i=0;i<winsCombo.length;i++){
		console.log(i);

		if(elements[winsCombo[i]].classList.contains('ch')){
			winnerElem.innerHTML = 'Crosses won!';
			winnerElem.classList.remove("hidden");
		}else if(elements[winsCombo[i]].classList.contains('r')){
			wonElem.innerHTML = "It's a draw!";
			winnerElem.classList.remove("hidden");
		}

	} */
}
