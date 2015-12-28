'use strict';

var React = require('react-native');
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

});

class ShoppingCart extends Component {
    // Constructor stores dataSource that implements a comparator 
    constructor(props) {
        super(props);
        var dataSource = new ListView.DataSource(
            {rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = dataSource.cloneWithRows(['row1']);
    }

    // Function for rendering each individual row
    renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableHighlight
                underlayColor='#dddddd'>
                <View>
                  <Text>Hi</Text>
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

