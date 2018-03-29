let step = 0;
let element = document.querySelectorAll('.field')[0];
element.addEventListener( "click" , function(e) {
if(e.target.className == 'cell'){
	if(step%2){
		e.target.classList.add("r");
	}else{
		e.target.classList.add("ch");
	}


	step++;
	checkWinner();
}




});
winsCombo = [{0,1,2},{0,3,6},{1,4,7},{2,5,8}];
function checkWinner(){
	let elements = document.querySelectorAll('.cell');
	console.log(elements);
	let winnerElem = document.querySelectorAll('.won-title')[0];
	let wonElem = document.querySelectorAll('.won-message')[0];
	if(
		elements[0,3,6].classList.contains('ch')
		){

			winnerElem.innerHTML = 'Crosses won!';
			winnerElem.classList.remove("hidden");

	}else if(
		elements[0,3,6].classList.contains('r')
		){
			
			wonElem.innerHTML = "It's a draw!";
			winnerElem.classList.remove("hidden");
		
	}else if(
		elements[0,1,2].classList.contains('ch')
		){
			winnerElem.innerHTML = 'Crosses won!';
			winnerElem.classList.remove("hidden");
	}else if(
		elements[0,1,2].classList.contains('r')
		){
			wonElem.innerHTML = "It's a draw!";
			winnerElem.classList.remove("hidden");
	}


}