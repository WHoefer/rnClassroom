
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob'
import {
  getJsonFileContent,
  getJsonFilesContent,
  getFileList,
  getFileDownload,
  filesDownload,
  getFilesToCopy,
  updateLocal } from './src/DropboxConnect';
import {
  createDirs,
  createDir,
  getFileList as localFileList,
  getLocalJsonFile,
  getLocalRecourses,
  getImagePath,
  getAudioPath,
  getVideoPath,
  getFlipbookPath,
  getSequencePath,
  getPagePath,
  getImageUri,
  getBookshelfContent,
} from './src/FileSystem';
import { ACCESSTOKEN } from './accesstoken';
import Bookshelf from './src/components/bookshelf';
import { Menu } from './src/components/menu';




/*******************************************************************************
*
*
*******************************************************************************/
const renderText = (i, str) => {
   return(
     <Text key={i}>{str}</Text>
   );
}
/*******************************************************************************
*
*
*******************************************************************************/
const textOutput = (liste) => {

  let out = [];
  out.push(renderText(0, 'Filelist'));
  if (liste) {
    for (var i = 0; i < liste.length; i++) {
      const entry = liste[i];
      out.push(renderText(i+1, `Typ: ${entry['.tag']} Name: ${entry['name']}`));
    }
  }
  return out;
}
/*******************************************************************************
*
*
*******************************************************************************/
const textOutputRaw = (liste) => {

  let out = [];
  out.push(renderText(0, 'Filelist'));
  if (liste) {
    for (var i = 0; i < liste.length; i++) {
      const entry = liste[i];
      out.push(renderText(i+1, `${i+1} ${entry}`));
    }
  }
  return out;
}
/*******************************************************************************
*
*
*******************************************************************************/
const listOutput = (liste) => {

  let out = [];
  out.push(renderText(0, 'Filelist'));
  if (liste) {
    for (var i = 0; i < liste.length; i++) {
      const entry = liste[i];
      out.push(renderText(i+1, `Num: ${i} Name: ${entry}`));
    }
  }
  return out;
}



