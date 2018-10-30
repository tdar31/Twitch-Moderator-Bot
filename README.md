# Twitch Moderator Bot

mod_bot_9000 is a basic and nonintrusive Twitch moderator bot that I created using the twitch-js library.  As an example channel, the bot is currently a moderator of twitch.tv/test_9000_channel

Trello Board:
https://trello.com/b/ECw2iJax/twitchbot 

*Viewer Commands*
--

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; The following commands are accessable to all viewers (including mods and broadcasters)

1. **FAQ**

    * !faq

        * Posts link in chat to Github repo with documentation for all the available commmands for the bot.

1. **Rules**

    * !rules

        *  Triggers the rules command which will post the channels rules in the chat

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

        * The following turnrs emote only on and off.  It prevents viewers from chatting with anything other than Twitch emotes.  This bot, channel mods and the broadcaster are immune to it.

1. **Slow Mode**

    * !slowmode / !slowmodeoff

        * The following turns slow mode on and off.  It prevents viewers from .....  This bot, channel mods and the broadcaster are immune.

1. **r9k Mode**

    * !r9k / !r9koff

        * The following turns robot9000 (r9k) mode on and off.  Require viewers to send a unique message from their previous one.  This bot, channel mods and broadcaster are immune to this.

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

*Design Choices*
--

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; *Lack of information passed along when Twitch returns an error*

When commands have issues with syntax or formatting Twitch will return an error with the information regarding what occured.  Currently the bot is setup to return those errors in the form of console.log.  The reason why there are no notices for this is for a few reasons.

    * Length and how many types of errors Twitch can return

Many of these errors are a few sentences explaining the issue and often are related to syntax issues for example a ban or timeout on a user that does not exist (likely a spelling error).  There is some sanitation I built into the bot for certain commands such as timeout or followeronly which check for the duration to be a number and if not pass through a hardcoded default number instead.  Additionally from the twitch js library there are xx total possible errors that Twitch can return; many of which are things such as a certain mode is already active or etc. 

    * Bot can quickly become very intrusive to the chat experience

While error information is always important it can be very difficult to naviage how to provide the user with the feedback because of how intrusive it becomes.  If the bot returned the errors in Twitch chat the chat becomes filled with lines of text regarding errors which can completely ruins the chatting experience.  This can be solved somewhat in the form of whispers but 

    * Chat commands are relatively short and sometimes typed quite often

Most commands are under six or seven characters total and most do not take in parameters.  This means a huge majority of errors (100% in the case for viewer commands) returned will be spelling/syntax related.  Using the FAQ command is a way for this to be resolved.

    * Moderators are meant to be trusted and educated

This one is pretty subjective but with the majority of the commands being only accessable to moderators, ideally only a few, trusted and educated viewers should have access to these commands and would be under the discrestion of the broadcaster.  The assumption would be if a broadcaster is granting this power to someone on their channel they would be knowledgable on the function of Twitch chat and the goals of the broadcaster.  Again I'm aware this is pretty subjective and not a great reason but I think it's important to highlight that moderator access isn't something that the majority of users have access too.

Lastly the goal of the bot is to be unintruisve to the channel experience as a whole.  It's meant to help assist the broadcaster and give viewers relavent info but quietly sit in the background outside of that.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; *Lack of language and link filter*

Long story short Twitch's built in language and link parser is pretty robust compared to other parts of Twitch chat.  This is larger due to highly inflamatory language and dangerous links can become a pretty large liablity for channels and Twitch itself so it's something that is currently fairly solid.  Additionally many channels have workarounds for moderating links such as requiring chatters to send it to moderators before it's allowed to be posted or only allowing paid subscribers access to post links.