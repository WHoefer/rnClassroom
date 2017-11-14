import RNFetchBlob from 'react-native-fetch-blob';
import {logger, loggerBookshelf} from './util/logging';

export const getLocalRecourses = (log, path, responseHandler) => {
  logger(1, log, 'getLocalRecourses from', path);
  getLocalJsonFile(path+'/bookshelf.json',  (obj) => {
     if(obj){
       logger(2, log, 'getLocalJsonFile', 'bookshelf.json');
       const bookShelf = obj;
       loggerBookshelf(3, log, bookShelf);
       getLocalJsonFile(path+bookShelf.imagePath+'/resources.json',  (objImage) => {
         if(objImage && objImage.type === 'IMAGE'){
           logger(2, log, 'getLocalJsonFile', path+bookShelf.imagePath+'/resources.json');
           const array = objImage.content
           for (var i = 0; i < array.length; i++) {
             let key = array[i].key;
             let value  = array[i].value;
             logger(2, log, 'getLocalJsonFile', `Key: ${key} Value: ${value}`);
           }
           getLocalJsonFile(path+bookShelf.audioPath+'/resources.json',  (objAudio) => {
             if(objAudio && objAudio.type === 'AUDIO'){
               logger(2, log, 'getLocalJsonFile', path+bookShelf.audioPath+'/resources.json');
               const array = objAudio.content
               for (var i = 0; i < array.length; i++) {
                 let key = array[i].key;
                 let value  = array[i].value;
                 logger(2, log, 'getLocalJsonFile', `Key: ${key} Value: ${value}`);
               }
               getLocalJsonFile(path+bookShelf.videoPath+'/resources.json',  (objVideo) => {
                 if(objVideo && objVideo.type === 'VIDEO'){
                   logger(2, log, 'getLocalJsonFile', path+bookShelf.videoPath+'/resources.json');
                   const array = objVideo.content
                   for (var i = 0; i < array.length; i++) {
                     let key = array[i].key;
                     let value  = array[i].value;
                     logger(2, log, 'getLocalJsonFile', `Key: ${key} Value: ${value}`);
                   }
                   getLocalJsonFile(path+bookShelf.flipBookPath+'/resources.json',  (objFlipBook) => {
                     if(objFlipBook && objFlipBook.type === 'FLIPBOOK'){
                       logger(2, log, 'getLocalJsonFile', path+bookShelf.flipBookPath+'/resources.json');
                       const array = objFlipBook.content
                       for (var i = 0; i < array.length; i++) {
                         let key = array[i].key;
                         let value  = array[i].value;
                         logger(2, log, 'getLocalJsonFile', `Key: ${key} Value: ${value}`);
                       }
                       responseHandler({
                         //TODO
                         // Fileliste zurückgeben
                         statusCode: 200,
                         errorMessage: `No Errors`
                       });
                     }else{
                       responseHandler({
                         statusCode: 0,
                         errorMessage: `Error: No content from ${path}${bookShelf.flipBookPath}/resources.json`
                       });
                     }
                   });// getLocalJsonFile(path+bookShelf.flipBookPath+'/resources.json',  (objFlipBook) => {
                 }else{
                   responseHandler({
                     statusCode: 0,
                     errorMessage: `Error: No content from ${path}${bookShelf.videoPath}/resources.json`
                   });
                 }
               });// getLocalJsonFile(path+bookShelf.videoPath+'/resources.json',  (objVideo) => {
             }else{
               responseHandler({
                 statusCode: 0,
                 errorMessage: `Error: No content from ${path}${bookShelf.imagePath}/resources.json`
               });
             }
           });// getLocalJsonFile(path+bookShelf.audioPath+'/resources.json',  (objAudio) => {
         }else{
           responseHandler({
             statusCode: 0,
             errorMessage: `Error: No content from ${path}${bookShelf.imagePath}/resources.json`
           });
         }
       });// getLocalJsonFile(path+bookShelf.imagePath+'/resources.json',  (objImage) => {
     }else{
       responseHandler({
         statusCode: 0,
         errorMessage: `Error: No content from ${path}/bookshelf.json`
       });
     }
  }); // getLocalJsonFile(path+'/bookshelf.json',  (obj) => {
}


/*******************************************************************************
*
*
*******************************************************************************/
export const getLocalJsonFile = (path, responseHandler) => {
  RNFetchBlob.fs.readFile(path, 'utf8').then((data) => {
    const content = JSON.parse(data);
    responseHandler(content);
  });
}
/*******************************************************************************
* Gibt das files-Object mit der folgenden Struktur zurück:
*
*
* ...
*******************************************************************************/
export const getFileList = (path, responseHandler) => {
  RNFetchBlob.fs.ls(path).then((files) => {
      responseHandler(files);
  });
}
/*******************************************************************************
*
*
*******************************************************************************/
export const createDir = (path, responseHandler) => {
  fileExists(path, (exist) => {
    if(exist !== null){
      if(!exist){
        RNFetchBlob.fs.mkdir(path).then(() => {
          responseHandler(path);
        }).catch((err) => {
          responseHandler(null);
        });
      }else{
        responseHandler(path);
      }
    }else{
      responseHandler(null);
    }
  });
}
/*******************************************************************************
*
*
*******************************************************************************/
export const createDirs = (index, pathes, root, responseHandler) => {
  if(index >= 0){
    folderExists(root, pathes[index], (exist) => {
        if(exist === false){
          RNFetchBlob.fs.mkdir(root + pathes[index]).then(() => {
            console.log(`Lokalen Ornder ${root + pathes[index]} angelegt.`);
            if(index > 0){
              --index;
              createDirs(index, pathes, root, responseHandler);
            }else{
              responseHandler({
                statusCode: 200,
                errorMessage: 'No Errors'
              });
            }
          }).catch((err) => {
            responseHandler({
              statusCode: 0,
              errorMessage: `Error in RNFetchBlob.fs.mkdir(${root + pathes[index]}): ${err})`
            });
          });
        }else{
          if(index > 0){
            --index;
            createDirs(index, pathes, root, responseHandler);
          }else{
            responseHandler({
              statusCode: 200,
              errorMessage: 'No Errors'
            });
          }
        }
    });
  }else{
    responseHandler({
      statusCode: 200,
      errorMessage: 'No Errors'
    });
  }
}
/*******************************************************************************
*
*
*******************************************************************************/
export const folderExists = (path, folder, responseHandler) => {
  let exist = false;
  getFileList(path, (files) => {
    for (var i = 0; i < files.length; i++) {
      const entry = `/${files[i]}`;
      if (entry === folder) {
        exist = true;
      }
    }
    responseHandler(exist);
  });
}
/*******************************************************************************
*
*
*******************************************************************************/
export const fileExists = (path, responseHandler) => {
  RNFetchBlob.fs.exists(path).then((obj) => {
      responseHandler(obj);
  }).catch(() => {
    console.log(`Error in RNFetchBlob.fs.exists(${path})`);
    responseHandler(null);
  });
}
