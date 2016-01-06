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

//Vut???
function generateUrl(productNum) {
   return 'http://cowtandb.com/products.php?productnum=' + productNum;
};

var CameraPage = React.createClass({

    getInitialState() {
      return {
        showCamera: true,
        hasRun: false,
      }
    },


    _readBarCode(event) {
        if (!this.state.hasRun){
          this.state.hasRun = true;
          var query = generateUrl(event.data);
        
          fetch(query)
            .then(response => response.json())
            .then(json => this.props.updatePatterns(json))
            .catch(error => {
              console.log("Fetch failed: " + error);
            });
          this.props.toBack();
        }
    },

    /*getProductInfo(productNum) {
      var query = generateUrl(productNum);
      fetch(query)
        .then(response => response.json())
        .then(json => this.props.updatePatterns(json))
        .catch(error => {
          console.log("Fetch failed: " + error);
        });
    },*/


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