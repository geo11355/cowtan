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
		marginLeft: 10
	},
    buttonText: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold'
    }
});


var LogoutButton = React.createClass({

    onPress() {
        this.props.logout()
    },

    render() {
        return (
            <TouchableHighlight
                style = {styles.logoutButton}
                underlayColor = 'transparent'
                onPress = {this.onPress}>
                <Text style = {styles.buttonText}> Logout </Text>
            </TouchableHighlight>
        );
    }
});

module.exports = LogoutButton;