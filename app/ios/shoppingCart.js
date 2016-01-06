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
    ListView
} = React;

var styles = StyleSheet.create({
    row: {
        flexDirection: 'row'
    },
    productInfo: {
        margin: 5,
    }
});

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
        if (response!=null){
            this.state.patterns.push(response);
            var dataSource = new ListView.DataSource(
                {rowHasChanged: (r1, r2) => r1.productnum !== r2.productnum}
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
                  <Text style = {styles.productInfo}>{rowData.productnum}</Text>
                  <Text style = {styles.productInfo}>{rowData.name}</Text>
                  <Text style = {styles.productInfo}>{rowData.color}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    // Pass render row to another function
    render() {
        return <ListView
            dataSource = {this.state.dataSource}
            renderRow = {this.renderRow.bind(this)}/>
    }
}

module.exports = ShoppingCart;

