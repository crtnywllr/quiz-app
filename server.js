var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var app = express();
app.use(express.static('public'));

var questions = [{
    //Question 1
    question: "If you were strolling along this street, where would you be?",
    imageUrl: 'images/Montmartre.jpg',
    choices: ["Paris, France", 'Prague, Czech Republic', 'Montreal, Canada']
}, {
    //Question 2
    question: "Which beautiful country has 10 times more sheep than people?",
    imageUrl: 'images/nz-sheep.jpg',
    choices: ["Ireland", 'South Africa', 'New Zealand']
}, {
    //Question 3
    question: "This popular restaurant street can be found in...",
    imageUrl: 'images/guijie.jpg',
    choices: ["Manila, Phillipines", 'Beijing, China', 'Kuala Lumpur, Malaysia']
}, {
    //Question 4
    question: "This country is famous for this kind of arena.",
    imageUrl: 'images/Ronda.jpg',
    choices: ["United States", 'Spain', 'Brazil']
}, {
    //Question 5
    question: "Where can you find this majestic scene?",
    imageUrl: 'images/us-bison.jpg',
    choices: ["United States", 'Poland', 'Australia']
}, {
    //Question 6
    question: "Where is this iconic building located?",
    imageUrl: 'images/red-square.jpg',
    choices: ["Istanbul, Turkey", 'Berlin, Germany', 'Moscow, Russia']
}, {
    //Question 7
    question: "Which country offers this view?",
    imageUrl: 'images/patagonia.jpg',
    choices: ["Chile", 'New Zealand', 'Canada']
}, {
    //Question 8
    question: "This very old and very famous site is found in...",
    imageUrl: 'images/angkor-wat.jpg',
    choices: ["India", 'Cambodia', 'China']
}, {
    //Question 9
    question: "Bright colors and narrow alleys are common sights in this country.",
    imageUrl: 'images/Morocco.jpg',
    choices: ["Thailand", 'Croatia', 'Morocco']
}, {
    //Question 10
    question: "If you were mooring your sailboat in this harbor, what nation would you be in?",
    imageUrl: 'images/victoria-harbor.jpg',
    choices: ["England", 'Canada', 'Australia']
   }];

var answers = [{
    question:1,
    correct: "Paris, France",
    details: "Paris, France: This is the famous Montmartre neighborhood."
}, {
    question:2,
    correct: "New Zealand",
    details: "New Zealand: Also home to the flightless and endangered kiwi bird."
}, {
    question:3,
    correct: "Beijing, China",
    details: "Beijing, China: Guijie (aka Ghost Street) is a popular spot for customers and vendors. "
}, {
    question:4,
    correct: "Spain",
    details: "Spain: This bullfighting arena is in Ronda."
}, {
    question:5,
    correct: "United States",
    details: "United States: The North American bison is related to, but distinct from, species of buffalo found elsewhere in the world."
}, {
    question:6,
    correct: "Moscow, Russia",
    details: "Moscow, Russia: This is the famous Red Square."
}, {
    question:7,
    correct: "Chile",
    details: "Chile: Patagonia is an adventure lover's paradise."
}, {
    question:8,
    correct: "Cambodia",
    details: "Cambodia - Angkor Wat was built in the early 12th century."
}, {
    question:9,
    correct: "Morocco",
    details: "Morocco: Chefchaouen in particular is known for its blue buildings."
}, {
    question:10,
    correct: "Canada",
    details: "Canada: Victoria Harbor is a popular entrance to Vancouver Island for those coming by boat or seaplane."
}];

app.get('/questions', function(req, res) {
    res.json(questions);
});

app.post('/answers', jsonParser, function(req, res) {
    var thisAnswer = answers.filter(function(answer){
        return answer.question == (req.body.question + 1);
    });
    console.log("correct answer " + thisAnswer[0].correct)
    console.log("req answer " + req.body.answer)
    var isCorrect = false;
    if( thisAnswer[0].correct == req.body.answer){
        var isCorrect = true;
    }
    var response = {
        "isCorrect":isCorrect,
        "correctAnswer":thisAnswer[0].correct,
        "details":thisAnswer[0].details
    }
    res.json(response);
});



app.listen(process.env.PORT || 8080);

exports.app = app;
exports.questions = questions;
exports.answers = answers;