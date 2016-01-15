'use strict';

var React = require('react-native');
var Camera = require('react-native-camera');
var LoginPage = require('./loginPage');
var CheckoutPage = require('./checkoutPage');
var AddAndDelete = require('./addAndDelete');
var CustomBackButton = require('./customBack');
var AddButton = require('./addButton');
var ManualAddButton = require('./manualAddButton');
var DeleteButton = require('./deleteButton');
var CancelDeleteButton = require('./cancelDeleteButton');

console.disableYellowBox = true;

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
            deleteMode: false,
            deleteArray: [],
        };

        //this.props.setRightProps({updatePatterns: this.updatePatterns.bind(this), deletePatterns: this.deletePatterns.bind(this), 
        //						manualUpdatePatterns: this.manualUpdatePatterns.bind(this)});
        this.props.setLeftProps({logout: this.logout.bind(this)});
    }

    // Callback function for when logout is pressed, pulls up secondary alert
    // for confirmation
    logout() {
        Alert.alert(
            'Confirm',
            'Current session will be lost.',
            [
                {text: 'Yes', onPress: () => this.props.reset()},
                {text: 'No'}
            ]
        );
    }


    enterDeleteMode(){
        if (!this.state.isEmpty){
            this.setState(
                {deleteMode: true}
            );
        }else{
            Alert.alert('Your pattern list is empty.', null);
        } 

        var dataSource = new ListView.DataSource(
                {rowHasChanged: (r1, r2) => r1.productnum !== r2.productnum}
            );

        this.setState(
            {dataSource: dataSource.cloneWithRows(this.state.patterns)}
        );
    }

    cancelDeleteMode(){
        this.setState(
            {deleteMode: false}
        );
    }

    // Callback function for updating the patterns list, creates a new dataSource
    // each time, probably can be optimized. 
    updatePatterns(response) {
        if (response != null) {
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

    addToDeleteArray(index){
        if (this.state.deleteArray.indexOf(index) == -1)
            this.state.deleteArray.push(index);
        else{
            this.state.deleteArray.splice(index);
        }
        console.log(this.state.deleteArray);
    }

    deletePatterns(rowData){
    	var index = this.state.patterns.indexOf(rowData);
    	this.state.patterns.splice(index, 1);

    	var dataSource = new ListView.DataSource(
                {rowHasChanged: (r1, r2) => r1.productnum !== r2.productnum}
            );

        this.setState(
           	{dataSource: dataSource.cloneWithRows(this.state.patterns), deleteMode: false}
      	);

      	this.setState(
      		{isEmpty: this.state.patterns.length > 0 ? false: true}
      	);
    }

    customBack() {
        Alert.alert(
            'Confirm',
            'Current session will be lost.',
            [
                {text: 'Yes', onPress: () => this.props.toBack},
                {text: 'No'}
            ]
        );
    }

    // Callback function to move to the checkout page upon button press
    goToCheckout() {
        this.props.toRoute({
            name: 'Checkout',
            component: CheckoutPage,
            passProps: {
                patterns: this.state.patterns,
                user: this.props.user
            },
            leftComponent: CustomBackButton,
            leftComponentProps: {
                customBack: this.customBack.bind(this)
            }
        });
    }

    // Function for rendering each individual row
    renderRow(rowData, sectionID, rowID) {
        var deleteButton = this.state.deleteMode ? 
            (<TouchableHighlight
                    onPress = {() => this.addToDeleteArray(this.state.patterns.indexOf(rowData))}
                    style = {styles.deleteButton}>
                    {/*<Text>Delete</Text>*/}
                    <View/>
            </TouchableHighlight>):
            (<View/>);

        return (
           <View>
                <View style = {styles.row}>
                    {deleteButton}
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
                    {/*<View style = {styles.quantityColumn}><Text style = {styles.productInfo}>1</Text></View>*/}
                </View>
            </View>
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

        var deleteMode = this.state.deleteMode ?
            (<CancelDeleteButton
                cancelDeleteMode = {this.cancelDeleteMode.bind(this)}/>):
            (<DeleteButton
                enterDeleteMode = {this.enterDeleteMode.bind(this)}/>);

        return (
            <View style = {styles.container}>
                <View style={styles.topRow}>
                    <View style = {styles.itemColumn}><Text style = {styles.itemText}>Item</Text></View>
                    <View style = {styles.priceColumn}><Text style = {styles.categoryText}>Price</Text></View>
                    {/*<View style = {styles.quantityColumn}><Text style = {styles.categoryText}>Qty.</Text></View>*/}
                </View>
                {emptyMessage}
                <View style = {styles.checkoutButtonContainer}>
                    <AddButton
                        updatePatterns = {this.updatePatterns.bind(this)}
                        toRoute = {this.props.toRoute.bind(this)}/>
                    <ManualAddButton
                        updatePatterns = {this.updatePatterns.bind(this)}
                        toRoute = {this.props.toRoute.bind(this)}/>
                    {deleteMode}
                    <TouchableHighlight
                        underlayColor = '#4d0000'
                        style = {styles.checkoutButton}
                        onPress = {this.goToCheckout.bind(this)}>
                        <Text style = {styles.buttonText}>Checkout</Text>
                    </TouchableHighlight>
             	</View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0eeee'
    },
    emptyTextContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0eeee',
    },
    emptyText: {
        margin: 20,
        color: '#656565',
        textAlign: 'center',
        fontSize: 16
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#800000',
        backgroundColor: '#fff2f2',
    },
    productNameRow: {
        flexDirection: 'row'
    },
    topRow: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderBottomWidth: 1.5,
        borderColor: '#d2d0d0',
    },
    itemColumn: {
        flex: 0.6,
    },
    deleteButton: {
        borderWidth: 1,
        height: 22, width: 22,
        borderRadius: 11,
        alignSelf: 'center',
        marginLeft: 8
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
        marginTop: 7,
        marginBottom: 7
    },
    itemText: {
        margin: 7,
        marginRight: 10,
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
    },
    checkoutButtonContainer: {
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderColor: '#d2d0d0',
        flexDirection: 'row'
    },
    checkoutButton: {
        height: 36,
        //borderWidth: 1,
        borderColor: '#800000',
        backgroundColor: '#800000',
        borderRadius: 8,
        marginBottom: 10,
        marginRight: 15,
        marginLeft: 15,
        marginTop: 10,
        flex: 0.2,
        
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
        fontSize: 16,
    },
});

module.exports = ShoppingCart;

