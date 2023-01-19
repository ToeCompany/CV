const { Client } = require('whatsapp-web.js');
const client = new Client();
const qrcode = require('qrcode-terminal');

const randomVerse = require('random-verse')

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
	if(message.body === '!ping') {
		client.sendMessage(message.from, randomVerse);
	}
});
 
 
client.initialize();
 