'use strict';

var React = require('react-native');
var ShoppingCart = require('./shoppingCart');
var AddButton = require('./addButton');
var LogoutButton = require('./logoutButton');
var EditButton = require('./editButton');

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
		this.deleteMode = false;
	}

	render(){
		return(

			<View style = {styles.container}>
				<Text style = {styles.location}> Hi </Text>
				{/*<View style = {styles.userInfo}>
					<Text style = {styles.description}>You are about to log in as:</Text>
					<Text style = {styles.userText}>Name: {this.props.user.firstname + ' ' + this.props.user.lastname}</Text>
					<Text style = {styles.userText}>Company: {this.props.user.company}</Text>
					<Text style = {styles.userText}>Address: {this.props.user.address}</Text>
					<Text style = {styles.userText}>Phone Number: {this.props.user.phonenum}</Text>
				</View>*/}
			
				{/*<View style = {styles.userInfo}>*/}
				<ScrollView contentContainerStyle = {styles.scroll}>
					<Text style = {styles.description}>Client Information</Text>
					<View style = {styles.row}>
						<View style = {styles.rowPlaceholder}></View>
						<View style = {styles.categoryBox}><Text style = {styles.categoryText}>Company: </Text></View>
						<View style = {styles.userBox}><Text style = {styles.userText}>{this.props.user.custname}</Text></View>
					</View>
					<View style = {styles.row}>
						<View style = {styles.rowPlaceholder}></View>
						<View style = {styles.categoryBox}><Text style = {styles.categoryText}>Address: </Text></View>
						<View style = {styles.userBox}>
							<Text style = {styles.userText}>{this.props.user.addr1}</Text>
							<Text style = {styles.userText}>{this.props.user.city}, {this.props.user.state} {this.props.user.zip}</Text>
						</View>
					</View>
					{/*<View style = {styles.row}>
						<View style = {styles.rowPlaceholder}></View>
						<View style = {styles.categoryBox}><Text style = {styles.categoryText}>City: </Text></View>
						<View style = {styles.userBox}><Text style = {styles.userText}>{this.props.user.city}</Text></View>
					</View>*/}
					<View style = {styles.row}>
						<View style = {styles.rowPlaceholder}></View>
						<View style = {styles.categoryBox}><Text style = {styles.categoryText}>Phone Number: </Text></View>
						<View style = {styles.userBox}><Text style = {styles.userText}>{this.props.user.phone}</Text></View>
					</View>
				</ScrollView>
				{/*</View>*/}

				<View style = {styles.buttonsContainer}>
				<TouchableHighlight
					onPress = {this.onConfirmPressed.bind(this)}
					style = {styles.continueButton}
					underlayColor = '#4d0000'>
					<Text style = {styles.buttonText}>Continue</Text>
				</TouchableHighlight>
				<TouchableHighlight
					style = {styles.notYouButton}
					underlayColor = 'transparent'>
					<Text style = {styles.notYouText} underlayColor = 'transparent'>Not You?</Text>
				</TouchableHighlight>
				</View>
			</View>
		);
	}

	onConfirmPressed(){
		this.props.toRoute({
            name: 'Pattern List',
            component: ShoppingCart,
            rightCorner: EditButton,
            leftCorner: LogoutButton,
            passProps: {
            	user: this.props.user,
            },
        });

    }
    
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scroll: {
		//borderColor: 'pink',
		justifyContent: 'center',
		//alignItems: 'center'
		flex: 0.8
	},
	row: {
		flexDirection: 'row',
		//borderColor: 'pink',
	},
	rowPlaceholder: {
		flex: 0.4,
	},
	categoryBox: {
		flex: 1.5,
		marginTop: 10
	},
	userBox: {
		flex: 3,
		marginRight: 15,
		marginTop: 10
	},
	description: {
		fontSize: 22,
		fontWeight: 'bold',
		alignSelf: 'center',
		marginBottom: 20,
		marginTop: 20,
	},
	categoryText: {
		fontSize: 16,
		//margin: 0,
		justifyContent: 'flex-start',
		fontWeight: 'bold',
		marginRight: 10
	},
	userText: {
		fontSize: 16,
		margin: 0,
	}, 
	buttonContainer: {
		flex: 0.1,
	},
	continueButton: {
		height: 36,
		//borderWidth: 1,
		borderColor: '#800000',
		backgroundColor: '#800000',
        borderRadius: 8,
        marginBottom: 5,
        marginRight: 25,
        marginLeft: 25,
        marginTop: 0,
        //alignSelf: 'stretch',
        
        //Keeps text aligned
        justifyContent: 'center',
        shadowRadius: 4,
        shadowOpacity: 0.8,
        shadowColor: 'gray',
        shadowOffset: {
            width: 2,
            height: 2
        }
	},
	buttonText:{
		color: 'white',
		alignSelf: 'center',
		fontSize: 18,
	},
	notYouButton: {
		alignSelf: 'center',
		marginBottom: 10,
	},
	notYouText: {
		padding: 5,
		color: '#800000'
	},
	location: {
		color: 'black',
		alignSelf: 'center',
		fontSize: 18
	}
});

module.exports = ConfirmPage;