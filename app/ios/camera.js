'use strict'

var React = require('react-native');
var Camera = require('react-native-camera');

var {
    View,
    StyleSheet,
    Component,
    AlertIOS,
    TouchableHighlight,
    Text
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
        console.log(this.props);
        this.props.updatePatterns();
    },

    _goBack() {
        // this.props.navigator.pop();
        this.props.updatePatterns();
    },

    generateUrl(productNum) {
      return 'http://cowtan-test.co.nf/products.php?productnum=' + productNum;
    },

    render() {
        return (
            <Camera
                onBarCodeRead = {this._readBarCode}
                style = {styles.camera}>

                <TouchableHighlight
                    onPress = {this._goBack}>
                    <Text> HELP </Text>
                </TouchableHighlight>

            </Camera>
        );
    }
});

module.exports = CameraPage;