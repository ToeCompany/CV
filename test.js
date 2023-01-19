
//const randomVerse = require('random-verse');
//const bibleverses = require('bibleverses');

//const devotionVerse =require('devotions-cli');

//const ivanBible = require('ivanbible');

//console.log(get_esv_text());
//console.log(randomVerse());


/*bibleverses.retrievePassage('John 1:1-3')
    .then(response => {
        console.log(response)
    })
    .catch(err => {
        console.log(err)
    });
*/


const API_KEY = '04973bb61e0a276346ef7ba854e718ce530a823c'
const API_URL = 'https://api.esv.org/v3/passage/text/'



fetch(`https://${API_KEY}@api.esv.org/v3/passage/text/`, {
    method: 'GET',
    headers: {
        'q': 'John 3:16',
    },
})
.then(response => response.text())
.then(text => console.log(text))