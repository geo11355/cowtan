'use strict';

var React = require('react-native');

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
        fontSize: 25,
        marginBottom: 15
    },
    h2: {
        fontSize: 16,
        marginRight: 22,
        marginLeft: 22,
        marginBottom: 25,
        color: 'gray',
        alignSelf: 'center'
    },
    spacer: {
        flex: 1,
    },
    image: {
        flex: 2,
        resizeMode: 'contain',
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 20
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    buttonText: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 16,
        margin: 5,
        marginLeft: 20, 
        marginRight: 20
    },
    button: {
        height: 36,
        borderColor: '#800000',
        backgroundColor: '#800000',
        borderRadius: 8,
        flex: 1,
        margin: 10,
        
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

    // Callback function to return back to the shoppingCart page
    goToShopping() {
        console.log('working');
        this.props.clearShoppingCart();
        var routes = this.props.getCurrentRoutes()
        console.log(routes);
        this.props.popToRoute(routes[2]);
    }

    render() {
        return (
        <ScrollView contentContainerStyle = {styles.mainContainer}
            keyboardShouldPersistTaps = {true}>
            <View style = {styles.spacer} />

            <Text style = {styles.title}>
                Success!
            </Text>
            <Text style = {styles.h2}>
                Your order has been processed. Thank you for shopping with Cowtan & Tout.
            </Text>

            <Image
                style = {styles.image}
                source = {require('./../media/success.png')} />

            <View style = {styles.spacer} />

            <View style = {styles.buttonContainer}>
                <TouchableHighlight
                    style = {styles.button}
                    underlayColor = '#4d0000'
                    onPress = {this.props.reset.bind(this)}>
                    <Text 
                        style = {styles.buttonText}> 
                        Logout
                    </Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style = {styles.button}
                    underlayColor = '#4d0000'
                    onPress = {this.goToShopping.bind(this)}>
                    <Text
                        style = {styles.buttonText}>
                        Shop Again
                    </Text>
                </TouchableHighlight>
            </View>
        </ScrollView>
        )
    }
}

module.exports = SuccessPage;