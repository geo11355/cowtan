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
        marginRight: 13
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
});

var EditButton = React.createClass({

    getInitialState() {
        return {
            buttonText: 'Edit'
        }
    },

    onPress() {
        if (this.props.enterDeleteMode()) {
            this.setState({
                buttonText: 'Delete',
                deleteMode: true,
            });
        }
    },

    render() {
        return (
            <TouchableHighlight
                style = {styles.button}
                underlayColor = 'transparent'
                onPress = {this.onPress}>
                <Text
                    style = {styles.buttonText}> 
                    {this.state.buttonText} 
                </Text>
            </TouchableHighlight>
        );
    }
});

module.exports = EditButton;