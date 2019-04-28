'use-strict';
import React from 'react';
import {
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import { styles, BACKGROUND, MENUCOLOR, TEXTTCOLOR } from './../GlobalConfig';


export default class Chapter extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        //key: this.props.key,
        id: this.props.id,
        content: this.props.content,
      };

  }
  render() {
   const { MainTitle, SubTitle, Content } = this.state.content;
   const key = this.state.id;

    return (
      <TouchableHighlight
        key={key}
        onPress={() => { this.props.onPress(Content); }}
      >
        <View style={{
          flex: 1,
          flexDirection: 'column',
          borderWidth: 1,
          borderColor: styles.chapter.borderColor,  
          backgroundColor: styles.chapter.backgroundColor}}>
          <Text style={styles.chapterMain}>
            {MainTitle}
          </Text>
          <Text style={styles.chapterSub}>
            {SubTitle}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}
