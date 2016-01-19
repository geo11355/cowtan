'use strict';

var React = require('react-native');
var Button = require('react-native-button');
var LoginPage = require('./loginPage');
var CameraPage = require('./camera');

var {
    StyleSheet,
    TouchableHighlight,
    Text,
    View
} = React;

var styles = StyleSheet.create({
	logoutButton: {
		marginLeft: 10,
	},
    buttonText: {
        fontSize: 15,
        alignSelf: 'flex-start',
        color: 'white',
        fontWeight: 'bold',
        margin: 0
    },
    view: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
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
                <View style = {styles.view}>
                <Text style = {styles.buttonText}> Logout </Text>
                </View>
            </TouchableHighlight>
        );
    }
});

module.exports = LogoutButton;