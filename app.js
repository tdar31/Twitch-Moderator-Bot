require('dotenv').config();
const twitch = require('twitch-js');

const options = {
    options: {
        debug: true
    },
    connection: {
        reconnect: true,
        secure:true
    },
    identity: {
        username: 'mod_bot_9000',
        //temp token
        password: process.env.TOKEN
    },
    //Test channel
    channels: ['#test9000channel']
};

const client = new twitch.client(options);

// Connect the client to the server
client.connect();

client.on('chat', (channel, user, message, self) => {
    // Don't listen to my own messages
    if (self) return;

    //Assigns channel name to contant
    var n = channel.split('#')
    const streamChannel = n[1]

    //Assign sender as user/chatter
    let sender = user['display-name']

    //Broadcaster is not returned as a mod by default so the 'broadcaster' variable is created to check if the user typing is the broadcaster
    var broadcaster;
    //This part must be hardcoded as a bot with more than one channel in the channels prop  will mess this up if you use options.channels
    //If you use options.channels broadcasters will have mod access on any other channels with access to the bot
    if(user.username == 'test9000channel') {
        broadcaster = true;
    } else {
        broadcaster = false;
    }

    //Rules message slash test message
    if(message === '!rules') {
        client.say(streamChannel, 'Rule 1: ---')
        client.say(streamChannel, 'Rule 2: ---')
        client.say(streamChannel, 'Rule 3: ---')
        client.say(streamChannel, 'Rule 4: ---')
    }

    //Commands only mods and the broadcaster can use
    if(user['mod'] || broadcaster) {

        //Emote only functionality
        if(message === '!emoteonly') {
            client.emoteonly(streamChannel)
            client.action(streamChannel, 'The chat has now been set to Emote Only Mode')
        }

        if(message === '!emoteonlyoff') {
            client.emoteonlyoff(streamChannel)
            client.action(streamChannel, 'Emote Only Mode has now been turned off')
        }

        //Follower only functionality
        if(message.includes('!followeronly')) {
            var duration = message.split(' ')

            //Checks to see if duration input is a number.  Sets to 30 mins if invalid or blank
            if(isNaN(duration[1])) {
                client.followersonly(streamChannel, 30)
                client.action(streamChannel, 'The chat has now been set to Follower Only Mode')
            } else {
                client.followersonly(streamChannel, duration[1])
                client.action(streamChannel, 'The chat has now been set to Follower Only Mode')
            }

        }

        if(message === '!followeronlyoff') {
            client.followersonlyoff(streamChannel);
            client.action(streamChannel, 'Followers Only Mode has now been turned off')
        }

        if(message.includes('!slowmode')) {
            var duration = message.split(' ')

            //Checks to see if duration input is a number.  Sets to 30 mins if invalid or blank
            if(isNaN(duration[1])) {
                client.slow(streamChannel, 30)
                client.action(streamChannel, 'The chat has now been set to Follower Only Mode')
            } else {
                client.slow(streamChannel, duration[1])
                client.action(streamChannel, 'The chat has now been set to Follower Only Mode')
            }

        }

        if(message === '!slowmodeoff') {
            client.slow(streamChannel)
        }








    }

})

