'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
    ActivityIndicatorIOS,
    Image,
    Component
} = React;

var styles = StyleSheet.create({

});

class ShoppingCart extends Component {
    // Constructor stores dataSource that implements a comparator 
    constructor(props) {
        super(props);
        var dataSource = new ListView.DataSource(
            {rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = dataSource.cloneWithRows(this.props.cart);
    }

    // Function for rendering each individual row
    renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableHighlight
                underlayColor='#dddddd'>
                <View>
                  <Text>{rowData.title}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    // Pass render row to another function
    render() {
        <ListView
            dataSource = {this.state.dataSource}
            renderRow = {this.renderRow.bind(this)}/>
    }
}

module.exports = ShoppingCart;

