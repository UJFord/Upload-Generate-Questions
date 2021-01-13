//DOM VARIABLES

console.log(localStorage);
//input
let inptQuestion = document.querySelector('#question-input');
//submit input
let sbmtBtn = document.querySelector('#submit-button');
//generate random question button
let gnrtBtn = document.querySelector('#generate-button')
//display random question
let gnrtdQuestion = document.querySelector('#generated-question');

//LOCAL STORAGE
//request for questions
class Store{
	
	static getQuestions() {
		let questions;
		if(localStorage.getItem('questions') === null){
			//if it's first time
			questions = [];
		}else{
			questions = JSON.parse(localStorage.getItem('questions'));
		}
		return questions;
	}
	
	static addQuestion(question) {
		let questions = Store.getQuestions();
		
		questions.push(question);
		
		localStorage.setItem('questions', JSON.stringify(questions))
	}
	
	static removeQuestion(index){
		let questions = Store.getQuestions();
		//remove the question in array
		questions.splice(index, 1)
		
		localStorage.setItem('questions', JSON.stringify(questions))
	}
}
//localStorage.clear();

//submit inputted questions
sbmtBtn.onclick = function(){
	if (inptQuestion.value) {
		Store.addQuestion(inptQuestion.value);
		inptQuestion.value = '';
	}else{
		window.alert('Question Empty! Please enter valid questions.')
	}
}
//show random saved questions
gnrtBtn.onclick = function(){
	let questions = Store.getQuestions();
	let isEmpty = questions.length === 0;
	
	if(isEmpty){
		//no stored questions
		window.alert('No more question! Try adding more!')
	}else{
		//questions count
		let len = questions.length
		//pick random
		let randomIndex = Math.floor(Math.random() * len);
		//display question
		gnrtdQuestion.innerHTML = questions[randomIndex];
		//remove question
		Store.removeQuestion(randomIndex);
	}
}
