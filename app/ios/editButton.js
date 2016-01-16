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
        marginRight: 12
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
});

var EditButton = React.createClass({

    // getInitialState() {
    //     return {
    //         buttonText: 'Edit',
    //         deleteMode: false
    //     }
    // },

    switchModes() {
        if (this.props.deleteMode) {
            this.props.cancelDeleteMode();
        }
        else {
            var updatedState = this.props.enterDeleteMode();
            // if (updatedState) {
            //     // this.setState({
            //     //     buttonText: 'Cancel',
            //     //     deleteMode: true,

            // }
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