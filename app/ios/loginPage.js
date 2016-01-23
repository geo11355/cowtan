'use strict';

var React = require('react-native');
var ShoppingCart = require('./shoppingCart');
var AddButton = require('./addButton');
var ConfirmPage = require('./confirmPage');
var CameraPage = require('react-native-camera');
var KeyboardHandler = require('./keyboardHandler');

// ------------------- CONSTANTS -------------------

var BOUNDS = .5;         // Bound limit on login by lat/long units

// -------------------------------------------------

var {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
    ActivityIndicatorIOS,
    Image,
    Component,
    ScrollView,
    DeviceEventEmitter,
    Alert
} = React;

var styles = StyleSheet.create({
    description: {
        marginRight: 20,
        marginLeft: 20,
        marginBottom: 10,
        marginTop: 5,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
    },
    mainContainer: {
        flex: 1
    },
    subContainer: {
        alignItems: 'center',
        alignSelf: 'stretch',
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
        backgroundColor: '#800000',
        borderColor: '#800000',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        marginRight: 25,
        marginLeft: 25,
        marginTop: 15,
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
    textInput: {
        height: 30,
        padding: 4,
        marginRight: 25,
        marginLeft: 25,
        marginBottom: 10,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#800000',
        borderRadius: 8,
        color: 'black',
    },
    error: {
        fontSize: 12,
        color: 'red',
        marginBottom: 0,
        alignSelf: 'flex-start',
        marginLeft: 25
    },
   logoBox: {
        flexDirection: 'row',
        flex: 1,
        height: 10,
        padding: 20,
        marginTop: 20,
        marginBottom: 10
    },
    image: {
        alignSelf: 'center',
        flex: 1,
        resizeMode: 'contain',
    }
});

// Private function to generate the URL for login verification
function generateUrl(acctNum) {
    return 'http://cowtandb.com/customers.php?accnum=' + acctNum;
};

function distanceSq(l1, l2) {
    var lats = Math.pow(+l1.lat - +l2.lat, 2);
    var longs = Math.pow(+l1.long - +l2.long, 2);
    return lats + longs;
}

var showroomLocations = {
    'New York': {city: 'New York', lat: 40.760897, long: -73.966376, code: '00'},
    'Primavera': {city: 'Primavera', lat: 43.675163, long: -79.399339, code: '01'},
    'Philidelphia': {city: 'Philidelphia', lat: 39.953568, long: -75.179375, code: '02'},
    'Washington DC': {city: 'Washington DC', lat: 38.903364, long: -77.031224, code: '03'},
    'Boston': {city: 'Boston', lat: 42.344189, long: -71.032813, code: '04'},
    'West Canada': {city: 'West Canada', lat: 49.284026, long: -123.091239, code: '05'},
    'Atlanta': {city: 'Atlanta', lat: 33.817611, long: -84.374773, code: '06'},
    'Florida': {city: 'Florida', lat: 26.059659, long: -80.161519, code: '07'},
    'Dallas': {city: 'Dallas', lat: 32.788440, long: -96.814413, code: '08'},
    'Houston': {city: 'Houston', lat: 29.762561, long: -95.466267, code: '09'},
    'Denver': {city: 'Devner', lat: 39.706273, long: -104.990627, code: '10'},
    'Chicago': {city: 'Chicago', lat: 41.888519, long: -87.635480, code: '11'},
    'Troy': {city: 'Troy', lat: 42.551595, long: -83.177836, code: '12'},
    'Cleveland': {city: 'Cleveland', lat: 41.459648, long: -81.509372, code: '14'},
    'Los Angeles': {city: 'Lost Angeles', lat: 34.082157, long: -118.382384, code: '16'},
    'San Francisco': {city: 'San Francisco', lat: 37.769149, long: -122.404440, code: '17'},
    'Scottsdale': {city: 'Scottsdale', lat: 33.479783, long: -111.934773, code: '19'},
};

// Login Screen class
class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            acctNum: '',
            lastName: '',
            isLoading: false,
            failedLogin: false,
            location: {},
            located: false
        };
    }

    componentDidMount() {
        this._getLocation();
    }

    render() {
        var errorMessage = this.state.failedLogin ? 
            (<Text style = {styles.error}>*Incorrect account number or last name</Text>):
            (<View/>);

        var loginButton = this.state.isLoading ?
            (<TouchableHighlight
                style = {styles.button}
                underlayColor = '#4d0000'>
                <View>
                    <ActivityIndicatorIOS
                        size = 'small'/>
                </View>
            </TouchableHighlight>):
            (<TouchableHighlight
                style = {styles.button}
                underlayColor = '#4d0000'
                onPress = {this.onLoginPressed.bind(this)}>
                <Text style = {styles.buttonText}>Login</Text>
            </TouchableHighlight>);

        return (
            <KeyboardHandler style = {styles.mainContainer}>
                <View style = {styles.logoBox}>  
                    <Image 
                        style = {styles.image}
                        source = {require('./../media/logo.jpg')} />
                </View>

                <View style = {styles.subContainer}>
                    <Text style = {styles.description}>
                        Sign in with your account number and last name below
                    </Text>
                    {errorMessage}
                    <TextInput
                        style = {styles.textInput}
                        placeholder = 'Account Number'
                        value = {this.state.acctNum}
                        returnKeyType = 'go'
                        onSubmitEditing = {this.onLoginPressed.bind(this)}
                        onChange = {this.acctNumChanged.bind(this)}/>
                    {/*<TextInput
                        ref = {(ref) => this.passInput = ref}
                        style = {styles.textInput}
                        placeholder = 'Last Name'
                        value = {this.state.lastName}
                        returnKeyType = 'go'
                        secureTextEntry = {true}
                        onChange = {this.lastNameChanged.bind(this)}
                        onSubmitEditing = {this.onLoginPressed.bind(this)}/>*/}
                    {loginButton}
                </View>
            </KeyboardHandler>
        );
    }

    // Handle a response, reset state fields and then move to the next page
    _handleResponse(response) {
        if (response !== null) {
            this.setState({
                acctNum: '',
                lastName: '',
                isLoading: false,
                failedLogin: false
            });
            this.props.toRoute({
                name: 'Confirm',
                component: ConfirmPage,
                passProps: {
                    user: response,
                    location: this.state.location
                }
            });
        }
        else {
            this.setState({failedLogin: true, isLoading: false});
        }
    }

    // Returns the closest showroom city to current location ONLY if its within 2 miles,
    // else returns null
    _confirmLocation() {
        var closestCity = null;
        var closestDistance = Infinity;
        for (var city in showroomLocations) {
            if (showroomLocations.hasOwnProperty(city)) {
                var d = distanceSq(showroomLocations[city], this.state.location);
                if (d < BOUNDS && d < closestDistance) {
                    closestCity = showroomLocations[city];
                    closestDistance = d;
                }
            }
        }
        return closestCity;
    }


    // Callback function that requests current location and stores it into state
    _getLocation() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                var crd = position.coords;
                this.setState({
                    location: {lat: crd.latitude, long: crd.longitude, city: null},
                    located: true
                });
                console.log(crd);
            },
            (error) => alert(error.message),
            {enableHighAccuracy: true, timeout: 10000, maximumAge: 0}
        );
    }


    // Callback when the Login button is pressed, calls
    // _handleResponse on fetch results
    // Fails when gps hasn't been detected or not within range
    onLoginPressed() {
        if (!this.state.located) {
            Alert.alert('Error', 'Location has not been detected yet, please try again in a moment');
            return;
        }
        var closestCity = this._confirmLocation();
        if (closestCity == null) {
            Alert.alert('Access Denied', 'Not within showroom bounds');
            return;
        }

        // Set current location's city to closestCity
        this.state.location = closestCity;
        if (this.state.acctNum !== '') {
            var query = generateUrl(this.state.acctNum, this.state.lastName);
            this.setState({isLoading: true});
            fetch(query)
                .then(response => response.json())
                .then(json => this._handleResponse(json))
                .catch(error => {
                    this.setState({isLoading: false});
                    console.log("Fetch failed: " + error);
                });
        } 
        else {
            this.setState({failedLogin: true});
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