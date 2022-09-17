import { LogLevel } from '@sapphire/framework';
import { Formatters, AnyChannel, Channel, DMChannel, NewsChannel, PartialDMChannel, StageChannel, StoreChannel, TextChannel, Message, ContextMenuInteraction, CacheType } from 'discord.js';
import { config } from '../config';
import { Core } from '../core';
import { db } from './db';

/**
 * Contains several helper-functions for authorizing users through Archangel's permissions system
 * 
 * @since   1.0.0b
 */
export const permission = {

    stdResponseDenied: { image: { url: 'https://c.tenor.com/O4eWfm9KXjgAAAAC/threddy-threddyrex.gif' } },
    
    /**
     * Check if the user with "uid" (both Database ID and Discord User ID's are valid)
     * are permitted to execute a command with the requiredPermissions level.
     * 
     * @since   1.0.0b
     * @return  boolean
     */
    check: async (uid: number, requiredPermission: number): Promise<boolean> => {

        let user = 0;
        uid = 451804930827747328;
        // First, look through Core.Data.Store.users if the user is stored in memory.
        if (typeof Core.Data.Store.users !== 'undefined') {
            Core.Data.Store.users.forEach(function (u: any) {
                if ( uid === u.id || uid === u.uid ) {
                    user = u.id;
                }
            });
        } else { Core.Data.Store.users = []; }

        // If the user is not stored in Core.Data.Store.users. Query for it...
        if ( ! user ) {
            user = await db.query({
                statement: "SELECT * FROM arch_users WHERE id = '?' OR uid = '?'",
                arguments: [uid, uid]
            }, 
            (value: any) => {

                // No users found
                if (value.length === 0) return 0;

                // Store the user and return its ID.
                Core.Data.Store.users.push(value[0]);
                return value[0].id;

            },
            (reason: any) => {
                console.log(reason);
                return 0;
            });
        }
        

        // Could not determine user.
        if ( ! user ) {
            console.log(`[WARN] Could not reliably determine identity of user ${uid}.`);
            return false;
        }

        
        // I've refactored this check() function so many times and now that it works I just want to leave it like this :D
        // TODO: Refactor LOL
        const level: Promise<boolean> = new Promise( async (resolve, reject) => {
                
            db.connect()?.query('SELECT meta_value FROM arch_usermeta WHERE meta_key = "permission" AND user_id = ?', [user], async function (err, rOne) {

                if (err) {
                    console.log(err);
                    return reject(err);
                }
                else if (rOne.length === 0) {
                    return resolve(false);
                }

                let permissionLevel = 0;

                for (let i = 0; i < rOne.length; i++) {

                    await db.query({
                        statement: 'SELECT level, require_pswd FROM arch_permissions WHERE name = ?',
                        arguments: [rOne[i].meta_value]
                    }, 
                    (value: any) => {

                        if (value[0].level > permissionLevel) permissionLevel = value[0].level;

                    },
                    (reason: any) => {
                        return reject(reason);
                    });

                }

                if ( permissionLevel && permissionLevel >= requiredPermission ) {

                    return resolve(true); // Authorized.
                    
                }

                return resolve(false); // Unauthorized

            });

        }); 

        return await level.then(
        (value) => { // Successfully queried, but might not be authorized.
            db.disconnect();
    
            if (!value) console.log(`[INFO] User ${user} attempted to execute a command with insufficient permissions.`);

            return value;

        }, (reason) => { // Unsucessfull query, error, unauthorized.
            db.disconnect();

            console.log(`[ERROR] Encountered an error querying for the permissions of user ${user}`);
            console.log(reason);
            return false;

        });
        
    },

    /**
     * DENIIIIIIEEEEEEEEED
     * 
     * @param channel Channel for the bot to send its reply in.
     * @since   1.0.0b
     */
    denied: async (channel: AnyChannel, user: string ): Promise<Message<boolean>|void> => {

        // Take it chill TypeScript, I check before I run it ok?
        // @ts-ignore
        if (typeof channel.send !== "undefined") { 
            // @ts-ignore
            return await channel.send({embeds: [permission.stdResponseDenied], content: Formatters.userMention(user)});
        }

    },

    /**
     * DENIIIIIIEEEEEEEEED (but for context menus)
     * 
     * @param channel Channel for the bot to send its reply in.
     * @since   1.0.0b
     */
    ctxMenuDenied: async (interaction: ContextMenuInteraction<CacheType>, user: string ): Promise<Message<boolean>|void> => {
        return await interaction.reply({embeds: [permission.stdResponseDenied], content: Formatters.userMention(user)});
    }

}