'use strict';

var React = require('react-native');
var CameraPage = require('./camera');

var {
    StyleSheet,
    Text,
    TouchableHighlight,
} = React;

var styles = StyleSheet.create({
    button: {
        marginRight: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    }
});

var EditButton = React.createClass({

    switchModes() {
        if (this.props.deleteMode) {
            this.props.cancelDeleteMode();
        }
        else {
            this.props.enterDeleteMode();
        }
    },

    render() {
        return (
            <TouchableHighlight
                style = {styles.button}
                underlayColor = 'transparent'
                onPress = {this.switchModes}>
                <Text
                    style = {styles.buttonText}> {this.props.buttonText} </Text>
            </TouchableHighlight>
        );
    }
});

module.exports = EditButton;