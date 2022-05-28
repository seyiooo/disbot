const ContextMenu = require('../../../_managers/structures/ContextMenu');
const { MessageEmbed, ContextMenuInteraction } = require('discord.js');

class UserinfoContextMenu extends ContextMenu {
    constructor(client) {
        super(client, {
            name: 'userinfo',
            type: 'USER',
            meperms: ['SEND_MESSAGES']
        });
    };

    /**
     * Run the ContextMenu
     * @param {ContextMenuInteraction} interaction The interaction
     */

    async run (interaction) {
        const member = await this.client.utils.fetchMember(interaction.guildId, interaction.targetId)
        .catch();

		interaction.reply({
            embeds: [
                new MessageEmbed()
                .setTitle(member.user.username)
                .setDescription(`
                    > **User:** ${member.user}
                    > **Username:** ${member.user.tag}
                    > **ID:** ${member.user.id}
                    
                    > **Bot:** ${member.user.bot ? 'Yes' : 'No'}
                    > **Creation Date:** <t:${parseInt(member.user.createdTimestamp / 1000)}:f>
                `)
                .setColor(this.client.config.color)
            ],
            ephemeral: true
        });
    };
};

module.exports = UserinfoContextMenu;