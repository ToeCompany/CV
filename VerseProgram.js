const axios = require('axios');
const { Client } = require('whatsapp-web.js');

const client = new Client();
const qrcode = require('qrcode-terminal');
const { MessageMedia } = require('whatsapp-web.js');

const media = 'https://media.giphy.com/media/iejCyfUFYz6VHN4VVC/giphy.gif';

const gospel = 'https://gracefairoaks.com/what-is-the-gospel';
let verse = '';
let webApiUrl = 'https://api.esv.org/v3/passage/text/';
let tokenStr = '04973bb61e0a276346ef7ba854e718ce530a823c';


client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
    client.getChats().then((chats) => {
        console.log(chats[0]);
    });
});

client.on('message', message => {
	if(message.body.includes('Solid Dude,')) {
    if(message.body.includes('show me')){
    verse = message.body.substring(19);
    const params = {
      'q': verse,
      'include-headings': 'False',
      'include-footnotes': 'False',
      'include-verse-numbers': 'False',
      'include-short-copyright': 'False',
      'include-passage-references': 'True'
    };
  
  const headers = { Authorization: `Token ${tokenStr}`};
  return axios.get(webApiUrl, { headers, params}).then(function (response) {
      // handle success
      console.log(response.data.passages[0]);
      client.sendMessage(message.from, response.data.passages[0]);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
	  }else if(message.body.includes('what is the gospel?')){
      client.sendMessage(message.from, gospel);
  }else if(message.body.includes('should I go to group today?')){
    client.sendMessage(message.from, media);
  }
  //client.l
  }
});
 
 
client.initialize();