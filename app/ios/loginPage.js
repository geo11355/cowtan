'use strict';

var React = require('react-native');
var ShoppingCart = require('./shoppingCart');
var AddButton = require('./addButton');
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
        //padding: 30,
        marginTop: 65,
        alignItems: 'center',
        borderWidth: 1,
        flexDirection: 'column',
        flex: 1
    },
    flowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
        flex: 3,
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
    },
    //Logo
   logoBox: {
        flexDirection: 'row',
        flex: 1,
        borderWidth: 3,
        marginBottom: 30,
        borderColor: 'pink'
    },
    image: {
        resizeMode: 'contain',
        flex: 1,
        alignSelf: 'center'
    }
});

// Private function to generate the URL for login verification
function generateUrl(acctNum, lastName) {
    return 'http://cowtan-test.co.nf/clients.php?accnum=' + acctNum + '&pass=' + lastName;
};

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
                <View style = {styles.logoBox}>  
                    <Image 
                        style = {styles.image}
                        source = {require('./../media/logo.jpg')}
                    >
                    </Image>
                </View>
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
                    underlayColor = '#99d9f4'
                    onPress = {this.onLoginPressed.bind(this)}>
                    <Text style = {styles.buttonText}>Login</Text>
                </TouchableHighlight>
            </View>
        );
    }

    // Handle a response, reset state fields and then move to the next page
    _handleResponse(response) {
        if (response !== null) {
            this.state = {
                acctNum: '',
                lastName: '',
                isLoading: false
            };
            this.props.toRoute({
                name: 'Pattern List',
                component: ShoppingCart,
                passProps: {patterns: [1]},
                // rightCorner: {AddButton}
            });
        }
    }

    // Callback when the Login button is pressed, calls
    // _handleResponse on fetch results
    onLoginPressed() {
        if (this.state.lastName !== '' && this.state.acctNum !== '') {
            var query = generateUrl(this.state.acctNum, this.state.lastName);
            this.setState({isLoading: true});
            fetch(query)
                .then(response => response.json())
                .then(json => this._handleResponse(json))
                .catch(error => {
                    this.setState({isLoading: 'false'});
                    console.log("Fetch failed: " + error);
                });
        }
    }

    // Event handler for when AcctNum input is updated
    acctNumChanged(event) {
        this.setState({ acctNum: event.nativeEvent.text });
    }

    // Event handler for when lastName input is updated
    lastNameChanged(event) {
        this.setState({ lastName: event.nativeEvent.text });
    }
}

module.exports = LoginPage;