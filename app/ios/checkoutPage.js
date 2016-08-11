'use strict';

var React = require('react-native');
var EditAddressPage = require('./editAddressPage');
var KeyboardHandler = require('./keyboardHandler');
var SuccessPage = require('./successPage');
const emailRegex = new RegExp('[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+');

var {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
    Component,
    ScrollView,
    ListView,
    Alert
} = React;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    listView: {
        height: 200,
        //borderWidth: 1
        backgroundColor: '#f6f4f4',
        //borderBottomWidth: 1.5,
        //borderColor: '#d2d0d0',
        //marginBottom: 15,
    },
    boxContainer: {
        shadowRadius: 4,
        shadowOpacity: 0.8,
        shadowColor: 'gray',
        shadowOffset: {
            width: 2,
            height: 2
        }
    },
    listViewContainer: {
        borderBottomWidth: 1.5,
        borderColor: '#b9b6b6',
        marginBottom: 15,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'gray',
        shadowOffset: {
            width: 2,
            height: 2
        }
    },
    titleContainer: {
        marginLeft: 10,
        marginTop: 6,
        marginBottom: 3,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        alignSelf: 'flex-start',
        flex: 1,
        marginLeft: 10
    },
    titleTop: {
        fontWeight: 'bold',
        fontSize: 16,
        alignSelf: 'flex-start',
        flex: 1,
    },
    topRow: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#b9b6b6',
    },
    topRowText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 3,
        marginBottom: 3
    },
    itemColumn: {
        flex: 0.6,
        marginLeft: 10,
    },
    priceColumn: {
        flex: 0.25,
    },
    quantityColumn: {
        flex: 0.15,
        marginRight: 10,
    },
    patternRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#800000',
        backgroundColor: '#fff2f2',
    },
    productText: {
        marginTop: 3,
        marginBottom: 3,
        fontSize: 16
    },
    shippingNameContainer: {
        flexDirection: 'row'
    },
    fullName: {
        marginRight: 10,
        borderColor: '#800000',
        borderWidth: 1,
        borderRadius: 4,
        fontSize: 16,
        height: 20,
        flex: 1
    },
    checkoutButton: {
        height: 36,
        //borderWidth: 1,
        borderColor: '#800000',
        backgroundColor: '#800000',
        borderRadius: 8,
        marginBottom: 20,
        marginRight: 10,
        marginLeft: 10,
        marginTop: 10,
        
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
    emailButton: {
        height: 36,
        //borderWidth: 1,
        borderColor: '#800000',
        backgroundColor: '#800000',
        borderRadius: 8,
        marginBottom: 5,
        marginRight: 10,
        marginLeft: 10,
        marginTop: 10,
        
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
    scroll: {
        //borderColor: 'pink',
        justifyContent: 'center',
        flex: 0.8
    },
    addressButton: {
        //flexDirection: 'row',
        marginTop: 0,
        backgroundColor: '#f6f4f4',
        //borderBottomWidth: 1.5,
        //borderColor: '#b9b6b6',
        marginBottom: 20,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'gray',
        shadowOffset: {
            width: 2,
            height: 2
        }
    },
    addressRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    carat: {
        color: '#800000',
        alignSelf: 'center',
        marginRight: 10,
        fontSize: 22
    },
    editButtonText: {
        color: '#800000',
        fontSize: 16
    },
    sidemarkInput: {
        height: 80,
        padding: 4,
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 10,
        marginTop: 5,
        //flex: 1,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#800000',
        borderRadius: 6,
        color: 'black',
    },
    emailInput: {
        padding: 4,
        height: 30,
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 10,
        marginTop: 5,
        //flex: 1,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#800000',
        borderRadius: 6,
        color: 'black',
    },
    addressInfoContainer: {
        marginLeft: 10
    },
    addressText: {
        marginTop: 3,
        fontSize: 15,
        marginBottom: 3,
        flex: 1,
        marginLeft: 10
    },
    titleRow: {
        flexDirection: 'row',
        borderBottomWidth: 1.5,
        //marginBottom: 2,
        marginTop: 5,
    },
    editButtonContainer: {
        alignSelf: 'flex-end',
        marginRight: 10
    },
});

function postReq(url, obj) {
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open("POST", url, true);

        var params = "";
        //convert obj to url encoded
        for (var i in obj) {
           params += encodeURIComponent(i) + "=";
           params += encodeURIComponent(obj[i]) + "&";
        }
        params = params.slice(0, -1); //remove trailing ampersand
        req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        req.onload = function () {
            if (req.status === 200) {
                //Alert.alert('Success', 'Email sent to: ' + obj.address + '@' + obj.domain);
                resolve(req.responseText)
            } 
            else {
                Alert.alert('Error', 'Email failed.');
                console.log(req.responseText);
                reject(Error(req.responseText));
            }
        };
        req.onerror = function () { reject(Error("Could not process POST request. Network Error.")); };
        req.send(params);
   });
}

