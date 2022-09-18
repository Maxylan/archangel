import { GuildMember, User } from 'discord.js';
import { config } from '../config';
import { Core } from '../core';
import { db } from './db';

/**
 * Contains several helper-functions that can be utalized throughout 
 * the application.
 * 
 * @since   1.0.0b
 */
export const helper = {

    // This is to "help" me lmao, thought it'd be fitting here.
    // Environment variables available in PrivateConfig.
    // ARCHANGEL_TOKEN
    // ARCHANGEL_DB="ArchDB"
    // ARCHANGEL_DB_ADRESS
    // ARCHANGEL_DBUSER
    // ARCHANGEL_DBUSER_ADRESS
    // ARCHANGEL_DBUSER_PSWD

    /**
     * Example function.
     * @since   1.0.0b
     */
    example: (): void => {
        console.log('I\'m an example.');
    },

    /**
     * Adds a user to the database.
     * 
     * @param       user    Discord GuildMember Object.
     * @returns     number  User Database ID
     * @since       1.0.0b
     */
    addUser: async (user: GuildMember): Promise<number> => {
        return new Promise<number>( async (resolve, reject) => {
            // Roles of the user:
            let roles = user.roles.cache.map( r => [r.name, r.id] ),
                roleToGive = roles.length > 1 ? 'member':'',
                // These two arrays contain role-names / ids where, if the user has them,
                // the user should be assigned different permission-levels in the database
                // upon creation. These are unique to my usecase and should be changed
                // by other developers.
                // TODO: Have a table in the database where these are defined instead? 
                // Then I could make a command to CRUD these pre-defined roles.
                predefinedGamerRoles: Array<Array<string>> = [

                ],
                predefinedVibesquadRoles = [
                    [ 'huge pp pikachu', '1020815128322637855' ]
                ];
            
            
            // Check if the user already exists in the database. Just making sure.
            await db.query({
                statement: 'SELECT id FROM arch_users WHERE uid = ?',
                arguments: [user.id]
            }, 
                (value: any) => {

                    // User did not already exist, everything is in order.
                    if (value.length === 0) return;

                    console.log(`[WARN] User ${user.id} already existed in the database, you should probably check this out.`);
                    return resolve(value[0].id);

                },
                (reason: any) => {
                    return reject(reason);
                }
            );

            console.log(user.displayName);
            console.log(user.user.tag.substring(user.user.tag.length - 4));
            // Add the user.
            let userDBID = await db.query({
                statement: "INSERT INTO arch_users VALUES (null, ?, ?, ?, null, null, 0, null)",
                arguments: [
                    user.id,
                    user.user.tag.substring(user.user.tag.length - 4),
                    user.displayName,
                    user.id,
                ]
            }, 
                (value: any) => {

                    // Could not find newly added user? Teapot?
                    if (typeof value.insertId === 'undefined') return reject('Could not find newly added user in the database.');

                    console.log(`[INFO] User ${user.id} Added to the database. DBID: ${value.insertId}`);
                    return value.insertId;

                },
                (reason: any) => {
                    return reject(reason);
                }
            );

            if (roles.length > 1) {

                // Check predefinedGamerRoles && predefinedVibesquadRoles for indecies matching anything in 'roles'.
                for (let i = 0; i < roles.length; i++) {

                    if ( typeof predefinedGamerRoles[i] !== 'undefined' ) {

                        if ( predefinedGamerRoles[i][0] == roles[i][0] || predefinedGamerRoles[i][0] == roles[i][1] ||
                             (typeof predefinedGamerRoles[i][1] !== undefined && predefinedGamerRoles[i][1] == roles[i][0]) || 
                             (typeof predefinedGamerRoles[i][1] !== undefined && predefinedGamerRoles[i][1] == roles[i][1]) ) {

                                if (roleToGive != 'vibesquad') roleToGive = 'gamer';
                        }

                    }

                    if ( typeof predefinedVibesquadRoles[i] !== 'undefined' ) {

                        if ( predefinedVibesquadRoles[i][0] == roles[i][0] || predefinedVibesquadRoles[i][0] == roles[i][1] ||
                             (typeof predefinedVibesquadRoles[i][1] !== undefined && predefinedVibesquadRoles[i][1] == roles[i][0]) || 
                             (typeof predefinedVibesquadRoles[i][1] !== undefined && predefinedVibesquadRoles[i][1] == roles[i][1]) ) {

                                roleToGive = 'vibesquad';
                        }

                    }

                }
        
                // Assign the user its role.
                return await db.query({
                    statement: "INSERT INTO arch_usermeta VALUES (null, ?, 'permission', ?, '"+db.date()+"', '"+db.now()+"')",
                    arguments: [
                        userDBID,
                        roleToGive
                    ]
                }, 
                    (value: any) => {
                        console.log(`[INFO] User successfully assigned role ${roleToGive}`);
                        return resolve(userDBID);
                    },
                    (reason: any) => {
                        return reject(reason);
                    }
                );

            }

            return resolve(userDBID);
            

        });

    }

}