'use strict';

var React = require('react-native');

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
    }
});

var AddButton = React.createClass({
    render() {
        return (
            <TouchableHighlight
                underlayColor = "transparent">
               <Image 
                    source = {require('./images/ios7-plus-outline.png')}
                    style = {styles.icon}
                />       
            </TouchableHighlight>
        );
    }
});

module.exports = AddButton;