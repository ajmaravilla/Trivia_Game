//Start timer when Start Trivia is clickled

//The game ends when the player clicks on submit or when the counter runs to 0

//At end of game, all questions are check for correct/incorrect


//Trivia Game (Timed Form)
//Set up variables
	//counter set for 90 seconds
var counter = 90;
	//countdown interval in global
var countdownInt;
	//correct answer counter
var correctCounter=0;
	//incorrect answer counter
var incorrectCounter=0;
	//unanswered counter
var unanswerCounter=0;
	//collection of the answers player checked
var playerAnswers;
var playerAnswersArray=[];
	//object arry for question bank including questions, option and answers
const questionArray = [
	 {question: "The airport code ORD belongs to which airport?",
	 option: {a:"  Chicago O'Hare", b:"  Orlando", c:"  Chicago Midway", d:"  Orange County"},
	 answer: "a"},
	 {question: "What is the airport code for Hong Kong Chek Lap Kok Airport?",
	 option: {a:"  CLK", b:"  HNG", c:"  HKG", d:"  FRC"},
	 answer: "c"},
	{question: "The airport code FCO belongs to which airport?",
	 option: {a:"  Florence, Italy", b:"  Rome, Italy", c:"  San Francisco, CA", d:"  Frankfurt, Germany"},
	 answer: "b"},
	 {question: "What is the airport code for Beijing International Airport?",
	 option: {a:"  BEJ", b:"  PEK", c:"  PRC", d:"  BIA"},
	 answer: "b"},
	 {question: "What is the airport code for Guam International Airort?",
	 option: {a:"  GUA", b:"  MDW", c:"  GUM", d:"  HNL"},
	 answer: "c"},
	 {question: "What is the airport code for Toronto's Pearson Interational Airport?",
	 option: {a:"  TOR", b:"  TIA", c:"  YYZ", d:"  YUL"},
	 answer: "c"},
	 {question: "What is the airport code LAX belongs to which airport?",
	 option: {a:"  Lacrosse, WI", b:"  Los Angeles, CA", c:"  Lincoln, NE", d:"  Anchorage, AK"},
	 answer: "b"},
	 {question: "What is the airport code for Paris, France",
	 option: {a:"  CDG", b:"  PAR", c:"  FRA", d:"  PAF"},
	 answer: "a"},
	 {question: "The airport code PVG belongs to which airport?",
	 option: {a:"  Putnam County, IN", b:"  Port St. Lucie, FL", c:"  Panama City, FL", d:"  Shanghai, China"},
	 answer: "d"},
	 {question: "What is the airport code for Washington, D.C.'s International Aiport?",
	 option: {a:"  DCA", b:"  WDC", c:"  DIA", d:"  DCI"},
	 answer: "c"}
];

	//form template to populate when page loads
var formTemplate = function(){
	var formTemp = "<form id='quiz'>" +
	   				"<div id='quiz-question'></div>" +
	   				"<input name='submit' id='getScore' type='button' value='submit' onclick=checkAnswer()>" +
    			   "</form>";
    return formTemp;
};

//Player clicks start
$("#start-btn").on("click", gameStart);
//Function for questions page loads/game starts
function gameStart(){
	//set interval to countdown every second
	countdownInt = setInterval(decrement, 1000);
	//print to HTML the formTemplate first
	$("#trivia-div").html(formTemplate());
	//then print to HTML the gameQuestions function
	$("#trivia-div").html(gameQuestions);
	//prompt plane sound to play at game start
	//planeSound.loop = true; //disabled loop as this was annoying
	planeSound.play();
}
//function for decrement timer from interval activity
function decrement(){
	
	counter -= 1;
	$("#counter-div").html("<h2>Time Remaining: " + counter + "</h2><br>");
  	if (counter === 0) {
	gameTimeUp();
	console.log("times up");
	};
};
//function to generate the game questions and game multiple choice answers
function gameQuestions(){
	//loop to cycle through each question and answer
	for(var i=0; i<questionArray.length; i+=1){
		var num = i+1;
		var inputTemplate
		var currentQuestion = "Q" + num + ": " + questionArray[i].question + "<br>";
			//variable that formats the questions selections
			inputTemplate = "<input type='radio' name='" + num + "' value='a'>" + questionArray[i].option.a + "&nbsp;" +
							"<input type='radio' name='" + num + "' value='b'>" + questionArray[i].option.b + "&nbsp;" +
							"<input type='radio' name='" + num + "' value='c'>" + questionArray[i].option.c + "&nbsp;" +
							"<input type='radio' name='" + num + "' value='d'>" + questionArray[i].option.d + "&nbsp;" +
							"<input type='radio' name='" + num + "' value='e' style='display:none' checked></input>";
		//variable that will contain both a question and the choice set				
		var questionSet = currentQuestion + inputTemplate + "<br>";
		//append the questions and choices to the html
		$("#quiz-question").append(questionSet + "<br>");				
	}
}

//Player clicks to submit answers
$("#getScore").on("click", checkAnswer);

//function for checking answers
function checkAnswer(){
	clearInterval(countdownInt);
	//set message variable
	var message;
	//loop to cycle through question bank and get player answer
	for(var i=0; i<questionArray.length; i+=1){
		var num = i+1;
		//variable short hand
		var inputRadio = "input:radio[name=" + num + "]:checked";
		//variable to get value of what player clicked
		playerAnswers = $(inputRadio).val();
		//take player answers and push to array
		playerAnswersArray.push(playerAnswers);
	};
	//loop to compare player answers to correct answers
	for(var j=0; j<playerAnswersArray.length; j+=1){
		if(playerAnswersArray[j] === questionArray[j].answer){
			correctCounter += 1;
		//hidden radio button preset to 'e', if player did not answer, then this assigns default value
		} else if (playerAnswersArray[j] === "e") {
			unanswerCounter += 1;
		} else {
			incorrectCounter += 1;
		}
	};
	//conditional to show message according to score
	if(correctCounter>8){
		message = "You are a frequent flyer and/or an AvGeek!"
	} else if (correctCounter < 5){
		message = "It's time to fly!"
	} else {
		message = "Stop taking the bus!"
	};
	//populate score counters after game ends
	$("#trivia-div").html("<h3>Correct Answers: " + correctCounter + "<br>" +
							"Incorrect Answers: " + incorrectCounter + "<br>" +
							"Unanswered: " + unanswerCounter + "<br><br>" + 
							"<i>" + message + "</i></h3>");
	//force time to be zero
	$("#counter-div").html("<h2>Time Remaining: 0</h2>");

}


//function for clearing the countdown timer
function gameTimeUp(){
	clearInterval(countdownInt);
	checkAnswer();
}


