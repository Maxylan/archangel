import { ApplicationCommandRegistry, Command, RegisterBehavior } from '@sapphire/framework';
import { ApplicationCommandType } from 'discord-api-types/v9';
import { Formatters, Guild, GuildMember, TextBasedChannel, Modal, ModalOptions, TextInputComponent, MessageActionRow } from 'discord.js';
import { permission } from '../includes/permissions';

/**
 * Options used when registering the command.
 * 
 * A full list of options for ApplicationCommandRegistry available here...
 * @see https://www.sapphirejs.dev/docs/Guide/application-commands/application-command-registry/registering-chat-input-commands
 */
export const SuggestionOptions: ApplicationCommandRegistry.RegisterOptions = {
    idHints: [],
    behaviorWhenNotIdentical: RegisterBehavior.Overwrite
}

/**
 * Adds a Context Menu (USER) command.
 * 
 * @description Suggestions the user that the client interacted with.
 * @since       1.0.0b
 */
export class SuggestionCommand extends Command {

    /**
     * Permission Level required to run this command.
     * @since       1.0.0b
     */
    public static readonly RequiredPermission: number = 25;

    public constructor(context: Command.Context, options: Command.Options) {
        super(context, { ...options,
            name: 'Leave a suggestion!',
            aliases: ['suggestion'],
            description: 'Leaves a suggestion you want to see implimented into Archangel'
        });
    }

    // Executes the command when it's called in the context-menu.
    public async contextMenuRun(interaction: Command.ContextMenuInteraction) {
        
        // Obligatory permissions check.
        if ( ! await permission.check( interaction.user.id, SuggestionCommand.RequiredPermission, <Guild> interaction.guild ) ) 
            return await permission.denyInteraction( interaction, interaction.user.id );

        /*
            | MessageActionRow<ModalActionRowComponent>[]
            | MessageActionRowOptions<ModalActionRowComponentResolvable>[];
        */
        if ( interaction.isMessageContextMenu() ) {

            await interaction.showModal(
                new Modal()
                    .setCustomId('suggestionModal')
                    .setTitle('Suggestion')
                    .setComponents(new MessageActionRow<TextInputComponent>())
            );

        }

    }

    public async chatInputRun(interaction: Command.ChatInputInteraction) {
        
        // Obligatory permissions check.
        if ( ! await permission.check( interaction.user.id, SuggestionCommand.RequiredPermission, <Guild> interaction.guild ) ) 
            return await permission.denyInteraction( interaction, interaction.user.id );
            
        const msg = await interaction.reply({ content: `Ping?`, ephemeral: true, fetchReply: true });

        await interaction.showModal(
            new Modal()
                .setCustomId('suggestionModal')
                .setTitle('Suggestion')
                .setComponents(new MessageActionRow<TextInputComponent>())
        );

    }

    // Registers the command in the ApplicationCommandRegistry
    public override registerApplicationCommands(registry: Command.Registry) {
        registry.registerContextMenuCommand((builder) =>
            builder 
                .setName('suggestion')
                .setType(ApplicationCommandType.Message)
        , SuggestionOptions );
        registry.registerChatInputCommand((builder) =>
          builder //
            .setName('suggestion')
            .setDescription(this.description)
        , SuggestionOptions );
    }

}