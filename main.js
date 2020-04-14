const io = require('socket.io-client');

const token = 'paste-token-here'; // Paste token from Lumia Stream (Settings > Advanced > API > Socket API > Show Token)

const socket = io(`http://localhost:39252?token=${token}`);

console.log('Starting socket client');
socket.on('connect', () => {
	console.log('Connected to socket');
});

socket.on('event', (eventData) => {
	console.log('Event', eventData);
});

socket.on('disconnect', (reason) => {
	console.log('Disconnected', reason);
});
