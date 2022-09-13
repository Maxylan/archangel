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
exports.UserCommand = void 0;
const framework_1 = require("@sapphire/framework");
const v9_1 = require("discord-api-types/v9");
class UserCommand extends framework_1.Command {
    constructor(context, options) {
        super(context, Object.assign({}, options));
    }
    contextMenuRun(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return interaction.reply('Pong');
        });
    }
    registerApplicationCommands(registry) {
        registry.registerContextMenuCommand((builder) => builder //
            .setName('ping')
            .setType(v9_1.ApplicationCommandType.Message));
    }
}
exports.UserCommand = UserCommand;
