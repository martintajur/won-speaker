var token = process.argv[2];

if (!token) {
	console.log('Please supply a Pipedrive API token as a command line argument.');
	console.log('E.g. node index.js e80b03cb6a8764899be2eeaf4e8x9f43');
	process.exit(1);
}

var Player = require('player'),
	Pipedrive = require('pipedrive'),
	pipedrive = new Pipedrive.Client(token, { strictMode: true });

var player = new Player('./coinstash.mp3');

player.on('error', function(err) {
	// silently catch the errors in order to omit player's undesired error
});

pipedrive.on('connect', function() {
	console.log('Ready! Now go win some deals.');
});

pipedrive.on('deal.updated', function(err, deal) {
	if (deal.current && deal.previous && deal.current.status === 'won' && deal.previous.status !== 'won') {
		player.play(function(err, player) {
			console.log(deal.current.title + ' (' + deal.current.value + ' ' + deal.current.currency + ')');
		});
	}
});
