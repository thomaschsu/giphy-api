// Variables
var correct = 0;
var incorrect = 0;
var number = 120;
var intervalId;
var start = $('#start');
var end = $('#end');
var instructions = $('#instructions');
var input1, input2, input3, input4, input5, input6, input7, input8;
input1 = input2 = input3 = input4 = input5 = input6 = input7 = input8 = "";
var radioInput = '<input type="radio" ';
var labelFor = '<label for="';
var radioId = 'id="';
var radioValue = 'value="';
var results = $('#results');
var endLabel = '</label>';
var timer = $('#timer');
var question = $('#question-container');
var end = $('#end');

// Questions
var q1 = {
    q: 'Who played Neo in The Matrix?',
    a: ['Keanu Reeves', 'Denzel Washington', 'Johnny Depp', 'Tom Hanks'],
    ca: 'Keanu Reeves'
};

var q2 = {
    q: 'BB-8 is an astromech droid from what film?',
    a: ['Alien', 'Star Wars', 'Nightmare on Elm Street', 'E.T.'],
    ca: 'Star Wars'
};

var q3 = {
    q: 'What fictional city is the home of Batman?',
    a: ['Gateway City', 'The Hidden City', 'Zenith City', 'Gotham City'],
    ca: 'Gotham City'
};

var q4 = {
    q: 'Which actress played Katniss Everdeen in "The Hunger Games"?',
    a: ['Anne Hathaway', 'Kate Winslet', 'Jennifer Lawrence', 'Natalie Portman'],
    ca: 'Jennifer Lawrence'
};

var q5 = {
    q: 'Which movie features Bruce Willis as John McClane, a New York police officer, taking on a gang of criminals in a Los Angeles skyscraper on Christmas Eve?',
    a: ['Jingle All the Way', 'Die Hard', 'The Santa Clause', 'Jack Frost'],
    ca: 'Die Hard'
};

var q6 = {
    q: 'Which Tom Hanks movie won the Academy Award for Best Picture in 1994?',
    a: ['Forrest Gump', 'Cast Away', 'The Terminal', 'The Green Mile'],
    ca: 'Forrest Gump'
};

var q7 = {
    q: 'What was the name of the monkey in the Disney movie "Aladdin"?',
    a: ['Gazeem', 'Jasmine', 'Jafar', 'Abu'],
    ca: 'Abu'
};

var q8 = {
    q: 'Bruce Willis played a convict turned time traveler in what 1995 movie?',
    a: ['Die Hard 3', 'The Sixth Sense', '12 Monkeys', 'Looper'],
    ca: '12 Monkeys'
};

// Add values, names to answers
for (var i = 0; i < 4; i++) {
    input1 += radioInput + 'name="answer1"' + radioId + q1.a[i] + '"' + radioValue + q1.a[i] + '">';
    input1 += labelFor + q1.a[i] + '">' + q1.a[i] + endLabel;
    input2 += radioInput + 'name="answer2"' + radioId + q2.a[i] + '"' + radioValue + q2.a[i] + '">';
    input2 += labelFor + q2.a[i] + '">' + q2.a[i] + endLabel;
    input3 += radioInput + 'name="answer3"' + radioId + q3.a[i] + '"' + radioValue + q3.a[i] + '">';
    input3 += labelFor + q3.a[i] + '">' + q3.a[i] + endLabel;
    input4 += radioInput + 'name="answer4"' + radioId + q4.a[i] + '"' + radioValue + q4.a[i] + '">';
    input4 += labelFor + q4.a[i] + '">' + q4.a[i] + endLabel;
    input5 += radioInput + 'name="answer5"' + radioId + q5.a[i] + '"' + radioValue + q5.a[i] + '">';
    input5 += labelFor + q5.a[i] + '">' + q5.a[i] + endLabel;
    input6 += radioInput + 'name="answer6"' + radioId + q6.a[i] + '"' + radioValue + q6.a[i] + '">';
    input6 += labelFor + q6.a[i] + '">' + q6.a[i] + endLabel;
    input7 += radioInput + 'name="answer7"' + radioId + q7.a[i] + '"' + radioValue + q7.a[i] + '">';
    input7 += labelFor + q7.a[i] + '">' + q7.a[i] + endLabel;
    input8 += radioInput + 'name="answer8"' + radioId + q8.a[i] + '"' + radioValue + q8.a[i] + '">';
    input8 += labelFor + q8.a[i] + '">' + q8.a[i] + endLabel;
}

// Press start, opens game / starts counter (120 seconds)
start.click(startGame);

// // Hit done button and goes to results page
end.click(endGame);

// Hides results, timer, questions from start
results.hide();
timer.hide();
question.hide();
end.hide();

// Time remaining is 120 seconds for entire game
function startTimer() {
    number--;
    timer.html("<h2>Time remaining: " + number + " Seconds</h2>");
    // When time hits 0, show results and remove everything else and check questions
    if (number === 0) {
        endGame();
    }
}

function startGame() {
    // Start timer
    run();
    timer.show();
    question.show();
    end.show();
    // Remove Start button
    start.hide();
    // Remove instructions
    instructions.hide();
    // Append questions, answers
    $('#question1').append('<h3>#1: ' + q1.q + '</h3>');
    $('#answer1').append(input1);
    $('#question2').append('<h3>#2: ' + q2.q + '</h3>');
    $('#answer2').append(input2);
    $('#question3').append('<h3>#3: ' + q3.q + '</h3>');
    $('#answer3').append(input3);
    $('#question4').append('<h3>#4: ' + q4.q + '</h3>');
    $('#answer4').append(input4);
    $('#question5').append('<h3>#5: ' + q5.q + '</h3>');
    $('#answer5').append(input5);
    $('#question6').append('<h3>#6: ' + q6.q + '</h3>');
    $('#answer6').append(input6);
    $('#question7').append('<h3>#7: ' + q7.q + '</h3>');
    $('#answer7').append(input7);
    $('#question8').append('<h3>#8: ' + q8.q + '</h3>');
    $('#answer8').append(input8);
}

// Function for running timer
function run() {
    clearInterval(intervalId);
    intervalId = setInterval(startTimer, 1000);
}

// Function for ending game
function endGame() {
    question.hide();
    timer.hide();
    results.show();
    end.hide();
    check();
    showResults();
}

// Function for checking each question's answer
function check() {
    if ($('input[name="answer1"]:checked').val() === q1.ca) {
        correct++;
    } else {
        incorrect++;
    }

    if ($('input[name="answer2"]:checked').val() === q2.ca) {
        correct++;
    } else {
        incorrect++;
    }
    
    if ($('input[name="answer3"]:checked').val() === q3.ca) {
        correct++;
    } else {
        incorrect++;
    }
    
    if ($('input[name="answer4"]:checked').val() === q4.ca) {
        correct++;
    } else {
        incorrect++;
    }
    
    if ($('input[name="answer5"]:checked').val() === q5.ca) {
        correct++;
    } else {
        incorrect++;
    }
    
    if ($('input[name="answer6"]:checked').val() === q6.ca) {
        correct++;
    } else {
        incorrect++;
    }
    
    if ($('input[name="answer7"]:checked').val() === q7.ca) {
        correct++;
    } else {
        incorrect++;
    }
    
    if ($('input[name="answer8"]:checked').val() === q8.ca) {
        correct++;
    } else {
        incorrect++;
    }
}

// Display results
function showResults() {
    results.html("<h2>All done!</h2>");
    results.append("<h4>Correct Answers: " + correct + "</h4>");
    results.append("<h4>Incorrect Answers: " + incorrect + "</h4>");
}