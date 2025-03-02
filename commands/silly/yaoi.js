const { request } = require('undici');
const { SlashCommandBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('yaoi')
		.setDescription('Sends a yaoi picture back!'),
	async execute(interaction) {
		await interaction.reply('Thinking...');

		const yaoiResult = await request('https://safebooru.org/index.php?page=dapi&s=post&q=index&limit=200&tags=yaoi&json=1');
		randomNumber = Math.floor(Math.random() * 199);
		const yaoiList = await yaoiResult.body.json();
		randomNumber = Math.floor(Math.random() * yaoiList.length - 1);
		const { file_url } = yaoiList[randomNumber];

		interaction.editReply({ content: '', files: [file_url] });
	},
};
