'use strict';

var React = require('react-native');

var {
	StyleSheet,
	Text,
	TextInput,
	View,
	TouchableHighlight,
	Component,
	ScrollView
} = React;

var styles = StyleSheet.create({
	textInput: {
        height: 30,
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
    },
    addButton: {
        height: 36,
        //flex: 1,
        //flexDirection: 'row',
        backgroundColor: '#800000',
        borderColor: '#800000',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        marginRight: 25,
        marginLeft: 25,
        marginTop: 15,
        alignSelf: 'stretch',
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
    	fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    error: {
        fontSize: 12,
        color: 'red',
        marginBottom: 0,
        alignSelf: 'flex-start',
        marginLeft: 25
    },
});

class ManualAddPage extends Component{
	constructor(props){
		super(props);
		this.state = {
			productNum: '',
			productName: '',
			color: '',
			price: '',
			failedEntry: false
		}
	}

	render(){
		var errorMessage = this.state.failedEntry ? 
            (<Text style = {styles.error}>*All fields must be filled out</Text>):
            (<View/>);

		return(
			<View>
				<ScrollView
					keyboardShouldPersistTaps = {true}>
					{errorMessage}
					<TextInput
						style = {styles.textInput}
						placeholder = 'Product Number'
						value = {this.state.productNum}
						returnKeyType = 'next'
						onChange = {this.productNumChanged.bind(this)}
						onSubmitEditing = {() => this.productName.focus()}/>
					<TextInput
						style = {styles.textInput}
						ref = {(ref) => this.productName = ref}
						placeholder = 'Product Name'
						value = {this.state.productName}
						returnKeyType = 'next'
						onChange = {this.productNameChanged.bind(this)}
						onSubmitEditing = {() => this.color.focus()}/>
					<TextInput
						style = {styles.textInput}
						ref = {(ref) => this.color = ref}
						placeholder = 'Color'
						value = {this.state.color}
						returnKeyType = 'next'
						onChange = {this.colorChanged.bind(this)}
						onSubmitEditing = {() => this.price.focus()}/>
					<TextInput
						style = {styles.textInput}
						ref = {(ref) => this.price = ref}
						placeholder = 'Price'
						value = {this.state.price}
						onChange = {this.priceChanged.bind(this)}
						onSubmitEditing = {this.onAddPressed.bind(this)}/>
				</ScrollView>
				<TouchableHighlight
	                style = {styles.addButton}
	                underlayColor = '#4d0000'
	                onPress = {this.onAddPressed.bind(this)}>
	                <Text style = {styles.buttonText}>Add</Text>
	            </TouchableHighlight>
            </View>
		);
	}

	onAddPressed(){
		//console.log(this.props);
		if (this.state.productName !== '' && this.state.productNum !== '' && this.state.color !== '' && this.state.price !== ''){
			var JSONproduct = {
				"name": this.state.productName,
				"productnum": this.state.productNum,
				"color": this.state.color,
				"price": this.state.price
			};
			this.props.updatePatterns(JSONproduct);
			this.props.toBack();
		}else{
			this.setState({failedEntry: true});
		}
	}

	//Event Handlers
	productNumChanged(event) {
        this.setState({ productNum: event.nativeEvent.text });
    }
    productNameChanged(event) {
        this.setState({ productName: event.nativeEvent.text });
    }
    colorChanged(event) {
        this.setState({ color: event.nativeEvent.text });
    }
    priceChanged(event) {
        this.setState({ price: event.nativeEvent.text });
    }
}

module.exports = ManualAddPage;