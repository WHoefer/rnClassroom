
export const logger = (level, log, info, message) => {
  let depth = ' ';
  if(log){
    for (var i = 1; i <= level; i++) {
      depth = depth + '--';
    }
    console.log(`${depth}> ${info}: ${message} `);
  }
}

export const loggerBookshelf = (level, log, bookshelf) => {
  logger(level, log, 'imagePath', bookshelf.imagePath);
  logger(level, log, 'audioPath', bookshelf.audioPath);
  logger(level, log, 'flipBookPath', bookshelf.flipBookPath);
  logger(level, log, 'sequencePath', bookshelf.sequencePath);
  logger(level, log, 'videoPath', bookshelf.videoPath);
  logger(level, log, 'pagePath', bookshelf.pagePath);
}
