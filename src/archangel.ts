import { config } from './config';
import { Core } from './core';

if ( typeof config.ARCHANGEL_TOKEN !== "undefined" ) {

    switch( new Core().run( config ) ) {
        case 1:

            break;
    }

} else {
    console.log('[ERR] Failed to start Archangel: "ARCHANGEL_TOKEN" Undefined.'); 
}
