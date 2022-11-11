trumpApp = {};

fakeArray = ["That's what they say about people from Mexico, hard workers, but not that smart. Not smart, like me.", "insert trump quote here", "insert trump quote here"]

const url = 'https://api.tronalddump.io/random/quote'


trumpApp.random = () => {
    const randomNum = Math.floor(Math.random() * 2);
    console.log(randomNum)
    if (randomNum === 1) {
        async function getQuote(){
            const myObject = await fetch(url);
            const parsedObject = await myObject.json();
            return parsedObject;
        }
        getQuote()
        .then((quoteData)=>{
          console.log(quoteData.value)
        })
    };
};


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