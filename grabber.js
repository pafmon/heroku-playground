var request = require('request');
var FeedParser = require('feedparser')
var Audio = require('./audio');

module.exports.grab = function (url,callback){
  var audios = [];
  var req = request(url);
  var feedparser = new FeedParser();

  req.on('response', function (res) {
    var stream = this;

    if (res.statusCode != 200)
      return this.emit('error', new Error('Bad status code'));

    stream.pipe(feedparser);
  });

  feedparser.on('error', function(error) {
    throw new Error("Error parsing URL:"+error);
  });

  feedparser.on('readable', function() {
    var stream = this
      , meta = this.meta
      , item;

    while (item = stream.read()) {
      audios.push(new Audio(item));
    }

  });

  feedparser.on('end', function() {
    //console.log(JSON.stringify(audios[0], null, 2));
    callback(audios);
  });

}
