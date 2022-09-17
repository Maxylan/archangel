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
     * 
     * If a connection exists, it returns it instead, so you can always safely chain a query 
     * off this.
     * 
     * @since   1.0.0b
     */
    connect: (database_name: string = ''): Connection|void => {
        if (dbdetails.connection === null || typeof dbdetails.connection === 'undefined') {
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
        }
        return dbdetails.connection;
    },

    /**
     * Disconnect an existing connection.
     * @since   1.0.0b
     */
    disconnect: (): void => {
        if (dbdetails.connection === null || typeof dbdetails.connection === 'undefined') return;
        dbdetails.connection.end();
        dbdetails.connection = undefined;
    },

    /**
     * Query Synchronously? using promises.
     * 
     * Hopefully this will simplify my overly-complicated codebase :D
     * 
     * @param query 
     * @param resolve 
     * @param reject 
     * @returns 
     */
    query: async (query: any, resolve: Function, reject: Function): Promise<any> => {

        return await new Promise<any>( (x, y) => { 

            if ( query.statement == null || typeof query.statement === 'undefined' ) {
                return reject('[ERROR] A statement needs to be given to db.query().');
            }

            db.connect()?.query(query.statement, query.arguments, function (err: any, result: any) {
        
                if (err) {
                    console.log(err);
                    db.disconnect();
                    return y(reject(err));
                }

                db.disconnect();
                return x(resolve(result));

            }); 

        });

    },

    now: (): string => {
        return '';
    }

}