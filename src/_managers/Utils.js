class Utils {
    constructor(client) {
        this.client = client;
    };

    /**
     * Fetch member from a guild.
     * @param {String} guild The guild
     * @param {String} userId The user ID
     * @returns {GuildMember|undefined}
     * @example
     * const member = await fetchMember('guild-id', 'user-id');
     */
     
     fetchMember(guildId, userId) {
        if (!guildId) throw new Error('[fetchMessage] Guild ID not provided.');
        if (!userId) throw new Error('[fetchMessage] User ID not provided.');
    
        let member;
    
        try {
            member = this.client.guilds.cache.get(guildId).members.fetch(userId);
        } catch {};
    
        return member;
    };
   
    /**
     * Fetch a message from a text channel.
     * @param {String} channel The channel
     * @param {String} messageId The message ID
     * @returns {Message|undefined}
     * @example
     * const message = await fetchMessage('channel-id', 'message-id');
     */
     
    fetchMessage(channelId, messageId) {
        if (!channelId) throw new Error('[fetchMessage] Channel ID not provided.');
        if (!messageId) throw new Error('[fetchMessage] Message ID not provided.');
    
        let message;
    
        try {
            message = this.client.channels.cache.get(channelId).messages.fetch(messageId);
        } catch {};
    
        return message;
    };

    /**
     * Fetch a guild.
     * @param {String} guildId The guild ID
     * @returns {Guild|undefined}
     * @example
     * const guild = await fetchGuild('guild-id');
     */

    fetchGuild(guildId) {
        if (!guildId) throw new Error('[fetchGuild] Guild ID not provided.');

        let guild;

        try {
            guild = this.client.guilds.fetch(guildId);
        } catch {};

        return guild;
    };

    /**
     * First letter to uppercase.
     * @param {String} string The string
     * @returns {String}
     * @example
     * const string = firstLetterToUppercase('string');
     * // "String"
     */

    firstLetterToUppercase(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
};

module.exports = Utils;