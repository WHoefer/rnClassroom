
export const logger = (level, log, info, message, loadHandler) => {
  let depth = ' ';
  if(log){
    for (var i = 1; i <= level; i++) {
      depth = depth + '--';
    }
    console.log(`${depth}> ${info}: ${message} `);
  }
  if(loadHandler != null && loadHandler !== undefined){
    loadHandler(`${depth}> ${message} `);
  }
}

export const loggerBookshelf = (level, log, bookshelf, loadHandler) => {
  logger(level, log, 'imagePath', bookshelf.imagePath, loadHandler);
  logger(level, log, 'audioPath', bookshelf.audioPath, loadHandler);
  logger(level, log, 'flipBookPath', bookshelf.flipBookPath, loadHandler);
  logger(level, log, 'sequencePath', bookshelf.sequencePath, loadHandler);
  logger(level, log, 'videoPath', bookshelf.videoPath, loadHandler);
  logger(level, log, 'pagePath', bookshelf.pagePath, loadHandler);
}
