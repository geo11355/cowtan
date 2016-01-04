'use strict'

var React = require('react-native');
var Camera = require('react-native-camera');

var {
    StyleSheet,
    Component,
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
  },
});

var CameraPage = React.createClass({

    _readBarCode(event) {   
        AlertIOS.alert("Barcode Found!");
    },

    render() {
        return (
            <Camera
                onBarCodeRead = {this._readBarCode}>
            </Camera>
        );
    }
});

module.export = CameraPage;