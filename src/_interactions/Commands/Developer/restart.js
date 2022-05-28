const Command = require('../../../_managers/structures/Command');
const { MessageEmbed } = require('discord.js');
const { spawn } = require("child_process");

class RestartCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'restart',
            description: 'Restart Disbot.',
            category: 'developer',
            perms: ['DEVELOPER'],
            meperms: ['SEND_MESSAGES'],
        });
    };
    run (interaction) {
        interaction.reply({
            embeds: [
                new MessageEmbed()
                .setTitle('Loading')
                .setDescription('Disbot is restarting...')
                .setColor(this.client.config.color)
            ]
        });

        process.on('exit', () => {
            spawn(process.argv.shift(), process.argv, {
                cwd: process.cwd(),
                detached: true,
                stdio: 'inherit',
            });
        });

        process.exit();
    };
};

module.exports = RestartCommand;