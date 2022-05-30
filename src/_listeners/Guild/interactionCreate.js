const Event = require('../../_managers/structures/Event');
const { MessageEmbed } = require('discord.js');

class InteractionCreateEvent extends Event {
    constructor(client) {
        super(client, {
            name: 'interactionCreate'
        });
    };
    run (interaction) {
        if (!interaction.guild || interaction.user.bot) return;

        if (interaction.isButton() || interaction.isCommand() || interaction.isContextMenu() || interaction.isModalSubmit() || interaction.isSelectMenu()) {
            const int = this.client.buttons.get(interaction.customId)
            || this.client.commands.get(interaction.commandName)
            || this.client.contextmenus.get(interaction.commandName)
            || this.client.modals.get(interaction.customId)
            || this.client.selectmenus.get(interaction.customId);

            if (int.config.perms && (int.config.perms.includes('DEVELOPER') && !this.client.config.devs.includes(interaction.user.id) || !interaction.member.permissions.has(int.config.perms))) return interaction.reply({
                embeds: [
                    new MessageEmbed()
                    .setTitle('Error')
                    .setDescription(`Sorry, you don\'t have permission to run this.\n${int.config.perms.map((perm) => `\`${perm}\``).join(', ')}`)
                    .setColor(this.client.config.color)
                ],
                ephemeral: true
            });

            if (!interaction.guild.me.permissions.has(int.config.meperms)) return interaction.reply({
                embeds: [
                    new MessageEmbed()
                    .setTitle('Error')
                    .setDescription(`Sorry, I don\'t have permission to run this.\n${int.config.meperms.map((perm) => `\`${perm}\``).join(', ')}`)
                    .setColor(this.client.config.color)
                ],
                ephemeral: true
            });
        };

        if (interaction.isButton()) this.client.emit('buttonCreate', interaction);

        if (interaction.isCommand()) this.client.emit('commandCreate', interaction);

        if (interaction.isContextMenu()) this.client.emit('contextMenuCreate', interaction);

        if (interaction.isModalSubmit()) this.client.emit('modalCreate', interaction);

        if (interaction.isSelectMenu()) this.client.emit('selectMenuCreate', interaction);
    };
};

module.exports = InteractionCreateEvent;
