import { SapphireClient } from '@sapphire/framework';
import type { ClientOptions } from 'discord.js';
import type { PrivateConfiguration } from './config';
import { helper } from './includes/helpers';

interface DataStore {
	State: any,
	Store: any,
}

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
	 * Stores values that could be useful later on during execution.
	 * 
	 * Current state of the program, name, version, just to name a few.
	 * 
	 * @since	1.0.0b
	 */
	public static Data: DataStore;

	/**
	 * Begins execuion of the application.
	 * 
	 * @since	1.0.0b
	 * @return	number	Core.Data.State.launchStatus
	 */
	public run( config: PrivateConfiguration ): number {

		Core.Client = new SapphireClient( Core.Configuration );

		Core.Client.login( config.ARCHANGEL_TOKEN ).then(

			(token: string) => { // Success
				console.log('[INFO] Archangel Online.');
			},

			(reason: any) => { // Failure

				console.log('[ERR] Archangel Failed to initialize.');
				console.log(reason);

				Core.Data.State.launchStatus = 500;
				return 500; // "Return" only when encountering 500+ codes. 
				// 500+ Meaning execution should/could no longer continue.

			}

		);
		
		return this.testDBConnection( config );

	}

	/**
	 * Tests the connection to the database during application startup.
	 * 
	 * @since	1.0.0b
	 * @return	number	Core.Data.State.launchStatus
	 */
	private testDBConnection( config: PrivateConfiguration ): number {

		// Environment variables available in PrivateConfig.
		// ARCHANGEL_TOKEN
		// ARCHANGEL_DB="ArchDB"
		// ARCHANGEL_DB_ADRESS
		// ARCHANGEL_DBUSER
		// ARCHANGEL_DBUSER_ADRESS
		
		return Core.Data.State.launchStatus;

	}

	/**
	 * Initializes an instance of the application.
	 * 
	 * This would be where you'd set additional options outside of config. As well as default values to the DataStore.
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
			loadMessageCommandListeners: true,
			caseInsensitiveCommands: true,
			typing: true
		};

		Core.Data = {
			Store: {
				author: '@Maxylan#8711',
				botName: 'Archangel',
				botVersion: '',
				createdAt: '2022-09-13',
				lastUpdatedAt: '',
				language: 'TypeScript (TS)',
				architecture: 'NodeJS 16.17.0',
				hostName: 'archangel.dev',
				environment: 'Ubuntu64x~22.04.3',
				repo: 'https://github.com/Maxylan/archangel'
			},
			State: {
				launchStatus: 1
			}
		}

	}

}