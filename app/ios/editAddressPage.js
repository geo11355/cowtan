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

var styles = StyleSheet.create({
    textInput: {
        height: 30,
        padding: 4,
        marginRight: 25,
        marginLeft: 25,
        marginBottom: 10,
        //flex: 1,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#800000',
        borderRadius: 8,
        color: 'black',
    },
    updateButton: {
        height: 36,
        //borderWidth: 1,
        borderColor: '#800000',
        backgroundColor: '#800000',
        borderRadius: 8,
        marginBottom: 5,
        marginRight: 25,
        marginLeft: 25,
        marginTop: 0,
        
        //Keeps text aligned
        justifyContent: 'center',
        shadowRadius: 4,
        shadowOpacity: 0.8,
        shadowColor: 'gray',
        shadowOffset: {
            width: 2,
            height: 2
        }
    },
    buttonText: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 18,
    },
});

class EditAddressPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addr1: '',
            addr2: '',
            city: '',
            state: '',
            zip: '',
        };
    }

    onAddr1Change(event) {
        this.setState({ addr1: event.nativeEvent.text });
    }

    onAddr2Change(event) {
        this.setState({ addr2: event.nativeEvent.text });
    }

    onCityChange(event) {
        this.setState({ city: event.nativeEvent.text });
    }

    onStateChange(event) {
        this.setState({ state: event.nativeEvent.text });
    }

    onZipChange(event) {
        this.setState({ zip: event.nativeEvent.text });
    }

    onUpdatePressed() {
        var newAddress = this.state.addr1 + ' ' + this.state.addr2 + ' ' +
            this.state.city + ', ' + this.state.state + ' ' + this.state.zip;
        this.props.updateAddress(this.props.types, newAddress);
        this.props.toBack();
    }

    render() {
        var oldAddress = (this.props.types == 'billing') ? (<Text> {this.props.billing} </Text>) :
            (<Text> {this.props.shipping} </Text>);
        return (
            <View>
                <Text> Original Address: </Text>
                {oldAddress}
                <TextInput
                    style = {styles.textInput}
                    placeholder = 'Address 1'
                    value = {this.state.addr1}
                    returnKeyType = 'next'
                    onSubmitEditing = {() => this.addr2.focus()}
                    onChange = {this.onAddr1Change.bind(this)}/>
                <TextInput
                    ref = {(ref) => this.addr2 = ref}
                    style = {styles.textInput}
                    placeholder = 'Address 2'
                    value = {this.state.addr2}
                    returnKeyType = 'next'
                    onSubmitEditing = {() => this.city.focus()}
                    onChange = {this.onAddr2Change.bind(this)}/>
                <TextInput
                    ref = {(ref) => this.city = ref}
                    style = {styles.textInput}
                    placeholder = 'City'
                    value = {this.state.addr2}
                    returnKeyType = 'next'
                    onSubmitEditing = {() => this.geoState.focus()}
                    onChange = {this.onCityChange.bind(this)}/>
                <TextInput
                    ref = {(ref) => this.geoState = ref}
                    style = {styles.textInput}
                    placeholder = 'State'
                    value = {this.state.state}
                    returnKeyType = 'next'
                    onSubmitEditing = {() => this.zip.focus()}
                    maxLength = {2}
                    onChange = {this.onStateChange.bind(this)}/>
                <TextInput
                    ref = {(ref) => this.zip = ref}
                    style = {styles.textInput}
                    placeholder = 'Zip'
                    value = {this.state.zip}
                    returnKeyType = 'go'
                    onSubmitEditing = {this.onUpdatePressed.bind(this)}
                    maxLength = {5}
                    onChange = {this.onZipChange.bind(this)}/>
                <TouchableHighlight
                    style = {styles.updateButton}
                    onPress = {this.onUpdatePressed.bind(this)}>
                    <Text style = {styles.buttonText}> Update </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

module.exports = EditAddressPage;