'use strict';

var React = require('react-native');
var Button = require('react-native-button');
var ManualAddPage = require('./manualAddPage');

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
            <Button 
                style = {styles.manualAddButton}
                onPress = {this.goToManualUpdate}> 
            FA
            </Button>
        )
    }
});

module.exports = ManualAddButton;
