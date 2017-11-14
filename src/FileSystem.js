import RNFetchBlob from 'react-native-fetch-blob';
import {logger, loggerBookshelf} from './util/logging';

const getAssociativeArray = (log, obj, array, path) => {
  logger(2, log, 'getLocalJsonFile', path);
  const data = obj.content
  for (var i = 0; i < data.length; i++) {
    let key = data[i].key;
    let value  = data[i].value;
    array[key] = value;
    logger(2, log, 'getLocalJsonFile', `Key: ${key} Value: ${value}`);
  }
  return array;
}

export const getLocalRecourses = (log, path, responseHandler) => {
  let response = [];
  logger(1, log, 'getLocalRecourses from', path);
  getLocalJsonFile(path+'/bookshelf.json',  (obj) => {
     if(obj){
       logger(2, log, 'getLocalJsonFile', 'bookshelf.json');
       const bookShelf = obj;
       response.push(bookShelf);
       loggerBookshelf(3, log, bookShelf);
       getLocalJsonFile(path+bookShelf.imagePath+'/resources.json',  (objImage) => {
         if(objImage && objImage.type === 'IMAGE'){
           response.push(getAssociativeArray(log, objImage, imgA = [], path+bookShelf.imagePath+'/resources.json'));
           getLocalJsonFile(path+bookShelf.audioPath+'/resources.json',  (objAudio) => {
             if(objAudio && objAudio.type === 'AUDIO'){
               response.push(getAssociativeArray(log, objAudio, audA = [], path+bookShelf.audioPath+'/resources.json'));
               getLocalJsonFile(path+bookShelf.videoPath+'/resources.json',  (objVideo) => {
                 if(objVideo && objVideo.type === 'VIDEO'){
                   response.push(getAssociativeArray(log, objVideo, vidA = [], path+bookShelf.videoPath+'/resources.json'));
                   getLocalJsonFile(path+bookShelf.flipBookPath+'/resources.json',  (objFlipBook) => {
                     if(objFlipBook && objFlipBook.type === 'FLIPBOOK'){
                       response.push(getAssociativeArray(log, objFlipBook, flbA = [], path+bookShelf.flipBookPath+'/resources.json'));
                       getLocalJsonFile(path+bookShelf.sequencePath+'/resources.json',  (objSequence) => {
                         if(objSequence && objSequence.type === 'SEQUENCE'){
                           response.push(getAssociativeArray(log, objSequence, seqA = [], path+bookShelf.sequencePath+'/resources.json'));
                           getLocalJsonFile(path+bookShelf.pagePath+'/resources.json',  (objPage) => {
                             if(objPage && objPage.type === 'PAGE'){
                               response.push(getAssociativeArray(log, objPage, pagA = [], path+bookShelf.pagePath+'/resources.json'));
                               responseHandler({
                                 statusCode: 200,
                                 errorMessage: `No Errors`,
                                 content: response
                               });
                             }else{
                               responseHandler({
                                 statusCode: 0,
                                 errorMessage: `Error: No content from ${path}${bookShelf.pagePath}/resources.json`
                               });
                             }
                           });// getLocalJsonFile(path+bookShelf.pagePath+'/resources.json',  (objPage) => {
                         }else{
                           responseHandler({
                             statusCode: 0,
                             errorMessage: `Error: No content from ${path}${bookShelf.sequencePath}/resources.json`
                           });
                         }
                       });// getLocalJsonFile(path+bookShelf.sequencePath+'/resources.json',  (objSequence) => {
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
