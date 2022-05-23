class ContextMenu {
    constructor(client, {
        name = null,
        description = null,
        type = null,
        meperms = null,
    }) {
        this.client = client;
        this.config = {
            name,
            description,
            type,
            meperms
        }
    };
};

module.exports = ContextMenu;
