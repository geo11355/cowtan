'use strict';

var React = require('react-native');
var ShoppingCart = require('./shoppingCart');
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
        marginRight: 20,
        marginLeft: 20,
        marginBottom: 5,
        marginTop: 5,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
    },
    mainContainer: {
        //padding: 30,
        
        //to account for navigator
        marginTop: 65,
        
        //aligns all items in the center
        //alignItems: 'center',
        //borderWidth: 1,
        flex: 1
    },
    subContainer: {
        alignItems: 'center',
        //borderWidth: 1,
        //borderColor: 'blue',
        alignSelf: 'stretch',
        //justifyContent: 'center',
        flex: 6,
        marginBottom: 30
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
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
        justifyContent: 'center'
    },
    textInput: {
        height: 30,
        padding: 4,
        marginRight: 25,
        marginLeft: 25,
        marginTop: 10,
        //flex: 1,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#800000',
        borderRadius: 8,
        color: '#800000'
    },

    //Logo
   logoBox: {
        flexDirection: 'row',
        flex: 1,
        //borderWidth: 3,
        borderColor: 'pink',
    },
    image: {
        alignSelf: 'center',
        flex: 1,
        resizeMode: 'contain',
        margin: 15
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
            <View style = {styles.mainContainer}>
                <View style = {styles.logoBox}>  
                    <Image 
                        style = {styles.image}
                        source = {require('./../media/logo.jpg')}
                    >
                    </Image>
                </View>

                <View style = {styles.subContainer}>
                    <Text style = {styles.description}>
                        Sign in with your account number and last name below
                    </Text>
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
                    <TouchableHighlight
                        style = {styles.button}
                        underlayColor = '#99d9f4'
                        onPress = {this.onLoginPressed.bind(this)}>
                        <Text style = {styles.buttonText}>Login</Text>
                    </TouchableHighlight>
                </View>
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
            this.props.navigator.push({
                title: 'Pattern List',
                component: ShoppingCart,
                passProps: {patterns: []},
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