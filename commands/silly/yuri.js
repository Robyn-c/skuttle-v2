const { request } = require('undici');
const { SlashCommandBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('yuri')
		.setDescription('Sends a yuri picture back!'),
	async execute(interaction) {
		await interaction.reply('Thinking...');
		const yuriResult = await request('https://safebooru.org/index.php?page=dapi&s=post&q=index&limit=300&tags=yuri&json=1');
		const yuriList = await yuriResult.body.json();
		randomNumber = Math.floor(Math.random() * yuriList.length - 1);
		const { file_url } = yuriList[randomNumber];
		interaction.editReply({ content: '', files: [file_url] });
	},
};
