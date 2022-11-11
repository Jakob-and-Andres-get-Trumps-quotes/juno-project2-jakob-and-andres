trumpApp = {};

fakeArray = ["That's what they say about people from Mexico, hard workers, but not that smart. Not smart, like me.", "insert trump quote here", "insert trump quote here"]

const url = 'https://api.tronalddump.io/random/quote'

// main starting point of the app, the randomizer will either pick 1 or 0 which we base everything else on.
trumpApp.random = () => {
    const randomNum = Math.floor(Math.random() * 2);
    console.log(randomNum)
    // if 1 is chosen, make a call to the api to return a random quote
    if (randomNum === 1) {
        async function getQuote(){
            const myObject = await fetch(url);
            const parsedObject = await myObject.json();
            return parsedObject;
        }
        getQuote()
        .then((quoteData)=>{
            // eventually gonna add the function that moves the data onto the page
            // trumpApp.displayQuote(quoteData.value)
            console.log(quoteData.value)
        })
    // if the number is 0, 
    } else {
        getRandomFakeQuote();
        // trumpApp.displayQuote(-fake quote goes here-)
    }
};

trumpApp.getRandomFakeQuote = () => {
    const arrayLength = Math.floor(Math.random() * fakeArray.length);
    return fakeArray[arrayLength];
}

// trumpApp.displayQuote = (quote) => {
//     console.log(quote)
// }





// this code will be pretty useful for our fakeArray 
// const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// function getRandomDay() {
//   const randomDay = Math.floor(Math.random() * days.length);

//   return days[randomDay];
// }













trumpApp.init = () => {
    // add all functions here that will be run on startup
    trumpApp.random()
};

trumpApp.init();



///////////////////////////////////////////////////////////////////////

// fetch(url)
//         .then((res) => {
//             console.log(res.json())
//             return res.json()
//         .then( (data) => {
//             trumpApp.displayQuote(data.value)
//             })
//         })