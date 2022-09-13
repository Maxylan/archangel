"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const framework_1 = require("@sapphire/framework");
const config_1 = require("./config");
const core_1 = require("./core");
if (typeof config_1.config.ARCHANGEL_TOKEN !== "undefined") {
    /**
     * For overriding default ClientOptions when initializing the new instance of SapphireClient.
     * @see https://github.com/sapphiredev/framework/blob/106dbf2/src/lib/SapphireClient.ts#L32
     */
    const clientOptions = {
        intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS'],
        baseUserDirectory: __dirname,
        loadMessageCommandListeners: true
    };
    const client = new framework_1.SapphireClient(clientOptions);
    client.login(config_1.config.ARCHANGEL_TOKEN).then((token) => {
        console.log('[INFO] Archangel Online.');
        new core_1.Core(client).run();
    }, (reason) => {
        console.log('[ERR] Archangel Failed to initialize.');
        console.log(reason);
    });
}
else {
    console.log('[ERR] Failed to start Archangel: "ARCHANGEL_TOKEN" Undefined.');
}
