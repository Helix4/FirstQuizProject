var allQuestions = [                                    // Stores all questions as objects
  {question: "How many mountains are there?",
   choices: ["Two", "Three", "Seven", "Five"],
   correctAnswer: 2,
   userAnswer: null},
  {question: "Where did Sifu Phan come from?",
   choices: ["China", "Vietnam", "Burma", "Russia"],
   correctAnswer: 1,
   userAnswer: null},
  {question: "How many animals are in our system?",
   choices: ["Five (Can Be Four)", "Ten (Can Be Seven)", "Six (Can Be Seven)", "Seven (Can Be Five)"],
   correctAnswer: 3,
   userAnswer: null}
];

var totalScore = 0,         // Tracks user score
    questionQueue = 0;      // Tracks current question number, starting with first question

/* getUserAnswer():
 * Searches for and returns index value of checked
 * radio button representing the user's answer as
 * a number.
 */
function handleAnswer() {
  var answerChoices = document.forms.quiz.elements.answer;
  var userAnswer;

  for(var i = 0, len = answerChoices.length; i < len; i++) {
    if (answerChoices[i].checked) {
      userAnswer = answerChoices[i].getAttribute("value");
      allQuestions[questionQueue].userAnswer = i;
    }
  }

  if (userAnswer) {
    return true;
  }
  else {
    return false;
  }
}

/* loadNextQuestion():
 * When there is a new question object in the questionQueue, this function is called.
 * Grabs and inserts the new question and corresponding choices into HTML.
 */
function loadNextQuestion() {
  var questionHeader = document.getElementById("question");     // Will insert questions into this HTML element
  var answerChoices  = allQuestions[questionQueue].choices;     // Fetching answers
  var questionLegend = document.getElementById("qnum");         // Displays which question the user is currently viewing
  var inputs = document.getElementsByTagName("input");            // To insert questions

  questionLegend.innerHTML = "Question " + (questionQueue + 1);
  questionHeader.innerHTML = allQuestions[questionQueue].question;  // Inserting question text

  for(var i = 0, len = answerChoices.length; i < len; i++) {
    label = document.getElementsByTagName("label")[i];
    label.textContent = answerChoices[i];
    document.forms.quiz.elements.answer[i].checked = false;  // Ghetto making sure the radio button isn't checked onload!
  }

}

function displayScore() {
  var scoreDisplay = document.createDocumentFragment(),
      totalScore = 0;

  for(var i = 0, len = allQuestions.length; i < len; i++) {
    if (allQuestions[i].correctAnswer === allQuestions[i].userAnswer) {
      ++totalScore;
    }
  }
  scoreDisplay.innerHTML = "<h1> Your Final Score:</h1><br><h2>" + totalScore.toString() + " / " + allQuestions.length.toString() + "</h2>";
  document.body.innerHTML = scoreDisplay.innerHTML;
}

window.onload = function() {
  var nextButton = document.getElementById("next");
  var backButton = document.getElementById("back");

  loadNextQuestion();               // Insert first question with default global value n = 0
  nextButton.onclick = function() {
    if ( !handleAnswer() ) { // If handleAnswer returns false, fire alert and end the sequence
      alert("Please select an answer to this question before moving to the next question!");
    } else if (++questionQueue < allQuestions.length) {  // Check for end of questions AND update the questionQueue!
      loadNextQuestion();                         // If not end, load next question
      if(allQuestions[questionQueue].userAnswer) { // If userAnswer is not null (meaning user has selected an answer and used the back button)
        document.forms.quiz.elements.answer[allQuestions[questionQueue].userAnswer].checked = true; // Check their answer
      }
    }
    else {
      displayScore();
    }
  };

  backButton.onclick = function() {
    if (questionQueue == 0) {
      alert("You are at the first question!");
    } else {
      --questionQueue;
      loadNextQuestion();
      document.forms.quiz.elements.answer[allQuestions[questionQueue].userAnswer].checked = true;
    }
  };

}
