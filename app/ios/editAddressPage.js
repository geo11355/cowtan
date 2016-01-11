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
    inputRow: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'flex-end',

    },
    rowPlaceholder: {
        flex: 0.075,
    },
    rowStaticText: {
        flex: 0.27,
        borderBottomWidth: 1,
        borderColor: '#800000', 
    },
    staticText: {
        marginBottom: 6.2,
        fontSize: 16,
    },
    rowInput: {
        flex: 0.7,
        borderBottomWidth: 1,
        borderColor: '#800000',
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    textInput: {
        height: 30,
        //padding: 4,
        marginRight: 25,
        marginLeft: 15,
        flex: 1,
        fontSize: 18,
        //borderWidth: 1,
        //borderColor: '#800000',
        color: 'black',
        alignSelf: 'stretch'
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
        marginTop: 34,
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
        var newAddress = this.state.addr1 + ' ' + this.state.addr2 + ' ' +
            this.state.city + ', ' + this.state.state + ' ' + this.state.zip;
        this.props.updateAddress(this.props.types, newAddress);
        this.props.toBack();
    }

    render() {
        var oldAddress = (this.props.types == 'billing') ? (<Text> {this.props.billing} </Text>) :
            (<Text> {this.props.shipping} </Text>);
        return (
            <ScrollView
                keyboardShouldPersistTaps = {true}>
                <Text> Original Address: </Text>
                {oldAddress}
                
                <View style = {styles.inputRow}>
                    <View style = {styles.rowPlaceholder}/>
                    <View style = {styles.rowStaticText}>
                        <Text style = {styles.staticText}>Address 1: </Text>
                    </View>
                    <View style = {styles.rowInput}>        
                        <TextInput
                        style = {styles.textInput}
                        placeholder = 'Address 1'
                        value = {this.state.addr1}
                        returnKeyType = 'next'
                        onSubmitEditing = {() => this.addr2.focus()}
                        onChange = {this.onAddr1Change.bind(this)}/>
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
                            placeholder = 'Address 2'
                            value = {this.state.addr2}
                            returnKeyType = 'next'
                            onSubmitEditing = {() => this.city.focus()}
                            onChange = {this.onAddr2Change.bind(this)}/>
                    </View>
                </View>

                <View style = {styles.inputRow}>
                    <View style = {styles.rowPlaceholder}/>
                    <View style = {styles.rowStaticText}>
                        <Text style = {styles.staticText}>City: </Text>
                    </View>
                    <View style = {styles.rowInput}>
                        <TextInput
                            ref = {(ref) => this.city = ref}
                            style = {styles.textInput}
                            placeholder = 'City'
                            value = {this.state.addr2}
                            returnKeyType = 'next'
                            onSubmitEditing = {() => this.geoState.focus()}
                            onChange = {this.onCityChange.bind(this)}/>
                    </View>
                </View>



                <View style = {styles.inputRow}>
                    <View style = {styles.rowPlaceholder}/>
                    <View style = {styles.rowStaticText}>
                        <Text style = {styles.staticText}>State: </Text>
                    </View>
                    <View style = {styles.rowInput}>
                        <TextInput
                            ref = {(ref) => this.geoState = ref}
                            style = {styles.textInput}
                            placeholder = 'State'
                            value = {this.state.state}
                            returnKeyType = 'next'
                            onSubmitEditing = {() => this.zip.focus()}
                            maxLength = {2}
                            onChange = {this.onStateChange.bind(this)}/>
                    </View>
                </View>

                <View style = {styles.inputRow}>
                    <View style = {styles.rowPlaceholder}/>
                    <View style = {styles.rowStaticText}>
                        <Text style = {styles.staticText}>Zip Code: </Text>
                    </View>
                    <View style = {styles.rowInput}>
                        <TextInput
                            ref = {(ref) => this.zip = ref}
                            style = {styles.textInput}
                            placeholder = 'Zip'
                            value = {this.state.zip}
                            returnKeyType = 'go'
                            onSubmitEditing = {this.onUpdatePressed.bind(this)}
                            maxLength = {5}
                            onChange = {this.onZipChange.bind(this)}/>
                    </View>
                </View>

                
                <TouchableHighlight
                    style = {styles.addButton}
                    onPress = {this.onUpdatePressed.bind(this)}>
                    <Text style = {styles.buttonText}> Update </Text>
                </TouchableHighlight>
            </ScrollView>
        );
    }
}

module.exports = EditAddressPage;