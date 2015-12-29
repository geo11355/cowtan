'use strict';

var React = require('react-native');

var {
	Component,
	StyleSheet,
	TouchableHighLight,
	View
} = React;

var styles = StyleSheet.create({
	addButton: {
		width: 10,
		height: 17,
		marginLeft: 10,
		marginTop: 3,
		marginRight: 10
	},
    buttonText: {
        color: 'black'
    }
});

class AddButton extends Component {
	render() {
		return (
			<TouchableHighLight
				underlayColor = 'transparent'
				style = {styles.addButton}>
				<Text style = {styles.buttonText}>Add</Text>
			</TouchableHighLight>
		);
	}
}

module.exports = AddButton;