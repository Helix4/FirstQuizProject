var allQuestions = [                                    // Stores all questions as objects
  {question: "How many mountains are there?",
   choices: ["Two", "Three", "Seven", "Five"],
   correctAnswer: 2},
  {question: "Where did Sifu Phan come from?",
   choices: ["China", "Vietnam", "Burma", "Russia"],
   correctAnswer: 1},
  {question: "How many animals are in our system?",
   choices: ["Five (Can Be Four)", "Ten (Can Be Seven)", "Six (Can Be Seven)", "Seven (Can Be Five)"],
   correctAnswer: 3}
];

var totalScore = 0,         // Tracks user score
    questionQueue = 0;      // Tracks current question number, starting with first question

/* getUserAnswer():
 * Searches for and returns index value of checked
 * radio button representing the user's answer as
 * a number.
 */
function getUserAnswer() {
  var i = 0, userAnswer;
  var answerInputs = document.forms.quiz.elements.answer;
  do {
    userAnswer = answerInputs[i].getAttribute("value");
  } while (!answerInputs[i].checked && ++i)

  return Number(userAnswer);
}

/* checkAnswer():
 * Compares the queued question's correctAnswer object value
 * with user's selected answer, returning true for the
 * correct answer and false for an incorrect answer.
 */
function checkAnswer() {
  return getUserAnswer() === allQuestions[questionQueue].correctAnswer;
}

/* loadNextQuestion():
 * When there is a new question object in the questionQueue, this function is called.
 * Grabs and inserts the new question and corresponding choices into HTML.
 */
function loadNextQuestion() {
  var questionHeader = document.getElementById("question");     // Will insert questions into this HTML element
  var answerChoices  = allQuestions[questionQueue].choices;     // Fetching answers
  var questionLegend = document.getElementById("qnum");         // Displays which question the user is currently viewing
  var body = document.getElementById("body");                   // To insert questions

  questionLegend.innerHTML = "Question " + (questionQueue + 1);
  questionHeader.innerHTML = allQuestions[questionQueue].question;           // Inserting question text

  for(var i = 0, len = answerChoices.length; i < len; i++) {
    var element = document.createElement("div");
    element.innerHTML = answerChoices[i];
    element.id = "answer" + (i + 1);           // Will assign ids as answer1, answer2, answer3, answer4 for CSS positioning
    element.className = "ans"                  // Use class name to fetch and remove old answers before inserting new ones
    body.appendChild(element);
    }

}

function removeOldAnswers() {
  var body = document.getElementById("body");
  var oldAnswers = document.getElementsByClassName("ans");  // Here using the ans className assigned by loadNextQuestion()

  while(oldAnswers.length > 0) {
    body.removeChild(oldAnswers[0]);                        // var oldAnswers updates itself upon each removal, so we always remove the 0th element!
  }
}

window.onload = function() {
  var nextButton = document.getElementById("next");

  loadNextQuestion();               // Insert first question with default global value n = 0
  nextButton.onclick = function() {
    if ( checkAnswer() ) {          // Check answer and update score if necessary
      totalScore += 1;
    }
    if (++questionQueue < allQuestions.length) {  // Check for end of questions AND update the questionQueue!
      removeOldAnswers();                         // Remove old answers
      loadNextQuestion();                         // If not end, load next question
    }
    else {  // Display the score only
      var scoreDisplay = document.createDocumentFragment();

      scoreDisplay.innerHTML = "<h1> Your Final Score:</h1><br><h2>" + totalScore.toString() + " / " + allQuestions.length.toString();
      document.body.innerHTML = scoreDisplay.innerHTML;
    }
  }
}
