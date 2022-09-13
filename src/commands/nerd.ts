import { Command } from '@sapphire/framework';
import { Formatters, Message } from 'discord.js';

export class NerdCommand extends Command {

    public constructor(context: Command.Context, options: Command.Options) {
        console.log('It actually fires.');
        super(context, {
            ...options,
            name: 'I\'m a nerd',
            aliases: ['nerd'],
            description: 'Sends some technical details about the bot.'
        });
    }

    public async messageRun(message: Message) {
        const msg = await message.channel.send(`Oh my god me too!\`\`\`json\n${JSON.stringify({
            author: '@Maxylan#8711',
            botName: 'Archangel',
            botVersion: '',
            createdAt: '2022-09-13',
            lastUpdatedAt: '',
            language: 'TypeScript (TS)',
            architecture: 'NodeJS 16.17.0',
            hostName: 'archangel.dev',
            environment: 'Ubuntu64x~22.04.3',
            botLatency: Math.round(this.container.client.ws.ping) + 'ms',
            apiLatency: '--- ms'
        }, undefined, 4)}\`\`\``);

        return msg.edit(`Oh my god me too!\`\`\`json\n${JSON.stringify({
            author: '@Maxylan#8711',
            botName: 'Archangel',
            botVersion: '',
            createdAt: '2022-09-13',
            lastUpdatedAt: '',
            language: 'TypeScript (TS)',
            architecture: 'NodeJS 16.17.0',
            hostName: 'archangel.dev',
            environment: 'Ubuntu64x~22.04.3',
            botLatency: Math.round(this.container.client.ws.ping) + 'ms',
            apiLatency: msg.createdTimestamp - message.createdTimestamp + 'ms'
        }, undefined, 4)}\`\`\``);

    }

}