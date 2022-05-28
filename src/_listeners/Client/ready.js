const Event = require('../../_managers/structures/Event');
const colors = require('colors');

class ReadyEvent extends Event {
    constructor(client) {
        super(client, {
            name: 'ready'
        });
    };
    run () {
        console.log(' ____  _     _           _   \r\n|  _ \\(_)___| |__   ___ | |_ \r\n| | | | \/ __| \'_ \\ \/ _ \\| __|\r\n| |_| | \\__ \\ |_) | (_) | |_ \r\n|____\/|_|___\/_.__\/ \\___\/ \\__|\r\n                              \r\n'.blue + '➜ Version: ' + `${this.client.config.version}`.blue + '\n➜ ID: ' + `${this.client.user.id}`.blue + '\n➜ Servers: ' + `${this.client.guilds.cache.size.toLocaleString()}`.blue + '\n➜ Users: ' + `${this.client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b).toLocaleString()}`.blue + '\n➜ Buttons: ' + `${this.client.buttons.size}`.blue + '\n➜ Commands: ' + `${this.client.commands.size}`.blue + '\n➜ ContextMenus: ' + `${this.client.contextmenus.size}`.blue + '\n➜ Events: ' + `${this.client._eventsCount}`.blue + '\n➜ Modals: ' + `${this.client.modals.size}`.blue + '\n➜ SelectMenus: ' + `${this.client.selectmenus.size}`.blue + '\n');
        
        const statuses = [
            `${this.client.guilds.cache.size.toLocaleString()} servers`,
            `${this.client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b).toLocaleString()} users`,
            `${this.client.commands.size.toLocaleString()} slash commands`
        ];

        let i = 0;
        setInterval(() => {
            this.client.user.setActivity(statuses[i], { type: 'WATCHING' });
            i = ++i % statuses.length;
        }, 15000);

        switch (process.argv[2]) {
            case 'eval':
                console.log('[Disbot]'.blue + ' Starting as eval mode.\n');

                this.client.loadDisbotEval();
            break;
            case 'load':
                console.log('[Disbot]'.blue + ' Starting as load mode.\n');

                this.client.guilds.cache.forEach((guild) => guild.commands.set([].concat(this.client.commands.map((command) => command.config)).concat(this.client.contextmenus.map((contextmenu) => contextmenu.config))));
            break;
            case undefined:
                this.client.guilds.cache.get(this.client.config.guild).commands.set([].concat(this.client.commands.map((command) => command.config)).concat(this.client.contextmenus.map((contextmenu) => contextmenu.config)));
            break;
        };
    };
};

module.exports = ReadyEvent;
