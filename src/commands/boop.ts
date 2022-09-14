import { ApplicationCommandRegistry, Command, RegisterBehavior } from '@sapphire/framework';
import { ApplicationCommandType } from 'discord-api-types/v9';
import { Formatters, GuildMember } from 'discord.js';

/**
 * Options used when registering the command.
 * 
 * A full list of options for ApplicationCommandRegistry available here...
 * @see https://www.sapphirejs.dev/docs/Guide/application-commands/application-command-registry/registering-chat-input-commands
 */
export const BoopOptions: ApplicationCommandRegistry.RegisterOptions = {
    idHints: ['boop', '1019663389846425600'],
    behaviorWhenNotIdentical: RegisterBehavior.Overwrite
}

/**
 * Adds a Context Menu (USER) command.
 * 
 * @description Boops the user that the client interacted with.
 * @since       1.0.0b
 */
export class BoopCommand extends Command {

    public constructor(context: Command.Context, options: Command.Options) {
        super(context, { ...options });
    }

    // Executes the command when it's called in the context-menu.
    public async contextMenuRun(interaction: Command.ContextMenuInteraction) {

        if ( interaction.isUserContextMenu() && interaction.targetMember instanceof GuildMember) {
            return interaction.reply({
                embeds: [{ image: { url: 'https://c.tenor.com/AOyF2C6ok0cAAAAd/fox-animation.gif' } }],
                content: `\n${Formatters.userMention(interaction.targetMember.id)}`,
                allowedMentions: {
                    users: [ interaction.targetMember.id , interaction.user.id ]
                }
            });
        }

    }

    // Registers the command in the ApplicationCommandRegistry
    public override registerApplicationCommands(registry: Command.Registry) {
        registry.registerContextMenuCommand((builder) =>
            builder 
                .setName('boop')
                .setType(ApplicationCommandType.User)
        , BoopOptions );
    }

}