import { AnyChannel, Channel, DMChannel, NewsChannel, PartialDMChannel, StageChannel, StoreChannel, TextChannel } from 'discord.js';
import { config } from '../config';
import { Core } from '../core';
import { db } from './db';

/**
 * Contains several helper-functions for authorizing users through Archangel's permissions system
 * 
 * @since   1.0.0b
 */
export const permission = {

    /**
     * Check if the user with "uid" (both Database ID and Discord User ID's are valid)
     * are permitted to execute a command with the requiredPermissions level.
     * 
     * @since   1.0.0b
     * @return  boolean
     */
    check: async (uid: number, requiredPermission: number): Promise<boolean> => {

        let isAuthorized: boolean = false,
            permissionLevel: number = 0,
            user: number = 0;

        // First, look through Core.Data.Store.users if the user is stored in memory.
        Core.Data.Store.users.forEach(function (u: any) {
            if ( uid === u.id || uid === u.uid ) return user = u.id;
        });

        if ( user === 0 ) { // If that fails, query for the user in the database.
            await db.connect()?.query('SELECT id FROM arch_users WHERE id = ? OR uid = ?', [uid, uid], function (e, r) {

                if (e) {
                    console.log(e);
                    return isAuthorized;
                } 
                else if (r.length === 0) {
                    return isAuthorized;
                }

                user = r.id;

            });
        }
        
        // Could not determine user.
        if ( user === 0 || typeof user === 'undefined' ) {
            console.log(`[WARN] Could not reliably determine identity of user ${uid}.`);
            return isAuthorized;
        }
        
        // Get the users permission level.
        await db.connect()?.query('SELECT meta_value FROM arch_usermeta WHERE meta_key = "permission" AND user_id = ?', [user], function (err, rOne) {

			if (err) {
				console.log(err);
				return isAuthorized;
			}
            else if (rOne.length === 0) {
                return isAuthorized;
            }

            rOne.forEach(async function (user_perm: any) {
                await db.connect()?.query('SELECT level FROM arch_permissions WHERE name = ?', [user_perm.meta_value], function (err, rTwo) {
    
                    if (err) {
                        console.log(err);
                        return isAuthorized;
                    }
    
                    if (rTwo[0].level > permissionLevel) permissionLevel = rTwo[0].level;
    
                });
            });

		}); db.disconnect();

        if ( permission && permissionLevel >= requiredPermission ) {
            isAuthorized = true;
            return true; // Authorized.
        }

        if (!isAuthorized) console.log(`[INFO] User ${user} attempted to execute a command with insufficient permissions.`);
        return isAuthorized;
    },

    /**
     * DENIIIIIIEEEEEEEEED
     * 
     * @param channel Channel for the bot to send its reply in.
     * @since   1.0.0b
     */
    denied: (channel: AnyChannel ): void => {

        // Take it chill TypeScript, I check before I run it ok?
        // @ts-ignore
        if (typeof channel.send !== "undefined") { 
            // @ts-ignore
            channel.send({embeds: [{ image: { url: 'https://c.tenor.com/O4eWfm9KXjgAAAAC/threddy-threddyrex.gif' } }]});
        }

    }

}