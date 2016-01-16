'use strict';

var React = require('react-native');

var {
    StyleSheet,
    Text,
    TouchableHighlight,
    Component,
    View,
    Image
} = React;

var styles = StyleSheet.create({
    toggleButton: {
        borderWidth: 1.3,
        borderColor: '#800000',
        height: 20, width: 20,
        borderRadius: 10,
        alignSelf: 'center',
        marginLeft: 8
    },
    image: {
        height: 12, width: 12,
        marginTop: 2,
        marginLeft: 3,
        backgroundColor: 'rgba(0,0,0,0)',
    }
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
        this.props.editDeleteArray(this.props.index);
    }

    render() {
        var checkSymbol = this.state.isMarked ? 
        (<Image
            style = {styles.image}
            source = {require('./../media/check.png')}/>):
        (<View/>)
        return (
            <TouchableHighlight 
                style = {[styles.toggleButton, this.state.isMarked ? {backgroundColor: '#800000'} : {}]}
                onPress = {this.markedButton.bind(this)}> 
                {checkSymbol}
            </TouchableHighlight>
        )
    }
}

module.exports = ToggleButton;