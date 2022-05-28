const Event = require('../../_managers/structures/Event');
const { MessageEmbed } = require('discord.js');

class ContextMenuCreateEvent extends Event {
    constructor(client) {
        super(client, {
            name: 'contextMenuCreate'
        });
    };
    run (interaction) {
        const contextmenu = this.client.contextmenus.get(interaction.commandName);

        if (!contextmenu) return interaction.reply({
            embeds: [
                new MessageEmbed()
                .setTitle('Error')
                .setDescription('Sorry, an error occured.')
                .setColor(this.client.config.color)
            ],
            ephemeral: true
        });

        try {
            contextmenu.run(interaction);
            
            console.log('[Disbot]'.blue + ` A context-menu has been executed:` + '\n➜ ContextMenu: ' + `${interaction.commandName}`.blue + '\n➜ Guild: ' + `${interaction.guild.name}`.blue + '\n➜ Channel: ' + `${interaction.channel.name}`.blue + '\n➜ User: ' + `${interaction.user.tag}`.blue + '\n');
        } catch(err) {
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                    .setTitle('Error')
                    .setDescription(`Sorry, an error occured.\`\`\`\n${err}\n\`\`\``)
                    .setColor(this.client.config.color)
                ],
                ephemeral: true
            });

            this.client.channels.cache.get(this.client.config.logs).send({
                content: this.client.config.devs.map((dev) => this.client.users.cache.get(dev)).join(', '),
                embed: [
                    new MessageEmbed()
                    .setTitle('Error')
                    .setDescription(`Sorry, an error occured. For more informations, check the terminal.\`\`\`\n${err}\n\`\`\`
                    `)
                ]
            });
            
            console.log('[Disbot]'.red + ` An error occured:` + '\n➜ ContextMenu: ' + `${interaction.commandName}`.red + '\n➜ Guild: ' + `${interaction.guild.name}`.red + '\n➜ Channel: ' + `${interaction.channel.name}`.red + '\n➜ User: ' + `${interaction.user.tag}`.red + '\n➜ Error: ' + `${err}`.red + '\n');
        };
    };
};

module.exports = ContextMenuCreateEvent;