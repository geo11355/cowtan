'use strict';

var React = require('react-native');
var DeleteButton = require('./deleteButton');
var AddButton = require('./addButton');
var CameraPage = require('./camera');
var ManualAddButton = require('./manualAddButton');
var ManualAddPage = require('./manualAddPage');

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
	manualAddButton: {
		
	},
	iconContainer: {
		flexDirection: 'row',
		flex: 0.6,
		borderWidth: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

var AddAndDelete = React.createClass({

	// Call back function for going to the camera with AddButton
	goToCamera() {
		console.log(this.props);
	    this.props.toRoute({
	        name: 'Scan a Barcode',
	        component: CameraPage,
	        passProps: {
	            updatePatterns: this.props.updatePatterns
	        }
	    });
	},

	goToManualUpdate(){
		this.props.toRoute({
			name: 'Add an Item',
			component: ManualAddPage,
			passProps: {
				updatePatterns: this.props.updatePatterns
			}
		});
	},

	render() {
		return (
			<View style = {styles.iconContainer}>
				<DeleteButton style = {styles.deleteButton} enterDeleteMode = {this.props.enterDeleteMode}/>
				<AddButton style = {styles.addButton} goToCamera = {this.goToCamera}/>
				<ManualAddButton style = {styles.manualAddButton} goToManualUpdate = {this.goToManualUpdate}/>
			</View>
		)
	}
});

module.exports = AddAndDelete;