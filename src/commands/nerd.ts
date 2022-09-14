import { ApplicationCommandRegistry, Command } from '@sapphire/framework';
import { Formatters, Message } from 'discord.js';

// This is not needed for a simple messageRun Message Command (I'm guessing.)
// /**
//  * Options used when registering the command.
//  * 
//  * For a full list of commands available here...
//  * @see https://www.sapphirejs.dev/docs/Guide/application-commands/application-command-registry/registering-chat-input-commands
//  */
// export const NerdOptions: ApplicationCommandRegistry.RegisterOptions = {
//     idHints: ['nerd']
// }

/**
 * Adds a Message command.
 * 
 * @description Returns some technical details about the bot.
 * @since       1.0.0b
 */
export class NerdCommand extends Command {

    public constructor(context: Command.Context, options: Command.Options) {
        super(context, {
            ...options,
            name: 'I\'m a nerd',
            aliases: ['nerd'],
            description: 'Sends some technical details about the bot.'
        });
    }

    // Executed when the command aliases are typed in chat.
    public async messageRun(message: Message) {
        const msg = await message.channel.send(`You too? Here's something that might tickle your fancy!\`\`\`json\n${JSON.stringify({
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
            apiLatency: '--- ms',
            repo: 'https://github.com/Maxylan/archangel'
        }, undefined, 4)}\`\`\``);

        return msg.edit(`You too? Here's something that might tickle your fancy!\`\`\`json\n${JSON.stringify({
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
            apiLatency: msg.createdTimestamp - message.createdTimestamp + 'ms',
            repo: 'https://github.com/Maxylan/archangel'
        }, undefined, 4)}\`\`\``);

    }

}