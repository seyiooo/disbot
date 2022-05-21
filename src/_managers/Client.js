const { Client, Collection } = require('discord.js');
const { readdirSync } = require('fs');
const colors = require('colors');

class ExtendedClient extends Client {
    constructor(options) {
        super(options);
        console.log('[Disbot]'.blue + ' Initialisation...');

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
				if (!event.run || !event.config || !event.config.name) throw new Error('[Disbot]'.blue + ` The file "${evt}" doesn't have required data.`);
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
                if (!command.run || !command.config || !command.config.name || !command.config.description || !command.config.meperms) throw new Error('[Disbot]'.blue + ` The file "${cmd}" doesn't have required data.`);
                this.commands.set(command.config.name, command);
            };
        };
    };

    loadAtomEval() {
        function exitListener(){
            process.stdin.removeAllListeners('data');
            process.stdin.pause();
            console.log('[Eval]'.blue + ' exit successfully.\n');
        };
        process.stdin.resume()
        process.stdout.write('➜ ')
        process.stdin.on('data', async function(data) {
            process.stdin.pause();
            data = data.toString().trim();
            if (data === '.clear') { console.clear(); }
            else if (data === '.exit') return exitListener()
            else if (data === '.help') console.log('  [DisbotEval Help]  '.blue + '\n\n.clear ➜ Clear the console\n.help ➜ see the help\n.exit ➜ exit the eval\n');
            else {
                try {
                    let evaled = eval(data);
                    console.log('[Eval]'.blue + ` ${require('util').inspect(evaled, { colors: true, depth: 0 })}\n`);
                } catch(err) {
                    console.error('[Eval]'.blue + ' ERROR:'.red + ` ${err}\n`);
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
