'use strict';

var React = require('react-native');
var Button = require('react-native-button');

var {
    StyleSheet,
    Text,
    TouchableHighlight,
    Image
} = React;

var styles = StyleSheet.create({
    image: {
        height: 33, width: 33,
        alignSelf: 'center'
    }
});

var DeleteButton = React.createClass({

    render() {
        return (
            <TouchableHighlight 
                style = {styles.editButton}
                onPress = {this.props.enterDeleteMode}> 
                <Image
                    style = {styles.image}
                    source = {require('./../media/delete.png')}/>
            </TouchableHighlight>
        )
    }
});

module.exports = DeleteButton;

