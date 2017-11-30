const {
	Command
} = require('discord.js-commando');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'whatis',
			group: 'utility',
			memberName: 'whatis',
			description: 'Attempts to figure out what the image is.',
			examples: ['whatis (image, it needs to be attached)'],
			throttling: {
				usages: 3,
				duration: 60
			}
		});
	}
	async run(msg) {
		if (!msg.attachments.array()[0]) return msg.reply('you must attach an image');
		let options = {
			url: msg.attachments.array()[0].url,
			dest: './data/cache.jpg'
		}
		let lablesString = "returned "
		imageDownloader.image(options)
			.then(({
				filename,
				image
			}) => {
				console.log('File saved to', filename)
				let request = {
					source: {
						filename: './data/cache.jpg'
					}
				};
				// performs label detection on the image file
				vision.labelDetection(request)
					.then((results) => {
						const labels = results[0].labelAnnotations;
						labels.forEach((label) => lablesString = lablesString + label.description + ", ");
						fs.unlink('./data/cache.jpg', function(err) {
							if (err && err.code == 'ENOENT') {
								// file doens't exist
								console.info("File doesn't exist, won't remove it.");
							} else if (err) {
								// other errors, e.g. maybe we don't have enough permission
								console.error("Error occurred while trying to remove file");
							}
						});
						return msg.reply(lablesString);
					})
					.catch((err) => {
						console.error('ERROR:', err);
					});
			}).catch((err) => {
				throw err
			})
	}
};
