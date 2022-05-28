const Command = require('../../../_managers/structures/Command');
const { MessageEmbed } = require('discord.js');

class PingCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            description: 'Get Disbot ping.',
            category: 'information',
            meperms: ['SEND_MESSAGES']
        });
    };
    run (interaction) {
        interaction.reply({
            embeds: [
                new MessageEmbed()
                .setTitle('Ping')
                .setDescription(`Ping: ${this.client.ws.ping}ms`)
                .setColor(this.client.config.color)
            ]
        });
    };
};

module.exports = PingCommand;
