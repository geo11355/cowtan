'use strict';

var React = require('react-native');
var Button = require('react-native-button');
var CameraPage = require('./camera');

var {
    StyleSheet,
    Text,
    TouchableHighlight,
    Image
} = React;

var styles = StyleSheet.create({
    image: {
        height: 33, width: 33,
        alignSelf: 'center'
    }
});

var AddButton = React.createClass({

    goToCamera() {
        //console.log(this.props);
        this.props.toRoute({
            name: 'Scan a Barcode',
            component: CameraPage,
            passProps: {
                updatePatterns: this.props.updatePatterns
            }
        });
    },

    render() {
        return (
            <TouchableHighlight
                onPress = {this.goToCamera}> 
                <Image
                    style = {styles.image}
                    source = {require('./../media/camera.png')}/>
            </TouchableHighlight>
        );
    }
});

module.exports = AddButton;