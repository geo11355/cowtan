'use strict';

var React = require('react-native');
var Button = require('react-native-button');

var {
    StyleSheet,
    Text,
    TouchableHighlight
} = React;

var styles = StyleSheet.create({
    manualAddButton: {
        fontSize: 16,
        color: 'black',
        margin: 10,
        borderWidth: 1
    }
});

var ManualAddButton = React.createClass({


    render() {
        return (
            <Button 
                style = {styles.manualAddButton}
                onPress = {this.props.manualUpdatePatterns}> 
            FA
            </Button>
        )
    }
});

module.exports = ManualAddButton;
