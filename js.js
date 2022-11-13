trumpApp = {};

trumpApp.fakeArray = ["That's what they say about people from Mexico, hard workers, but not that smart. Not smart, like me.", "insert trump quote here1", "insert trump quote here2"]

trumpApp.trumpOrNot = true;
trumpApp.answer = true;

const url = 'https://api.tronalddump.io/random/quote'

// main starting point of the app, the randomizer will either pick 1 or 0 which we base everything else on.
trumpApp.random = () => {
    const randomNum = Math.floor(Math.random() * 2);
    // console.log(randomNum)
    // if 1 is chosen, make a call to the api to return a random quote
    if (randomNum === 1) {
        async function getQuote(){
            const myObject = await fetch(url);
            const parsedObject = await myObject.json();
            trumpApp.trumpOrNot = true
            return parsedObject;
        }
        getQuote()
        .then((quoteData)=>{
            // eventually gonna add the function that moves the data onto the page
            trumpApp.displayQuote(quoteData.value)
        })
    // if the number is 0, get the fake quote
    } else {
        trumpApp.trumpOrNot = false
        trumpApp.displayQuote(trumpApp.getRandomFakeQuote());
    };
};

// function that pulls a random fabricated quote from the array above
trumpApp.getRandomFakeQuote = () => {
    const arrayLength = Math.floor(Math.random() * trumpApp.fakeArray.length);
    return trumpApp.fakeArray[arrayLength];
};

// function that takes an argument and puts it on the page as html.
trumpApp.displayQuote = (quote) => {
    const quoteParagraph = document.querySelector('#theQuote')
    quoteParagraph.textContent = quote
};

// query selectors for the three buttons
trumpApp.trumpButton = document.querySelector('#trumpButton')
trumpApp.notButton = document.querySelector('#notButton')
trumpApp.tryAgainButton = document.querySelector('#resetButton')

// query selector for popup
trumpApp.popup = document.querySelector('.answerPopup')

// query selector for popup image
trumpApp.popupImg = document.querySelector('.resultContainer')

// query selector for popup text
trumpApp.popupTxtWrong = document.querySelector('#wrongAnswer')
trumpApp.popupTxtRight = document.querySelector('#rightAnswer')


// 'trump' button event listener that checks the trumpOrNot variable
trumpApp.trumpButton.addEventListener('click', function(){
    if (trumpApp.trumpOrNot) {
        // run you win function
        trumpApp.answer = true;
        trumpApp.poppupBuilder(trumpApp.answer)
    } else {
        // run the you lose function
        trumpApp.answer = false;
        trumpApp.poppupBuilder(trumpApp.answer)
    };
});

// 'not' button event listener that checks the trumpOrNot variable
trumpApp.notButton.addEventListener('click', function(){
    
    if (trumpApp.trumpOrNot) {
        // run you lose function
        trumpApp.answer = false;
        trumpApp.poppupBuilder(trumpApp.answer)
    } else {
        // run you win function
        trumpApp.answer = true;
        trumpApp.poppupBuilder(trumpApp.answer)
    };
});

// soon to be added try again button that resets the process
trumpApp.tryAgainButton.addEventListener('click', function(){
    // try again stuff like clearing the code
    trumpApp.random()
    //make popup disappear
    trumpApp.popup.classList.add("disappear");
});

trumpApp.poppupBuilder = (answer) => {
    //check if answer is true or false
    if (answer) {
        // build the poppup as correct
        trumpApp.popupImg.classList.remove("wrongImage");
        trumpApp.popupImg.classList.add("correctImage");

        trumpApp.popupTxtRight.classList.remove("disappear");
        trumpApp.popupTxtWrong.classList.add("disappear");
        
    } else {
        //build wrong poppup
        trumpApp.popupImg.classList.remove("correctImage");
        trumpApp.popupImg.classList.add("wrongImage");

        trumpApp.popupTxtWrong.classList.remove("disappear");
        trumpApp.popupTxtRight.classList.add("disappear");
    }
    // make popup pop
    trumpApp.popup.classList.remove("disappear");
};









trumpApp.init = () => {
    // add all functions here that will be run on startup
    trumpApp.random()
};

trumpApp.init();

///////////////////////////////////////////////////////////////////////
