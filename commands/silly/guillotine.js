// Gives a random user, and lets you choose to ban or not
// button
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
// make command info

// fetch a random member (not a bot)
// button to ban or not

module.exports = {
	data: new SlashCommandBuilder()
		.setName('guillotine')
		.setDescription('GUILLOTINE TIME!'),
	async execute(interaction) {
		await interaction.guild.members.fetch();
		const membersArray = interaction.guild.members.cache.filter(m => !m.user.bot).map(m => m);
		const randomMember = membersArray[Math.floor(Math.random() * membersArray.length)];
		console.log(randomMember);
		const userEmbed = new EmbedBuilder()
			.setThumbnail(randomMember.user.avatarURL())
			.setAuthor({ name: 'Skuttle picks...', iconURL: interaction.user.avatarURL() })
			.setTitle(randomMember.user.displayName)
			.setDescription(randomMember.user.tag)
			.setFooter(
				{ text: `Account created at ${randomMember.user.createdAt}` },
			);


		interaction.reply({ embeds: [userEmbed] });
	},
};

