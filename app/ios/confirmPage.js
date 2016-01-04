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
        this.patterns = [];
	}

	render(){
		return(
			<View style = {styles.container}>
				{/*<View style = {styles.userInfo}>
					<Text style = {styles.description}>You are about to log in as:</Text>
					<Text style = {styles.userText}>Name: {this.props.user.firstname + ' ' + this.props.user.lastname}</Text>
					<Text style = {styles.userText}>Company: {this.props.user.company}</Text>
					<Text style = {styles.userText}>Address: {this.props.user.address}</Text>
					<Text style = {styles.userText}>Phone Number: {this.props.user.phonenum}</Text>
				</View>*/}

				<View style = {styles.userInfo}>
					<Text style = {styles.description}>You are about to log in as:</Text>
					<View style = {styles.row}>
						<Text style = {styles.categoryText}>Name: </Text>
						<Text style = {styles.userText}>{this.props.user.firstname + ' ' + this.props.user.lastname}</Text>
					</View>
					<View style = {styles.row}>
						<Text style = {styles.categoryText}>Company: </Text>
						<Text style = {styles.userText}>{this.props.user.company}</Text>
					</View>
					<View style = {styles.row}>
						<Text style = {styles.categoryText}>Address: </Text>
						<Text style = {styles.userText}>{this.props.user.address}</Text>
					</View>
					<View style = {styles.row}>
						<Text style = {styles.categoryText}>Phone Number: </Text>
						<Text style = {styles.userText}>{this.props.user.phonenum}</Text>
					</View>
				</View>


				<View style = {styles.buttonsContainer}>
				<TouchableHighlight
					onPress = {this.onConfirmPressed.bind(this)}
					style = {styles.continueButton}>
					<Text style = {styles.buttonText}>Continue</Text>
				</TouchableHighlight>
				<TouchableHighlight
					style = {styles.notYouButton}>
					<Text style = {styles.notYouText}>Not You?</Text>
				</TouchableHighlight>
				</View>
			</View>
		);
	}

	onConfirmPressed(){
		this.props.replaceRoute({
            name: 'Pattern List',
            component: ShoppingCart,
            rightCorner: AddButton,
            passProps: {
                patterns: this.patterns,
            },
        });

    }
    
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	userInfo: {
		flex: 0.8,
		borderWidth: 1,
		//borderColor: 'pink',
		justifyContent: 'center',
		alignItems: 'center'
	},
	row: {
		flexDirection: 'row',
		borderWidth: 1,
		borderColor: 'pink',

	},
	description: {
		fontSize: 20,
		marginBottom: 20,
		fontWeight: 'bold'
	},
	categoryText: {
		fontSize: 16,
		margin: 5,
		justifyContent: 'flex-start',
		fontWeight: 'bold'
	},
	userText: {
		fontSize: 16,
		margin: 5
	}, 
	buttonContainer: {
		flex: 0.1,
	},
	continueButton: {
		height: 36,
		borderWidth: 1,
		borderColor: '#800000',
		backgroundColor: '#800000',
        borderRadius: 8,
        marginBottom: 5,
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
	},
	notYouButton: {
		alignSelf: 'center',
		marginBottom: 15
	},
	notYouText: {
		padding: 5,
		color: '#800000'
	}
});

module.exports = ConfirmPage;