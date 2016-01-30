'use strict';

var {
    StyleSheet,
    Text,
    Image,
    TouchableHighlight,
    View,
    Component,
    ScrollView,
    
} = React;

var styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		flexDirection: 'column'
	},
	image: {
		flex: 4
	},
	buttonContainer: {
		flex: 1
	},
	buttonText: {

	},
	logout: {

	},
	shopAgain: {

	},
});

class SuccessPage extends Component {
	constructor(props) {

	}

	render() {
		<View style = {styles.mainContainer}>
			<Image
				style = {styles.image}
				source = {require('./../media/success.png')} />

			<View style = {styles.buttonContainer}>
				<TouchableHighlight
					style = {styles.logout}>
					<Text 
						style = {styles.buttonText}
						underlayColor = 'transparent'> 
						Logout
					</Text>
				</TouchableHighlight>

				<TouchableHighlight
					style = {styles.shopAgain}>
					<Text
						style = {styles.buttonText}
						underlayColor = 'transparent'>
						Shop Again
					</Text>
				</TouchableHighlight>
			</View>
		</View>
	}
}

module.exports = SuccessPage;