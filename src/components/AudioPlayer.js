'use-strict';
import React from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  Image,
} from 'react-native';
import { getAudioPlayerData } from './../FileSystem';
import Sound from 'react-native-sound';
import { styles, BACKGROUND, MENUCOLOR, TEXTTCOLOR } from './../GlobalConfig';
import { emSize } from './../util/EMSize';
import { FormatedText } from './FormatedText';
import Icon from 'react-native-vector-icons/MaterialIcons';


const PLAY = 1;
const PAUSE = 2;
const STOP = 3;

const  PLAY_ICON = "play-arrow";
const  PAUSE_ICON = "pause";
const  STOP_ICON = "stop";
const  NEXT_ICON = "skip-next";
const  PREVIOUS_ICON = "skip-previous";

export default class AudioPlayer extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        id: this.props.id,
        resource: this.props.resource,
        sequence: this.props.sequence,
        soundArray:[],
        loaded: false,
        play: STOP,
        debug: this.props.debug === undefined ? true : this.props.debug,
      };
      this.player = null;
      this.sound1 = null;
      this.sound2 = null;
      this.soundSelect = 1;
      this.soundCount = 0;
      this.sound  = null;
      this.text = null;
      this.image = null;
      this.maxCount = 0;
      this.uriArray = [];
      this.posArray = [];
      this.subType = null;
      this.textArray = [];
      this.imageArray = [];
  }

  async componentWillMount() {
    const soundArray = [];
    const { resource, sequence } = this.state;
    const data = await getAudioPlayerData(resource, sequence);
    this.state.debug ? console.log('---> uriArray', data.uriArray ) : null;
    this.subType = data.subType;
    this.state.debug ? console.log('---> posArray', data.posArray ) : null;
    this.posArray = data.posArray;
    this.state.debug ? console.log('---> subType', data.subType ) : null;
    this.uriArray = data.uriArray;
    this.maxCount = data.uriArray.length;
    this.loadFirst();
    this.setState({loaded: true});
  }

  loadFirst(){
    try {
      this.releaseAll();
      this.soundSelect = 1;
      this.soundCount = 0;
      this.sound  = null;
      if(this.subType === 'textAndAudio'){
        this.text = this.getText();
      } else if(this.subType === 'imageAndAudio') {
        this.image = this.getImage();
      }
      this.sound1 = new Sound(this.getAudioPath(), '', (error) => {
        this.errorHandlingSoundLoad(error, this.getAudioPath(), this.sound1);
      });
    } catch(err) {
      console.log('---> Error loadFirst', err);
    }
  }

  setFlipbook() {
    if(this.subType === 'textAndAudio'){
      this.text = this.getText();
    } else if(this.subType === 'imageAndAudio') {
      this.image = this.getImage();
    }
  }

  getAudioPath() {
    if (this.soundCount < this.maxCount) {
      return this.uriArray[this.soundCount].uri.uri;
    } else {
      console.log(`Error getAudioPath:  soundCount = ${this.soundCount}  but max Index is ${this.maxCount - 1}`);
      return this.uriArray[this.maxCount - 1].uri.uri;
    }

  }

  getText() {
    if (this.soundCount < this.maxCount) {
      return this.uriArray[this.soundCount].text;
    } else {
      console.log(`Error getText:  soundCount = ${this.soundCount}  but max Index is ${this.maxCount - 1}`);
      return this.uriArray[this.maxCount - 1].text;
    }
  }

  getImage() {
    if (this.soundCount < this.maxCount) {
      return this.uriArray[this.soundCount].image;
    } else {
      console.log(`Error getText:  soundCount = ${this.soundCount}  but max Index is ${this.maxCount - 1}`);
      return this.uriArray[this.maxCount - 1].image;
    }
  }


  playbackNextPos(){
    if(this.sound !== null){
      this.sound.stop();
    }
    this.releaseAll();
    this.soundSelect = 1;
    this.posArray
    for (var i = 0; i < this.posArray.length; i++) {
      const pos =  this.posArray[i];
      if (this.soundCount <= pos) {
        this.soundCount = pos;
        break;
      }
    }
    this.sound  = null;
    this.setFlipbook();
    this.sound1 = new Sound(this.getAudioPath(), '', (error) => {
      this.errorHandlingSoundLoad(error, this.getAudioPath(), this.sound1);
      if(error === null){
        this.playAll();
      }
    });
  }

  playbackPrevPos(){
    if(this.sound !== null){
      this.sound.stop();
    }
    this.releaseAll();
    this.soundSelect = 1;
    this.posArray;
    for (var i = this.posArray.length - 1; i >= 0; i--) {
      const pos =  this.posArray[i];
      const prevPos =  i > 0 ? this.posArray[i-1] : this.posArray[0] ;
      if (this.soundCount >= pos) {
        this.soundCount = prevPos;
        break;
      }
    }
    this.sound  = null;
    this.setFlipbook();
    this.sound1 = new Sound(this.getAudioPath(), '', (error) => {
      this.errorHandlingSoundLoad(error, this.getAudioPath(), this.sound1);
      if(error === null){
        this.playAll();
      }
    });
  }

  loadNext(){
    if(this.soundCount < this.maxCount){
      if(this.soundSelect === 1){
        this.sound1 = new Sound(this.getAudioPath(), '', (error) => {
          this.errorHandlingSoundLoad(error, this.getAudioPath(), this.sound1 );
        });
      } else {
        this.sound2 = new Sound(this.getAudioPath(), '', (error) => {
        this.errorHandlingSoundLoad(error, this.getAudioPath(), this.sound2 );
        });
      }
    }
  }

  switchNext(){
    if(this.soundSelect === 1){
      this.soundSelect = 2;
    } else {
      this.soundSelect = 1;
    }
  }

  setRecentSoundInstance(){
    if(this.soundSelect === 1){
      this.sound = this.sound1;
    } else {
      this.sound = this.sound2;
    }
  }

  releasePrevious(){
    if(this.soundSelect === 1){
      if(this.sound2 !== null){
        this.sound2.release();
      }
    } else {
      if(this.sound1 !== null){
        this.sound1.release();
      }
    }
  }

  componentWillUnmount(){
    this.stopAll();
    this.releaseAll();
  }

  errorHandlingSoundLoad(error, file, sound){
    if(error !== null){
      console.log(`--> Error: Die Sounddatei ${file} konnte nicht geladen werden.`);
      return;
    }
    this.debugLoad(sound, file);
  }

  playAll(){
    try {
      if(this.soundCount < this.maxCount){
        this.setFlipbook();
        this.setState({ play: PLAY });
        this.setRecentSoundInstance();
        this.play();
        this.releasePrevious();
        this.switchNext();
        this.soundCount++;
        this.loadNext();
      }else{
        this.loadFirst();
        this.setState({play: STOP});
      }
      return;
    } catch(err) {
      console.log('----> Error in playAll:',err);
    }
  }

  play(){
    this.debugPlay();
    this.sound.play((onEnd) => {
      if(onEnd){
        this.playAll();
      } else {
        this.setState({ play: STOP });
      }
    });
  }

  pauseAll(){
    this.state.debug ? console.log('--->PAUSE: count = ', this.soundCount-1) : null;
    this.sound.pause();
    this.setState({ play: PAUSE});
    return;
  }

  resume(){
    this.state.debug ? console.log('--->RESUME: count = ', this.soundCount-1) : null;
    this.play();
    this.setState({ play: PLAY});
    return;
  }

  stopAll(){
    this.state.debug ? console.log('--->Stop') : null;
    if(this.sound !== null){
      this.sound.stop();
    }
    this.loadFirst();
    this.setState({ play: STOP, count: 0});
    return;
  }


  releaseAll(){
    if(this.sound1 !== null){
      this.sound1.release();
    }
    if(this.sound2 !== null){
      this.sound2.release();
    }
    this.setState({ count: 0});
    return;
  }

  renderButton(id, name, onPress){
    return(
      <TouchableHighlight
        key={id+name}
        onPress={ () => { onPress()}}
        style={styles.playerButton}
        underlayColor={styles.playerButtonUnderlay.underlayColor}>
        <Icon name={name} size={styles.playerIcon.size} color={styles.playerIcon.color} />
      </TouchableHighlight>
    );
  }

 renderPlayPause(id){
   const { play } = this.state;
   if(play === PAUSE) {
      return this.renderButton(id, PLAY_ICON, () => {this.resume();})
   } else if( play === STOP){
     return this.renderButton(id, PLAY_ICON, () => {this.playAll();})
   }
   return this.renderButton(id, PAUSE_ICON, () => {this.pauseAll();})

 }

 renderImage(key, obj, style){
   const { resource } = this.state;
   return (
     <View key={key+obj.type} style={{flex: 1}}>
      <Image source={getImageUri(resource, obj.content)} style={style} resizeMode="contain" borderRadius={emSize.EMROUND(1)} />
     </View>
   );
 }

 renderFlipbook(key, text, image){
   if(  this.subType != null && this.subType === 'textAndAudio') {
    return (FormatedText(key, text, styles.playerText, styles.playerTextFormated));
  } else if(  this.subType != null &&   this.subType === 'imageAndAudio') {
    return (
        <Image
          source={image}
          resizeMode="contain"
          style={styles.playerImage}
          borderBottomLeftRadius={20}
          borderBottomRightRadius={20}
          borderTopLeftRadius={emSize.EMROUND(1)}
          borderTopRightRadius={emSize.EMROUND(1)}
         />
    );
  } else {
    console.log('---> Keine anzeige');
    return (<View></View>);
  }
 }

  renderPlayer(){
    const { id } = this.state;
    const containerStyle = [
      styles.playerContainer, {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flex: 1,
      }
    ];
    const infoTextStyle = [
      styles.playerAudioText,
      {
        color: TEXTTCOLOR,
      }
    ];
    const buttonContainer = [
      styles.playerButtonContainer,
      {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      flex: 1
    }];

    return (
      <View key={id + 'container'} style={containerStyle}>
        <View style={{flex: 1}}>
          {this.renderFlipbook(id + 'Name', this.text, this.image)}
        </View>
        <View key={id + 'Buttons'} style={buttonContainer}>
          {this.renderPlayPause(id)}
          {this.renderButton(id, PREVIOUS_ICON, () => {this.playbackPrevPos()})}
          {this.renderButton(id, NEXT_ICON, () => {this.playbackNextPos()})}
          {this.renderButton(id, STOP_ICON, () => {this.stopAll();})}
        </View>
      </View>
    );
  }


  renderInfo(){
    const { id } = this.state;
    return (
      <Text key={id + 'warten'}>
        {"Bitte warten..."}
      </Text>
    );
  }
   render() {
    const { loaded } = this.state;

    if(loaded){
      return(this.renderPlayer());
    }
    return(this.renderInfo());
   }

  debugPlay(){
    try {
      if (this.state.debug) {
        console.log(`-->Start Playback: file = ${this.getAudioPath().match(/\/[0-9.a-zA-Z_]+\.mp3/gm)} pos = ${(this.soundCount+1)}/${this.maxCount}`);
      }
    } catch(err) {

    }
  }

  debugLoad(sound, file){
    try {
      if (this.state.debug) {
        console.log(`-->  Load Success: file = ${file.match(/\/[0-9.a-zA-Z_]+\.mp3/gm)} duration = ${sound.getDuration()}`);
      }
    } catch(err) {

    }
  }

}
