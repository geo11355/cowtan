'use strict';

var React = require('react-native');

var {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
    Component,
    ScrollView
} = React;

class EditAddressPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updatedAddress: '',
            shipping: this.props.shipping,
        };
        console.log(this.props);
    }

    render() {
        // console.log('types');
        // console.log(this.props.types);
        var oldAddress = (this.props.types == 'billing') ? (<Text> HI </Text>) :
            (<Text> {this.state.shipping} </Text>);
        return (
            <View>
                <Text> Original Address: </Text>
                {oldAddress}
            </View>
        );
    }
}

module.exports = EditAddressPage;