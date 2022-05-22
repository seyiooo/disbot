const ContextMenu = require('../../../_managers/structures/Command');

class ContextMenuTemplate extends ContextMenu {
    constructor(client) {
        super(client, {
            name: 'name',
            type: 'TYPE',
            perms: 'PERMISSION',
            meperms: ['PERMISSIONS']
        });
    };
    async run (interaction) {
        console.log('There is a context-menu template');
    };
};

module.exports = ContextMenuTemplate;
