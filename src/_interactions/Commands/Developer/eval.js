const Command = require('../../../_managers/structures/Command');
const { Modal, MessageActionRow, TextInputComponent } = require('discord.js');

class EvalCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'eval',
            description: 'Evaluate a code.',
            category: 'developer',
            perms: ['DEVELOPER'],
            meperms: ['SEND_MESSAGES']
        });
    };
    run (interaction) {
        interaction.showModal(
            new Modal()
            .setTitle('Eval')
            .setCustomId('eval')
            .addComponents(
                new MessageActionRow()
                .addComponents(
                    new TextInputComponent()
                    .setLabel('Eval')
                    .setPlaceholder('Code to evaluate')
                    .setCustomId('code')
                    .setStyle('PARAGRAPH')
                    .setRequired(true)
                )
            )
        );
    };
};

module.exports = EvalCommand;