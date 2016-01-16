'use strict';

var React = require('react-native');
var Button = require('react-native-button');
var LoginPage = require('./loginPage');
var CameraPage = require('./camera');

var {
    StyleSheet,
    TouchableHighlight,
    Text
} = React;

var styles = StyleSheet.create({
	logoutButton: {
		marginLeft: 13
	},
    buttonText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold'
    }
});


var LogoutButton = React.createClass({

    getInitialState() {
        return {
            buttonText: 'Logout',
            deleteMode: false
        }
    },

    onPress() {
        if (this.state.deleteMode) {
            this.switchModes();
        }
        else {
            this.props.logout();
        }
    },

    switchModes() {
        var updatedMode = this.props.cancelDeleteMode();
        if (!updatedMode) {
            this.setState({
                buttonText: 'Logout',
                deleteMode: false
            });
        }
    },

    render() {
        return (
            <TouchableHighlight
                style = {styles.logoutButton}
                underlayColor = 'transparent'
                onPress = {this.onPress}>
                <Text style = {styles.buttonText}> {this.state.buttonText} </Text>
            </TouchableHighlight>
        );
    }
});

module.exports = LogoutButton;