'use strict'

var React = require('react-native');
var ReactCamera = require('react-native-camera');

var {
    StyleSheet,
    Component,
} = React;

var styles = StyleSheet.create({

});

var Camera = React.createClass({

    _readBarCode() {   
        AlertIOS.alert("Barcode Found!");
    },

    render() {
        return (
            <ReactCamera
                style = {styles.container}
                onBarCodeRead = {this._readBarCode.bind(this)}
                type = 'back' />
        );
    }
});

module.export = Camera;