const Event = require('../../_managers/structures/Event');

class InteractionCreateEvent extends Event {
    constructor(client) {
        super(client, {
            name: 'interactionCreate'
        });
    };
    run (interaction) {
        if (interaction.isCommand()) {
            const command = this.client.commands.get(interaction.commandName);

            if (!command) {
                interaction.reply('Sorry, an error occured.');
                console.log('[Disbot]'.blue + ` Command ${interaction.commandName} doesn\'t exist.`);
            };

            command.run(interaction);
        };
    };
};

module.exports = InteractionCreateEvent;
