const { Client, Collection } = require('discord.js');
const { readdirSync } = require('fs');
const colors = require('colors');

class Disbot extends Client {
    constructor(options) {
        super(options);
        console.log('[Disbot]'.blue + ' Initialisation...');

        require('./Prototype');

        this.buttons = new Collection();
        this.commands = new Collection();
        this.contextmenus = new Collection();
        this.modals = new Collection();
        this.selectmenus = new Collection();

        this.database = require('quick.db');
        this.utils = new (require('./Utils'))(this);
        this.config = require('../../config.json');
    };

    /**
     * Load all Buttons.
     */

    loadButtons() {
        const ButtonsDir = readdirSync('./src/_interactions/Buttons');

        for (const file of ButtonsDir) {
            const Button = new (require(`../_interactions/Buttons/${file}`))(this);

            if (!Button.run || !Button.config || !Button.config.name || !Button.config.meperms) throw new Error('[Disbot]'.red + ` The file "${file} doesn't have required data.`);

            this.buttons.set(Button.config.name, Button);
        };
        
        console.log('[Disbot]'.blue + ` ${this.buttons.size} Buttons has been loaded.`);
    };

    /**
     * Load all Commands.
     */

    loadCommands() {
        const CommandsFilesDir = readdirSync('./src/_interactions/Commands');

        for (const dir of CommandsFilesDir) {
            const CommandsDir = readdirSync(`./src/_interactions/Commands/${dir}`).filter((f) => f.endsWith('.js'));

            for (const file of CommandsDir) {
                const Command = new (require(`../_interactions/Commands/${dir}/${file}`))(this);

                if (!Command.run || !Command.config || !Command.config.name || !Command.config.description || !Command.config.meperms) throw new Error('[Disbot]'.red + ` The file "${file}" doesn't have required data.`);

                this.commands.set(Command.config.name, Command);
            };
        };

        console.log('[Disbot]'.blue + ` ${this.commands.size} Commands has been loaded.`);
    };

    /**
     * Load all ContextMenus.
     */

    loadContextMenus() {
        const ContextMenusFilesDir = readdirSync('./src/_interactions/ContextMenus');

        for (const dir of ContextMenusFilesDir) {
            const ContextMenusDir = readdirSync(`./src/_interactions/ContextMenus/${dir}`).filter((f) => f.endsWith('.js'));

            for (const file of ContextMenusDir) {
                const ContextMenu = new (require(`../_interactions/ContextMenus/${dir}/${file}`))(this);

                if (!ContextMenu.run || !ContextMenu.config || !ContextMenu.config.name || !ContextMenu.config.type || !ContextMenu.config.meperms) throw new Error('[Disbot]'.red + ` The file "${file} doesn't have required data.`);

                this.contextmenus.set(ContextMenu.config.name, ContextMenu);
            };
        };

        console.log('[Disbot]'.blue + ` ${this.contextmenus.size} ContextMenus has been loaded.`);
    };

    /**
     * Load all Events.
     */

    loadEvents() {
        const EventsFilesDir = readdirSync('./src/_listeners');

        for (const dir of EventsFilesDir) {
            const EventsDir = readdirSync(`./src/_listeners/${dir}`).filter((f) => f.endsWith('.js'));

            for (const file of EventsDir) {
                const Event = new (require(`../_listeners/${dir}/${file}`))(this);

				if (!Event.run || !Event.config || !Event.config.name) throw new Error('[Disbot]'.red + ` The file "${file}" doesn't have required data.`);

                this.on(Event.config.name, (...args) => Event.run(...args));
            };
        };

		console.log('[Disbot]'.blue + ` ${this._eventsCount} Events has been loaded.`);
    };

    /**
     * Load all Modals.
     */

    loadModals() {
        const ModalsDir = readdirSync('./src/_interactions/Modals');

        for (const file of ModalsDir) {
            const Modal = new (require(`../_interactions/Modals/${file}`))(this);

            if (!Modal.run || !Modal.config || !Modal.config.name || !Modal.config.meperms) throw new Error('[Disbot]'.red + ` The file "${file} doesn't have required data.`);

            this.modals.set(Modal.config.name, Modal);
        };
        
        console.log('[Disbot]'.blue + ` ${this.modals.size} Modals has been loaded.`);
    };

    /**
     * Load all SelectMenus.
     */

    loadSelectMenus() {
        const SelectMenusDir = readdirSync('./src/_interactions/SelectMenus');

        for (const file of SelectMenusDir) {
            const SelectMenu = new (require(`../_interactions/SelectMenus/${file}`))(this);

            if (!SelectMenu.run || !SelectMenu.config || !SelectMenu.config.name || !SelectMenu.config.meperms) throw new Error('[Disbot]'.red + ` The file "${file} doesn't have required data.`);

            this.selectmenus.set(SelectMenu.config.name, SelectMenu);
        };
        
        console.log('[Disbot]'.blue + ` ${this.selectmenus.size} SelectMenus has been loaded.\n`);
    };

    /**
     * Load Disbot Eval.
     */

    loadDisbotEval() {
        function exitListener(){
            process.stdin.removeAllListeners('data');
            process.stdin.pause();
            console.log('[DisbotEval]'.blue + ' exit successfully.\n');
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

                    console.log('[DisbotEval]'.blue + ` ${require('util').inspect(evaled, { colors: true, depth: 0 })}\n`);
                } catch(err) {
                    console.error('[DisbotEval]'.red + ` ${err}\n`);
                };
            };

            process.stdout.write('➜ ');
            process.stdin.resume();
        });
    };

    /**
     * Log-in Disbot.
     */

    loadClient() {
        this.login(this.config.token);
    };

    /**
     * Init Disbot.
     * @returns {Disbot}
     */

    init() {
        this.loadButtons();
        this.loadCommands();
        this.loadContextMenus();
        this.loadEvents();
        this.loadModals();
        this.loadSelectMenus();

        this.loadClient();

        return this;
    };
};

module.exports = Disbot;