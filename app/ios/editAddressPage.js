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
        };
    }

    render() {
        console.log('types');
        console.log(this.props.types)
        var oldAddress = (this.props.types == 'billing') ? (<Text> {this.props.billing} </Text>) :
            (<Text> {this.props.shipping} </Text>);
        return (
            <View>
                <Text> Original Address: </Text>
                {oldAddress}
            </View>
        );
    }
}

module.exports = EditAddressPage;