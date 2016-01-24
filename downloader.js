var http = require('http');
var fs = require('fs');
var progress = require('progress-stream');

module.exports.download = function (id,url,fileName,callback){

  process.stdout.write("Downloading "+id);

  var size;
  var count=0;
  var request = http.get(url, function(response) {
    var str1 = progress({time: 60000});
    var str2 = progress({time: 1000});

    str1.on('progress', function(progress) {
      process.stdout.write(".");
    });

    str2.on('progress', function(progress) {
      size = progress.transferred;
      count++;
    });

    var file = fs.createWriteStream(fileName);

    response
      .pipe(str1)
      .pipe(str2)
      .pipe(file).on('finish', function (){
        console.log("done ("+size+" bytes in "+count+" secs)");
        callback(count);
      });
  });
}
