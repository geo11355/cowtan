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
			<View>
				<Text>Name: {this.props.user.firstname + ' ' + this.props.user.lastname}</Text>
				<Text>Company: {this.props.user.company}</Text>
				<Text>Address: {this.props.user.address}</Text>
				<Text>Phone Number: {this.props.user.phonenum}</Text>

				<TouchableHighlight
					onPress = {this.onConfirmPressed.bind(this)}
					style = {styles.continueButton}>
					<Text>Continue</Text>
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
	continueButton: {
		marginTop: 40,
		alignSelf: 'center',
		borderWidth: 1,
		borderColor: '#800000'
	}
});

module.exports = ConfirmPage;