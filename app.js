require("dotenv").config();
const twitch = require("twitch-js");
var moment = require('moment');

var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);

const options = {
  options: {
    debug: true
  },
  connection: {
    reconnect: true,
    secure: true
  },
  identity: {
    username: "mod_bot_9000",
    //temp token
    password: process.env.TOKEN
  },
  //Test channel
  channels: ["#test9000channel"]
};

const client = new twitch.client(options);

// Connect the client to the server
client.connect();

client.on("chat", (channel, user, message, self) => {
  // Don't listen to my own messages
  if (self) return;

  //Assigns channel name to constant
  var n = channel.split("#");
  const streamChannel = n[1];

  //Broadcaster is not returned as a mod by default so the 'broadcaster' variable is created to check if the user typing is the broadcaster
  var broadcaster;

  //I need to do some more testing regarding if this part must be hard coded or not.  the options.channels prop is
  //something I haven't messed around with while having more than one channel set up.
  //Will leave this part hard coded instead of using streamChannel but that may change in the future
  if (user.username == "test9000channel") {
    broadcaster = true;
  } else {
    broadcaster = false;
  }

  //Assign sender as user/chatter
  let sender = user["display-name"];

  //Rules message slash test message
  //Also used as just a test message
  if (message === "!rules") {
    client.say(streamChannel, "Rule 1: ---");
    client.say(streamChannel, "Rule 2: ---");
    client.say(streamChannel, "Rule 3: ---");
    client.say(streamChannel, "Rule 4: ---");
  }

  //FAQ

  if (message === "!botfaq") {
    client.say(
      streamChannel,
      "The FAQ for the bot and all the chat commands available can be found at https://github.com/tdar31/Twitch-Moderator-Bot"
    );
  }

  //Song command
  if (message === "!song") {

    //Username of last.fm account tied to broadcaster
    //As a placeholder to show off the function working I have used my personal last.fm account
    var user = "tdnaded";
    var queryURL = "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=" + user + "&api_key=" + process.env.LFTOKEN + "&format=json";
    var currentlyPlaying = null;


    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(res) {
      var time;
      var date = res.recenttracks.track[2].date;
      var artist = res.recenttracks.track[0].artist["#text"];
      var song = res.recenttracks.track[0].name;

      // currentlyPlaying = res.recenttracks.track[0]['@attr'].nowplaying;
      // console.log(date);
      // if (currentlyPlaying === null) {
      //   time = "Null: "
      //   console.log(date['#text'])
      //   console.log(moment().format("Do MMM YYYY, h:mm"))
      // } else {
      //   time = "Currently Playing: "
      // }

      //What the bot will spit out in Twitch Chat
      client.say(streamChannel, "GivePLZ Song: " + song + " by " + artist + " TakeNRG");

    });
  }

  //Social links
  if (message === "!youtube") {
    client.say(streamChannel, "Youtube Channel: youtube.com"); 
  }

  if (message === "!twitter") {
    client.say(streamChannel, "Twitter: twitter.com");
  }

  if (message === "!instagram") {
    client.say(streamChannel, "Instagram: instagram.com");
  }

  //Commands only mods and the broadcaster can use
  //The viewer and mod commands will like be split into their own files as they grow larger and larger
  if (user["mod"] || broadcaster) {
    //Emote only functionality
    if (message === "!emoteonly") {
      client.emoteonly(streamChannel);
      client.action(
        streamChannel,
        "The chat has now been set to Emote Only Mode"
      );
    }

    if (message === "!emoteonlyoff") {
      client.emoteonlyoff(streamChannel);
      client.action(streamChannel, "Emote Only Mode has now been turned off");
    }

    //Follower only functionality
    if (message.includes("!followeronly")) {
      var command = message.split(" ");

      //Checks to see if duration input is a number.  Sets to 30 mins if invalid or blank
      if (isNaN(command[1])) {
        client.followersonly(streamChannel, 30);
        client.action(
          streamChannel,
          "The chat has now been set to Follower Only Mode"
        );
      } else {
        client.followersonly(streamChannel, command[1]);
        client.action(
          streamChannel,
          "The chat has now been set to Follower Only Mode"
        );
      }
    }

    if (message === "!followeronlyoff") {
      client.followersonlyoff(streamChannel);
      client.action(
        streamChannel,
        "Followers Only Mode has now been turned off"
      );
    }

    //Slow mode functionality
    if (message.includes("!slowmode")) {
      var command = message.split(" ");

      //Checks to see if duration input is a number.  Sets to 120 seconds if invalid or blank
      if (isNaN(command[1])) {
        client.slow(streamChannel, 120);
        client.action(streamChannel, "The chat has now been set to Slow Mode");
      } else {
        client.slow(streamChannel, command[1]);
        client.action(streamChannel, "The chat has now been set to Slow Mode");
      }
    }

    if (message === "!slowmodeoff") {
      client.slow(streamChannel);
    }

    //Timeout functionality
    if (message.includes("!timeout")) {
      var command = message.split(" ");
      //Update sender to typed in command
      sender = command[1];
      var duration = command[2];
      // var reason = command[3];

      client.timeout(streamChannel, sender, duration);

      if ((sender = null)) {
        client.action(streamChannel, "No user selected");
      }

      // Checks to see if duration input is a number.  Sets to 300 seconds if invalid or blank
      if (isNaN(duration)) {
        client.timeout(streamChannel, sender, 300);
      } else {
        client.timeout(streamChannel, sender, duration);
      }
    }

    //Unban function (works on timeouts and bans)
    if (message.includes("!unban")) {
      var command = message.split(" ");
      //Update sender to typed in command
      sender = command[1];

      client
        .unban(streamChannel, sender)
        .then(function(data) {
          // data returns [channel, username]
          var chatter = data[1];
          client.action(
            streamChannel,
            chatter + " has been unbanned AngelThump"
          );
          client.whisper(
            chatter,
            "You have been unbanned from " + streamChannel
          );
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    //Ban function
    if (message.includes("!ban")) {
      var command = message.split(" ");

      // Update sender to typed in command
      sender = command[1];

      client
        .ban(streamChannel, sender)
        .then(function(data) {
          // data returns [channel, username]
          var chatter = data[1];
          client.action(streamChannel, chatter + " has been banned DuckerZ");
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    //Subscriber only functionality
    if (message === "!subonly") {
      client.subscribers(streamChannel);
      client.action(
        streamChannel,
        "The chat has now been set to Sub Only Mode"
      );
    }

    if (message === "!subonlyoff") {
      client.subscribersoff(streamChannel);
      client.action(streamChannel, "Sub Only Mode has now been turned off");
    }

    //R9K mode
    if (message === "!r9k") {
      client.r9kbeta(streamChannel);
      client.action(streamChannel, "R9K Mode has now been turned on");
    }

    if (message === "!r9koff") {
      client.r9kbetaoff(streamChannel);
      client.action(streamChannel, "R9K Mode has now been turned off");
    }

    //Whispers list of moderators of channel
    if (message === "!mods") {
      client.mods(streamChannel).then(function(data) {
        console.log(data);
        client.whisper(sender, "The mods of " + streamChannel + " are " + data);
      });
    }

    //Host command
    //Only broadcaster can do this which is a restriction by Twitch
    if (message.includes("!host")) {
      var command = message.split(" ");
      //Update sender to typed in command
      var target = command[1];

      client
        .host(streamChannel, target)
        .then(function(data) {
          // data returns [channel, username]
          client.action(streamChannel, target + " has been hosted");
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    //Unhost command
    if (message.includes("!unhost")) {
      var command = message.split(" ");
      //Update sender to typed in command
      var target = command[1];

      client
        .unhost(streamChannel)
        .then(function(data) {
          // data returns [channel, username]
          client.whisper(streamChannel, target + " has been unhosted");
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
});
