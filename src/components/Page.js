'use-strict';
import React from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  Image,
} from 'react-native';
import {
  getPagePath,
  getLocalJsonFile,
  getImageUri,
  getVideoUri,
  getAudioUri,
  getSequencePath,
} from './../FileSystem';
import { FormatedText } from './FormatedText';
import { styles } from './../GlobalConfig';
import { emSize } from './../util/EMSize';
import AudioPlayer from './AudioPlayer';


export default class Page extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        id: this.props.id,
        data: this.props.data,
        resource: this.props.resource,
        title: '',
        subtitle: '',
        backgroundColor: '',
        sequences: [],
        pageJson: false,


      };
      this.player = null;
      this.listOfStopFunctions = [];
  }

  componentDidMount() {
    const { data, resource, sequences } = this.state;
    const pagePath = getPagePath(resource, data);

    getLocalJsonFile(pagePath, (content) => { this.responsePage(content)});
  }

  responsePage(content) {
    if(content && content.type === 'PAGE'){
      this.setState({
       title: content.title,
       subtitle: content.subtitle,
       backgroundColor:content.backgroundColor,
       sequences:content.sequences,
       pageJson: true,
     });
    }
  }

 renderText(key, obj, style, styleFormat){
   return (FormatedText(key, obj.content, style, styleFormat));
 }

 renderVideo(key, obj, style){
   const { resource } = this.state;
   return (
     <View key={key+obj.type}>
     </View>
   );
 }

 renderImage(key, obj, style){
   const { resource } = this.state;
   return (
     <View key={key+obj.type} style={{flex: 1}}>
      <Image source={getImageUri(resource, obj.content)} style={style} resizeMode="contain" borderRadius={emSize.EMROUND(1)} />
     </View>
   );
 }

 renderAudio(key, obj){
   const { resource, id } = this.state;
   return (
     <AudioPlayer
        key={key}
        id={key+obj.type}
        resource={resource}
        sequence={obj.content}
        playerNumber={key}
        listOfStopFunctions={this.listOfStopFunctions}
     />
   );
 }

 renderFlipbook(key, obj){
   const { resource } = this.state;
   return (
     <View key={key+obj.type}>
      <Text >
        {obj.content}
      </Text>
     </View>
   );
 }

 renderDelimiter(key, obj, style){
   const { resource } = this.state;
   return (
    <View key={key+obj.type} style={{flex: 1}}>
      <View style={style} />
    </View>

   );
 }


 renderPage(){
   const { data, resource, id, title, subtitle, backgroundColor, sequences} = this.state;
    let viewArray = [];
    // sequences sind hier alle Tags in einer Seite.
    for (var i = 0; i < sequences.length; i++) {
      const obj = sequences[i];
      switch (obj.type) {
        case 'H1':
          viewArray.push(this.renderText(i, obj, styles.pageTextHeader1, styles.pageTextFormated));
          break;
        case 'H2':
          viewArray.push(this.renderText(i, obj, styles.pageTextHeader2, styles.pageTextFormated));
          break;
        case 'H3':
          viewArray.push(this.renderText(i, obj, styles.pageTextHeader3, styles.pageTextFormated));
          break;
        case 'TEXT':
          viewArray.push(this.renderText(i, obj,  styles.pageText, styles.pageTextFormated));
          break;
        case 'VIDEO':
          viewArray.push(this.renderVideo(i, obj, styles.pageVideo));
          break;
        case 'IMAGE':
          viewArray.push(this.renderImage(i, obj, styles.pageImage,));
          break;
        case 'AUDIO':
          viewArray.push(this.renderAudio(i, obj));
          break;
        case 'FLIPBOOK':
          viewArray.push(this.renderFlipbook(i, obj));
          break;
        case 'D1':
          viewArray.push(this.renderDelimiter(i, obj, styles.pageDelimiter1));
          break;
        case 'D2':
          viewArray.push(this.renderDelimiter(i, obj, styles.pageDelimiter2));
          break;
        case 'D3':
          viewArray.push(this.renderDelimiter(i, obj, styles.pageDelimiter3));
          break;
        default:
          viewArray.push(this.renderText(i, {content: 'Unbekanntes Objekt!', type: '???'}, styles.pageTextHeader, styles.pageTextFormated));
      }
    }
    return (
      <View style={styles.page}>
        {viewArray}
      </View>
    );
 }

 renderInfo(){
   return (
     <Text key={"bitteWarten"}>
       {"Bitte warten..."}
     </Text>
   );
 }
  render() {
   const { data, resource, id, title, pageJson } = this.state;

   if(pageJson){
     return(this.renderPage());
   }
   return(this.renderInfo());
  }
}
