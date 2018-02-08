// @flow
import React from 'react';
import { Dimensions } from 'react-native';

const interpolationValuesX = [
  [15.0, 10000],
  [4.0, 2000],
  [1.533, 575],
  [1.096, 411],
  [1.0, 375],
  [0.8533, 320],
  [0.0, 0]
];

const interpolationValuesY = [
  [12.0, 10000],
  [3.0, 2001],
  [1.0, 667],
  [0.3, 262.5],
  [0.0, 0]
];

const aspectRatioAdaptationX = [
  [1.0, 10.0],
  [1.0, 1.7],  // Bei Seitenverhältnissen, die >= als 1.7 keine Korrektur.
  [0.95, 1.3],  //Linear wäre der Wert 1.3/1.7 = 0,7647. Also [0.7647, 1.3]
  [0.7, 1.0],  //Linear:  1.0/1.7 = 0,588
  [0.0, 0]
];

const aspectRatioAdaptationY = [
  [1.5, 10.0],
  [1.25, 2.0],   // Linear wäre der Wert 2.0/1.7 = 1,1765. Also [1.1765, 2.0]
  [1.0, 1.7],   // Bei Seitenverhältnissen, die <= als 1.7 keine Korrektur.
  [1.0, 1.3],
  [1.0, 1.0],
  [1.0, 0]
];

const getInterpolation = (i, node, interpolationValues) => {
  if (i === 0) {
    return 0.0;
  }
  const d1 = interpolationValues[i - 1][0];
  const d2 = interpolationValues[i][0];
  const u1 = interpolationValues[i - 1][1];
  const u2 = interpolationValues[i][1];
  const m = (d2 - d1) / (u2 - u1);
  return ((node * m) + d1) - (u1 * m);
};

const getValue = (pnode, interpolationValues) => {
  let i = 0;
  for (i = 0; i < interpolationValues.length; i++) {
    const node = interpolationValues[i][1];
    if (pnode >= node) {
      return getInterpolation(i, pnode, interpolationValues);
    }
  }
  return 1.0;
}

// Precalculate Device Dimensions for better performance
const x = Dimensions.get('window').width;
const y = Dimensions.get('window').height;
const aspectRatio = y / x;

const ratioX = getValue(x, interpolationValuesX) * getValue(aspectRatio, aspectRatioAdaptationX);
const ratioY = getValue(y, interpolationValuesY) * getValue(aspectRatio, aspectRatioAdaptationY);
//const minWidth = 320;
const minWidth = 300;

// Base font size value
const baseUnit = 16;

// We're simulating EM by changing font size according to Ratio
const unit = baseUnit * ratioX;
//const unit = aspectRatio >= 1.7 ? baseUnit * ratioX : baseUnit * ratioY;

// We add an em() shortcut function
const em = (value) => {
  //console.log('aspectRatio', aspectRatio);
  //console.log('x', x);
  //console.log('y', y);
  //console.log('ratioX', ratioX);
  //console.log('ratioY', ratioY);
  return unit * value;
};

const emRound = (value) => {
  return Math.round(unit * value);
};
// Berechnung einer Animationszeit für ein
const animTime = (px1, t1, px2) => { return (t1 * px2) / px1; };

export const emSize = {
  // GENERAL
  DEVICE_WIDTH: x,
  DEVICE_HEIGHT: y,
  RATIO_X: ratioX,
  RATIO_Y: ratioY,
  BASE_UNIT: baseUnit,
  UNIT: em(1),
  PADDING: em(1.25),
  EM: em,
  EMROUND: emRound,
  MINWIDTH: minWidth,
  ANIM_TIME: animTime
};
