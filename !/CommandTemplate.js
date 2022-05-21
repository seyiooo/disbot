const Command = require('../../../_managers/structures/Command');

class CommandTemplate extends Command {
    constructor(client) {
        super(client, {
            name: 'name',
            description: 'description',
            aliases: ['alias'],
            category: 'category',
            perms: 'PERMISSION',
            meperms: ['PERMISSIONS'],
            options: [
                {
                    name: 'name',
                    description: 'description',
                    type: 'STRING',
                    required: true
                }
            ]
        });
    };
    async run (interaction) {
        interaction.reply(this.client.utils.Example())
    };
};

module.exports = CommandTemplate;
