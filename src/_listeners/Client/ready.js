const Event = require('../../_managers/structures/Event');
const colors = require('colors');

class ReadyEvent extends Event {
    constructor(client) {
        super(client, {
            name: 'ready'
        });
    };
    run () {
        const statuses = [
            `${this.client.guilds.cache.size.toLocaleString()} servers`,
            `${this.client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b).toLocaleString()} users`,
            `${this.client.commands.size.toLocaleString()} slash commandes`
        ];

        let i = 0;
        setInterval(() => {
            this.client.user.setActivity(statuses[i], { type: 'WATCHING' });
            i = ++i % statuses.length;
        }, 15000);

        switch (process.argv[2]) {
            case 'eval':
                console.log('[Disbot]'.blue + ' Starting as eval mode.\n');

                this.client.loadAtomEval();
            break;
            case 'load':
                console.log('[Disbot]'.blue + ' Starting as load mode.\n');

                this.client.application.commands.set(this.client.commands.map((cmd) => cmd.config));

                console.log('[Disbot]'.blue + ` ${this.client.commands.size} commands has been loaded.\n`);

                console.log('  ____  _     _           _   \r\n|  _ \\(_)___| |__   ___ | |_ \r\n| | | | \/ __| \'_ \\ \/ _ \\| __|\r\n| |_| | \\__ \\ |_) | (_) | |_ \r\n|____\/|_|___\/_.__\/ \\___\/ \\__|\r\n                              \r\n'.blue + 'Version: ' + `${this.client.version}`.blue + '\n➜ ID: ' + `${this.client.config.version}`.blue + `${this.client.user.id}`.blue + '\n➜ Servers: ' + `${this.client.guilds.cache.size.toLocaleString()}`.blue + '\n➜ Users: ' + `${this.client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b).toLocaleString()}`.blue + '\n➜ Commands: ' + `${this.client.commands.size}`.blue + '\n➜ Events: ' + `${this.client._eventsCount}`.blue + '\n');
            break;
            case undefined:
                this.client.guilds.cache.get(this.client.config.utils.guild).commands.set(this.client.commands.map((cmd) => cmd.config));

                console.log('[Disbot]'.blue + ` ${this.client.commands.size} commands has been loaded.\n`);

                console.log('  ____  _     _           _   \r\n|  _ \\(_)___| |__   ___ | |_ \r\n| | | | \/ __| \'_ \\ \/ _ \\| __|\r\n| |_| | \\__ \\ |_) | (_) | |_ \r\n|____\/|_|___\/_.__\/ \\___\/ \\__|\r\n                              \r\n'.blue + 'Version: ' + `${this.client.version}`.blue + '\n➜ ID: ' + `${this.client.config.version}`.blue + `${this.client.user.id}`.blue + '\n➜ Servers: ' + `${this.client.guilds.cache.size.toLocaleString()}`.blue + '\n➜ Users: ' + `${this.client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b).toLocaleString()}`.blue + '\n➜ Commands: ' + `${this.client.commands.size}`.blue + '\n➜ Events: ' + `${this.client._eventsCount}`.blue + '\n');
            break;
        };
    };
};

module.exports = ReadyEvent;
