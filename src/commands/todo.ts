import { ApplicationCommandRegistry, Command } from '@sapphire/framework';
import { Formatters, Guild, Message, MessageEmbed } from 'discord.js';
import { permission } from '../includes/permissions';

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

    /**
     * Permission Level required to run this command.
     * @since       1.0.0b
     */
    public static readonly RequiredPermission: number = 25;

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

        // Obligatory permissions check. Error somewhere in this file, guessing it's to do with this. Maybe make permissions.check() a promise?
        if ( ! await permission.check( message.author.id, TodoCommand.RequiredPermission, <Guild> message.guild ) ) {
            return await permission.denied( message.channel, message.author.id );
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
                    { name: 'Modals', value: 'When a Password is required for the higher-level functions, a modal should appear that allows the user to type it in securely.', inline: true },
                    { name: '\u200B', value: '\u200B' },

                    { name: 'Database Implimentation', value: 'LOTS OF THINGS TO DO HERE. Main task is to figure out what!' },
                    { name: 'Permissions', value: 'Should add users to the Database when it can\'t find them in it. (Oh and pswd modals like previously mentioned.)', inline: true },
                    { name: 'Temporary Messages', value: 'Allow for the automatic removal of some messages after some time.', inline: true },
                    { name: 'Refactor into Promises', value: 'I\'m so dumb for not making the database calls promises. Now I have to refactor. Glad I caught it early in development.' },
                    { name: '\u200B', value: '\u200B' },
                )
                .setFooter({ text: `Last Updated '---' | Last Viewed ${Date.toLocaleString()}` })
        ]} );

    }

}