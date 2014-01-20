var allQuestions = [                                    // Stores all questions as objects
  {question: "How many mountains are there?",
   choices: ["2", "3", "7", "5"],
   correctAnswer: 2},
  {question: "Where did Sifu Phan come from?",
   choices: ["China", "Vietnam", "Burma", "Russia"],
   correctAnswer: 1},
  {question: "How many animals are in our system?",
   choices: ["5 (Can be 4)", "10 (Can be 7)", "6 (Can be 7)", "7 (Can be 5)"],
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
  var answerLabels   = document.getElementsByTagName("label");  // Will Insert answers into the child text nodes of this element using textContent
  var answerChoices  = allQuestions[questionQueue].choices;     // Fetching answers
  var questionLegend = document.getElementById("qnum");         // Displays which question the user is currently viewing

  questionLegend.innerHTML = "Question " + (questionQueue + 1);
  questionHeader.innerHTML = allQuestions[questionQueue].question;           // Inserting question text
  for( var i = 0, j = 0, len = answerChoices.length; i < len; i++, j++ ) {   // First child of a label is the <input type=radio> element,
                                                                             // so we use childNodes[1] to access the second child (text node)
    answerLabels[i].childNodes[1].textContent = answerChoices[j];
  }
}

window.onload = function() {
  var nextButton = document.getElementById("next");

  loadNextQuestion();               // Insert first question with default global value n = 0
  nextButton.onclick = function() {
    if ( checkAnswer() ) {          // Check answer and update score if necessary
      totalScore += 1;
    }
    if (++questionQueue < allQuestions.length) {  // Check for end of questions
    loadNextQuestion();                           // If not end, load next question
    }
    else {  // Display the score only
      var scoreDisplay = document.createDocumentFragment();

      scoreDisplay.innerHTML = "<h1> Your Final Score:</h1><br><h2>" + totalScore.toString() + " / " + allQuestions.length.toString();
      document.body.innerHTML = scoreDisplay.innerHTML;
    }
  }
}
