import RNFetchBlob from 'react-native-fetch-blob';
import { createDirs } from './FileSystem';
import {logger, loggerBookshelf} from './util/logging';



const DROPBOX_URL_FILE_DOWNLOAD = 'https://content.dropboxapi.com/2/files/download';
const DROPBOX_URL_LIST_FOLDER = 'https://api.dropboxapi.com/2/files/list_folder';

/*******************************************************************************
* getJsonFileContent liest den Inhalt der über sourcePath angegeben Json-Datei.
* Das über den responseHandler über geben Objekt sieht wie folgt aus:
* statusCode: 200,
* errorMessage: 'No Errors',
* content: Inhalt der json-Dateien
*
* Im Fehlerfall ist der content null.
*
*******************************************************************************/
export const getJsonFileContent = (accesstoken, sourcePath, responseHandler) => {
  const headers = {
       'Authorization': `Bearer ${accesstoken}`,
       'Dropbox-API-Arg': JSON.stringify({"path":sourcePath})
   };
   RNFetchBlob.fetch( 'POST', DROPBOX_URL_FILE_DOWNLOAD,headers)
    .then((res) => {
      let json = res.json();
      responseHandler({statusCode: 200, errorMessage: 'No Errors', content: json});
    })
    .catch((errorMessage, statusCode) => {
      responseHandler({statusCode: statusCode, errorMessage: errorMessage, content: null});
    });
}
/*******************************************************************************
* getJsonFilesContent liest alle JSON-Dateien, die über sourcPathes übergeben werden
* aus. Die Rückgabe der JSON-Dateien erfolgt über den responseHandler und hat
* folgenden Struktur:
* {
*   statusCode: 200,
*   errorMessage: 'No Errors',
*   responses: [
*     {
*       sourcePath: Pfad der JSON-Datei
*       jsonContent: Inhalt der JSON-Datei
*     },
*     {
*       sourcePath:  Pfad der JSON-Datei
*       jsonContent: Inhalt der JSON-Datei
*     },
*     ...
* }
*******************************************************************************/
export const getJsonFilesContent = (accesstoken, index, sourcPathes, responses, responseHandler) => {
   if(index >= 0){
     const headers = {
          'Authorization': `Bearer ${accesstoken}`,
          'Dropbox-API-Arg': JSON.stringify({"path":sourcPathes[index]+'/resources.json'})
      };
     RNFetchBlob.fetch( 'POST', DROPBOX_URL_FILE_DOWNLOAD,headers)
     .then((res) => {
       let json = res.json();
       responses.push({ sourcePath: sourcPathes[index], jsonContent: json });
       --index;
       getJsonFilesContent(accesstoken, index, sourcPathes, responses, responseHandler);
      })
      .catch((errorMessage, statusCode) => {
        responseHandler({
          statusCode: statusCode,
          errorMessage: errorMessage,
          responses: responses
        });
      });
  } else {
    responseHandler({
      statusCode: 200,
      errorMessage: 'No Errors',
      responses: responses
    });
  }
}
/*******************************************************************************
*
*
*******************************************************************************/
export const getFileList = (accesstoken, path, responseHandler) => {
  const DROPBOX_HEADERS_LIST_FOLDER = {
      'Authorization': `Bearer ${accesstoken}`,
      'Content-Type': 'application/json'
  };
  const DROPBOX_DATA = { path: path };
  RNFetchBlob.fetch(
    'POST', DROPBOX_URL_LIST_FOLDER,
    DROPBOX_HEADERS_LIST_FOLDER, JSON.stringify(DROPBOX_DATA))
  .then((res) => {
    let json = res.json();
    let entries = json.entries;
    responseHandler({statusCode: 200, errorMessage: 'No Errors', content: entries});
  })
  .catch((errorMessage, statusCode) => {
    responseHandler({statusCode: statusCode, errorMessage: errorMessage, content: null});
  });
};
/*******************************************************************************
*
*
*******************************************************************************/
export const filesDownload = (log, accesstoken, indexSourcePathes, sourcePathes, targetPath, responseHandler) => {
 if(indexSourcePathes >= 0){
   const target = `${targetPath}${sourcePathes[indexSourcePathes]}`;
   RNFetchBlob.fs.exists(target).then((exist) => {
     let copy = !exist;
     if ( sourcePathes[indexSourcePathes].search('resources.json') >= 0 ||
          sourcePathes[indexSourcePathes].search('bookshelf.json') >= 0 ){
       copy = true;
     }
     if(copy){
      logger(1, log, 'filesDownload',`Copy from DropBox ${sourcePathes[indexSourcePathes]} to local ${target}`);
      //const dirs = RNFetchBlob.fs.dirs;
      const headers = {
        'Authorization': `Bearer ${accesstoken}`,
        'Dropbox-API-Arg': JSON.stringify({"path":sourcePathes[indexSourcePathes]})
      };
      RNFetchBlob.config({
        path : target
      }).fetch('POST', DROPBOX_URL_FILE_DOWNLOAD,headers).then((res) => {
        //progressHandler({content: res});
        --indexSourcePathes;
        filesDownload(log, accesstoken, indexSourcePathes, sourcePathes, targetPath, responseHandler)
      }).catch((errorMessage, statusCode) => {
        responseHandler({statusCode: statusCode, errorMessage: errorMessage, content: null});
      });
    }else{ // if(!exist)
      logger(1, log, 'filesDownload',`Exist in DropBox ${sourcePathes[indexSourcePathes]} and local ${target}. NO copy.`);
      --indexSourcePathes;
      filesDownload(log, accesstoken, indexSourcePathes, sourcePathes, targetPath, responseHandler)
    }
   }).catch(() => {
     responseHandler({
       statusCode: 0,
       errorMessage: `Error in filesDownload -> RNFetchBlob.fs.exists(${target})`,
       content: null});
   });
 }else{
   responseHandler({statusCode: 200, errorMessage: 'No Errors', content: null});
 } // if(indexSourcePathes >= 0)
}; // ende
/*******************************************************************************
*
*
*******************************************************************************/
export const getFileDownload = (accesstoken, sourcPath, targePath, responseHandler) => {

  const dirs = RNFetchBlob.fs.dirs;
  const headers = {
       'Authorization': `Bearer ${accesstoken}`,
       'Dropbox-API-Arg': JSON.stringify({"path":sourcPath})
   };
  RNFetchBlob.config({
    path : dirs.DownloadDir + targePath
  }).fetch( 'POST', DROPBOX_URL_FILE_DOWNLOAD,headers)
  .then((res) => {
    //console.log('The file saved to ', res.path())
    //console.log(res);
    responseHandler({statusCode: 200, errorMessage: 'No Errors', content: res});
  })
  .catch((errorMessage, statusCode) => {
    responseHandler({statusCode: statusCode, errorMessage: errorMessage, content: null});
  })
};
/****************************************************************************
* getFilesToCopy(accesstoken, responseHandler)
* Die Methode läd aus dem DropBox-Verzeichnis die bookshelf.json und liest die
* Pfade imagePath, audioPath, flipBookPath, sequencePath, videoPath, pagePath
* aus. Danach wird aus jedem Pfad die reources.json geladen und die Dateipfade
* ausgelesen.
* Über den responseHandler wird das folgende Objekt übergeben:
* statusCode: 200,
* errorMessage: 'No Errors',
* responses: {bookShelf, resourcesArray, files, pathes}
*
* bookShelf: Inhalt der bookshelf.json
* resourcesArray: Array mit allen resources.json Dateien im folgenden Format
*              {
*                statusCode: 200,
*                errorMessage: 'No Errors',
*                responses: [
*                   {
*                      sourcePath: Pfad der JSON-Datei
*                      jsonContent: Inhalt der JSON-Datei
*                   },
*                  {
*                      sourcePath:  Pfad der JSON-Datei
*                      jsonContent: Inhalt der JSON-Datei
*                  },
*                  ...
*              }
* files: Alle Pfad und Dateinamen, die aus den resources.json-Dateien ausgelesen
*        wurden. Außerdem sind am Ende des Arrays die Pfade der resources.json
*        -Dateien hinterlegt.
* pathes: Array mit den Pfadangaben zu den einzelnene Resource-Verzeichnissen
*
* Im Fehlerfallwerden die Objekte der Methoden getJsonFileContent Ornder
* getJsonFilesContent an den responsetHandler übergeben.
*
*****************************************************************************/
export const getFilesToCopy = (log, accesstoken, responseHandler) => {
  getJsonFileContent(accesstoken, '/bookshelf.json', (obj) => {
    if( obj.statusCode === 200 ){
      logger(1, log, 'getJsonFileContent', 'bookshelf.json');
      const bookShelf = obj.content;
      loggerBookshelf(2, log, bookShelf);
      const pathes = [
        bookShelf.imagePath,
        bookShelf.audioPath,
        bookShelf.flipBookPath,
        bookShelf.sequencePath,
        bookShelf.videoPath,
        bookShelf.pagePath,
      ];
      let responses = [];
      const index =  pathes.length-1;
      getJsonFilesContent(accesstoken, index, pathes, responses, (obj) => {
        let files = [];
        const resourcesArray = obj.responses;
        if( obj.statusCode === 200 ){
          logger(1, log, 'getJsonFilesContent statusCode', obj.statusCode);
          logger(1, log, 'getJsonFilesContent errorMessage', obj.errorMessage);
          files.push('/bookshelf.json');
          for (var i = 0; i < resourcesArray.length; i++) {
            files.push(`${resourcesArray[i].sourcePath}/resources.json`);
          }
          for (var i = 0; i < resourcesArray.length; i++) {
            let content =  resourcesArray[i].jsonContent.content;
            for (var j = 0; j < content.length; j++) {
              files.push(`${resourcesArray[i].sourcePath}/${content[j].value}`);
            }
          }
          const respObj = {
            statusCode: 200,
            errorMessage: 'No Errors',
            responses: {bookShelf, resourcesArray, files, pathes}
          }
          responseHandler(respObj);
        } else {
          responseHandler(obj);
        }
      }); // getJsonFilesContent(accesstoken, index, pathes, responses, (obj)
   }else{
     responseHandler(obj);
   }
 }); //getJsonFileContent(ACCESSTOKEN, '/bookshelf.json', (obj)
}
/****************************************************************************
*
*
*****************************************************************************/
export const updateLocal = (log, accesstoken, localPath, responseHandler) => {
  logger(1, log, 'updateLocal', 'Start');
  getFilesToCopy(log, accesstoken, (obj) => {
    if( obj.statusCode === 200 ){
      //console.log(JSON.stringify(obj.responses.pathes));
      const bookShelf = obj.responses.bookShelf;
      const resourcesArray = obj.responses.resourcesArray;
      const files = obj.responses.files;
      const pathes = obj.responses.pathes;
      const index =  pathes.length-1;
      logger(1, log, 'CreateDirs', 'Start');
      createDirs(index, pathes, localPath, (obj) => {
        if( obj.statusCode === 200 ){
          const index =  files.length-1;
          logger(1, log, 'filesDownload', 'Start');
          filesDownload(log, accesstoken, index, files, localPath, (obj) => {
            responseHandler(obj);
          });
        }else{
          logger(3, log, 'error createDirs', ' ');
          logger(3, log, 'response', JSON.stringify(obj));
          responseHandler(obj);
        }
      }); // createDirs(index, pathes, (obj)
    } else {
      logger(2, log, 'error getFilesToCopy');
      logger(3, log, 'response from getFilesToCopy',JSON.stringify(obj));
      responseHandler(obj);
    }
  }); // getFilesToCopy(accesstoken, (obj) => {
}
