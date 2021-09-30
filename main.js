const Sockette = require('sockette');

if (!globalThis.WebSocket) {
	global.WebSocket = require('ws');
}

const token = 'paste-token-here'; // Paste token from Lumia Stream (Settings > Advanced > Developers API > Show Token)

const socket = new Sockette(`ws://localhost:39231/api?token=${token}`, {
	timeout: 5000,
	onopen: async (event) => {
		console.debug('Lumia Websocket opened');
		try {
			// Example of sending a command using a websocket
			SendWebsocket({ type: 'alert', params: { value: 'twitch-follower' } });
			console.debug('Lumia Websocket authenticated');
		} catch (err) {
			console.error('Lumia Websocket registerError: ', err.message);
		}
	},
	onmessage: handleMessage,
	onreconnect: (e) => {
		console.debug({
			type: 'error',
			title: 'Lumia-Reconnect',
			message: e,
		});
	},
	onmaximum: (e) => {
		console.debug({
			type: 'error',
			title: 'Lumia-MaximumAttempts',
			message: e,
		});
	},
	onclose: (e) => {
		console.debug('INFO: Socket Closed\n', e.code);
	},
	onerror: (event) => {
		console.error('Lumia Websocket err: ', event.target);
	},
});

function SendWebsocket(event) {
	socket.send(JSON.stringify(event));
}

// Handles incoming messages fulfilling the promise if it has one, otherwise checks the type of message
async function handleMessage(event) {
	try {
		const msg = JSON.parse(event.data);
		console.debug('Lumia Websocket server event msg: ', msg);
	} catch (err) {
		console.error('Lumia Websockets Handle Message err: ', err);
	}
}

const ValidEvents = {
	CHAT_TWITCH: 'chat/twitch',
	CHAT_FACEBOOK: 'chat/facebook',
	CHAT_YOUTUBE: 'chat/youtube',
	CHAT_GLIMESH: 'chat/glimesh',
	CHAT_TROVO: 'chat/trovo',
	CHAT_COMMANDS: 'chat/commands',
	CHAT_COMMANDS_TWITCH: 'chat/commands/twitch',
	CHAT_COMMANDS_FACEBOOK: 'chat/commands/facebook',
	CHAT_COMMANDS_YOUTUBE: 'chat/commands/youtube',
	CHAT_COMMANDS_GLIMESH: 'chat/commands/glimesh',
	CHAT_COMMANDS_TROVO: 'chat/commands/trovo',
	TIMEOFUSE: 'time-of-use',
	LIVE: 'live',
	TWITCH_POINTS: 'twitch/points',
	TWITCH_EXTENSIONS: 'twitch/extensions',
	PULSE_RATE_MAX: 'pulse/rate/max',
	PULSE_RATE_MIN: 'pulse/rate/min',
	PULSE_CALORIES_MAX: 'pulse/calories/max',
	PULSE_CALORIES_MIN: 'pulse/calories/min',
	ALERTS_TWITCH_FOLLOWERS: 'alerts/twitch/followers',
	ALERTS_TWITCH_SUBSCRIBERS: 'alerts/twitch/subscribers',
	ALERTS_TWITCH_BITS: 'alerts/twitch/bits',
	ALERTS_TWITCH_HOSTS: 'alerts/twitch/hosts',
	ALERTS_TWITCH_RAIDS: 'alerts/twitch/raids',
	ALERTS_YOUTUBE_SUBSCRIBERS: 'alerts/youtube/subscribers',
	ALERTS_YOUTUBE_MEMBERS: 'alerts/youtube/members',
	ALERTS_YOUTUBE_SUPERCHATS: 'alerts/youtube/superchats',
	ALERTS_YOUTUBE_SUPERSTICKERS: 'alerts/youtube/superstickers',
	ALERTS_FACEBOOK_FOLLOWERS: 'alerts/facebook/followers',
	ALERTS_FACEBOOK_REACTIONS: 'alerts/facebook/reactions',
	ALERTS_FACEBOOK_STARS: 'alerts/facebook/stars',
	ALERTS_FACEBOOK_SUPPORTS: 'alerts/facebook/supports',
	ALERTS_FACEBOOK_SHARES: 'alerts/facebook/shares',
	ALERTS_FACEBOOK_FANS: 'alerts/facebook/fans',
	ALERTS_GLIMESH_FOLLOWERS: 'alerts/glimesh/followers',
	ALERTS_GLIMESH_SUBSCRIBERS: 'alerts/glimesh/subscribers',
	ALERTS_STREAMLABS_DONATIONS: 'alerts/streamlabs/donations',
	ALERTS_STREAMLABS_CHARITY: 'alerts/streamlabs/charity',
	ALERTS_STREAMLABS_MERCH: 'alerts/streamlabs/merch',
	ALERTS_STREAMLABS_REDEMPTIONS: 'alerts/streamlabs/redemptions',
	ALERTS_STREAMLABS_PRIMEGIFTS: 'alerts/streamlabs/primegifts',
	ALERTS_STREAMELEMENTS_DONATIONS: 'alerts/streamelements/donations',
	ALERTS_STREAMELEMENTS_MERCH: 'alerts/streamelements/merch',
	ALERTS_STREAMELEMENTS_REDEMPTIONS: 'alerts/streamelements/redemptions',
	ALERTS_EXTRALIFE_DONATIONS: 'alerts/extralife/donations',
	ALERTS_DONORDRIVE_DONATIONS: 'alerts/donordrive/donations',
	ALERTS_TIPEEESTREAM_DONATIONS: 'alerts/tipeestream/donations',
	ALERTS_TILTIFY_CAMPAIGNDONATIONS: 'alerts/tiltify/campaigndonations',
	ALERTS_PATREON_CAMPAIGNPLEDGES: 'alerts/patreon/campaignpledges',
	ALERTS_TREATSTREAM_TREATS: 'alerts/treatstream/treats',
	ALERTS_TREATSTREAM_DONATIONS: 'alerts/tipeeestream/donations',
	ALERTS_PULSE_RATE: 'alerts/pulse/rate',
	ALERTS_PULSE_CALORIES: 'alerts/pulse/calories',
};
