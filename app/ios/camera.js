'use strict'

var React = require('react-native');
var Camera = require('react-native-camera');

var {
    View,
    StyleSheet,
    Component,
    AlertIOS
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
  camera: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  }
});

var CameraPage = React.createClass({

    _readBarCode(event) {   
        this.props.route.pop();
        this.props.updatePattern();
    },

    render() {
        return (
            <Camera
                onBarCodeRead = {this._readBarCode}
                style = {styles.camera}>
            </Camera>
        );
    }
});

module.exports = CameraPage;