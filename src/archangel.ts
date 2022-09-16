import { config } from './config';
import { Core } from './core';

/**
 * Alives Archangel.
 * @since   1.0.0b
 */
async function start() {

    if ( typeof config.ARCHANGEL_TOKEN !== "undefined" ) {

        // TODO/WIP: run() will return a status based on the most severe problem encountered during bot startup.
        // Would simplify debugging of problems, or that's the thought at least..
        switch ( await new Core().run( config ) ) {
            case 1:
                //...-299
                break;
            case 300:
                //...-399 Warnings
                break;
            case 400:
                //...-499 Non-fatal Errors
                break;
            case 500:
                //...-599 Fatals
                break;
        }
    
    } else {
        console.log('[ERR] Failed to start Archangel: "ARCHANGEL_TOKEN" Undefined.'); 
    }

}

// Because top-level awaits are not allowed, wrap starting logic in an async function.
start();