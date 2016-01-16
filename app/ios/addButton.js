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
        height: 34, width: 34,
        alignSelf: 'center',
        marginLeft: 13, 
        marginRight: 10,
        marginTop: 7.5
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
                onPress = {this.goToCamera}
                underlayColor = 'transparent'> 
                <Image
                    style = {styles.image}
                    source = {require('./../media/bar-gray.png')}/>
            </TouchableHighlight>
        );
    }
});

module.exports = AddButton;