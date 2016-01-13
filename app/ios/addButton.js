'use strict';

var React = require('react-native');
var Button = require('react-native-button');
var CameraPage = require('./camera');

var {
    StyleSheet,
    Text
} = React;

var styles = StyleSheet.create({
    editButton: {
        fontSize: 16,
        color: 'black',
        margin: 10,
        borderWidth: 1
    },
});

var AddButton = React.createClass({

    goToCamera() {
        //console.log(this.props);
        this.props.toRoute({
            name: 'Scan a Barcode',
            component: CameraPage,
            passProps: {
                updatePatterns: this.props.updatePatterns
            }
        });
    },

    render() {
        return (
            <Button 
                style = {styles.editButton}
                onPress = {this.goToCamera}> 
            Add
            </Button>
        );
    }
});

module.exports = AddButton;