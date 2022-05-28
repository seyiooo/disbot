const ContextMenu = require('../../../_managers/structures/ContextMenu');
const { MessageEmbed, ContextMenuInteraction } = require('discord.js');

class ContentContextMenu extends ContextMenu {
    constructor(client) {
        super(client, {
            name: 'content',
            type: 'MESSAGE',
            meperms: ['SEND_MESSAGES']
        });
    };
    async run (interaction) {
        const message = await this.client.utils.fetchMessage(interaction.channelId, interaction.targetId)
        .catch();

		interaction.reply({
            embeds: [
                new MessageEmbed()
                .setDescription(message.content || 'None')
                .setColor(this.client.config.color)
            ],
            ephemeral: true
        });
    };
};

module.exports = ContentContextMenu;
