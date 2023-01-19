const { Client, RemoteAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

require('dotenv').config({ path: 'ENV_FILENAME' });

// Require database
const { MongoStore } = require('wwebjs-mongo');
const mongoose = require('mongoose');
mongoose.set("strictQuery", true);

// Load the session data
mongoose.connect(process.env.MONGODB_URI).then(() => {
    const store = new MongoStore({ mongoose: mongoose });
    const client = new Client({
        authStrategy: new RemoteAuth({
            store: store,
            backupSyncIntervalMs: 300000
        })
    });
    client.on('qr', qr => {
        qrcode.generate(qr, {small: true});
    });
    
    client.on('ready', () => {
        console.log('Client is ready!');
    });
    
    client.on('message', message => {
        if(message.body === '!ping') {
            client.sendMessage(message.from, 'pong');
        }
    });

    client.initialize();
});


