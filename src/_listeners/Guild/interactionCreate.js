const { MessageEmbed } = require('discord.js');
const Event = require('../../_managers/structures/Event');

class InteractionCreateEvent extends Event {
    constructor(client) {
        super(client, {
            name: 'interactionCreate'
        });
    };
    run (interaction) {
        if (!interaction.guild || interaction.user.bot) return;

        if (interaction.isCommand()) {
            const command = this.client.commands.get(interaction.commandName);

            if (!command) return interaction.reply({
                embeds: [
                    new MessageEmbed()
                    .setTitle('Error')
                    .setDescription('Sorry, an error occured.')
                ]
            });

            if (!interaction.member.permissions.has(command.config.perms)) return interaction.reply({
                embeds: [
                    new MessageEmbed()
                    .setTitle('Error')
                    .setDescription(`Sorry, you don\'t have permission to run this command.\n${command.config.perms.map((perm) => `\`${perm}\``).join(', ')}`)
                ]
            });

            if (!interaction.guild.me.permissions.has(command.config.meperms)) return interaction.reply({
                embeds: [
                    new MessageEmbed()
                    .setTitle('Error')
                    .setDescription(`Sorry, I don\'t have permission to run this command.\n${command.config.meperms.map((perm) => `\`${perm}\``).join(', ')}`)
                ]
            });

            command.run(interaction);
        };
    };
};

module.exports = InteractionCreateEvent;
