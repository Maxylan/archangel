import { ApplicationCommandRegistry, Command } from '@sapphire/framework';
import { Formatters, Message, MessageEmbed } from 'discord.js';

// This is not needed for a simple messageRun Message Command (I'm guessing.)
// /**
//  * Options used when registering the command.
//  * 
//  * For a full list of commands available here...
//  * @see https://www.sapphirejs.dev/docs/Guide/application-commands/application-command-registry/registering-chat-input-commands
//  */
// export const TodoOptions: ApplicationCommandRegistry.RegisterOptions = {
//     idHints: ['todo']
// }

/**
 * Adds a Message command.
 * 
 * @description Returns some technical details about the bot.
 * @since       1.0.0b
 */
export class TodoCommand extends Command {

    public constructor(context: Command.Context, options: Command.Options) {
        super(context, {
            ...options,
            name: 'Bot TODO List',
            aliases: ['todo'],
            description: 'List of things still needing to be done in this bots development.'
        });
    }

    // Executed when the command aliases are typed in chat.
    public async messageRun(message: Message) {

        if (message.author.id !== '554344266932027412') {
            return await message.channel.send({embeds: [{ image: { url: 'https://c.tenor.com/O4eWfm9KXjgAAAAC/threddy-threddyrex.gif' } }]})
        }

        return await message.channel.send( { embeds: [
            new MessageEmbed()
                .setTitle('TODO')
                .setURL('https://github.com/sapphiredev/framework/blob/106dbf2/src/lib/SapphireClient.ts#L32')
                .setDescription('Stuff that needs to be done, I don\'t expect to be updating this frequently but it might come in handy.')
                .setThumbnail('https://www.shareicon.net/data/128x128/2016/08/18/810017_wrench_512x512.png')
                .addFields(
                    { name: 'Read-up on @Sapphire', value: 'https://www.sapphirejs.dev/docs/Guide/getting-started/getting-started-with-sapphire\n https://www.sapphirejs.dev/docs/General/Welcome' },
                    { name: 'Learn', value: 'This could go on forever!', inline: true },
                    { name: 'Last viewed in TODO', value: 'Fix "Last Viewed" in the footer of this command.', inline: true },
                    { name: 'Global Variable Store', value: 'Impliment global stored values in application so commands and other parts have easy-access to certain values.', inline: true },
                    { name: '\u200B', value: '\u200B' },

                    { name: 'Database Implimentation', value: 'LOTS OF THINGS TO DO HERE. When implimented it will enable tons more complexity in application functionality.' },
                    { name: 'Permissions', value: 'Generate a handler and permissions-denied-callback for permissions.', inline: true },
                    { name: '\u200B', value: '\u200B' },
                )
                .setFooter({ text: `Last Updated '---' | Last Viewed ${Date.toLocaleString()}` })
        ]} );

    }

}