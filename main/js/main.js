var totalScore = 0,         // Tracks user score
    questionQueue = 0;      // Tracks current question number, starting with first question

function allQuestions(questionObject) { //JSON
  /* store states here */
}

function handleAnswer() {
  var answerChoices = document.forms.quiz.elements.answer;
  var userAnswer;

  for(var i = 0, len = answerChoices.length; i < len; i++) {
    if (answerChoices[i].checked) {
      userAnswer = answerChoices[i].getAttribute("value");
      allQuestions[questionQueue].userAnswer = i;
    }
  }
  if (userAnswer) { return true; }
  else { return false; }
}

function loadNextQuestion() {
  var questionHeader = document.getElementById("question");     // Will insert questions into this HTML element
  var answerChoices  = allQuestions[questionQueue].choices;     // Fetching answers
  var questionLegend = document.getElementById("qnum");         // Displays which question the user is currently viewing
  var inputs = document.getElementsByTagName("input");            // To insert questions
  var body = $("#body");
  var htmlAnswers = document.forms.quiz.elements.answer;

  body.fadeOut("slow");
  setTimeout( function() {
    questionLegend.innerHTML = "Question " + (questionQueue + 1);
    questionHeader.innerHTML = allQuestions[questionQueue].question;  // Inserting question text

    for(var i = 0, len = answerChoices.length; i < len; i++) {
      label = document.getElementsByTagName("label")[i];
      label.textContent = answerChoices[i];
      htmlAnswers[i].checked = false;
    }

    if (htmlAnswers[allQuestions[questionQueue].userAnswer]) {  // Making sure that the previously selected answer is checked
      htmlAnswers[allQuestions[questionQueue].userAnswer].checked = true;
    }
  }, 500);
  body.fadeIn("slow");
}

function displayScore() {
  var scoreDisplay = document.createDocumentFragment(),
      totalScore = 0;
  var body = $("body");

  body.fadeOut("slow");
  for(var i = 0, len = allQuestions.length; i < len; i++) {
    if (allQuestions[i].correctAnswer === allQuestions[i].userAnswer) {
      ++totalScore;
    }
  }
  scoreDisplay.innerHTML = "<h1> Your Final Score:</h1><br><h2>" + totalScore.toString() + " / " + allQuestions.length.toString() + "</h2>";
  setTimeout( function() {
    document.body.innerHTML = scoreDisplay.innerHTML;
  }, 500);
  body.fadeIn("slow");
}

window.onload = function() {
  var nextButton = document.getElementById("next");
  var backButton = document.getElementById("back");
  var body = document.getElementById("body");
  var user = decodeURIComponent(document.cookie.substring(5)); // ASSUMING USER IS THE ONLY COOKIE ON THE PAGE, FORMAT IS user="**username**", so substring 5 gets everything after the =.

  body.insertAdjacentHTML("afterbegin", "<h3>" + user + "'s Quiz!</h3>");
  body.style.display = "none";     // Hiding dummy input from user while loadNextQuestion sets initial values
  loadNextQuestion();               // Insert first question with default global value n = 0
  nextButton.onclick = function() {
    if ( !handleAnswer() ) { // If handleAnswer returns false, fire alert and end the sequence
      alert("Please select an answer to this question before moving to the next question!");
    } else if (++questionQueue < allQuestions.length) {  // Check for end of questions AND update the questionQueue!
      loadNextQuestion();                         // If not end, load next question
      if (allQuestions[questionQueue].userAnswer) { // If userAnswer is not null (meaning user has selected an answer and used the back button)
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
    }
  };

}
