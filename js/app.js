//Step 1 Declare Variables
//Set Questions
var questions = [{
    //Question 1
    question: "If you were strolling along this street, where would you be?",
    imageUrl: 'images/Montmartre.jpg',
    choices: ["Paris, France", 'Prague, Czech Republic', 'Montreal, Canada'],
    correct: 0,
    details: "Paris, France: This is the famous Montmartre neighborhood."
}, {
    //Question 2
    question: "Which beautiful country has 10 times more sheep than people?",
    imageUrl: 'images/nz-sheep.jpg',
    choices: ["Ireland", 'South Africa', 'New Zealand'],
    correct: 2,
    details: "New Zealand: Also home to the flightless and endangered kiwi bird."
}, {
    //Question 3
    question: "This popular restaurant street can be found in...",
    imageUrl: 'images/guijie.jpg',
    choices: ["Manila, Phillipines", 'Beijing, China', 'Kuala Lumpur, Malaysia'],
    correct: 1,
    details: "Beijing, China: Guijie (aka Ghost Street) is a popular spot for customers and vendors. "
}, {
    //Question 4
    question: "This country is famous for this kind of arena.",
    imageUrl: 'images/Ronda.jpg',
    choices: ["United States", 'Spain', 'Brazil'],
    correct: 1,
    details: "Spain: This bullfighting arena is in Ronda."
}, {
    //Question 5
    question: "Where can you find this majestic scene?",
    imageUrl: 'images/us-bison.jpg',
    choices: ["United States", 'Poland', 'Australia'],
    correct: 0,
    details: "United States: The North American bison is related to, but distinct from, species of buffalo found elsewhere in the world."
}, {
    //Question 6
    question: "Where is this iconic building located?",
    imageUrl: 'images/red-square.jpg',
    choices: ["Istanbul, Turkey", 'Berlin, Germany', 'Moscow, Russia'],
    correct: 2,
    details: "Moscow, Russia: This is the famous Red Square."
}, {
    //Question 7
    question: "Which country offers this view?",
    imageUrl: 'images/patagonia.jpg',
    choices: ["Chile", 'New Zealand', 'Canada'],
    correct: 0,
    details: "Chile: Patagonia is an adventure lover's paradise."
}, {
    //Question 8
    question: "This very old and very famous site is found in...",
    imageUrl: 'images/angkor-wat.jpg',
    choices: ["India", 'Cambodia', 'China'],
    correct: 1,
    details: "Cambodia - Angkor Wat was built in the early 12th century."
}, {
    //Question 9
    question: "Bright colors and narrow alleys are common sights in this country.",
    imageUrl: 'images/Morocco.jpg',
    choices: ["Thailand", 'Croatia', 'Morocco'],
    correct: 2,
    details: "Morocco: Chefchaouen in particular is known for its blue buildings."
}, {
    //Question 10
    question: "If you were mooring your sailboat in this harbor, what nation would you be in?",
    imageUrl: 'images/victoria-harbor.jpg',
    choices: ["England", 'Canada', 'Australia'],
    correct: 1,
    details: "Canada: Victoria Harbor is a popular entrance to Vancouver Island for those coming by boat or seaplane."
}];
//Other Variables
var questionNum = 0;
var numCorrect = 0;
var questionTotal = questions.length;

//Step 2 Declare Functions
//Show questions
//alert('I have activated the startQuiz function');
function displayQuestions() {
    $('#userChoices').empty();
    //Display question text
    $('#addQuestionText').text(questions[questionNum].question);
    //display image
    $('#image').html('<img src =" ' + questions[questionNum].imageUrl + '" class="image-class" />');
    //show choices
    var totalChoices = questions[questionNum].choices.length;
    for (var i = 0; i < totalChoices; i++) {
        $('#userChoices').append("<li>" + "<input id='option' class='option' type='radio' name='option' value='" + i + "'>" + (questions[questionNum].choices[i] + "</li>"))
    } //update question tracker
    $('#question-counter').text("Question " + (questionNum + 1) + "/" + questions.length);
    //update score tracker
    $('#score').text('Score ' + (numCorrect) + "/" + questions.length);

    var htmlOutput = "";
    htmlOutput += '<div class="answers">';
    htmlOutput += '<div class="answer-text"> <h3>' + (questionNum + 1) + ') ' + 'Q: ' + questions[questionNum].question + '</h3>';
    htmlOutput += '<p>A: ' + questions[questionNum].details + '</p></div>';
    htmlOutput += '<div class="answer-image"><img src ="' + questions[questionNum].imageUrl + '" class="image-class" /></div>';
    htmlOutput += '</div>';
    $('.answers-container').append(htmlOutput);
}

//loading questions
function nextQuestion() {
    //update score
    var userGuess = $("input[id='option']:checked").val();
    var correctAnswer = questions[questionNum].correct;
    //console.log("userGuess: " + userGuess);
    //console.log("correctAnswer: " + correctAnswer);
    if (userGuess == correctAnswer) {
        numCorrect++;
        console.log(numCorrect);
        //alert('I have activated the function nextQuestion')
    }
    //submit final question
    if (questionNum + 1 == questions.length) {
        //update final score at top
        $('#finalScore').text("You got " + numCorrect + '/' + questions.length + ' right!')
            //show final section only
        $('.questions').hide();
        $('.introduction').hide();
        $('.final').show();
    } //load another question
    else {
        questionNum++;
        displayQuestions();
    }
}


//try again
function tryAgain() {
    document.location.reload(true);
    //alert('I have activated the tryAgain function')
}

//Step 3 Use Functions
$(document).ready(function () {
    //on page load
    $('.questions').hide();
    $('.final').hide();
    $('.introduction').show();

    //starts quiz
    $('#start').on('click', function () {
        $('.introduction').hide();
        $('.final').hide();
        $('.questions').show();
        displayQuestions();
    })

    //hits guess button
    $('#submit').on('click', function () {
        if ($("#userChoices input[id='option']").is(':checked')) {
            nextQuestion();

        } else {
            alert("Please choose an option!");
        }
    })

    //hits try again button
    $('#reset').on('click', function () {
        tryAgain();
    })

})
