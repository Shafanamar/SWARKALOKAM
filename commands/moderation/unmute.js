const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const cmdIcons = require('../../UI/icons/commandicons');
const lang = require('../../events/loadLanguage');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('unmute')
        .setDescription('Unmutes a member in the server')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The member to unmute')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
    async execute(interaction) {
        if (interaction.isCommand && interaction.isCommand()) { 
        if (!interaction.member.permissions.has(PermissionFlagsBits.ModerateMembers)) {
            const embed = new EmbedBuilder()
                .setColor('#ff0000')
                .setDescription('You do not have permission to use this command.');
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        const target = interaction.options.getUser('target');
        const member = interaction.guild.members.cache.get(target.id);

        if (!member.communicationDisabledUntilTimestamp) {
            const embed = new EmbedBuilder()
                .setColor('#ff0000')
                .setDescription(`${target.tag} is not muted!`);
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        await member.timeout(null);
        const embed = new EmbedBuilder()
            .setColor('#00ff00')
            .setDescription(`${target.tag} has been unmuted.`);
        await interaction.reply({ embeds: [embed] });

    }else {
        const embed = new EmbedBuilder()
        .setColor('#3498db')
        .setAuthor({ 
            name: lang.unmutealertTitle,
            iconURL: cmdIcons.dotIcon,
            url: "https://discord.gg/xQF9f9yUEM"
        })
        .setDescription(lang.unmutealertDescription)
        .setTimestamp();
    
        await interaction.reply({ embeds: [embed] });
    
        }  
    },
};
