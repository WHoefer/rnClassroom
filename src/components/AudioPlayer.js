'use-strict';
import React from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  Image,
} from 'react-native';
import { getAudioUris } from './../FileSystem';
import Sound from 'react-native-sound';
import { styles, BACKGROUND, MENUCOLOR, TEXTTCOLOR } from './../GlobalConfig';
import { emSize } from './../util/EMSize';
import { FormatedText } from './FormatedText';

const PLAY = 1;
const PAUSE = 2;
const STOP = 3;
export default class Page extends React.Component {
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
      this.count = 0;
      this.maxCount = 0;
      this.uriArray = [];
      this.posArray = [];
      this.subType = null;
      this.textArray = [];
      this.imageArray = [];
  }

  componentWillMount() {
    const soundArray = [];
    const { resource, sequence } = this.state;
    getAudioUris(resource, sequence, (uriArray, posArray, subType) => {
      this.state.debug ? console.log('---> uriArray', uriArray ) : null;
      this.subType = subType;
      this.state.debug ? console.log('---> posArray', posArray ) : null;
      this.posArray = posArray;
      this.state.debug ? console.log('---> subType', subType ) : null;
      this.uriArray = uriArray;
      this.maxCount = uriArray.length;
      this.loadFirst();
      this.setState({loaded: true});
    });
  }

  loadFirst(){
    this.releaseAll();
    this.soundSelect = 1;
    this.soundCount = 0;
    this.sound  = null;
    this.count = 0;
    if(this.subType === 'textAndAudio'){
      this.text = this.uriArray[0].text
    } else if(this.subType === 'imageAndAudio') {
      this.image = this.uriArray[0].image
    }
    this.sound1 = new Sound(this.uriArray[0].uri, '', (error) => {
      this.errorHandlingSoundLoad(error, this.uriArray[0].uri, this.sound1);
    });

  }

  loadNext(){
    if(this.soundCount < this.maxCount){
      if(this.soundSelect === 1){
        this.sound1 = new Sound(this.uriArray[this.soundCount].uri, '', (error) => {
          this.errorHandlingSoundLoad(error, this.uriArray[this.soundCount].uri, this.sound2 );
        });
      } else {
        this.sound2 = new Sound(this.uriArray[this.soundCount].uri, '', (error) => {
        this.errorHandlingSoundLoad(error, this.uriArray[this.soundCount].uri, this.sound1 );
        });
      }
    }
  }

  switchNext(){
    if(this.soundSelect === 1){
      this.soundSelect = 2;
      //console.log('---->switcht to sound 2');
    } else {
      this.soundSelect = 1;
      //console.log('---->switcht to sound 1');
    }
  }


  recentSound(){
    if(this.soundSelect === 1){
      //console.log(`----recentSound return 1 ${this.sound1}`);
      return this.sound1;
    }
    //console.log(`----recentSound return 2 ${this.sound2}`);
    return this.sound2;
  }

  releasePrevious(){
    if(this.soundSelect === 1){
      if(this.sound2 !== null){
        //console.log('---> release sound2');
        this.sound2.release();
      }
    } else {
      if(this.sound1 !== null){
        //console.log('---> release sound1');
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
    this.state.debug ? console.log(`--> Load Success: duration = ${sound.getDuration()} uri = ${file}`) : null;
  }

  playAll(){
    if(this.soundCount < this.maxCount){
      if(this.subType == "textAndAudio"){
        this.text = this.uriArray[this.soundCount].text;
      } else if(this.subType === 'imageAndAudio') {
        this.image = this.uriArray[this.soundCount].image
      }
      this.setState({ play: PLAY });
      this.sound = this.recentSound();
      this.state.debug ? console.log(`-->Play: ${this.uriArray[this.soundCount].uri}`) : null;
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
  }

  play(){
    this.sound.play((onEnd) => {
      if(onEnd){
        this.state.debug ? console.log(`-->Beendet: ${(this.soundCount+1)}/${this.maxCount}`) : null;
        this.playAll(this.soundCount);
      } else {
        this.state.debug ? console.log(`--> Fehler: ${(this.soundCount+1)}/${this.maxCount}`) : null;
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
    //console.log('--Button id: ', (id+name));
    return(
      <TouchableHighlight key={id+name} onPress={ () => { onPress()}} style={styles.playerButton}>
        <Text key={id+name+'text'} style={styles.playerAudioText} >
          {name}
        </Text>
      </TouchableHighlight>
    );
  }

 renderPlayPause(id){
   const { play } = this.state;
   if(play === PAUSE) {
      return this.renderButton(id, 'PLAY', () => {this.resume();})
   } else if( play === STOP){
     return this.renderButton(id, 'PLAY', () => {this.playAll(this.soundCount);})
   }
   return this.renderButton(id, 'PAUSE', () => {this.pauseAll(this.soundCount);})

 }

 renderImage(key, obj, style){
   const { resource } = this.state;
   return (
     <View key={key+obj.type} style={{flex: 1}}>
      <Image source={getImageUri(resource, obj.content)} style={style} resizeMode="contain" borderRadius={emSize.EMROUND(1)} />
     </View>
   );
 }

 renderText(key, text, image){
   if(  this.subType != null && this.subType === 'textAndAudio') {
    this.state.debug ? console.log('---> Text anzeigen') : null;
    return (FormatedText(key, text, styles.pageText, styles.pageTextFormated));
  } else if(  this.subType != null &&   this.subType === 'imageAndAudio') {
    this.state.debug ? console.log('---> Bild anzeigen', image) : null;
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
      styles.playerAudio, {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        //borderWidth: 1,
        borderRadius: 20,
        backgroundColor: BACKGROUND,
        //borderColor: MENUCOLOR
      }
    ];
    const infoTextStyle = [
      styles.playerAudioText,
      {
        color: TEXTTCOLOR,
      }
    ];
    const buttonStyle = {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderRadius: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      backgroundColor: MENUCOLOR,
    };

    return (
      <View key={id + 'container'} style={containerStyle}>
        <View style={{flex: 1}}>
          {this.renderText(id + 'Name', this.text, this.image)}
        </View>
        <View key={id + 'Buttons'} style={buttonStyle}>
          {this.renderPlayPause(id)}
          {this.renderButton(id, 'STOP', () => {this.stopAll();})}
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


}
