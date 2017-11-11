import RNFetchBlob from 'react-native-fetch-blob';




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
