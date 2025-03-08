const { request } = require('undici');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('yuri')
		.setDescription('Sends a yuri picture back!'),
	async execute(interaction) {
		await interaction.reply('Thinking...');
		const yuriResult = await request('https://safebooru.org/index.php?page=dapi&s=post&q=index&limit=750&tags=yuri&json=1');
		const yuriList = await yuriResult.body.json();
		randomNumber = Math.floor(Math.random() * yuriList.length - 1);
		const { file_url } = yuriList[randomNumber];
		let { source } = yuriList[randomNumber];

		// Pixiv link fix
		if (source.search('pximg') != -1) {
			const artworkId = source.split('/').slice(-1)[0].match(/(\d+)/);
			source = `https://www.pixiv.net/en/artworks/${artworkId[1]}`;
		}

		const yuriEmbed = new EmbedBuilder()
			.setTitle('Here you go!')
			.setURL(source)
			.setImage(file_url)
			.setFooter({ text: 'Skuttle loves you' });

		interaction.editReply({ embeds: [yuriEmbed] });
		console.log(yuriList[randomNumber]);
	},
};
