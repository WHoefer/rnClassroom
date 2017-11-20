import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';
import { getBookshelfContent } from './../FileSystem';


const book = (key, mainTitle, subtitle) => {
  console.log(mainTitle);
  return (
    <View key={key} style={{flex: 1, flexDirection: 'column', borderWidth: 1}}>
      <Text>
        {mainTitle}
      </Text>
      <Text>
        {subtitle}
      </Text>
    </View>
  );
};

export const Bookshelf = (resource: object) => {
  const data = getBookshelfContent(resource.resource);
  const rows = [];
  for (var i = 0; i < data.length; i++) {
    const row = data[i];
    rows[i] = book(i, row.MainTitle, row.SubTitle);
  }
  return(rows);

};
