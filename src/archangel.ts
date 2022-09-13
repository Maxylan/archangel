import { SapphireClient } from '@sapphire/framework';
import type { ClientOptions } from 'discord.js';
import { config } from './config';
import { Core } from './core';

if ( typeof config.ARCHANGEL_TOKEN !== "undefined" ) {

    /**
     * For overriding default ClientOptions when initializing the new instance of SapphireClient.
     * @see https://github.com/sapphiredev/framework/blob/106dbf2/src/lib/SapphireClient.ts#L32
     */
    const clientOptions: ClientOptions = {
        intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS'],
        baseUserDirectory: __dirname,
        loadMessageCommandListeners: true
    };

    const client = new SapphireClient( clientOptions );

    client.login( config.ARCHANGEL_TOKEN ).then(
        (token: string) => { // Success
            console.log('[INFO] Archangel Online.');
            new Core( client ).run();
        },
        (reason: any) => { // Failure
            console.log('[ERR] Archangel Failed to initialize.');
            console.log(reason);
        }
    );

} else {
    console.log('[ERR] Failed to start Archangel: "ARCHANGEL_TOKEN" Undefined.'); 
}
