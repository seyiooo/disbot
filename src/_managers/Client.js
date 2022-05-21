const { Client, Collection } = require('discord.js');
const { readdirSync } = require('fs');
const colors = require('colors');

class ExtendedClient extends Client {
    constructor(options) {
        super(options);
        console.log('  ____  _     _           _   \r\n|  _ \\(_)___| |__   ___ | |_ \r\n| | | | \/ __| \'_ \\ \/ _ \\| __|\r\n| |_| | \\__ \\ |_) | (_) | |_ \r\n|____\/|_|___\/_.__\/ \\___\/ \\__|\r\n                              \r\n');

        require('./Prototype');

        this.utils = require('./Utils');
        this.commands = new Collection();
        this.database = require('quick.db');
        this.config = require('../../config.json');
    };

    loadEvents() {
        const eventsFiles = readdirSync('./src/_listeners');
        for (const dir of eventsFiles) {
            const evtFile = readdirSync(`./src/_listeners/${dir}`).filter(f => f.endsWith('.js'));
            for (const evt of evtFile) {
                const event = new (require(`../_listeners/${dir}/${evt}`))(this);
				if (!event.run || !event.config || !event.config.name) throw new Error('[Disbot]'.bgWhite.black + ` The file "${evt}" doesn't have required data.`.reset);
                this.on(event.config.name, (...args) => event.run(...args));
            };
        };

		console.log('[Atom]'.bgWhite.black + ` ${this._eventsCount} events has been loaded.`);
    };

    loadCommands() {
        const commandsFiles = readdirSync('./src/_interactions/Commands');
        for (const dir of commandsFiles) {
            const cmdFile = readdirSync(`./src/_interactions/Commands/${dir}`).filter(f => f.endsWith('.js'));
            for (const cmd of cmdFile) {
                const command = new (require(`../_interactions/Commands/${dir}/${cmd}`))(this);
                if (!command.run || !command.config || !command.config.name || !command.config.description) throw new Error('[Disbot]'.bgWhite.black + ` The file "${cmd}" doesn't have required data.`.reset);
                this.commands.set(command.config.name, command);
            };
        };
    };

    loadAtomEval() {
        function exitListener(){
            process.stdin.removeAllListeners('data');
            process.stdin.pause();
            console.log('[Eval]'.bgWhite.black + ' exit successfully.\n'.reset);
        };
        process.stdin.resume()
        process.stdout.write('➜ ')
        process.stdin.on('data', async function(data) {
            process.stdin.pause();
            data = data.toString().trim();
            if (data === '.clear') { console.clear(); }
            else if (data === '.exit') return exitListener()
            else if (data === '.help') console.log('  [DisbotEval Help]  '.bgWhite.black + '\n\n.clear ➜ Clear the console\n.help ➜ see the help\n.exit ➜ exit the eval\n');
            else {
                try {
                    let evaled = eval(data);
                    console.log('[Eval]'.bgWhite.black + ` ${require('util').inspect(evaled, { colors: true, depth: 0 })}\n`.reset);
                } catch(err) {
                    console.error('[Eval]'.bgWhite.black + ' ERROR:'.red + ` ${err}\n`.reset);
                };
            };
            process.stdout.write('➜ ');
            process.stdin.resume();
        });
    };

    logger() {
        this.login(this.config.token);
    };

    async init() {
        this.loadEvents();
        this.loadCommands();
        this.logger();
    };
};

module.exports = ExtendedClient;
