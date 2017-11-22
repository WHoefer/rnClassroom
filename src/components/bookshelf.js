import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';
import { getBookshelfContent } from './../FileSystem';
import Chapter from './Chapter';


export default class Bookshelf extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        key: this.props.key,
        content: [getBookshelfContent(this.props.resource)],
        pos: 0,
      };
      //this.data;
  }


componentWillMount() {
     //this.data = getBookshelfContent(this.props.resource);
}

addContent(cont) {
    const newContent = this.state.content;
    const newPos = this.state.pos + 1;
    newContent[newPos] = cont;
    //console.log('---->newContent', newContent);
    this.setState({ content: newContent, pos: newPos });
}

chapter(key, cont){
  return (
    <Chapter
      key={key}
      id={key}
      content={cont}
      onPress={
        (objArray) => {
          //console.log('--------->content', objArray);
          //this.data = objArray;
          this.addContent(objArray);
        }
      }
    />);
};

render() {
  const { pos, content } = this.state;
  const data = content[pos];
  let rows = [];
  for (var i = 0; i < data.length; i++) {
    const row = data[i];
    rows[i] = this.chapter(i, row);
    console.log(`${i} MainTitle: ${row.MainTitle}`);
  }
  const lines = rows;
  return(<View>{lines}</View>);

};
}
