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


export const FormatedText= (key, text, style, styleFormat) => {
  const str = text;
  const boldPatt = "</B>";
  const italicPatt = "</I>";
  const underlinePatt = "</U>";
  const formatPatt = "</F>";
  const patt1 = /<B>.+?<\/B>|<I>.+?<\/I>|<U>.+?<\/U>|<F>.+?<\/F>/g;

  let a = [];
  let l = 0;
  let endPos = 0;
  let startPos = 0;
  let formatStr = "";
  let workStr = "";
  let res = "";
  let pattern = "";
  let keyCount = 0;
  let textKey = "";
  let out = "";

  while ((res =patt1.exec(str)) != null) {
    keyCount++;
    textKey = key + keyCount;
    endPos = patt1.lastIndex;
    l= res[0].length;
    workStr = str.substring(startPos,endPos-l);
    if(workStr !== null && workStr.length > 0){
      a.push(workStr);
    }
    startPos = endPos;
    pattern = str.substring(endPos-4, endPos);
    //console.log('RES: ', res);
    out = res[0];
    out = out.substring(3, out.length-4);
    if(boldPatt === pattern){
      formatStr = <Text key={textKey} style={{fontWeight: 'bold'}} >{out}</Text>
    }
    if(italicPatt === pattern){
      formatStr = <Text key={textKey} style={{fontStyle: 'italic'}} >{out}</Text>
    }
    if(underlinePatt === pattern){
      formatStr = <Text key={textKey} style={{textDecorationLine: 'underline'}} >{out}</Text>
    }
    if(formatPatt === pattern){
      formatStr = <Text key={textKey} style={styleFormat} >{out}</Text>
    }
    a.push(formatStr);
  }
  workStr = str.substring(endPos);
  if(workStr !== null && workStr.length > 0){
    a.push(workStr);
  }
//console.log(a);
  return (
    <View key={key+'formatedText'}>
     <Text style={style}>
       {a}
     </Text>
    </View>
  );
}
