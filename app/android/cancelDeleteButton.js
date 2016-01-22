'use strict';

var React = require('react-native');
var Button = require('react-native-button');

var {
    StyleSheet,
    Text,
    TouchableHighlight
} = React;

var styles = StyleSheet.create({
    editButton: {
        fontSize: 16,
        color: 'black',
        margin: 10,
        borderWidth: 1,

    },
});

var CancelDeleteButton = React.createClass({

    render() {
        return (
            <Button 
                style = {styles.editButton}
                onPress = {this.props.cancelDeleteMode}> 
                Cancel
            </Button>
        )
    }
});

module.exports = CancelDeleteButton;