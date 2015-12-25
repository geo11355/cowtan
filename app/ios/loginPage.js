'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
    ActivityIndicatorIOS,
    Image,
    Component
} = React;

var styles = StyleSheet.create({
    description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
    },
    container: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center',

    },
    flowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    textInput: {
        height: 36,
        padding: 4,
        marginRight: 5,
        flex: 1,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC'
    }
});

// Login Screen class
class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            acctNum: '',
            lastName: '',
            isLoading: false
        };
    }

    render() {
        return (
            <View style = {styles.container}>
                <Text style = {styles.description}>
                    Login with your account number and last name below
                </Text>
                <View style = {styles.flowRight}>
                    <TextInput
                        style = {styles.textInput}
                        placeholder = 'Account Number'
                        value = {this.state.acctNum}
                        onChange = {this.acctNumChanged.bind(this)}/>
                    <TextInput
                        style = {styles.textInput}
                        placeholder = 'Last Name'
                        value = {this.state.lastName}
                        onChange = {this.lastNameChanged.bind(this)}/>
                </View>
                <TouchableHighlight
                    style = {styles.button}
                    underlayColor = '#99d9f4'>
                    <Text style = {styles.buttonText}>Login</Text>
                </TouchableHighlight>
            </View>
        );
    }

    acctNumChanged(event) {
        console.log('acctNumChanged');
        this.setState({ acctNum: event.nativeEvent.text });
    }

    lastNameChanged(event) {
        console.log('lastNameChanged');
        this.setState({ lastName: event.nativeEvent.text });
    }
}

module.exports = LoginPage;