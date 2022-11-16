trumpApp = {};

// this is where we keep our fake quotes
trumpApp.fakeArray = ["That's what they say about people from Mexico, hard workers, but not that smart. Not smart, like me.", "China China China. If you're not paying attention you're part of the problem", "Where are all the vaccines against the kung flu virus?", "If you work hard like me you can be as handsome and orange as I am","I have never done drugs","Why has Miami become the new Mexico","Congress has become a swamp", "NAFTA is the reason the Mexicans and Canada munch from us","Let's #MAGA all over the world", "Ignorance is bliss in a world of fake news"];

// hidden variables that track 1) what the randomizer chose 2) whether the user chose the correct answer 3) the users number of correct guesses 4) total number of user attempts
trumpApp.trumpOrNot = true;
trumpApp.answer = true;
trumpApp.score = 0;
trumpApp.attempts = 0;

// API URL which returns a random string
const url = 'https://api.tronalddump.io/random/quote';

// main starting point of the app, the randomizer will either pick 1 or 0 which we base everything else on.
trumpApp.random = () => {
    const randomNum = Math.floor(Math.random() * 2);
    // console.log(randomNum)
    // if 1 is chosen, make a call to the api to return a random quote
    if (randomNum === 1) {
        async function getQuote(){
            const myObject = await fetch(url);
            const parsedObject = await myObject.json();
            trumpApp.trumpOrNot = true;
            return parsedObject;
        }
        getQuote()
        .then((quoteData)=>{
            // then we take the raw string from the API and display with our function
            trumpApp.displayQuote(quoteData.value.replace(/(?:https?|ftp):\/\/[\n\S]+/g, ''));
        });
    // if the number is 0, get the fake quote
    } else {
        trumpApp.trumpOrNot = false;
        // callback function! displays the random quote
        trumpApp.displayQuote(trumpApp.getRandomFakeQuote());
    };
};

// function that pulls a random fabricated quote from the array at the top
trumpApp.getRandomFakeQuote = () => {
    const arrayLength = Math.floor(Math.random() * trumpApp.fakeArray.length);
    return trumpApp.fakeArray[arrayLength];
};

// function that takes an argument and puts it on the page as html.
trumpApp.displayQuote = (quote) => {
    const quoteParagraph = document.querySelector('#theQuote');
    quoteParagraph.textContent = quote;
};

// query selectors for the buttons
trumpApp.trumpButton = document.querySelector('#trumpButton');
trumpApp.notButton = document.querySelector('#notButton');
trumpApp.tryAgainButton = document.querySelector('#resetButton');
// query selector for the pop up page
trumpApp.popup = document.querySelector('.answerPopup');
// query selector for the pop up image
trumpApp.popupImg = document.querySelector('.resultContainer');
// query selector for the pop up text
trumpApp.popupTxtWrong = document.querySelector('#wrongAnswer');
trumpApp.popupTxtRight = document.querySelector('#rightAnswer');
// query selevtor for the score display
trumpApp.scoreDisplay = document.querySelector('#rightAnswers');
// query selevtor for the total attempts display
trumpApp.attemptsDisplay = document.querySelector('#totalAttempts');

// 'trump' button event listener that then checks the trumpOrNot variable to proceed to the correct pop up
trumpApp.trumpButton.addEventListener('click', function(){
    if (trumpApp.trumpOrNot) {
        // if you got it right, the "is user correct" variable gets updated, and the score increases
        trumpApp.answer = true;
        trumpApp.score = trumpApp.score + 1;
        // updates the score display
        trumpApp.scoreDisplay.innerHTML = trumpApp.score
        // then we run the variable through the pop up function which will chose the "trunmp" or "not" pop up
        trumpApp.poppupBuilder(trumpApp.answer);
    } else {
        // this pattern is repeated here and for the not button below 
        trumpApp.answer = false;
        trumpApp.poppupBuilder(trumpApp.answer);
    };
});

// 'not' button event listener that checks the trumpOrNot variable
trumpApp.notButton.addEventListener('click', function(){
    if (trumpApp.trumpOrNot) {
        trumpApp.answer = false;
        trumpApp.poppupBuilder(trumpApp.answer);
    } else {
        trumpApp.answer = true;
        trumpApp.score = trumpApp.score + 1;
        trumpApp.scoreDisplay.innerHTML = trumpApp.score
        trumpApp.poppupBuilder(trumpApp.answer);
    };
});

// 'try again' button listener that restarts the whole app
trumpApp.tryAgainButton.addEventListener('click', function(){
    // the main functino is run again, giving us a new quote
    trumpApp.random();
    // update the total attempts and displays
    trumpApp.attempts = trumpApp.attempts + 1;
    trumpApp.attemptsDisplay.innerHTML = trumpApp.attempts
    // make the popup disappear
    trumpApp.popup.classList.add("disappear");

    //
    console.log(trumpApp.score) // remove once the score tracker is shown on the screen //
});

// function that takes the hidden variable that tracks whether the user is correct, and picks which pop up to display based off that. this is done by manipulating the classes of elements in our html.
trumpApp.poppupBuilder = (answer) => {
    //check if answer is true or false
    if (answer) {
        // build the pop up for the correct guess 
        // class manipulations to chose the right image while also chosing the right text to display. this is repeated below
        trumpApp.popupImg.classList.remove("wrongImage");
        trumpApp.popupImg.classList.add("correctImage");
        trumpApp.popupTxtRight.classList.remove("disappear");
        trumpApp.popupTxtWrong.classList.add("disappear");
        
    } else {
        //build the pop up for the incorrect guess
        trumpApp.popupImg.classList.remove("correctImage");
        trumpApp.popupImg.classList.add("wrongImage");
        trumpApp.popupTxtWrong.classList.remove("disappear");
        trumpApp.popupTxtRight.classList.add("disappear");
    }
    // finally makes the pop up visible
    trumpApp.popup.classList.remove("disappear");
};









trumpApp.init = () => {
    // add all functions here that will be run on startup
    trumpApp.random();
};

trumpApp.init();

///////////////////////////////////////////////////////////////////////