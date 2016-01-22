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

var CustomBackButton = React.createClass({

    customBack() {
        this.props.customBack();
    },

    render() {
        return (
            <Button 
                style = {styles.editButton}
                onPress = {this.customBack}> 
            Hi
            </Button>
        );
    }
});

module.exports = CustomBackButton;