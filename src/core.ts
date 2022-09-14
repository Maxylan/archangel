import { SapphireClient } from '@sapphire/framework';
import type { ClientOptions } from 'discord.js';
import type { PrivateConfiguration } from './config';
import { helper } from './includes/helpers';

/**
 * The core class of the application.
 * 
 * @since	1.0.0b
 */
export class Core {

	/**
	 * Current SapphireClient.
	 * 
	 * @since	1.0.0b
	 */
	public static Client: SapphireClient;

	/**
	 * Hardcoded Configuration values.
	 * 
	 * @since	1.0.0b
	 */
	public static Configuration: ClientOptions;

	/**
	 * Current state of the program.
	 * 
	 * Stores values that could be useful later on during execution.
	 * 
	 * @since	1.0.0b
	 */
	public static State: object = {};

	/**
	 * Begins execuion of the application.
	 * 
	 * @since	1.0.0b
	 */
	public run = ( config: PrivateConfiguration ): number => {
		let status: number = 1;

		// Initialize commands.

		Core.Client = new SapphireClient( Core.Configuration );

		Core.Client.login( config.ARCHANGEL_TOKEN ).then(
			(token: string) => { // Success
				console.log('[INFO] Archangel Online.');
			},
			(reason: any) => { // Failure
				console.log('[ERR] Archangel Failed to initialize.');
				console.log(reason);
				return 500;
			}
		);
		console.log('It gets here.');
		
		return status;
	}

	/**
	 * Initializes an instance of the application.
	 * 
	 * This would be where you'd set additional options outside of config.
	 * 
	 * @param config: Configuration	- The configuration (config.ts module) 
	 * @since	1.0.0b
	 */
	public constructor() {

		/**
		 * For overriding default ClientOptions when initializing the new instance of SapphireClient.
		 * @see https://github.com/sapphiredev/framework/blob/106dbf2/src/lib/SapphireClient.ts#L32
		 */
		Core.Configuration = {
			intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS'],
			baseUserDirectory: __dirname,
			loadMessageCommandListeners: true
		};

	}

}