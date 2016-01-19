'use strict';

var React = require('react-native');
var ShoppingCart = require('./shoppingCart');
var AddButton = require('./addButton');
var ConfirmPage = require('./confirmPage');
var CameraPage = require('react-native-camera');

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
    DeviceEventEmitter
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
    scroll: {
        flex: 1,
    },
    mainContainer: {
        //padding: 30,
        
        //to account for navigator
        //marginTop: 30,
        
        //aligns all items in the center
        //alignItems: 'center',
        
        flex: 1,
        
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
        //flex: 1,
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
        marginTop: 25
    },
    image: {
        alignSelf: 'center',
        flex: 1,
        resizeMode: 'contain',
        margin: 15,
    }
});

// Private function to generate the URL for login verification
function generateUrl(acctNum) {
    return 'http://cowtandb.com/customers.php?accnum=' + acctNum;
};

function distanceSq(l1, l2) {
    var lats = Math.pow(l1.lat - l2.lat, 2);
    var longs = Math.pow(l1.long - l2.long, 2);
    return lats + longs;
}

var showroomLocations = {
    'New York': {lat: 40.7127, long: 74.0059},
    'Philidelphia': {lat: 39.9500, long: 75.1667},
    'Washington DC': {lat: 38.9047, long: 77.0164},
    'Boston': {lat: 42.3601, long: 71.0589},
    'Atlanta': {lat: 33.7550, long: 84.3900},
    'Dania': {lat: 26.0550, long: 80.1531},
    'Dallas': {lat: 32.7767, long: 96.7970},
    'Houston': {lat: 29.7604, long: 95.3698},
    'Chicago': {lat: 41.8369, long: 41.8369},
    'Cleveland': {lat: 41.4822, long: 81.6697},
    'Kansas City': {lat: 39.0997, long: 94.5783},
    'Minneapolis': {lat: 44.9778, long: 93.2650},
    'St. Louis': {lat: 38.6272, long: 90.1978},
    'Troy': {lat: 42.5803, long: 83.1431},
    'Los Angeles': {lat: 34.0500, long: 118.2500},
    'San Francisco': {lat: 37.7833, long: 122.4167},
    'Denver': {lat: 39.7392, long: 104.9903},
    'Scottsdale': {lat: 33.5000, long: 111.9333},
    'Portland': {lat: 45.5200, long: 122.6819},
    'San Diego': {lat: 32.7150, long: 117.1625},
    'Seattle': {lat: 47.6097, long: 122.3331}
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
            lat: '',
            long: '',
        };
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
            <View style = {styles.mainContainer}>
                {/*<ScrollView contentContainerStyle = {styles.scroll}
                            >*/}
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
                    {errorMessage}
                    <TextInput
                        style = {styles.textInput}
                        placeholder = 'Account Number'
                        value = {this.state.acctNum}
                        returnKeyType = 'next'
                        onSubmitEditing = {() => this.passInput.focus()}
                        onChange = {this.acctNumChanged.bind(this)}/>
                    <TextInput
                        ref = {(ref) => this.passInput = ref}
                        style = {styles.textInput}
                        placeholder = 'Last Name'
                        value = {this.state.lastName}
                        returnKeyType = 'go'
                        secureTextEntry = {true}
                        onChange = {this.lastNameChanged.bind(this)}
                        onSubmitEditing = {this.onLoginPressed.bind(this)}/>
                    {loginButton}
                </View>
                {/*</ScrollView>*/}
            </View>
        );
    }

    // Handle a response, reset state fields and then move to the next page
    _handleResponse(response) {
        while (!this.state.located) {}
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
        for (var city in showroomLocations) {
            if (showroomLocations.hasOwnProperty(city)) {
                var d = distanceSq(showroomLocations.city, this.state.location);
                if (d < 4) {
                    closestCity = city;
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
                    location: {lat: crd.latitude, long: crd.longitude},
                    located: true
                });
            },
            (error) => alert(error.message),
            {enableHighAccuracy: true, timeout: 10000, maximumAge: 0}
        );
    }


    // Callback when the Login button is pressed, calls
    // _handleResponse on fetch results
    onLoginPressed() {
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