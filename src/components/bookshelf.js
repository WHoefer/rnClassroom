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



componentWillReceiveProps(nextProps){
  //console.log('--->nextProps', JSON.stringify(nextProps));
  this.setState({pos: nextProps.pos});
}



addContent(cont) {
    const newContent = this.state.content;
    const newPos = this.state.pos + 1;
    newContent[newPos] = cont;
    //console.log('---->newContent', newContent);
    this.props.onForward(newPos);
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
  console.log('------------> Render Bookshelf');
  const { pos, content } = this.state;
  const data = content[pos];
  let rows = [];
  if (typeof data === 'object') {
    for (var i = 0; i < data.length; i++) {
      const row = data[i];
      const key = row.Type + pos + i
      rows[i] = this.chapter(key, row);
      console.log(`${key} MainTitle: ${row.MainTitle}`);
    }
    const lines = rows;
    return(<View>{lines}</View>);
  } else {
    return(<View><Text>{JSON.stringify(data)}</Text></View>);
  }

};
}
