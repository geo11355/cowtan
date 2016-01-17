'use strict';

var React = require('react-native');
var EditAddressPage = require('./editAddressPage');

var {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
    Component,
    ScrollView,
    ListView
} = React;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    patternRow: {
        flexDirection: 'row'
    },
    checkoutButton: {
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
    scroll: {
        //borderColor: 'pink',
        justifyContent: 'center',
        flex: 0.8
    },
    editButton: {
        alignSelf: 'center',
        marginBottom: 10,
    },
    editButtonText: {
        padding: 5,
        color: 'blue'
    },
    sidemarkInput: {
        height: 80,
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
    }
});

function compressPatternsList(patterns){
    var finalPatternList = [];
    for (var i = 0; i < patterns.length; i++){
        //Create new patternObject at beginning
        if (i == 0){
            var patternObject = {
                "productnum": patterns[i].productnum,
                "quantity": 1
            };
        }else if(patterns[i].productnum === patternObject.productnum){
            patternObject.quantity++;
        }else{
            finalPatternList.push(patternObject);
            patternObject = {
                "productnum": patterns[i].productnum,
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

class CheckoutPage extends Component {
    constructor(props) {
        super(props);

        //Sort original pattern list
        this.props.patterns.sort(function (a, b){
            if (a.productnum < b.productnum){
                return -1;
            }else if (a.productnum > b.productnum){
                return 1;
            }else{
                return 0;
            }
        });

        var finalPatternList = compressPatternsList(this.props.patterns);
        
        var dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.state = {
            shippingAddress: this.props.user.address,
            billingAddress: this.props.user.address,
            dataSource: dataSource.cloneWithRows(finalPatternList)
        };
    }


    updateAddress(type, address) {
        if (type == 'billing') {
            this.setState({ billingAddress: address });
        }
        else {
            this.setState({ shippingAddress: address });
        }
    }


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

    renderRow(rowData, sectionID, rowID){
        return(
            <View style = {styles.patternRow}>
                <Text>{rowData.productnum}</Text>
                <Text>{rowData.quantity}</Text>
            </View>
        );
    }

    render() {
        return (
            <View>
                <ListView style = {styles.listView}
                    dataSource = {this.state.dataSource}
                    renderRow = {this.renderRow.bind(this)}/>
                <ScrollView contentContainerStyle = {styles.scroll}>
                    <Text>
                        Billing Address: {this.state.billingAddress}
                    </Text>
                    <TouchableHighlight
                        underlayColor = 'transparent'
                        onPress = {this.goToChangeAddress.bind(this, 'billing')}>
                        <Text style = {styles.editButton}>
                            Edit
                        </Text>
                    </TouchableHighlight>
                    <Text>
                        Shipping Address: {this.state.shippingAddress}
                    </Text>
                    <TouchableHighlight
                        underlayColor = 'transparent'
                        onPress = {this.goToChangeAddress.bind(this, 'shipping')}>
                        <Text style = {styles.editButton}>
                            Edit
                        </Text>
                    </TouchableHighlight>
                    <TextInput
                        style = {styles.sidemarkInput}
                        multiline = {true}
                        placeholder = 'Sidemark'/>
                </ScrollView>
                <TouchableHighlight
                    style = {styles.checkoutButton}>
                    <Text style = {styles.buttonText}> Email </Text>
                </TouchableHighlight>
                <TouchableHighlight 
                    style = {styles.checkoutButton}>
                    <Text style = {styles.buttonText}> Checkout </Text>
                </TouchableHighlight>

            </View>
        )
    }
}

module.exports = CheckoutPage;