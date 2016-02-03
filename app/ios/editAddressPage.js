'use strict';

var React = require('react-native');
var KeyboardHandler = require('./keyboardHandler');

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
    titleContainer: {
        marginTop: 10,
        borderBottomWidth: 1.5,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    addressContainer: {
        backgroundColor: '#f6f4f4',
        //borderBottomWidth: 1.5,
        //borderColor: '#b9b6b6',
        marginBottom: 10,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'gray',
        shadowOffset: {
            width: 2,
            height: 2
        }
    },
    addressText: {
        marginTop: 3,
        marginLeft: 10,
        fontSize: 15,
        color: 'black',
        marginBottom: 3
    },
    formContainer: {
        backgroundColor: '#f6f4f4',
        //borderBottomWidth: 1.5,
        //borderColor: '#b9b6b6',
        //marginBottom: 20,
        shadowRadius: 4,
        shadowOpacity: 0.8,
        shadowColor: 'gray',
        shadowOffset: {
            width: 2,
            height: 2
        }
    },
    inputRow: {
        flexDirection: 'row',
        marginTop: 8,
        alignItems: 'flex-end',
    },
    lastRow: {
        flexDirection: 'row',
        marginTop: 8,
        marginBottom: 10,
        alignItems: 'flex-end'
    },
    rowPlaceholder: {
        //flex: 0.075,
        flex: 0
    },
    rowStaticText: {
        flex: 0.27,
        //borderBottomWidth: 1,
        //borderColor: '#800000', 
        marginLeft: 10
    },
    staticText: {
        marginBottom: 6.2,
        fontSize: 16,
        //marginRight: 5
    },
    rowInput: {
        flex: 0.7,
        //borderBottomWidth: 1,
        //borderColor: '#800000',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: 'white',
        borderRadius: 6,
        borderColor: '#b9b6b6',
        marginRight: 10,
        borderWidth: 1,
        marginLeft: 10
    },
    lastRowStaticText: {
        marginLeft: 10,
        marginRight: 10
    },
    cityStaticText: {
        marginRight: 11.2,
        fontSize: 16,
        marginBottom: 6.2
    },
    textInput: {
        height: 30,
        //padding: 4,
        marginRight: 5,
        marginLeft: 5,
        flex: 1,
        fontSize: 18,
        //borderWidth: 1,
        //borderColor: '#800000',
        color: 'black',
        alignSelf: 'stretch'
    },
    stateInput: {
        flex: 0.3,
        //borderBottomWidth: 1,
        //borderColor: '#800000',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: 'white',
        borderRadius: 6,
        borderColor: '#b9b6b6',
        marginRight: 10,
        borderWidth: 1
    },
    zipInput: {
        flex: 0.6,
        //borderBottomWidth: 1,
        //borderColor: '#800000',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: 'white',
        borderRadius: 6,
        borderColor: '#b9b6b6',
        marginRight: 10,
        borderWidth: 1
    },
    zipTextInput: {
        height: 30,
        //padding: 4,
        marginRight: 25,
        marginLeft: 5,
        flex: 1,
        fontSize: 18,
        //borderWidth: 1,
        //borderColor: '#800000',
        color: 'black',
        //alignSelf: 'stretch'
    },
    stateTextInput: {
        height: 30,
        //padding: 4,
        marginRight: 25,
        marginLeft: 5,
        flex: 1,
        fontSize: 18,
        //borderWidth: 1,
        //borderColor: '#800000',
        color: 'black',
        //alignSelf: 'stretch'
    },
    addButton: {
        height: 36,
        //flex: 1,
        //flexDirection: 'row',
        backgroundColor: '#800000',
        borderColor: '#800000',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        marginRight: 25,
        marginLeft: 25,
        marginTop: 25,
        alignSelf: 'stretch',
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
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
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
        var newAddress = {
            addr1: this.state.addr1,
            addr2: this.state.addr2,
            rest: this.state.city + ', ' + this.state.state + ' ' + this.state.zip
        }
        this.props.updateAddress(this.props.types, newAddress);
        this.props.toBack();
    }

    _buildAddress(addr1, addr2, rest) {
        var completeAddr = addr1 + '\n';
        if (addr2 == '') {
            return completeAddr + rest;
        }
        return completeAddr + addr2 + '\n' + rest;
    }

    render() {
        var billingAddr = this._buildAddress(this.props.billing.addr1, this.props.billing.addr2, this.props.billing.rest);
        var shippingAddr = this._buildAddress(this.props.shipping.addr1, this.props.shipping.addr2, this.props.shipping.rest);

        var oldAddress = (this.props.types == 'billing') ? (<Text style = {styles.addressText}>{billingAddr} </Text>) :
            (<Text style = {styles.addressText}>{shippingAddr} </Text>);

        var addressType = (this.props.types == 'billing') ? (<Text style = {styles.title}>Original Billing Address: </Text>): 
            (<Text style = {styles.title}>Original Shipping Address: </Text>);
        
        return (
            <KeyboardHandler ref = 'scrollContainer'>
            <ScrollView
                keyboardShouldPersistTaps = {true}>
                <View style = {styles.titleContainer}>
                    {addressType}
                </View>

                <View style = {styles.addressContainer}>
                    {oldAddress}
                </View>

                <View style = {styles.titleContainer}>
                    <Text style = {styles.title}>New Address</Text>
                </View>
                
                <View style = {styles.formContainer}>
                    <View style = {styles.inputRow}>
                        <View style = {styles.rowPlaceholder}/>
                        <View style = {styles.rowStaticText}>
                            <Text style = {styles.staticText}>Address 1: </Text>
                        </View>
                        <View style = {styles.rowInput}>        
                            <TextInput
                            style = {styles.textInput}
                            placeholder = '979 Third Avenue'
                            placeholderTextColor = '#ffcccc'
                            value = {this.state.addr1}
                            returnKeyType = 'next'
                            onSubmitEditing = {() => this.addr2.focus()}
                            onChange = {this.onAddr1Change.bind(this)}
                            onFocus = {() => this.refs.scrollContainer.inputFocused(this, 'update')}/>
                        </View>
                    </View>


                    <View style = {styles.inputRow}>
                        <View style = {styles.rowPlaceholder}/>
                        <View style = {styles.rowStaticText}>
                            <Text style = {styles.staticText}>Address 2: </Text>
                        </View>
                        <View style = {styles.rowInput}>
                            <TextInput
                                ref = {(ref) => this.addr2 = ref}
                                style = {styles.textInput}
                                placeholder = 'Suite 1022'
                                placeholderTextColor = '#ffcccc'
                                value = {this.state.addr2}
                                returnKeyType = 'next'
                                onSubmitEditing = {() => this.city.focus()}
                                onChange = {this.onAddr2Change.bind(this)}
                                onFocus = {() => this.refs.scrollContainer.inputFocused(this, 'update')}/>
                        </View>
                    </View>

                    <View style = {styles.inputRow}>
                        <View style = {styles.rowPlaceholder}/>
                        <View style = {styles.lastRowStaticText}>
                            <Text style = {styles.cityStaticText}>City: </Text>
                        </View>
                        <View style = {styles.rowInput}>
                            <TextInput
                                ref = {(ref) => this.city = ref}
                                style = {styles.textInput}
                                placeholderTextColor = '#ffcccc'
                                placeholder = 'New York'
                                value = {this.state.city}
                                returnKeyType = 'next'
                                onSubmitEditing = {() => this.geoState.focus()}
                                onChange = {this.onCityChange.bind(this)}
                                onFocus = {() => this.refs.scrollContainer.inputFocused(this, 'update')}/>
                        </View>
                    </View>



                    <View style = {styles.lastRow}>
                        <View style = {styles.rowPlaceholder}/>
                        <View style = {styles.lastRowStaticText}>
                            <Text style = {styles.staticText}>State: </Text>
                        </View>
                        <View style = {styles.stateInput}>
                            <TextInput
                                ref = {(ref) => this.geoState = ref}
                                style = {styles.stateTextInput}
                                placeholderTextColor = '#ffcccc'
                                placeholder = 'NY'
                                value = {this.state.state}
                                returnKeyType = 'next'
                                onSubmitEditing = {() => this.zip.focus()}
                                maxLength = {2}
                                onChange = {this.onStateChange.bind(this)}
                                onFocus = {() => this.refs.scrollContainer.inputFocused(this, 'update')}/>
                        </View>

                        <View style = {styles.lastRowStaticText}>
                            <Text style = {styles.staticText}>Zip: </Text>
                        </View>
                        <View style = {styles.zipInput}>
                            <TextInput
                                ref = {(ref) => this.zip = ref}
                                style = {styles.zipTextInput}
                                placeholderTextColor = '#ffcccc'
                                placeholder = '10022'
                                value = {this.state.zip}
                                returnKeyType = 'go'
                                onSubmitEditing = {this.onUpdatePressed.bind(this)}
                                maxLength = {5}
                                onChange = {this.onZipChange.bind(this)}
                                onFocus = {() => this.refs.scrollContainer.inputFocused(this, 'update')}/>
                        </View>
                    </View>

                </View>
                
                <TouchableHighlight
                    style = {styles.addButton}
                    onPress = {this.onUpdatePressed.bind(this)}
                    ref = 'update'>
                    <Text style = {styles.buttonText}> Update </Text>
                </TouchableHighlight>
            </ScrollView>
            </KeyboardHandler>
        );
    }
}

module.exports = EditAddressPage;