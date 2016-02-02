'use strict';

var React = require('react-native');
var Button = require('react-native-button');
var ManualAddPage = require('./manualAddPage');

var {
    StyleSheet,
    Text,
    TouchableHighlight,
    Image
} = React;

var styles = StyleSheet.create({
    image: {
        height: 28, 
        width: 28,
        alignSelf: 'center',
        margin: 10,
        marginTop: 12.5
    },
    button: {
        height: 56
    }
});

var ManualAddButton = React.createClass({
    
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
            <TouchableHighlight 
                onPress = {this.goToManualUpdate}
                underlayColor = '#A9A9A9'
                style = {styles.button}> 
                <Image
                    style = {styles.image}
                    source = {require('./../media/pencil.png')}/>
            </TouchableHighlight>
        )
    }
});

module.exports = ManualAddButton;
