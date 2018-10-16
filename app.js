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
    //need to make another channel 
    channels: ['#test9000channel']
};

const client = new twitch.client(options);

// Connect the client to the server
client.connect();

client.on('chat', (channel, user, message, self) => {
    // Don't listen to my own messages
    if (self) return;
    var broadcaster;

    //Assign sender as user/chatter
    let sender = user['display-name']

    //Broadcaster is not returned as a mod by default so the 'broadcaster' variable is created to check if the user typing is the broadcaster
    if(user.username == 'test9000channel') {
        broadcaster = true;
    } else {
        broadcaster = false;
    }

    //Test message
    if(message === '!hi') {
        client.action('test9000channel', 'it worked!')
    }

    //Commands only mods and the broadcaster can use
    if(user['mod'] || broadcaster) {
        // if(message === '!rules') {
        //     client.action('test9000channel', 'it worked!')
        // }

        //Emote only functionality
        if(message === '!emoteonly') {
            client.emoteonly('test9000channel')
            client.action('test9000channel', 'The chat has now been set to Emote Only Mode')
        }

        if(message === '!emoteonlyoff') {
            client.emoteonlyoff('test9000channel')
            client.action('test9000channel', 'Emote Only Mode has now been turned off')
        }

        //Follower only functionality
        if(message === '!followeronly') {
            client.followersonly('test9000channel', 30)
            client.action('test9000channel', 'The chat has now been set to Follower Only Mode')
        }

        if(message === '!followeronlyoff') {
            client.followersonlyoff('test9000channel');
            client.action('test9000channel', 'Followers Only Mode has now been turned off')
        }
    }

    // //Commands that regular chatters can use
    // if(user['mod'] === false) {
    //     if(message.includes('www.') || message.includes('.com')){
    //         client.timeout(channel, sender, 30, 'Link detection system triggered.')
    //     }
    // }
})

