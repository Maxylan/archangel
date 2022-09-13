"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Core = void 0;
/**
 * The core class of the application.
 *
 * @since	1.0.0b
 */
class Core {
    /**
     * Initializes an instance of the application.
     *
     * This would be where you'd set additional options outside of config.
     *
     * @param config: Configuration	- The configuration (config.ts module)
     * @since	1.0.0b
     */
    constructor(client) {
        /**
         * Begins execuion of the application.
         *
         * @since	1.0.0b
         */
        this.run = () => {
            let status = 1;
            // Initialize commands.
            console.log('It gets here.');
            return status;
        };
        Core.Client = client;
        Core.Configuration = {};
    }
}
exports.Core = Core;
/**
 * Hardcoded Configuration values.
 *
 * @since	1.0.0b
 */
Core.Configuration = {};
/**
 * Current state of the program.
 *
 * Stores values that could be useful later on during execution.
 *
 * @since	1.0.0b
 */
Core.State = {};
