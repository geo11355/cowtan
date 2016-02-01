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
			<ScrollView contentContainerStyle = {styles.scroll}>
				{/*<View style = {styles.showroomBanner}>
					<Text style = {styles.location}>Welcome to the {this.props.location.city} Showroom</Text>
				</View>	*/}
				<View style = {styles.topContainer}>
					<Text style = {styles.description}>
						Welcome to the 
					</Text>
				
					<View style = {styles.circle}>
						<Text style = {styles.showroomText}>{this.props.location.city}</Text>
						<Image style = {styles.image}
                    		   source = {require('./../media/location.png')}/>
					</View>

					<Text style = {styles.description}>Showroom!</Text>
				</View>

				<View style = {styles.lowerBox}>
					<Text style = {styles.confirmText}>Your Information:</Text>
					<View>
						<View style = {styles.row}>
							<View style = {styles.rowPlaceholder}></View>
							<View style = {styles.categoryBox}><Text style = {styles.categoryText}>Company: </Text></View>
							<View style = {styles.userBox}><Text style = {styles.userText}>{this.props.user.custname}</Text></View>
						</View>

						<View style = {styles.row}>
							<View style = {styles.rowPlaceholder}></View>
							<View style = {styles.categoryBox}><Text style = {styles.categoryText}>Address: </Text></View>
							<View style = {styles.userBox}>
								<Text style = {styles.userText}>{this.props.user.addr1} {this.props.user.addr2}</Text>
								<Text style = {styles.userText}>{this.props.user.city}, {this.props.user.state} {this.props.user.zip}</Text>
							</View>
						</View>

						<View style = {styles.row}>
							<View style = {styles.rowPlaceholder}></View>
							<View style = {styles.categoryBox}><Text style = {styles.categoryText}>Phone: </Text></View>
							<View style = {styles.userBox}><Text style = {styles.userText}>{this.props.user.phone}</Text></View>
						</View>
					</View>
				</View>

				<View style = {styles.buttonsContainer}>
					<TouchableHighlight
						onPress = {this.onConfirmPressed.bind(this)}
						style = {styles.continueButton}
						underlayColor = '#4d0000'>
						<Text style = {styles.buttonText}>Continue</Text>
					</TouchableHighlight>
					{/*<TouchableHighlight
						style = s{styles.notYouButton}
						underlayColor = 'transparent'>
						<Text style = {styles.notYouText} underlayColor = 'transparent'>Not You?</Text>
					</TouchableHighlight>*/}
				</View>
			</ScrollView>
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
            	location: this.props.location
            },
        });

    }
    
}

var styles = StyleSheet.create({
	container: {
		flex: .8,
	},
	scroll: {
		//justifyContent: 'center',
		flex: 1,
		//borderBottomWidth: 1.5,
		//borderColor: '#b9b6b6',
		//marginBottom: 15,
	},
	showroomBanner: {
		backgroundColor: '#f0eeee',
        //borderBottomWidth: 1.5,
        //borderColor: '#b9b6b6',
        marginBottom: 20,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'gray',
        shadowOffset: {
            width: 2,
            height: -2,
            height: 2
        },
        //borderWidth: 1,
        //borderColor: '#b9b6b6'
	},
	lowerBox: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		//alignItems: 'center'
		//borderWidth: 1
		shadowRadius: 4,
        shadowOpacity: 0.8,
        shadowColor: 'gray',
        shadowOffset: {
            width: 2,
           	height:2,
        }
	},
	blankSpace: {
		margin: 0, height: 0, width: 0, padding: 0
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
		marginTop: 8
	},
	userBox: {
		flex: 3,
		marginRight: 15,
		marginTop: 8
	},
	description: {
		fontSize: 20,
		fontWeight: 'bold',
		alignSelf: 'center',
		marginBottom: 10,
		marginTop: 10,
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
		margin: 0, padding: 0
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
        marginBottom: 20,
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
		marginTop: 10,
		marginBottom: 10,
		color: 'black',
		alignSelf: 'center',
		fontSize: 16
	},
	topContainer: {
	    //flexDirection: 'row',
	    marginTop: 0,
	    //marginBottom: 5,
	    borderBottomWidth: 1,
	    backgroundColor: '#fcfbfb',
	    borderBottomColor: '#d2d0d0',
	    justifyContent: 'center',
	    alignItems: 'center',
	    shadowRadius: 4,
        shadowOpacity: 0.8,
        shadowColor: 'gray',
        shadowOffset: {
            width: 2,
            height: 2
        }

	},
	circle: {
		height: 150,
		width: 150,
		borderRadius: 75,
		//borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#800000',
		borderColor: 'white',
		shadowRadius: 4,
        shadowOpacity: 0.8,
        shadowColor: 'gray',
        shadowOffset: {
            width: 2,
            height: 2
        }
		//opacity: 0.8
	},
	showroomText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
		marginTop: 10
	},
	image: {
		alignSelf: 'center',
		resizeMode: 'contain',
		height: 60,
		width: 60,
		marginTop: 5
	},
	confirmText: {
		alignSelf: 'center',
		marginBottom: 10,
		fontSize: 18,
		fontWeight: 'bold',
		marginRight: 15,
		marginLeft: 15
	},

});

module.exports = ConfirmPage;