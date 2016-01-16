'use strict';

var React = require('react-native');

var {
    StyleSheet,
    Text,
    TouchableHighlight,
    Component,
    View
} = React;

var styles = StyleSheet.create({
    toggleButton: {
        borderWidth: 1,
        height: 22, width: 22,
        borderRadius: 11,
        alignSelf: 'center',
        marginLeft: 8
    },
});

class ToggleButton extends Component {
    constructor(props){
        super(props);
        this.state = {
            isMarked: false,
        };
    }

    markedButton(){
        this.setState({isMarked: !this.state.isMarked});
        this.props.addToDeleteArray(this.props.index);
    }

    render() {
        console.log(this.props);
        return (
            <TouchableHighlight 
                style = {[styles.toggleButton, this.state.isMarked ? {backgroundColor: '#800000'} : {}]}
                onPress = {this.markedButton.bind(this)}> 
                <View/>
            </TouchableHighlight>
        )
    }
}

module.exports = ToggleButton;