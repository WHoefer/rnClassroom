
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Modal,
  Button,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob'
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
  fileExists,
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
import Bookshelf from './src/components/Bookshelf';
import { Menu } from './src/components/menu';
import { styles } from './src/GlobalConfig';




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
  const PATH = RNFetchBlob.fs.dirs.DownloadDir;

  this.state = {
      localPath: PATH +'/Test',
      localPathImages: PATH + '/Test/images',
      localPathBookshelf: PATH + '/Test/bookshelf.json',
      pos: 0,
      listLoaded: false,
      fileList: null,
      fileListImages: null,
      fileBookShelf: null,
      bookShelfExist: false,
      createdImagePath: '...',
      localFileList: '...',
      updateLocal: '...',
      updateBookshelf: '...',
      localResources: null,
      infoText: 'Ladevorgang: ',
      modalVisible: false,
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


openModal() {
  this.setState({modalVisible:true});
}

closeModal() {
  this.setState({modalVisible:false});
}

loadHandler(info){
   //const infoText = this.state.infoText + '\n' +info;
   this.setState({ infoText: info});
}

componentDidMount(){

  const {localPath, localPathBookshelf} = this.state;
  createDir(localPath, (path) => {
    console.log('------> Path', path);
    fileExists(localPathBookshelf, (obj) => {
      if(obj){
        getLocalRecourses(true, localPath, (obj) => {
            this.setState({ localResources: obj });
        });
      } else {
        this.setState({ infoText: ''}, () => { this.openModal() } );
        updateLocal(true, ACCESSTOKEN, localPath ,  (obj) => {
          getLocalRecourses(true, localPath, (obj) => {
            this.closeModal();
            this.setState({ localResources: obj });
          });
        }, (info ) => this.loadHandler(info));
      }
    })
  });
}



render() {
  const  resource  = this.state.localResources;
  if(resource){
    //console.log('-------+++>', resource.content[0].data);
    return (
      <Menu
        onPressBack={ () => {
          console.log('PressBack');
          if(this.state.pos > 0){
            const pos = this.state.pos -1;
            this.setState({pos})
          }
        }}
        onPressDownload={ () => {
            console.log('PressDownload');
            this.setState({ infoText: ''}, () => { this.openModal() } );
            updateLocal(true, ACCESSTOKEN, this.state.localPath ,  (obj) => {
              getLocalRecourses(true, this.state.localPath, (obj) => {
                this.closeModal();
                this.setState({ localResources: obj });
              });
            }, (info ) => this.loadHandler(info));
        }}
      >
        <ScrollView style={stylesLocal.container}>
          <Bookshelf
            resource={resource}
            pos={this.state.pos}
            onForward={
              (newpos) => {
                this.setState({pos: newpos});
              }
            }
          />
        </ScrollView>
        <Modal
              visible={this.state.modalVisible}
              animationType={'slide'}
              onRequestClose={() => this.closeModal()}
          >
            <View style={stylesLocal.modalContainer}>
              <View style={stylesLocal.innerContainer}>
                <Text style={styles.infoTextHeader}>
                  Bitte warten!
                  Es müssen Programminhalte aus
                  der Dropbox auf ihr Handy/Tablet geladen werden:
                </Text>
                <Text style={styles.infoText} >{this.state.infoText}</Text>
                <Button
                    onPress={() => this.closeModal()}
                    title="Close modal"
                >
                </Button>
              </View>
            </View>
          </Modal>
      </Menu>
  );
  }
  return(
    <ScrollView style={stylesLocal.container}>
      <Text style={styles.infoTextHeader}>
        Bitte warten! /n
        Vor dem ersten Programmstart müssen Programminhalte aus /n
        der Dropbox auf ihr Handy/Tablet geladen werden:
      </Text>
      <Text style={styles.infoText} >{this.state.infoText}</Text>
    </ScrollView>
  );
}
}

const stylesLocal = StyleSheet.create({
container: {
  flex: 1,
  //justifyContent: 'center',
  //alignItems: 'center',
  backgroundColor: '#F5FCFF',
},
modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
innerContainer: {
  alignItems: 'center',
},
innerContainerScroll: {
  height: 200,
  padding: 20,
},
});
