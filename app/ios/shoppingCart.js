'use strict';

var React = require('react-native');
var Camera = require('react-native-camera');
var LoginPage = require('./loginPage');
var {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    ActivityIndicatorIOS,
    Component,
    ListView,
    ScrollView,
    Alert
} = React;

class ShoppingCart extends Component {
    // Constructor stores dataSource that implements a comparator and patterns
    // in the state for updating
    constructor(props) {
        super(props);
        var dataSource = new ListView.DataSource(
            // TODO: check r1 and r2 pattern nums format in server storage
            {rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            patterns: [],
            dataSource: dataSource.cloneWithRows([]),
            isEmpty: true,
        };

        this.props.setRightProps({updatePatterns: this.updatePatterns.bind(this)});
        this.props.setLeftProps({logout: this.logout.bind(this)});


    }

    // Callback function for when logout is pressed, pulls up secondary alert
    // for confirmation
    logout() {
        Alert.alert(
            'Confirm',
            'Your current session will be lost if you sign out now',
            [
                {text: 'Yes', onPress: () => this.props.reset()},
                {text: 'No'}
            ]
        );
    }

    updatePatterns(response) {
        if (response != null){
            this.state.patterns.push(response);
            var dataSource = new ListView.DataSource(
                {rowHasChanged: (r1, r2) => r1.productnum !== r2.productnum}
            );

            this.setState(
                {dataSource: dataSource.cloneWithRows(this.state.patterns), isEmpty: false}
            );
        }else{
            Alert.alert("Not a recognized fabric.", null);
        }
        
        
    }

    // Function for rendering each individual row
    renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableHighlight
                underlayColor='#dddddd'>
                <View style = {styles.row}>
                    <View style = {styles.itemColumn}>
                        <View style = {styles.productNameRow}>
                            <Text style = {styles.productNameText}>{rowData.name} </Text>
                            <Text style = {styles.productNumText}>{rowData.productnum}</Text>
                        </View>
                        <View style = {styles.productNameRow}>
                            <Text style = {styles.colorLabel}>Color: </Text>
                            <Text style = {styles.productColorText}>{rowData.color}</Text>
                        </View>
                    </View>
                    <View style = {styles.priceColumn}><Text style = {styles.productInfo}>{rowData.price}</Text></View>
                    <View style = {styles.quantityColumn}><Text style = {styles.productInfo}>1</Text></View>
                </View>
            </TouchableHighlight>
        );
    }

    // Pass render row to another function
    render() {
        var emptyMessage = this.state.isEmpty ?
            (<ScrollView contentContainerStyle = {styles.emptyTextContainer}>
                <Text style = {styles.emptyText}>Your pattern list is empty. Click "Add" to scan fabric barcodes.</Text>
            </ScrollView>):
            (<ListView style = {styles.listView}
                    dataSource = {this.state.dataSource}
                    renderRow = {this.renderRow.bind(this)}/>);

        return (
            <View style = {styles.container}>
                <View style = {styles.topRow}>
                    <View style = {styles.itemColumn}><Text style = {styles.itemText}>Item</Text></View>
                    <View style = {styles.priceColumn}><Text style = {styles.categoryText}>Price</Text></View>
                    <View style = {styles.quantityColumn}><Text style = {styles.categoryText}>Qty.</Text></View>
                </View>
                {emptyMessage}
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    emptyTextContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        margin: 20,
        color: '#656565',
        textAlign: 'center',
        fontSize: 16
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1.5,
        borderColor: '#800000',
        backgroundColor: '#fff2f2',
    },
    productNameRow: {
        flexDirection: 'row'
    },
    topRow: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderColor: 'black',
    },
    itemColumn: {
        flex: 0.6,
    },
    priceColumn: {
        flex: 0.2,
    },
    quantityColumn: {
        flex: 0.135,
    },
    categoryText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10
    },
    itemText: {
        margin: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    productNameText: {
        marginLeft: 10,
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 3,
    },
    productNumText: {
        fontSize: 17,
        marginTop: 3
    },
    colorLabel: {
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 10,
        marginBottom: 3,
    },
    productColorText: {
        fontSize: 15,
        fontStyle: 'italic',
        marginBottom: 3,
    },
    productInfo: {
        marginTop: 3,
        fontSize: 17
    },
    listView:{
        flex: 1,
    }

});

module.exports = ShoppingCart;

