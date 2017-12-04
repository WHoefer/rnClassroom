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
} from './../FileSystem';
import { FormatedText } from './FormatedText';


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

  }

  componentWillMount() {
    const { data, resource } = this.state;
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


 renderText(key, obj){
   return (FormatedText(key, obj.content));
 }

 renderVideo(key, obj){
   const { resource } = this.state;
   return (
     <View key={key+obj.type}>
      <Text >
        {obj.content}
      </Text>
     </View>
   );
 }

 renderImage(key, obj){
   const { resource } = this.state;
   return (
     <View key={key+obj.type} style={{flex: 1, width: 400, height: 300  }}>
      <Image source={getImageUri(resource, obj.content)} style={{width: 400, height: 300  }} />
     </View>
   );
 }

 renderAudio(key, obj){
   const { resource } = this.state;
   return (
     <View key={key+obj.type}>
      <Text >
        {obj.content}
      </Text>
     </View>
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

 renderDelimiter(key, obj){
   const { resource } = this.state;
   return (
     <View key={key+obj.type}>
      <Text >
        {obj.content}
      </Text>
     </View>
   );
 }


 renderPage(){
   const { data, resource, id, title, subtitle, backgroundColor, sequences} = this.state;
    let viewArray = [];
    for (var i = 0; i < sequences.length; i++) {
      const obj = sequences[i];
      switch (obj.type) {
        case 'TEXT':
          viewArray.push(this.renderText(i, obj));
          break;
        case 'VIDEO':
          viewArray.push(this.renderVideo(i, obj));
          break;
        case 'IMAGE':
          viewArray.push(this.renderImage(i, obj));
          break;
        case 'AUDIO':
          viewArray.push(this.renderAudio(i, obj));
          break;
        case 'FLIPBOOK':
          viewArray.push(this.renderFlipbook(i, obj));
          break;
        case 'DELIMITER':
          viewArray.push(this.renderDelimiter(i, obj));
          break;
        default:
          viewArray.push(this.renderText(i, {content: 'Unbekanntes Objekt!', type: '???'}));
      }
    }
    return (
      <View>
      <Text key={id+'titel'}>
        {title}
      </Text>
      <Text key={id+'subtitle'}>
        {subtitle}
      </Text>
      <Text key={id+'backgroundColor'}>
        {backgroundColor}
      </Text>
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
