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

    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
});

var EditButton = React.createClass({

    getInitialState() {
        return {
            buttonText: 'Edit',
            deleteMode: false
        }
    },

    switchModes() {
        if (this.state.deleteMode) {
            this.props.cancelDeleteMode();
            this.setState({
                buttonText: 'Edit',
                deleteMode: false,
            });
        }
        else {
            if (this.props.enterDeleteMode()) {
                this.setState({
                    buttonText: 'Cancel',
                    deleteMode: true,
                });
            }
        }
    },

    render() {
        return (
            <TouchableHighlight
                underlayColor = 'transparent'
                onPress = {this.switchModes}>
                <Text
                    style = {styles.buttonText}> {this.state.buttonText} </Text>
            </TouchableHighlight>
        );
    }
});

module.exports = EditButton;