'use-strict';
import React from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  Image,
} from 'react-native';

/*export const FormatedText = (key, text) => {
  const ft = <Text style={{color: 'red'}} >{text}</Text>
  const t = ['Hallo', ft, 'Hallo']
  return (
    <View key={key+'formatedText'}>
     <Text >
       {t}
     </Text>
    </View>
  );
}*/


export const FormatedText= (key, text) => {
  const str = text;
  const boldPatt = "</B>";
  const italicPatt = "</I>";
  const underlinePatt = "</U>";
  const formatPatt = "</F>";
  const patt1 = /<B>[\w ]+?<\/B>|<I>[\w ]+?<\/I>|<U>[\w ]+?<\/U>|<F>[\w ]+?<\/F>/g;

  let a = [];
  let l = 0;
  let endPos = 0;
  let startPos = 0;
  let formatStr = "";
  let workStr = "";
  let res = "";

  while ((res =patt1.exec(str)) != null) {
    endPos = patt1.lastIndex;
    l= res[0].length;
    workStr = str.substring(startPos,endPos-l);
    if(workStr !== null && workStr.length > 0){
      a.push(workStr);
    }
    startPos = endPos;
    if(boldPatt === str.substring(endPos-5, endPos)){
      formatStr = <Text style={{fontWeight: 'bold'}} >{res}</Text>
    }
    if(italicPatt === str.substring(endPos-5, endPos)){
      formatStr = <Text style={{fontStyle: 'italic'}} >{res}</Text>
    }
    if(underlinePatt === str.substring(endPos-5, endPos)){
      textDecorationLine
      formatStr = <Text style={{textDecorationLine: 'underline'}} >{res}</Text>
    }
    if(formatPatt === str.substring(endPos-5, endPos)){
      formatStr = <Text style={{color: 'red'}} >{res}</Text>
    }
    a.push(formatStr);
  }
  workStr = str.substring(endPos);
  if(workStr !== null && workStr.length > 0){
    a.push(workStr);
  }

  return (
    <View key={key+'formatedText'}>
     <Text >
       {a}
     </Text>
    </View>
  );
}
