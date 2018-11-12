# Twitch Moderator Bot

mod_bot_9000 is a basic and nonintrusive Twitch moderator bot that I created using the twitch-js library.  As an example channel, the bot is currently a moderator of twitch.tv/test9000channel

Trello Board:
https://trello.com/b/ECw2iJax/twitchbot 

*Viewer Commands*
--

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; The following commands are accessable to all viewers (including mods and broadcasters)

1. **FAQ**

    * !botfaq

        * The following posts link in chat to Github repo with documentation for all the available commmands for the bot.

1. **Rules**

    * !rules

        *  The following posts the channels rules in the chat.

1. **Current / Last played song**

    * !song

        *   The following grabs the broadcaster's most recent Last.fm scrobble (song played) and displays it in chat. It would require the broadcaster to have last.fm setup on iTunes/Spotify etc.  My personal Last.fm account is currently the placeholder account.

1. **Socials**

    * The following are a group of commands for posting links to social accounts.  For example the bot has the following but can easily be modified to add and remove other social accounts:
        * !twitter
        * !youtube
        * !instagram

*Moderator/Broadcaster Commands*
--

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; The following commands are only accessable to channel moderators and the broadcaster

1. **Emote Only Mode**

   * !emoteonly / !emoteonlyoff

        * The following turns emote only on and off.  It prevents viewers from chatting with anything other than Twitch emotes.  This bot, channel mods and the broadcaster are immune to it.

1. **Slow Mode**

    * !slowmode [duration] / !slowmodeoff

        * The following turns slow mode on and off.  It puts a cooldown on messages typed in chat preventing them from typing again until the timer expires.  The commands allows for a custom duration where the units are in seconds.  If the mod/broadcaster does not use a duration or enters a value that isn't a number the duration defaults to 120 seconds.  Mods and broadcasters are not restricted by this command.  This bot, channel mods and the broadcaster are immune.

1. **r9k Mode**

    * !r9k / !r9koff

        * The following turns robot9000 (r9k) mode on and off.  Requires viewers to send a unique message from their previous one and is meant to limit spam.  This bot, channel mods and broadcaster are immune to this.

1.  **Follower only Mode**

    * !followeronly [duration] / !followeronlyoff 

        * The following turns follower only mode on and off.  It prevents viewers that aren't following the broadcaster's channel from chatting.  The commands allows for a custom duration where the units are in seconds.  The duration is how long the account has been following the broadcaster; for example if you did 10 minutes in order to chat the account would have to be following the broadcaster for at least 10 minutes or more in order to chat.  If the mod/broadcaster does not use a duration or enters a value that isn't a number the duration defaults to 30 minutes.  Mods and broadcasters are not restricted by this command.

1. **Subscriber Only Mode**

    * !subonly / !subonlyoff

        * The following turns subscriber only mode on and off.  It prevents viewers that aren't subscribed to the broadcaster from chatting. This bot, channel mods and broadcaster are immune to this.

1. **Time out user**

    * !timeout [user] [duration]

        * The following times out a viewer from chatting.  The commands allows for a custom duration where the units are in seconds.  If the mod/broadcaster does not use a duration or enters a value that isn't a number the duration defaults to 300 seconds.  Mods and broadcasters cannot be banned they are modded on or the broadcaster of.

1.  **Ban user**

    * !ban [user]

        * The following bans a user from chatting.  The difference between a ban and a timeout is that a ban is indefinite.  The viewer does nto need to be in chat for this to work.  Broadcasters cannot be banned from their own channel.

1.  **Unban user**

    * !unban [user]

        * The following unbans a user from chatting.  It reverts a ban and/or timeout and restores chatting privilages to a viewer.  The viewer does not need to be in the chat for it to work.  The unbanned viewer is also sent a whisper [Twitch's verison of direct messaging] letting them know they've been unbanned.

1.  **Hosting and unhosting other channels**

    * !host [user] / !unhost [user]

        * The following hosts the selected channel.  Unhost will revert the host.
