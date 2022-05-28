const Button = require('../../_managers/structures/Button');
const { MessageEmbed } = require('discord.js');

class ButtonExampleButton extends Button {
    constructor(client) {
        super(client, {
            name: 'button-example',
            meperms: ['SEND_MESSAGES']
        });
    };
    run (interaction) {
        interaction.reply({
            embeds: [
                new MessageEmbed()
                .setTitle('Hi ! I\'m a button.')
                .setColor(this.client.config.color)
            ],
            ephemeral: true
        });
    };
};

module.exports = ButtonExampleButton;