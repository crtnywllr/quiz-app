//Step 1 Declare Variables
var questionNum = 0;
var numCorrect = 0;
var questionList;
var userAnswers = [];
//var questionTotal = questions.length;

//Step 2 Declare Functions
//Get questions from server
function getQuestions() {
   $.ajax('/questions', {
            method: 'GET',
            dataType: 'json'
        })
        .done(function(questions) {
            console.log(questions);
            displayQuestions(questions);
            questionList = questions;
        });
};

//Send user answer and compare with backend; store answer response
function getAnswer(userGuess){
    var stuff = {
        'question': questionNum,
        'answer': userGuess
    }
    $.ajax('/answers',{
        type:'POST',
        data:JSON.stringify(stuff),
        dataType:'json',
        contentType: 'application/json'
        
    })
    .done(function(answer) {
        var isCorrect  = answer.isCorrect;
        if(isCorrect){
            numCorrect++;
        }
        var details = answer.details;
        var currentQuestion = questionList[questionNum];
        currentQuestion.details = details; 
        nextQuestion(questionList);
    })
 }

//Display questions

   function displayQuestions(questions) {
    $('#userChoices').empty();
    //Display question text
    $('#addQuestionText').text(questions[questionNum].question);
    //display image
    $('#image').html('<img src =" ' + questions[questionNum].imageUrl + '" class="image-class" />');
    //show choices
    var totalChoices = questions[questionNum].choices.length;
    for (var i = 0; i < totalChoices; i++) {
        $('#userChoices').append("<li>" + "<input id='option' class='option' type='radio' name='option' value='" + questions[questionNum].choices[i] + "'>" + (questions[questionNum].choices[i] + "</li>"))
    } //update question tracker
    $('#question-counter').text("Question " + (questionNum + 1) + "/" + questions.length);
    //update score tracker
    $('#score').text('Score ' + (numCorrect) + "/" + questions.length);
  
}

//Loading next question
function nextQuestion(questionList) {
   
    //Appending info to final answers
      var htmlOutput = "";
      htmlOutput += '<div class="answers">';
      htmlOutput += '<div class="answer-text"> <h3>' + (questionNum + 1) + ') ' + 'Q: ' + questionList[questionNum].question + '</h3>';
      htmlOutput += '<p>Your Answer: ' + userAnswers[questionNum] + '</p>';
      htmlOutput += '<p>Correct Answer: ' + questionList[questionNum].details + '</p></div>';
      htmlOutput += '<div class="answer-image"><img src ="' + questionList[questionNum].imageUrl + '" class="image-class" /></div>';
      htmlOutput += '</div>';
      $('.answers-container').append(htmlOutput);
      
    //Submitting final question  
    if (questionNum + 1 == questionList.length) {
        //update final score at top
        $('#finalScore').text("You got " + numCorrect + '/' + questionList.length + ' right!')
            //show final section only
        $('.questions').hide();
        $('.introduction').hide();
        $('.final').show();
    } //Load another question
    else {
        questionNum++;
        displayQuestions(questionList); 
    }
}


//Reset quiz
function tryAgain() {
    document.location.reload(true);
    //alert('I have activated the tryAgain function')
}

//Step 3 Use Functions
$(document).ready(function () {
    //On page load
    $('.questions').hide();
    $('.final').hide();
    $('.introduction').show();

    //Starts quiz
    $('#start').on('click', function () {
        $('.introduction').hide();
        $('.final').hide();
        $('.questions').show();
        getQuestions();
    })

    //Hits guess button
    $('#submit').on('click', function (e) {
        e.preventDefault();
        if ($("#userChoices input[id='option']").is(':checked')) {
            var userGuess = $("input[id='option']:checked").val()
            userAnswers.push(userGuess);
            getAnswer(userGuess);

        } else {
            alert("Please choose an option!");
        }
    })

    //Hits try again button
    $('#reset').on('click', function () {
        tryAgain();
    })

});