// Create a list that holds all of your cards and define lets/consts/vars
let card = document.getElementsByClassName("card");
let cards = [...card]
console.log(cards);
const deck = document.getElementById("card-deck");
const angels = document.querySelectorAll(".fa-angellist");
let moves = 0;
let count = document.querySelector(".moves");
let matchedCard = document.getElementsByClassName("match");
let angelsList = document.querySelectorAll(".angels li");
let closeIcon = document.querySelector(".close");
let results = document.getElementById("popup")
var opened = [];

// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Starts game when page loads
document.body.onload = startGame();

// Start game actions
function startGame() {
    cards = shuffle(cards);
    for (var i = 0; i < cards.length; i++) {
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    moves = 0;
    count.innerHTML = moves;
    for (var i = 0; i < angels.length; i++) {
        angels[i].style.color = "#1c967d";
        angels[i].style.visibility = "visible";
    }
    second = 0;
    minute = 0;
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}

// Display cards
var display = function() {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};

// Opened cards action
function cardOpen() {
    opened.push(this);
    var len = opened.length;
    if (len === 2) {
        moveCount();
        if (opened[0].type === opened[1].type) {
            matched();
        } else {
            unmatched();
        }
    }
};

// Cards match
function matched() {
    opened[0].classList.add("match", "disabled");
    opened[1].classList.add("match", "disabled");
    opened[0].classList.remove("show", "open", "no-event");
    opened[1].classList.remove("show", "open", "no-event");
    opened = [];
}

// Cards don't match
function unmatched() {
    opened[0].classList.add("unmatched");
    opened[1].classList.add("unmatched");
    disable();
    setTimeout(function() {
        opened[0].classList.remove("show", "open", "no-event", "unmatched");
        opened[1].classList.remove("show", "open", "no-event", "unmatched");
        enable();
        opened = [];
    }, 1100);
}

// Adding event listeners to cards
for (var i = 0; i < cards.length; i++) {
    card = cards[i];
    card.addEventListener("click", display);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click", congrat);
};


// Disable cards
function disable() {
    Array.prototype.filter.call(cards, function(card) {
        card.classList.add('disabled');
    });
}


// Enable cards and disable matched cards
function enable() {
    Array.prototype.filter.call(cards, function(card) {
        card.classList.remove('disabled');
        for (var i = 0; i < matchedCard.length; i++) {
            matchedCard[i].classList.add("disabled");
        }
    });
}

// Counting moves
function moveCount() {
    moves++;
    count.innerHTML = moves;
    if (moves == 1) {
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
    if (moves > 8 && moves < 12) {
        for (i = 0; i < 3; i++) {
            if (i > 1) {
                angels[i].style.visibility = "collapse";
            }
        }
    } else if (moves > 13) {
        for (i = 0; i < 3; i++) {
            if (i > 0) {
                angels[i].style.visibility = "collapse";
            }
        }
    }
}

// Timer
var second = 0,
    minute = 0;
hour = 0;
var timer = document.querySelector(".timer");
var interval;

function startTimer() {
    interval = setInterval(function() {
        timer.innerHTML = minute + "mins " + second + "secs";
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
}

// Congratulation pop-up
function congrat() {
    if (matchedCard.length == 16) {
        clearInterval(interval);
        finalTime = timer.innerHTML;
        results.classList.add("show");
        var starRating = document.querySelector(".angels").innerHTML;
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;
        closeResults();
    };
}

// Close results
function closeResults() {
    closeIcon.addEventListener("click", function(e) {
        results.classList.remove("show");
        startGame();
    });
}

// Play Again 
function playAgain() {
    results.classList.remove("show");
    startGame();
}