'use strict';

var React = require('react-native');
var Button = require('react-native-button');
var LoginPage = require('./loginPage');
var CameraPage = require('./camera');

var {
    StyleSheet,
    Text
} = React;

var styles = StyleSheet.create({
	logoutButton: {
		fontSize: 16,
		color: 'white',
		marginLeft: 13
	}
});

// var LogoutButton = React.createClass({

// 	goToLogin() {
// 		this.props.toRoute({
// 			name: 'Sign In',
// 			component: LoginPage,
// 		});
// 	},

// 	render() {
// 		return (
// 			<Button
// 				style = {styles.logoutButton}
// 				onPress = {this.goToLogin}>
// 			Logout
// 			</Button>
// 		);
// 	}
// });

var LogoutButton = React.createClass({

    goToLogin() {
        this.props.logout();
    },

    render() {
        return (
            <Button 
                style = {styles.logoutButton}
                onPress = {this.goToLogin}> 
            Logout
            </Button>
        );
    }
});

module.exports = LogoutButton;