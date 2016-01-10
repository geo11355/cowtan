'use strict';

var React = require('react-native');
var Button = require('react-native-button');

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
        this.props.goToCamera();
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