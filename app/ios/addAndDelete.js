'use strict';

var React = require('react-native');
var DeleteButton = require('./deleteButton');
var AddButton = require('./addButton');
var CameraPage = require('./camera');

var {
	StyleSheet,
	Text,
	TouchableHighlight,
	View
} = React;

var styles = StyleSheet.create({
	addButton: {

	},
	deleteButton: {

	},
	iconContainer: {
		flexDirection: 'row',
	}
});

var AddAndDelete = React.createClass({

	// Call back function for going to the camera with AddButton
	goToCamera() {
		console.log('TESTING');
	    this.props.toRoute({
	        name: 'Scan a Barcode',
	        component: CameraPage,
	        passProps: {
	            updatePatterns: this.props.updatePatterns
	        }
	    });
	},

	// Callback function for deleting patterns from DeleteButton
	deletePatterns() {
		console.log('deleting');
	},

	render() {
		return (
			<View style = {styles.iconContainer}>
				<DeleteButton deletePatterns = {this.deletePatterns} />
				<AddButton goToCamera = {this.goToCamera}/>
			</View>
		)
	}
});

module.exports = AddAndDelete;