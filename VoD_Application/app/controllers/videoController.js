const fs = require('fs')
var videoModel = require('../models/videoModel')();

module.exports.getVideoPath = function(req, res){
    return req.params.id;
};
module.exports.streamingVideo = function(req, res, video_name, dash_server_ip ){
    console.log(video_name);

    res.render("site/video", {videoname : video_name, dash_server : dash_server_ip});
    /**const path = 'assets/jjvBnvA8GzA.mp4'
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1]
        ? parseInt(parts[1], 10)
        : fileSize-1
      const chunksize = (end-start)+1
      console.log(chunksize);

      const file = fs.createReadStream(path, {start, end})
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(200, head)
      fs.createReadStream(path).pipe(res)
  }**/
};

module.exports.getVideoList = function(req, res){
    videoList = videoModel.all();
    return videoList;
};