function compressPatternList(patterns){
    var finalPatternList = [];
    for (var i = 0; i < patterns.length; i++){
        //Create new patternObject at beginning
        if (i == 0){
            var patternObject = {
                "productnum": patterns[i].productnum,
                "price": patterns[i].price,
                "name": patterns[i].name,
                "quantity": 1
            };
        }else if(patterns[i].productnum === patternObject.productnum){
            patternObject.quantity++;
        }else{
            finalPatternList.push(patternObject);
            patternObject = {
                "productnum": patterns[i].productnum,
                "price": patterns[i].price,
                "name": patterns[i].name,
                "quantity": 1
            };
        }
        //If at end of list, push to finalPatternList
        if (i == patterns.length - 1){
            finalPatternList.push(patternObject);
        }
    }
    return finalPatternList;
}

function combineAddress(city, state, zip) {
    return city + ', ' + state + ' ' + zip;
}

class CheckoutPage extends Component {
    constructor(props) {
        super(props);

        //Sort original pattern list
        this.props.patterns.sort(function (a, b){
            if (a.name < b.name){
                return -1;
            }else if (a.productnum > b.productnum){
                return 1;
            }else{
                return 0;
            }
        });

        var finalPatternList = compressPatternList(this.props.patterns);
        
        var dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.state = {
            shippingAddress: {
                name: this.props.custName,
                addr1: this.props.user.addr1,
                addr2: this.props.user.addr2,
                city: this.props.user.city,
                state: this.props.user.state,
                zip: this.props.user.zip
            },
            billingAddress: {
                name: this.props.custName,
                addr1: this.props.user.addr1,
                addr2: this.props.user.addr2,
                city: this.props.user.city,
                state: this.props.user.state,
                zip: this.props.user.zip
            },
            dataSource: dataSource.cloneWithRows(finalPatternList),
            emailSent: false,
            condensedPatterns: finalPatternList,
            email: ''
        };
    }

    // Callback function to move to the success page
    goToSuccessPage() {
        if (this.state.email.length == 0){
            Alert.alert('Error', 'Email field is required.');
            return;
        }

        if (!emailRegex.test(this.state.email)){
            Alert.alert('Error', 'Email is not in the correct format.');
            return;
        }

        this.parseEmail();
        this.handleEmail();
        this.props.toRoute({
            name: 'Success',
            component: SuccessPage,
            leftCorner: View,
            passProps: {
                user: this.props.user,
                location: this.props.location,
                clearShoppingCart: this.props.clearShoppingCart
            }
        })
    }

    // Callback function to move to Edit page, passes along address type for generic
    // edit page.
    goToChangeAddress(type) {
        this.props.toRoute({
            name: 'Edit',
            component: EditAddressPage,
            passProps: {
                types: type,
                shipping: this.state.shippingAddress,
                billing: this.state.billingAddress,
                updateAddress: this.updateAddress.bind(this)
            },
        });
    }

    // Callback function for handling emails of patterns list, posts to server
    // for server to handle.
    handleEmail() {
        // Throw an alert if there aren't any patterns to email
        if (this.props.patterns.length == 0) {
            Alert.alert('Error', 'There are no patterns in the cart');
            return;
        }

        // Set up pattern objects and then send all the pattern numbers
        var patternObject = {
            address: this.state.emailAddress.address,
            domain: this.state.emailAddress.domain,
            locationCode: this.props.location.code,
            locationCity: this.props.location.city,
            shippingAddress: this.state.shippingAddress,
            billingAddress: this.state.billingAddress,
            accountNum: this.props.acctNum
        };
        // Go through condensed patterns and append to objects with quantity comma separated
        for (var i=0; i<this.state.condensedPatterns.length; i++) {
            patternObject[i+1] = this.state.condensedPatterns[i].name 
            					+ ',' 
            					+ this.state.condensedPatterns[i].productnum 
            					+ ',' 
                        		+ this.state.condensedPatterns[i].quantity;
        }
        postReq('http://cowtandb.com/generatepdf.php', patternObject)
            .then((result) => {
                console.log('RESPONSE: ' + result);
                if (result == 'success') {
                    //this.goToSuccessPage();
                    //Don't need anything here
                    console.log('HURRAH');
                }
            });
        console.log(patternObject);
    }

    parseEmail() {
        var atIndex = this.state.email.indexOf('@');
        if (atIndex === -1) {
            return;
        }
        this.setState({emailAddress: {
            address: this.state.email.substring(0, atIndex),
            domain: this.state.email.substring(atIndex+1),
        }});
    }

    // Callback function for handling the Checkout button. Creates an json object
    // to send to cowtandb
    handleCheckout() {
        // Send an alert if there aren't any patterns to send
        if (this.props.patterns.length == 0) {
            Alert.alert('Error', 'There are no patterns in the cart');
            return;
        }

        // Send an alert so we don't checkout more than once
        if (this.state.checkoutConfirmed) {
            Alert.alert('Checked out already');
            return;
        }
        parseEmail();
        handleEmail();
        // Initialize the object with the territory code, then add in all fabrics
        var object = {
            TC: parseInt(this.props.location.code),
        };
        for (var i=0; i<this.state.condensedPatterns.length; i++) {
            console.log(this.state.condensedPatterns[i].productnum.replace(/ /g, '') + 'NUMBER');
            object[i+1] = this.state.condensedPatterns[i].productnum + ',' 
                        + this.state.condensedPatterns[i].quantity;
        }
        postReq('http://cowtandb.com/checkout.php', object)
            .then((result) => {
                if (result == 'success') {
                    this.setState({ checkoutConfirmed: true });
                }
            });
    }

