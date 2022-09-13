import { Command } from '@sapphire/framework';
import { ApplicationCommandType } from 'discord-api-types/v9';

export class UserCommand extends Command {

    public constructor(context: Command.Context, options: Command.Options) {
        super(context, { ...options });
    }

    public async contextMenuRun(interaction: Command.ContextMenuInteraction) {
        return interaction.reply('Pong');
    }

    public override registerApplicationCommands(registry: Command.Registry) {
        registry.registerContextMenuCommand((builder) =>
            builder //
                .setName('ping')
                .setType(ApplicationCommandType.Message)
        );
    }

}