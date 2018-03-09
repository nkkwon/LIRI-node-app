require("dotenv").config();
var keys = require('./keys');
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var mySpotify = new Spotify(keys.spotify); 
var myTwitter = new Twitter(keys.twitter);

var command = process.argv[2];

var nodeArgs = process.argv;
var searchName = "";


for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {

        searchName = searchName + "+" + nodeArgs[i];

    }

    else { // if i === 3

        searchName += nodeArgs[i];

    }
}



var movieUrl = "http://www.omdbapi.com/?t=" + searchName + "&y=&plot=short&apikey=trilogy";
var twitUrl = 'https://api.twitter.com/1.1/statuses/home_timeline.json'

function tweetShow() {
    // var client = new Twitter(keys.twitter);
    var params = { screen_name: '@' + searchName };
    myTwitter.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for(i = 0; i < tweets.length; i++){
            console.log("\n" + tweets[i].user.name)
            console.log("@" + tweets[i].user.screen_name)
            console.log(tweets[i].text);
            console.log(tweets[i].user.created_at)
            }
        }
    });
}

function spotifyShow(){
    mySpotify.search({ type: 'track', query: searchName }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
  console.log(data.tracks.items[0].artists[0].name); 
  console.log(data.tracks.items[0].name); 
  console.log(data.tracks.items[0].album.name); 
  console.log(data.tracks.items[0].href); 



  });
}


if (command == "my-tweets") {
    tweetShow();
}

else if (command == "movie-this") {

    if (searchName) {
        request(movieUrl, function (error, response, body) {
            if (!error && response.statusCode === 200) {

                console.log("\n############################\n");
                console.log("Title: " + JSON.parse(body).Title);
                console.log("Year: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
                console.log("Rotten Tomato Rating: " + JSON.parse(body).Ratings[1].Value);
                console.log("Produced in: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
                console.log("\n############################\n");


            }
        }
        )
    } else {
        searchName = "Mr+Nobody";
        var movieUrl = "http://www.omdbapi.com/?t=" + searchName + "&y=&plot=short&apikey=trilogy";
        request(movieUrl, function (error, response, body) {
            if (!error && response.statusCode === 200) {

                console.log("\n############################\n");
                console.log("Title: " + JSON.parse(body).Title);
                console.log("Year: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
                console.log("Rotten Tomato Rating: " + JSON.parse(body).Ratings[1].Value);
                console.log("Produced in: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
                console.log("\n############################\n");


            }
        })
    }
} if (command == "spotify-this-song"){
spotifyShow();
};