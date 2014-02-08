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

var queue = 0, totalScore = 0;

function loadQuestion() {
  var currentQuestionData = allQuestions[queue];

  $("#qnum").text("Question " + (queue + 1).toString());
  $("#question").text(currentQuestionData.question);
  $(".choice").text(
    function(n) {
      $(this).text(currentQuestionData.choices[n]);
    });
}

function checkAndScore() {
  var correctAnswer = allQuestions[queue].correctAnswer;
  var userAnswer = +$("input:radio:checked").val();

  if (userAnswer === correctAnswer) {
    totalScore++;
  }
}

$(document).ready(
  function() {
    loadQuestion();
    $("#next").on("click", function() {
      checkAndScore();
      if (++queue < allQuestions.length) {
        loadQuestion();
      } else {
        $("#body").html("<h1>Your score is:</h1><br/><h2>" + totalScore + " / " + allQuestions.length)
      }
    });
  })
