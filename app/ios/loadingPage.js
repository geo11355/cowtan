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
				<Image 
					style = {styles.image}
					source = {require('./../media/logo.jpg')}
				>
				</Image>
			</View>
		)
	}
}

var styles = StyleSheet.create({
	image: {
		flex: 1,
		resizeMode: 'contain',
		alignSelf: 'center',
		margin: 35
	},
	container: {
		flexDirection: 'row',
		flex: 1,
	}
});

module.exports = LoadingPage;
