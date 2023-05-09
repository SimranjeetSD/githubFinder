import React from 'react';
import {WebView} from 'react-native-webview';
export default function DatiledScreen(props) {
  const {urlDetail} = props?.route?.params;
  return <WebView source={{uri: urlDetail}} style={{flex: 1}} />;
}
