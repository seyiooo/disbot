const Command = require('../../../_managers/structures/Command');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

class ButtonExampleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'button-example',
            description: 'Button example.',
            category: 'other',
            meperms: ['SEND_MESSAGES']
        });
    };
    run (interaction) {
        interaction.reply({
            embeds: [
                new MessageEmbed()
                .setTitle('Button Example')
                .setColor(this.client.config.color)
            ],
            components: [
                new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setCustomId('button-example')
                    .setLabel('Click me !')
                    .setStyle('PRIMARY')
                )
            ]
        });
    };
};

module.exports = ButtonExampleCommand;
