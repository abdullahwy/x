const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qr-image');
const express = require("express");
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

var public = path.join(__dirname, 'public');

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(public, 'index.html'));
});

app.use('/', express.static(public));


const server = app.listen(port, () => console.log(`Express app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

const client = new Client();

client.initialize();

client.on('loading_screen', (percent, message) => {
    console.log('LOADING SCREEN', percent, message);
});

client.on('qr', (qr) => {
    // NOTE: This event will not be fired if a session is specified.
    console.log('QR RECEIVED', qr);
});

client.on('authenticated', () => {
    console.log('AUTHENTICATED');
});

client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessful
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('qr', qr => {
    //qrcode.generate(qr, {small: true});
    var qr_png = qrcode.image(qr, {type: 'png'});
    qr_png.pipe(require('fs').createWriteStream('./public/qr.png'));
    console.log('QR Code Generated!')
});

client.on('message_create', async (msg) => {
        const chat = await message.getChat();

    if (message.body === prefix+'alive') {
		await message.reply(`*'X' Bot is Alive Now!*\n\n${base}`);
        message.react('😒')
	}
});

client.initialize();