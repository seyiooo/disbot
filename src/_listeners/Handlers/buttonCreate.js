const Event = require('../../_managers/structures/Event');
const { MessageEmbed } = require('discord.js');

class ButtonCreateEvent extends Event {
    constructor(client) {
        super(client, {
            name: 'buttonCreate'
        });
    };
    run (interaction) {
        const selectmenu = this.client.buttons.get(interaction.customId);

        if (interaction.message.interaction.user.id !== interaction.user.id) return;

        if (!selectmenu) return interaction.reply({
            embeds: [
                new MessageEmbed()
                .setTitle('Error')
                .setDescription('Sorry, an error occured.')
                .setColor(this.client.config.color)
            ],
            ephemeral: true
        });

        try {
            selectmenu.run(interaction);
            
            console.log('[Disbot]'.blue + ` A select-menu has been executed:` + '\n➜ SelectMenu: ' + `${interaction.customId}`.blue + '\n➜ Guild: ' + `${interaction.guild.name}`.blue + '\n➜ Channel: ' + `${interaction.channel.name}`.blue + '\n➜ User: ' + `${interaction.user.tag}`.blue + '\n');
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
                    .setDescription(`Sorry, an error occured. For more informations, check the terminal.\`\`\`\n${err}\n\`\`\``)
                ]
            });
            
            console.log('[Disbot]'.red + ` An error occured:` + '\n➜ Button: ' + `${interaction.customId}`.red + '\n➜ Guild: ' + `${interaction.guild.name}`.red + '\n➜ Channel: ' + `${interaction.channel.name}`.red + '\n➜ User: ' + `${interaction.user.tag}`.red + '\n➜ Error: ' + `${err}`.red + '\n');
        };
    };
};

module.exports = ButtonCreateEvent;