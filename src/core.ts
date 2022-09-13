import type { SapphireClient } from '@sapphire/framework';
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
	public static Configuration = {};

	/**
	 * Current state of the program.
	 * 
	 * Stores values that could be useful later on during execution.
	 * 
	 * @since	1.0.0b
	 */
	public static State = {};

	/**
	 * Begins execuion of the application.
	 * 
	 * @since	1.0.0b
	 */
	public run = (): number => {
		let status: number = 1;

		// Initialize commands.
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
	public constructor(client: SapphireClient) {

		Core.Client = client;
		Core.Configuration = {
			
		};

	}

}