    // Updates the proper address based on the type, and addresss should be json
    // following format {addr1, addr2, city, state, zip}
    updateAddress(type, address) {
        if (type == 'billing') {
            this.setState({ billingAddress: address });
        }
        else {
            this.setState({ shippingAddress: address });
        }
        console.log("STATE", this.state);
    }

    // Helper function that builds a proper string with addr1, addr2 and rest. If addr2
    // is empty then ignores it properly
    _buildAddress(name, addr1, addr2, city, state, zip) {
        var completeAddr = name + '\n' + addr1 + '\n';
        if (addr2 == '') {
            return completeAddr + city + ", " + state + " " + zip;
        }
        return completeAddr + addr2 + '\n' + city + ", " + state + " " + zip;
    }

    emailChanged(event) {
        this.setState({ email: event.nativeEvent.text });
    }

    renderRow(rowData, sectionID, rowID){
        return(
            <View style = {styles.patternRow}>
                <View style = {styles.itemColumn}>
                    <Text style = {styles.productText}>{rowData.name} {rowData.productnum}</Text>
                </View>
                <View style = {styles.priceColumn}><Text style = {styles.productText}>{rowData.price}</Text></View>
                <View style = {styles.quantityColumn}><Text style = {styles.productText}>{rowData.quantity}</Text></View>
            </View>
        );
    }

    render() {
        var billingAddr = this._buildAddress(this.state.billingAddress.name,
                                            this.state.billingAddress.addr1, 
                                            this.state.billingAddress.addr2,
                                            this.state.billingAddress.city,
                                            this.state.billingAddress.state,
                                            this.state.billingAddress.zip);
        var shippingAddr = this._buildAddress(this.state.shippingAddress.name,
                                            this.state.shippingAddress.addr1, 
                                            this.state.shippingAddress.addr2, 
                                            this.state.shippingAddress.city,
                                            this.state.shippingAddress.state,
                                            this.state.shippingAddress.zip);

        return (
            <KeyboardHandler ref = 'scrollContainer'>
                <View style = {styles.titleContainer}>
                    <Text style = {styles.titleTop}>Summary: </Text>
                </View>

                <View style = {styles.boxContainer}>
                    <View style = {styles.topRow}>
                         <View style = {styles.itemColumn}><Text style = {styles.topRowText}>Item</Text></View>
                         <View style = {styles.priceColumn}><Text style = {styles.topRowText}>Price</Text></View>
                         <View style = {styles.quantityColumn}><Text style = {styles.topRowText}>Qty.</Text></View>
                    </View>

                    <View style = {styles.listViewContainer}>
                        <ListView style = {styles.listView}
                            dataSource = {this.state.dataSource}
                            renderRow = {this.renderRow.bind(this)}/>
                    </View>
                </View>

                <View>
                    <View style = {styles.titleRow}>
                        <Text style = {styles.title}>
                            Billing Address: 
                        </Text>
                    </View>
                    <TouchableHighlight 
                        onPress = {this.goToChangeAddress.bind(this, 'billing')}
                        style = {styles.addressButton}
                        underlayColor = '#A9A9A9'>
                        <View style = {styles.addressRow}>
                            <Text style = {styles.addressText}>
                                {billingAddr}
                            </Text>
                            <Text style = {styles.carat}>></Text>
                        </View>
                    </TouchableHighlight>
                    <View style = {styles.titleRow}>
                        <Text style = {styles.title}>
                            Shipping Address: 
                        </Text>
                    </View>
                    <TouchableHighlight 
                        onPress = {this.goToChangeAddress.bind(this, 'shipping')}
                        style = {styles.addressButton}
                        underlayColor = '#A9A9A9'>
                            <View style = {styles.addressRow}>
                                <Text style = {styles.addressText}>
                                    {shippingAddr}
                                </Text>
                                <Text style = {styles.carat}>></Text>
                            </View>
                    </TouchableHighlight>
                    <TextInput
                        onFocus = {() => this.refs.scrollContainer.inputFocused(this, 'checkout')}
                        style = {styles.emailInput}
                        value={this.state.email}
                        onChange={this.emailChanged.bind(this)}
                        placeholder= 'Enter email address'/>
                    <TextInput
                        onFocus = {() => this.refs.scrollContainer.inputFocused(this, 'checkout')}
                        style = {styles.sidemarkInput}
                        multiline = {true}
                        placeholder = 'Additional comments?'/>
                </View>
                <TouchableHighlight
                    ref = 'checkout'
                    onPress = {this.goToSuccessPage.bind(this)}
                    style = {styles.checkoutButton}>
                    <Text style = {styles.buttonText}>Checkout</Text>
                </TouchableHighlight>
            </KeyboardHandler>
        )
    }
}

module.exports = CheckoutPage;
