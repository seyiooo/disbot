const Event = require('../../_managers/structures/Event');

class EventTemplate extends Event {
    constructor(client) {
        super(client, {
            name: 'name'
        });
    };
    async run (options) {
        console.log('There is an event template');
    };
};

module.exports = EventTemplate;
