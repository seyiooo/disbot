const Bot = require('./src/_managers/Client');

const client = new Bot({
    allowedMentions: { repliedUser: false },
    fetchAllMembers: true,
    inAppEval: true,
    intents: 32767,
    invalidRequestWarningInterval: 10
});

client.init();
