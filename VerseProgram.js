const axios = require('axios');
const { Client } = require('whatsapp-web.js');

const client = new Client();
const qrcode = require('qrcode-terminal');
const { MessageMedia } = require('whatsapp-web.js');

const media = 'https://media.giphy.com/media/iejCyfUFYz6VHN4VVC/giphy.gif';

const retreat = 'The Solid Ground Winter Retreat Registration is now available! In Feb, we\'ll be heading up to Zephyr Cove in Lake Tahoe for a weekend full of worship, fellowship, and fun! Lord willing, our theme will be "Praying the Bible." Pastor Paul, Luke, and Ivan will be teaching and guiding discussion on the power and importance of prayer. You won\'t want to miss it! Registration for the weekend is $120, but if the price is a hindrance to your attendance, please let us know. We want everyone to participate!  Registration is available through the link below or on the Grace Fair Oaks App. ';
const retreatLink = 'https://gracefairoaks.us2.list-manage.com/track/click?u=16f81755db883ee0a7afa3eb8&id=f6565a9190&e=82daee9bde';

const solidLocation = '7pm at 8610 Kingdale Ave, Orangevale';

const ugm = 'Solid Ground will be going to UGM on Feb 7, 2023 at 7:10pm. The address is 400 Bannon Street Sacramento, CA 95811. Please contact Paul if you would like to make it and/or need ride arragements';

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
  }else if(message.body.includes('retreat info')){
    client.sendMessage(message.from, retreat);
    client.sendMessage(message.from, retreatLink);
  }else if(message.body.includes('UGM')){
    client.sendMessage(message.from, ugm);
  }else if(message.body.includes('location')){
    client.sendMessage(message.from, solidLocation);
  }
  message.react('😎');
  }
});
 
 
client.initialize();