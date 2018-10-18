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

    //Assigns channel name to constant
    var n = channel.split('#')
    const streamChannel = n[1]

    //Assign sender as user/chatter
    let sender = user['display-name']

    //Broadcaster is not returned as a mod by default so the 'broadcaster' variable is created to check if the user typing is the broadcaster
    var broadcaster;

    //I need to do some more testing regarding if this part must be hard coded or not.  the options.channels prop is
    //something I haven't messed around with while having more than one channel set up.
    //Will leave this part hard coded instead of using streamChannel but that may change in the future
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
    //The viewer and mod commands will like be split into their own files as they grow larger and larger
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
            var command = message.split(' ')

            //Checks to see if duration input is a number.  Sets to 30 mins if invalid or blank
            if(isNaN(command[1])) {
                client.followersonly(streamChannel, 30)
                client.action(streamChannel, 'The chat has now been set to Follower Only Mode')
            } else {
                client.followersonly(streamChannel, command[1])
                client.action(streamChannel, 'The chat has now been set to Follower Only Mode')
            }

        }

        if(message === '!followeronlyoff') {
            client.followersonlyoff(streamChannel);
            client.action(streamChannel, 'Followers Only Mode has now been turned off')
        }

        //Slow mode functionality
        if(message.includes('!slowmode')) {
            var command = message.split(' ')

            //Checks to see if duration input is a number.  Sets to 300 seconds if invalid or blank
            if(isNaN(command[1])) {
                client.slow(streamChannel, 30)
                client.action(streamChannel, 'The chat has now been set to Slow Mode')
            } else {
                client.slow(streamChannel, command[1])
                client.action(streamChannel, 'The chat has now been set to Slow Mode')
            }

        }

        if(message === '!slowmodeoff') {
            client.slow(streamChannel)
        }

        //Timeout functionality
        if(message.includes('!timeout')) {
            var command = message.split(' ')
            //Update sender to typed in command
            sender = command[1];
            var duration = command[2];
            // var reason = command[3];

            client.timeout(streamChannel, sender, duration)

            if(sender = null) {
                client.action(streamChannel, 'No user selected')
            }

            // Checks to see if duration input is a number.  Sets to 300 seconds if invalid or blank
            if(isNaN(duration)) {
                client.timeout(streamChannel, sender, 300)
            } else {
                client.timeout(streamChannel, sender, duration)
            }

        }

        //Unban function (works on timeouts and bans)
        if(message.includes('!unban')) {
            var command = message.split(' ')
            sender = command[1];

            client.unban(streamChannel, sender)
            .then(function(data) {
                // data returns [channel, username]
                console.log (data[1])
                client.action(streamChannel, data[1] + ' has been unbanned AngelThump')
              })
              .catch(function(err) {
                //error
              });

        }

    }

})

