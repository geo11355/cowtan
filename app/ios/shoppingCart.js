'use strict';

var React = require('react-native');
var Camera = require('react-native-camera');
var {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    ActivityIndicatorIOS,
    Component,
    ListView,
    ScrollView
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
            patterns: this.props.patterns,
            dataSource: dataSource.cloneWithRows([]),
        };

        this.props.setRightProps({updatePatterns: this.updatePatterns.bind(this)});

    }

    updatePatterns(response) {
        if (response != null){
            this.state.patterns.push(response);
            var dataSource = new ListView.DataSource(
                {rowHasChanged: (r1, r2) => !r1.productnum.equals(r2.productnum)}
            );

            this.setState(
                {dataSource: dataSource.cloneWithRows(this.state.patterns)}
            );
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
        return (
        <View>
            <View style = {styles.topRow}>
                <View style = {styles.itemColumn}><Text style = {styles.itemText}>Item</Text></View>
                <View style = {styles.priceColumn}><Text style = {styles.categoryText}>Price</Text></View>
                <View style = {styles.quantityColumn}><Text style = {styles.categoryText}>Qty.</Text></View>
            </View>
            <ListView style = {styles.listView}
                dataSource = {this.state.dataSource}
                renderRow = {this.renderRow.bind(this)}/>
        </View>
        );
    }
}

var styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1.5,
        borderColor: '#800000',
        backgroundColor: '#fff2f2'
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
        flex: 0.25,
    },
    quantityColumn: {
        flex: 0.15,
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
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 3,
    },
    productNumText: {
        fontSize: 14,
        marginTop: 3
    },
    colorLabel: {
        fontSize: 13,
        fontWeight: 'bold',
        marginLeft: 10,
        marginBottom: 3,
    },
    productColorText: {
        fontSize: 13,
        fontStyle: 'italic',
        marginBottom: 3,
    },
    productInfo: {
        marginTop: 3,
    }

});

module.exports = ShoppingCart;

