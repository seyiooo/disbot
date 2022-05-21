const Command = require('../../../_managers/structures/Command');
const { MessageEmbed } = require('discord.js');

class PingCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            description: 'Permet d\'avoir la latence du bot.',
            category: 'info',
            meperms: ['SEND_MESSAGES']
        });
    };
    async run (interaction) {
        interaction.reply({
            embeds: [
                new MessageEmbed()
                .setTitle('Ping')
                .setDescription(`Ping: ${this.client.ws.ping}ms`)
            ]
        });
    };
};

module.exports = PingCommand;
