var utils = require('./utils');
var downloader = require('./downloader');

function Audio(o){
  this.date = utils.formatDate(o.date);

  var str = o.title.substr(0,25);
  str = utils.latinise(str);
  str = str.replace(/[ ]/g, "_");
  str = str.replace(/[^a-zA-Z_]/g, "");
  str = str.substr(0,20);

  this.id = this.date + "-" + str;

  this.name = o.title;
  this.src = o.link;
  this.date = utils.formatDate(o.date);

  this.obj = o;

  this.download = function(){
      downloader.download(this.id,this.src,"./mp3/"+this.id+".mp3",function (size){
      console.log("Finished");
      this.size = size;
    });
  };

  return this;
}

module.exports = Audio;
