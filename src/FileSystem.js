import RNFetchBlob from 'react-native-fetch-blob';
import {logger, loggerBookshelf} from './util/logging';

export const BOOKSHELF = 0;
export const IMAGE = 1;
export const AUDIO = 2;
export const VIDEO = 3;
export const FLIPBOOK = 4;
export const SEQUENCE = 5;
export const PAGE = 6;
export const PATH = 7;
//export const

export const getBookshelfContent = (resource) => {
    return resource.content[BOOKSHELF].data;
}

export const getImagePath = (resource, key) => {
    const imageDir = resource.content[BOOKSHELF].imagePath;
    const rootPath = resource.content[PATH];
    const file = resource.content[IMAGE][key];
    return rootPath+imageDir+'/'+file;
}

export const getAudioPath = (resource, key) => {
    const audioDir = resource.content[BOOKSHELF].audioPath;
    const rootPath = resource.content[PATH];
    const file = resource.content[AUDIO][key];
    return rootPath+audioDir+'/'+file;
}

export const getVideoPath = (resource, key) => {
    const videoDir = resource.content[BOOKSHELF].videoPath;
    const rootPath = resource.content[PATH];
    const file = resource.content[VIDEO][key];
    return rootPath+videoDir+'/'+file;
}

export const getFlipbookPath = (resource, key) => {
    const flipbookDir = resource.content[BOOKSHELF].flipbookPath;
    const rootPath = resource.content[PATH];
    const file = resource.content[FLIPBOOK][key];
    return rootPath+flipbookDir+'/'+file;
}

export const getSequencePath = (resource, key) => {
    const sequenceDir = resource.content[BOOKSHELF].sequencePath;
    const rootPath = resource.content[PATH];
    const file = resource.content[SEQUENCE][key];
    return rootPath+sequenceDir+'/'+file;
}

export const getPagePath = (resource, key) => {
    const pageDir = resource.content[BOOKSHELF].pagePath;
    const rootPath = resource.content[PATH];
    const file = resource.content[PAGE][key];
    return rootPath+pageDir+'/'+file;
}


export const getImageUri = (resource, key) => {
    return {'uri': `file://${getImagePath(resource, key)}`};
}

export const getAudioUri = (resource, key) => {
    return {'uri': `file://${getAudioPath(resource, key)}`};
}

export const getVideoUri = (resource, key) => {
    return {'uri': `file://${getVideoPath(resource, key)}`};
}

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

const getRespObjResource = (path) => {
  return {
    statusCode: 0,
    errorMessage: `Error: No content from ${path}/resources.json`
  };
}

const getRespObjBookshelf = (path) => {
  return {
    statusCode: 0,
    errorMessage: `Error: No content from ${path}/bookshelf.json`
  };
}


export const getLocalRecourses = (log, path, responseHandler) => {
  let response = [];
  response[PATH] = path;
  logger(1, log, 'getLocalRecourses from', path);
  getLocalJsonFile(path+'/bookshelf.json',  (obj) => {
     if(obj){
       logger(2, log, 'getLocalJsonFile', 'bookshelf.json');
       const bookShelf = obj;
       response[BOOKSHELF] = bookShelf;
       loggerBookshelf(3, log, bookShelf);
       getLocalJsonFile(path+bookShelf.imagePath+'/resources.json',  (objImage) => {
         if(objImage && objImage.type === 'IMAGE'){
           response[IMAGE] = getAssociativeArray(log, objImage, imgA = [], path+bookShelf.imagePath+'/resources.json');
           getLocalJsonFile(path+bookShelf.audioPath+'/resources.json',  (objAudio) => {
             if(objAudio && objAudio.type === 'AUDIO'){
               response[AUDIO] = getAssociativeArray(log, objAudio, audA = [], path+bookShelf.audioPath+'/resources.json');
               getLocalJsonFile(path+bookShelf.videoPath+'/resources.json',  (objVideo) => {
                 if(objVideo && objVideo.type === 'VIDEO'){
                   response[VIDEO] = getAssociativeArray(log, objVideo, vidA = [], path+bookShelf.videoPath+'/resources.json');
                   getLocalJsonFile(path+bookShelf.flipBookPath+'/resources.json',  (objFlipBook) => {
                     if(objFlipBook && objFlipBook.type === 'FLIPBOOK'){
                       response[FLIPBOOK] = getAssociativeArray(log, objFlipBook, flbA = [], path+bookShelf.flipBookPath+'/resources.json');
                       getLocalJsonFile(path+bookShelf.sequencePath+'/resources.json',  (objSequence) => {
                         if(objSequence && objSequence.type === 'SEQUENCE'){
                           response[SEQUENCE] = getAssociativeArray(log, objSequence, seqA = [], path+bookShelf.sequencePath+'/resources.json');
                           getLocalJsonFile(path+bookShelf.pagePath+'/resources.json',  (objPage) => {
                             if(objPage && objPage.type === 'PAGE'){
                               response[PAGE] = getAssociativeArray(log, objPage, pagA = [], path+bookShelf.pagePath+'/resources.json');
                               responseHandler({
                                 statusCode: 200,
                                 errorMessage: `No Errors`,
                                 content: response
                               });
                             }else{
                               responseHandler(getRespObjResource(path + bookShelf.pagePath));
                             }
                           });// getLocalJsonFile(path+bookShelf.pagePath+'/resources.json',  (objPage) => {
                         }else{
                           responseHandler(getRespObjResource(path + bookShelf.sequencePath));
                         }
                       });// getLocalJsonFile(path+bookShelf.sequencePath+'/resources.json',  (objSequence) => {
                     }else{
                       responseHandler(getRespObjResource(path + bookShelf.flipBookPath));
                     }
                   });// getLocalJsonFile(path+bookShelf.flipBookPath+'/resources.json',  (objFlipBook) => {
                 }else{
                   responseHandler(getRespObjResource(path + bookShelf.videoPath));
                 }
               });// getLocalJsonFile(path+bookShelf.videoPath+'/resources.json',  (objVideo) => {
             }else{
               responseHandler(getRespObjResource(path + bookShelf.audioPath));
             }
           });// getLocalJsonFile(path+bookShelf.audioPath+'/resources.json',  (objAudio) => {
         }else{
           responseHandler(getRespObjResource(path + bookShelf.imagePath));
         }
       });// getLocalJsonFile(path+bookShelf.imagePath+'/resources.json',  (objImage) => {
     }else{
       responseHandler(getRespObjBookshelf(path));
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
