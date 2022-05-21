class Command {
    constructor(client, {
        name = null,
        description = null,
        aliases = null,
        category = null,
        perms = null,
        meperms = null,
        options = null
    }) {
        this.client = client;
        this.config = {
            name,
            description,
            aliases,
            category,
            perms,
            meperms,
            options
        }
    };
};

module.exports = Command;
