const Modal = require('../../_managers/structures/Modal');
const { MessageEmbed } = require('discord.js');
const beautify = require('js-beautify');

class EvalModal extends Modal {
    constructor(client) {
        super(client, {
            name: 'eval',
            perms: ['DEVELOPER'],
            meperms: ['PERMISSION']
        });
    };
    run (interaction) {
        const code = interaction.fields.getTextInputValue('code');

        const result = new Promise((resolve) => resolve(eval(code)));

        result
        .then((output) => {
            if (typeof output !== 'string') output = require('util').inspect(output, { depth: 0 });

            if (output.includes(this.client.token)) output = output.replace(this.client.token, 'T0K3N');
            
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                    .setTitle('Success')
                    .setDescription('Code successfully evaluated.')
                    .addFields(
                        {
                            name: 'Output',
                            value: `\`\`\`js\n${beautify(output, { format: 'js' }).slice(0, 1014)}\n\`\`\``
                        },
                        {
                            name: 'Evaluation',
                            value: `\`\`\`js\n${beautify(code, { format: 'js' }).slice(0, 1014)}\n\`\`\``
                        }
                    )
                    .setColor(this.client.config.color)
                ]
            });
        })
        .catch((error) => {
            error = error.toString();

            if (error.includes(this.client.token)) error = error.replace(this.client.token, 'T0K3N');
            
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                    .setTitle('Error')
                    .setDescription('An error occured.')
                    .addFields(
                        {
                            name: 'Error',
                            value: `\`\`\`bash\n${beautify(error, { format: 'bash' }).slice(0, 1014)}\n\`\`\``
                        },
                        {
                            name: 'Evaluation',
                            value: `\`\`\`js\n${beautify(code, { format: 'js' }).slice(0, 1014)}\n\`\`\``
                        }
                    )
                    .setColor(this.client.config.color)
                ]
            });
        });
    };
};

module.exports = EvalModal;