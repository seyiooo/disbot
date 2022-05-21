const Command = require('../../../_managers/structures/Command');

class CommandTemplate extends Command {
    constructor(client) {
        super(client, {
            name: 'name',
            description: 'description',
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
        console.log('There is a command template');
    };
};

module.exports = CommandTemplate;
