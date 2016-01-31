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
    backgroundColor: 'transparent',
    flexDirection: 'row'
  },
  centerLine: {
    alignSelf: 'center',
    borderWidth: 1.2,
    borderColor: '#800000',
    flex: 0.8,
    opacity: 0.5
  },
  placeholder: {
    flex: 0.1
  }
});

//Vut???
function generateUrl(productNum) {
   return 'http://cowtandb.com/inventory.php?productnum=' + productNum;
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

    render() {
        return (
            <Camera
                onBarCodeRead = {this._readBarCode}
                style = {styles.camera}>
                <View style = {styles.placeholder}/><View style = {styles.centerLine}/><View style = {styles.placeholder}/>
            </Camera>

        );
    }
});

module.exports = CameraPage;