import { Command, LogLevel } from '@sapphire/framework';
import { Formatters, AnyChannel, Channel, DMChannel, NewsChannel, PartialDMChannel, StageChannel, StoreChannel, TextChannel, Message, ContextMenuInteraction, CacheType, UserResolvable, Snowflake, Guild } from 'discord.js';
import { config } from '../config';
import { Core } from '../core';
import { db } from './db';
import { helper } from './helpers';

/**
 * Contains several helper-functions for authorizing users through Archangel's permissions system
 * 
 * @since   1.0.0b
 */
export const permission = {

    /**
     * The standard response to return when a user is denied access to a command.
     * @since   1.0.0b
     * @type    object
     */
    stdResponseDenied: { image: { url: 'https://c.tenor.com/O4eWfm9KXjgAAAAC/threddy-threddyrex.gif' } },
    
    /**
     * Check if the user with "uid" (both Database ID and Discord User ID's are valid)
     * are permitted to execute a command with the requiredPermissions level.
     * 
     * @since   1.0.0b
     * @return  boolean
     */
    check: async (uid: string, requiredPermission: number, guild: Guild): Promise<boolean> => {

        var user = 0;
        // let suid = 451804930827747300 + '';
        // uid = 451804930827747300;

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
                statement: "SELECT * FROM arch_users WHERE id = ? OR uid = ?",
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
        

        // Could not determine user. Add it to the database.
        if ( ! user ) {
            console.log(`[INFO] Could not reliably determine identity of user ${uid}. Adding it to the DB...`);

            // I'm still learning promises. I wonder if that shows? xD
            await guild.members.fetch( <Snowflake> uid ).then( 
                async (result) => {
                    await helper.addUser( result ).then( 
                        (value) => {
                            console.log('finished.');
                            console.log(value);
                            user = value;
                        }, 
                        (reason) => {
                            console.log(`[ERROR] Encountered an error attempting to add user ${user} to the database.`);
                            console.log(reason);
                        }
                    ); 
                }, (reason) => {
                    console.log(`[ERROR] Fetching user ${uid} failed. ` + reason); 
                    return false;
                }
            );

            if ( ! user ) { console.log(`[INFO] Adding user ${uid} to database failed.`); return false; }
        }

        // Get the user's permission level and compare it against the permission-level required.
        let permissionLevel = await permission.getUserLevel(user);
        if ( permissionLevel && permissionLevel >= requiredPermission ) return true; // Authorized.
        else console.log(`[INFO] User ${user} attempted to execute a command with insufficient permissions.`); return false; // Unauthorized
        
    },

    /**
     * Gets the permissions level of the database user.
     * @param udbid User Database ID
     * @returns 
     */
    getUserLevel: async (udbid: number): Promise<number> => {

        return await db.query({
            statement: "SELECT meta_value FROM arch_usermeta WHERE meta_key = 'permission' AND user_id = ?",
            arguments: [udbid]
        }, 
        async (value: any) => {

            // No permissions found for user.
            if (value.length === 0) {
                console.log(`[WARN] User ${udbid} have no permissions set!`);
                return 0;
            }
            
            let highestLevel = 0;
            for( let i = 0; i < value.length; i++ ) {
                await db.query({
                    statement: "SELECT level, require_pswd FROM arch_permissions WHERE name = ?",
                    arguments: [value[i].meta_value]
                }, 
                (value: any) => {
        
                    if (value[0].level > highestLevel) highestLevel = value[0].level;
        
                },
                (reason: any) => {
                    console.log(reason);
                    return 0;
                });
            }
            

            return highestLevel;

        },
        (reason: any) => {
            console.log(reason);
            return 0;
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
    denyInteraction: async (interaction: ContextMenuInteraction<CacheType> | Command.ChatInputInteraction<CacheType>, user: string ): Promise<Message<boolean>|void> => {
        return await interaction.reply({embeds: [permission.stdResponseDenied], content: Formatters.userMention(user)});
    }

}