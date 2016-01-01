'use strict';

var React = require('react-native');
var ShoppingCart = require('./shoppingCart');
var AddButton = require('./addButton');
var {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
    ActivityIndicatorIOS,
    Image,
    Component,
    ScrollView
} = React;

class ConfirmPage extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<View style = {styles.container}>
				<View style = {styles.userInfo}>
					<Text style = {styles.userText}>Name: {this.props.user.firstname + ' ' + this.props.user.lastname}</Text>
					<Text style = {styles.userText}>Company: {this.props.user.company}</Text>
					<Text style = {styles.userText}>Address: {this.props.user.address}</Text>
					<Text style = {styles.userText}>Phone Number: {this.props.user.phonenum}</Text>
				</View>
				<TouchableHighlight
					onPress = {this.onConfirmPressed.bind(this)}
					style = {styles.continueButton}>
					<Text style = {styles.buttonText}>Continue</Text>
				</TouchableHighlight>
			</View>
		);
	}

	onConfirmPressed(){
		console.log(this.props);
		this.props.replaceRoute({
            name: 'Pattern List',
            component: ShoppingCart,
            rightCorner: AddButton,
            passProps: {patterns: [1]}
        });
	}
	
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	userInfo: {
		flex: 1,
		borderWidth: 1,
		borderColor: 'pink',
		justifyContent: 'center',
		alignItems: 'center'
	},
	userText: {
		fontSize: 16,
		margin: 5
	},
	continueButton: {
		height: 36,
		borderWidth: 1,
		borderColor: '#800000',
		backgroundColor: '#800000',
        borderRadius: 8,
        marginBottom: 15,
        marginRight: 25,
        marginLeft: 25,
        marginTop: 15,
        //alignSelf: 'stretch',
        
        //Keeps text aligned
        justifyContent: 'center',
	},
	buttonText:{
		color: 'white',
		alignSelf: 'center',
		fontSize: 18
	}
});

module.exports = ConfirmPage;