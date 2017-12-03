'use-strict';
import React from 'react';
import {
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import { getPagePath, getLocalJsonFile } from './../FileSystem';


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

 renderPage(){
   const { data, resource, id, title, subtitle, backgroundColor, sequences} = this.state;

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
      <Text key={id+'sequences'}>
        {JSON.stringify(sequences)}
      </Text>
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
