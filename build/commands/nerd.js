"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NerdCommand = void 0;
const framework_1 = require("@sapphire/framework");
class NerdCommand extends framework_1.Command {
    constructor(context, options) {
        console.log('It actually fires.');
        super(context, Object.assign(Object.assign({}, options), { name: 'I\'m a nerd', aliases: ['nerd'], description: 'Sends some technical details about the bot.' }));
    }
    messageRun(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield message.channel.send(`Oh my god me too!\`\`\`json\n${JSON.stringify({
                author: '@Maxylan#8711',
                botName: 'Archangel',
                botVersion: '',
                createdAt: '2022-09-13',
                lastUpdatedAt: '',
                language: 'TypeScript (TS)',
                architecture: 'NodeJS 16.17.0',
                hostName: 'archangel.dev',
                environment: 'Ubuntu64x~22.04.3',
                botLatency: Math.round(this.container.client.ws.ping) + 'ms',
                apiLatency: '--- ms'
            }, undefined, 4)}\`\`\``);
            return msg.edit(`Oh my god me too!\`\`\`json\n${JSON.stringify({
                author: '@Maxylan#8711',
                botName: 'Archangel',
                botVersion: '',
                createdAt: '2022-09-13',
                lastUpdatedAt: '',
                language: 'TypeScript (TS)',
                architecture: 'NodeJS 16.17.0',
                hostName: 'archangel.dev',
                environment: 'Ubuntu64x~22.04.3',
                botLatency: Math.round(this.container.client.ws.ping) + 'ms',
                apiLatency: msg.createdTimestamp - message.createdTimestamp + 'ms'
            }, undefined, 4)}\`\`\``);
        });
    }
}
exports.NerdCommand = NerdCommand;
