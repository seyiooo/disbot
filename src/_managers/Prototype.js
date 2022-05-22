const Discord = require('discord.js');
const db = require('quick.db');
const config = require('../../config.json');

////////// | GUILD | //////////

Discord.Guild.prototype.getData = function getData() {
    return db.get(this.id);
};

Discord.Guild.prototype.getColor = function getColor() {
    return this.getData().custom.color || config.utils.color;
};

////////// | GUILD-MEMBER | //////////

Discord.GuildMember.prototype.getData = function getData() {
    return db.get(`${this.guild.id}.users.${this.user.id}`);
};

Discord.GuildMember.prototype.getUserData = function getUserData() {
    return db.get(this.user.id);
};

Discord.GuildMember.prototype.isAdmin = function isAdmin() {
    return this.permissions.has('ADMINISTRATOR');
};

Discord.GuildMember.prototype.isStaff = function isStaff() {
    return this.permissions.has('MANAGE_GUILD');
};

////////// | ROLE | //////////

Discord.Role.prototype.isAdmin = function isAdmin() {
    return this.permissions.has('ADMINISTRATOR');
};

Discord.Role.prototype.isStaff = function isStaff() {
    return this.permissions.has('MANAGE_GUILD');
};

////////// | USER | //////////

Discord.User.prototype.getData = function getData() {
    return db.get(this.id);
};
