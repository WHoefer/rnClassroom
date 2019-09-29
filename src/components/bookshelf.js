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
import Page from './Page';


export default class Bookshelf extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        key: this.props.key,
        content: [getBookshelfContent(this.props.resource)],
        resource: this.props.resource,
        pos: 0,
      };
      //this.data;
  }


//componentWillMount() {
     //this.data = getBookshelfContent(this.props.resource);
//}


// Ersetzt componentWillReceiveProps
static getDerivedStateFromProps(props, state){
  console.log('--->nextProps', JSON.stringify(props.pos));
  return {pos: props.pos};
}

//componentWillReceiveProps(nextProps){
//  console.log('--->nextProps', JSON.stringify(nextProps));
//  this.setState({pos: nextProps.pos});
//}



addContent(cont) {
    const newContent = this.state.content;
    const newPos = this.state.pos + 1;
    newContent[newPos] = cont;
    //console.log('---->newContent', newContent);
    this.props.onForward(newPos);
    this.setState({ content: newContent, pos: newPos });
}

renderChapter(key, cont){
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

renderPage(key, data, resource){
  return (
    <Page
      key={key}
      id={key}
      data={data}
      resource={resource}
    />
  );
}

render() {
  console.log('------------> Render Bookshelf');
  const { pos, content, resource } = this.state;
  const data = content[pos];
  let rows = [];
  if (typeof data === 'object') {
    for (var i = 0; i < data.length; i++) {
      const row = data[i];
      const key = row.Type + pos + i
      rows[i] = this.renderChapter(key, row);
      console.log(`${key} MainTitle: ${row.MainTitle}`);
    }
    const lines = rows;
    return(<View>{lines}</View>);
  } else {
    return(this.renderPage("page", data, resource));
  }

};
}
