'use-strict';
import React from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  Image,
} from 'react-native';


export const FormatedText= (props) => {
  const str = props.text;
  const BOLD_PATT = "</B>";
  const ITALIC_PATT = "</I>";
  const UNDERLINE_PATT = "</U>";
  const FORMAT_PATT = "</F>";
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
    textKey = props.id + keyCount;
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
    if(BOLD_PATT === pattern){
      formatStr = <Text key={textKey} style={{fontWeight: 'bold'}} >{out}</Text>
    }
    if(ITALIC_PATT === pattern){
      formatStr = <Text key={textKey} style={{fontStyle: 'italic'}} >{out}</Text>
    }
    if(UNDERLINE_PATT === pattern){
      formatStr = <Text key={textKey} style={{textDecorationLine: 'underline'}} >{out}</Text>
    }
    if(FORMAT_PATT === pattern){
      formatStr = <Text key={textKey} style={props.styleFormat} >{out}</Text>
    }
    a.push(formatStr);
  }
  workStr = str.substring(endPos);
  if(workStr !== null && workStr.length > 0){
    a.push(workStr);
  }
//console.log(a);
  return (
    <View key={props.id+'formatedText'}>
     <Text style={props.style}>
       {a}
     </Text>
    </View>
  );
}
