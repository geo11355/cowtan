'use strict';

var React = require('react-native');
var CameraPage = require('./camera');

var {
    StyleSheet,
    Text,
    TouchableHighlight,
} = React;

var styles = StyleSheet.create({
    button: {

    }
});

var EditButton = React.createClass({

    render() {
        return (
            <TouchableHighlight
                underlayColor = 'transparent'>
                <Text> Edit </Text>
            </TouchableHighlight>
        );
    }
});

module.exports = EditButton;