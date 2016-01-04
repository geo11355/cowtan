'use strict';

var React = require('react-native');
var Button = require('react-native-button');
var ShoppingCart = require('./shoppingCart');
var Camera = require('./camera');

var {
    StyleSheet,
    TouchableHighlight,
    Image
} = React;

var styles = StyleSheet.create({
    addButton: {
        width: 10,
        height: 17,
        marginLeft: 10,
        marginTop: 3,
        marginRight: 10
    },
    icon: {
        width: 21,
        height: 21,
        marginTop: 4,
        marginRight: 15
    },
    editButton: {
        fontSize: 16,
        color: 'white',
        marginRight: 13
    }
});

var AddButton = React.createClass({

    // goToCamera() {
    //     this.props.toRoute({
    //         name: 'Camera',
    //         component: Camera,
    //     });
    // },

    _handlePress(event) {
        console.log('Pressed');
    },

    render() {
        return (
            <Button 
                style = {styles.editButton}
                onPress = {this._handlePress}> 
            Add
            </Button>
        );
    }
});

module.exports = AddButton;