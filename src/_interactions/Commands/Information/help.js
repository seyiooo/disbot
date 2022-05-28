const Command = require('../../../_managers/structures/Command');
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const { readdirSync } = require('fs');

class HelpCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'help',
            description: 'Get Disbot commands or command informations.',
            category: 'information',
            meperms: ['SEND_MESSAGES'],
            options: [
                {
                    name: 'command',
                    description: 'Get command informations.',
                    type: 'STRING'
                }
            ]
        });
    };
    run (interaction) {
        const command = this.client.commands.get(interaction.options.getString('command'));

        if (command) {
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                    .setTitle('Disbot Help')
                    .setDescription(`
                        > **Name:** \`/${command.config.name}\`
                        > **Description:** ${command.config.description}
                        > **Category:** ${this.client.utils.firstLetterToUppercase(command.config.category)}
                    `)
                    .setColor(this.client.config.color)
                ]
            })
        } else {
            const commandsDir = readdirSync('./src/_interactions/Commands');
    
            const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                .setCustomId('help')
                .setPlaceholder('Please, select a category.')
            );
    
            for (let dir of commandsDir) {
                row.components[0].addOptions(
                    {
                        label: dir,
                        value: dir.toLowerCase()
                    }
                );
            };
    
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                    .setTitle('Disbot Help')
                    .setDescription(`
                        I have ${this.client.commands.size} slash commands.
                    `)
                    .setColor(this.client.config.color)
                ],
                components: [row]
            });
        };
    };
};

module.exports = HelpCommand;