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
        height: 32, width: 32,
        alignSelf: 'center'
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
                onPress = {this.goToManualUpdate}> 
                <Image
                    style = {styles.image}
                    source = {require('./../media/notepad.png')}/>
            </TouchableHighlight>
        )
    }
});

module.exports = ManualAddButton;
