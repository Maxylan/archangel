import { config } from '../config';
import type {Connection} from 'mysql';
var mysql = require('mysql');

const dbdetails: any = {}

/**
 * Contains several helper-functions for interacting with Databases.
 * 
 * @since   1.0.0b
 */
export const db = {

    /**
     * Establish a connection to the database of your choice (Or the default database Arch_DB)
     * @since   1.0.0b
     */
    connect: (database_name: string = ''): Connection|void => {

        dbdetails.connection = mysql.createConnection({
            database:   database_name !== '' ? database_name:config.ARCHANGEL_DB,
            host:       config.ARCHANGEL_DB_ADRESS,
            user:       config.ARCHANGEL_DBUSER,
            password:   config.ARCHANGEL_DBUSER_PSWD,
            insecureAuth: true
        });

        dbdetails.connection.connect( function (e: any) {
            if (e) return console.log(e);
        });

        return dbdetails.connection;
    },

    /**
     * Disconnect an existing connection.
     * @since   1.0.0b
     */
    disconnect: (): void => {
        if (dbdetails.connection === null || typeof dbdetails.connection === 'undefined') return;
        return dbdetails.connection.end();
    }

}