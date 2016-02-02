'use strict';

var React = require('react-native');
var ShoppingCart = require('./shoppingCart');
var EditButton = require('./editButton');
var LogoutButton = require('./logoutButton');

var {
    StyleSheet,
    Text,
    Image,
    TouchableHighlight,
    View,
    Component,
    ScrollView,
    
} = React;

var styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        flex: 1,
        fontSize: 25,
    },
    spacer: {
        flex: 1,
    },
    image: {
        flex: 2,
        resizeMode: 'contain',
        alignItems: 'center',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    buttonText: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 16,
    },
    button: {
        height: 36,
        borderColor: '#800000',
        backgroundColor: '#800000',
        borderRadius: 8,
        // marginBottom: 10,
        // marginRight: 15,
        // marginLeft: 13,
        // marginTop: 10,
        flex: 1,
        
        //Keeps text aligned
        justifyContent: 'center',
        shadowRadius: 4,
        shadowOpacity: 0.8,
        shadowColor: 'gray',
        shadowOffset: {
            width: 2,
            height: 2
        }
    }
});

class SuccessPage extends Component {
    constructor(props) {
        super(props);
    }

    goToShopping() {
        this.props.clearShoppingCart();
        var routes = this.props.getCurrentRoutes()
        this.props.popToRoute(routes[2]);
    }

    render() {
        return (
        <View style = {styles.mainContainer}>
            <View style = {styles.spacer} />

            <Text style = {styles.title}>
                Success!
            </Text>

            <Image
                style = {styles.image}
                source = {require('./../media/success.png')} />

            <View style = {styles.spacer} />

            <View style = {styles.buttonContainer}>
                <TouchableHighlight
                    style = {styles.button}>
                    <Text 
                        style = {styles.buttonText}
                        onPress = {this.props.reset.bind(this)}
                        underlayColor = '#4d0000'> 
                        Logout
                    </Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style = {styles.button}>
                    <Text
                        style = {styles.buttonText}
                        onPress = {this.goToShopping.bind(this)}
                        underlayColor = 'transparent'>
                        Shop Again
                    </Text>
                </TouchableHighlight>
            </View>
        </View>
        )
    }
}

module.exports = SuccessPage;