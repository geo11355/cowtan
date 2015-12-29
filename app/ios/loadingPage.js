'use strict';

var React = require('react-native');
var LoginPage = require('./loginPage');

var {
	StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
    ActivityIndicatorIOS,
    Image,
    Component
} = React;

class LoadingPage extends Component{
	render(){
		return(
			<View style = {styles.container}>
				<Text>
					Loading Page...
				</Text>
			</View>
		)
	}
}

var styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		marginTop: 200
	}
});

module.exports = LoadingPage;
