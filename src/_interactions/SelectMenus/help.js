const SelectMenu = require('../../_managers/structures/SelectMenu');
const { MessageEmbed } = require('discord.js');

class HelpSelectMenu extends SelectMenu {
    constructor(client) {
        super(client, {
            name: 'help',
            meperms: ['SEND_MESSAGES']
        });
    };
    run (interaction) {
        interaction.update({
            embeds: [
                new MessageEmbed()
                .setTitle(`${this.client.utils.firstLetterToUppercase(interaction.values[0])}`)
                .setDescription(`> ${this.client.commands.filter((command) => command.config.category?.toLowerCase() === interaction.values[0]).map((command) => `\`${command.config.name}\``).join(', ')}`)
                .setColor(this.client.config.color)
            ]
        });
    };
};

module.exports = HelpSelectMenu;