export default class App extends Component<{}> {
  constructor(props) {
  super(props);

  this.state = {
      pos: 0,
      listLoaded: false,
      fileList: null,
      fileListImages: null,
      fileBookShelf: null,
      createdImagePath: '...',
      localFileList: '...',
      updateLocal: '...',
      updateBookshelf: '...',
      localResources: null,
      a: false,
      b: false,
      c: false,
      d: false,
      e: false,
      f: false,
      g: false,
      h: false,
      i: false,
      j: false,
  };
}


componentWillMount(){
  const localPath = RNFetchBlob.fs.dirs.SDCardDir+'/Test';
  const localPathImages = localPath + '/images';
  //createDir(RNFetchBlob.fs.dirs.DocumentDir+'/images', (obj) => {this.setState({createdImagePath: obj, a: true})});
  localFileList(localPathImages, (obj) => {this.setState({localFileList: obj, b: true})});
  //getJsonFileContent(ACCESSTOKEN, '/bookshelf.json', (obj) => { this.setState({fileBookShelf: obj.content, listLoaded: false, c: true}); });
  //getFileList(ACCESSTOKEN, '', (obj) => { this.setState({fileList: obj.content, listLoaded: false, d: true}); });
  //getFileList(ACCESSTOKEN, '/images', (obj) => { this.setState({fileListImages: obj.content, listLoaded: false, e: true}); });
  //getFileDownload(ACCESSTOKEN, '/bookshelf.json', '/bookshelf.json', () => { this.setState({listLoaded: true, f: true}); });
  //getFilesToCopy(false, ACCESSTOKEN, (obj) => {this.setState({updateContent: obj, g: true})});

  //updateLocal(true, ACCESSTOKEN, localPath ,  (obj) => {this.setState({updateLocal: obj, h: true})});

  getLocalJsonFile(localPath+'/bookshelf.json', (obj) => {this.setState({updateBookshelf: obj, i: true})});
  getLocalRecourses(true, localPath, (obj) => {this.setState({ localResources: obj, j: true })} )
}



render() {
  //getFileDownload('/Penguins.jpg', '/Penguins.jpg');
  if(
    this.state.b &&
    //this.state.c && this.state.d && this.state.e && this.state.f
    //&& this.state.g
    //this.state.h &&
    this.state.i &&
    this.state.j
  ){
    const  resource  = this.state.localResources;
    //console.log('-------+++>', resource.content[0].data);
    return (
      <Menu onPressBack={ () => {
          console.log('PressBack');
          if(this.state.pos > 0){
            const pos = this.state.pos -1;
            this.setState({pos})
          }
        }}>
        <ScrollView style={styles.container}>
          <Bookshelf
            resource={resource}
            pos={this.state.pos}
            onForward={
              (newpos) => {
                this.setState({pos: newpos});
              }
            }
          />
          {/*
          <Image source={getImageUri(resource, 'img001')} style={{width: 100, height: 100}} />
          <Image source={getImageUri(resource, 'img002')} style={{width: 100, height: 100}} />
          <Image source={require('./assets/Koala.jpg')} style={{width: 200, height: 200}} />
          {textOutputRaw(this.state.localFileList)}
          */}
          {/*textOutput(this.state.fileList)*/}
          {/*textOutput(this.state.fileListImages)*/}
          {/*renderText('bookshelf', this.state.fileBookShelf.content)*/}
          {/*renderText('RNFetchBlob.DocumentDir', `DocumentDir: ${RNFetchBlob.fs.dirs.DocumentDir} `)*/}
          {/*renderText('RNFetchBlob.CacheDir', `CacheDir: ${RNFetchBlob.fs.dirs.CacheDir} `)*/}
          {/*renderText('RNFetchBlob.DCIMDir ', `DCIMDir (Android only): ${RNFetchBlob.fs.dirs.DCIMDir } `)*/}
          {/*renderText('RNFetchBlob.DownloadDir ', `DownloadDir (Android only): ${RNFetchBlob.fs.dirs.DownloadDir } `)*/}
          {/*renderText('RNFetchBlob.SDCardDir ', `SDCardDir (Android only): ${RNFetchBlob.fs.dirs.SDCardDir } `)*/}
          {/*renderText('createdImagePath', `created image path: ${this.state.createdImagePath}`)*/}
          {/*listOutput(this.state.localFileList)*/}
          {/*renderText('updateContent', `updateContent: ${JSON.stringify(this.state.updateContent)}`)*/}
          {/*renderText('updateLocal', `updateLocal: ${JSON.stringify(this.state.updateLocal)}`)*/}



{/*
          {renderText('FlipBookPath', `FlipBookPath from local bookshelf.json: ${this.state.updateBookshelf.imagePath}`)}
          {renderText('LocalResources1', `IMAGES: ${getImagePath(this.state.localResources, 'img001')}`)}
          {renderText('LocalResources11', `IMAGES: ${getImagePath(this.state.localResources, 'img002')}`)}
          {renderText('LocalResources2', `AUDIOS: ${getAudioPath(resource, 'audio001')}`)}
          {renderText('LocalResources22', `AUDIOS: ${getAudioPath(resource, 'audio002')}`)}
          {renderText('LocalResources3', `VIDEO: ${getVideoPath(resource,'video001')}`)}
          {renderText('LocalResources33', `VIDEO: ${getVideoPath(resource,'video002')}`)}
          {renderText('LocalResources4', `FLIPBOOK: ${getFlipbookPath(resource, 'flip001')}`)}
          {renderText('LocalResources44', `FLIPBOOK: ${getFlipbookPath(resource, 'flip002')}`)}
          {renderText('LocalResources5', `SEQUENCE: ${getSequencePath(resource, 'seq001')}`)}
          {renderText('LocalResources55', `SEQUENCE: ${getSequencePath(resource, 'seq002')}`)}
          {renderText('LocalResources6', `PAGE: ${getPagePath(resource, 'page001')}`)}
          {renderText('LocalResources66', `PAGE: ${getPagePath(resource, 'page002')}`)}
          {renderText('BOOKSHELF', `BOOKSHELF: ${JSON.stringify(getBookshelfContent(resource)[0].MainTitle)}`)}

    */}
        </ScrollView>
      </Menu>
  );
  }
  return(
    <View><Text>Bitte warten!!!</Text></View>
  );
}
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  //justifyContent: 'center',
  //alignItems: 'center',
  backgroundColor: '#F5FCFF',
}
});
