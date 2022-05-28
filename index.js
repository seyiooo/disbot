const Disbot = require('./src/_managers/Disbot');

const client = new Disbot({
    allowedMentions: { repliedUser: false },
    fetchAllMembers: true,
    inAppEval: true,
    intents: 32767,
    invalidRequestWarningInterval: 10
});

client.init();