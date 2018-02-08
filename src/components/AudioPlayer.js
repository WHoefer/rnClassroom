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


export default class Page extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        id: this.props.id,
        resource: this.props.resource,
        sequence: this.props.sequence,
        soundArray:[],
        loaded: false,
        play: false,
      };
      this.player = null;
      this.sound1 = null;
      this.sound2 = null;
      this.soundSelect = 1;
      this.soundCount = 0;
      this.sound  = null;
      this.count = 0;
      this.maxCount = 0;
      this.uriArray = [];
  }

  componentWillMount() {
    const soundArray = [];
    const { resource, sequence } = this.state;
    getAudioUris(resource, sequence, (uriArray) => {
      console.log('---> uriArray', uriArray );
      this.sound1 = new Sound(uriArray[0].uri, '', (error) => {
        this.errorHandlingSoundLoad(error, uriArray[0].uri, this.sound1);
      });
      this.uriArray = uriArray;
      this.maxCount = uriArray.length;
      this.setState({loaded: true});
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
    console.log(`--> Load Success: duration = ${sound.getDuration()} uri = ${file}`);
  }

  playAll(count){
    //console.log(`--->Play: count = ${count} maxCount = ${this.maxCount}`);
    //console.log(`--->Play: Sound1 = ${this.sound1} Sound2 = ${this.sound2}`);
    //const { maxCount, soundArray } = this.state;
    if(count < this.maxCount){
      this.setState({ play: true });
      this.sound = this.recentSound();
      console.log(`-->Play: ${this.uriArray[count].uri}`);
      this.sound.play((onEnd) => {
        if(onEnd){
          console.log(`-->Beendet: ${(count+1)}/${this.maxCount}`);
          this.playAll(this.soundCount);
        } else {
          console.log(`--> Fehler: ${(count+1)}/${this.maxCount}`);
          this.setState({ play: false });
        }
      });
      this.releasePrevious();
      this.switchNext();
      this.soundCount++;
      this.loadNext();
    }else{
      //this.soundCount = 0;
      //this.soundSelect = 1;
      //this.loadNext();
      this.setState({play: false});
    }
    return;
  }

  pauseAll(){
    console.log('--->PAUSE: count = ', this.soundCount);
    this.sound.pause();
    this.setState({ play: false});
    return;
  }

  stopAll(){
    const {count, soundArray } = this.state;
    for (var i = 0; i < soundArray.length; i++) {
      soundArray[i].stop();
    }
    this.setState({ count: 0});
    return;
  }


  releaseAll(){
    const {count, soundArray } = this.state;
    for (var i = 0; i < soundArray.length; i++) {
      soundArray[i].release();
    }
    this.setState({ count: 0});
    return;
  }

  renderButton(id, name, onPress){
    //console.log('--Button id: ', (id+name));
    return(
      <TouchableHighlight key={id+name} onPress={ () => { onPress()}}>
        <Text key={id+name+'text'} style={styles.playerAudioText} >
          {name}
        </Text>
      </TouchableHighlight>
    );
  }

 renderPlayPause(id){
   const { play } = this.state;
   if(!play){
     return this.renderButton(id, 'START', () => {this.playAll(this.soundCount);})
   }
   return this.renderButton(id, 'PAUSE', () => {this.pauseAll(this.soundCount);})

 }

  renderPlayer(){
    const { id } = this.state;
    const containerStyle = [
      styles.playerAudio, {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: BACKGROUND,
        borderColor: MENUCOLOR }
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
      backgroundColor: MENUCOLOR,
    };

    return (
      <View key={id + 'container'} style={containerStyle}>
        <Text key={id + 'Name'} style={infoTextStyle} >
          {this.state.count}
        </Text>
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
