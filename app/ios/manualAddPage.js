'use strict';

var React = require('react-native');
var KeyboardHandler = require('./keyboardHandler');

var {
	StyleSheet,
	Text,
	TextInput,
	View,
	TouchableHighlight,
	Component,
	ScrollView,
	Alert
} = React;

var styles = StyleSheet.create({
	inputRow: {
		flexDirection: 'row',
		marginTop: 20,
		alignItems: 'flex-end',
	},
	rowPlaceholder: {
		flex: 0.075,
	},
	rowStaticText: {
		flex: 0.27,
		borderBottomWidth: 1,
		borderColor: '#800000', 
	},
	staticText: {
		marginBottom: 6.2,
		fontSize: 16,
	},
	priceRowInput: {
		flex: 0.2,
		borderBottomWidth: 1,
		borderColor: '#800000',
		flexDirection: 'column',
		justifyContent: 'flex-end',
	},
	rowInput: {
		flex: 0.7,
		borderBottomWidth: 1,
		borderColor: '#800000',
		flexDirection: 'column',
		justifyContent: 'flex-end',
	},
	textInput: {
        height: 30,
        //padding: 4,
        marginRight: 25,
        marginLeft: 15,
        flex: 1,
        fontSize: 18,
        //borderWidth: 1,
        //borderColor: '#800000',
        color: 'black',
        alignSelf: 'stretch'
    },
    priceRowTextInput: {
    	height: 30,
        //padding: 4,
        marginRight: 5,
        marginLeft: 15,
        flex: 1,
        fontSize: 18,
        //borderWidth: 1,
        //borderColor: '#800000',
        color: 'black',
        alignSelf: 'stretch'
    },
    overTenPlaceholder: {
    	flex: 0.5
    },
    overTenText: {
    	fontSize: 18
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
        marginTop: 34,
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
			
				<KeyboardHandler
					keyboardShouldPersistTaps = {true}>
					<View style = {styles.inputRow}>
						<View style = {styles.rowPlaceholder}/>
						<View style = {styles.rowStaticText}>
							<Text style = {styles.staticText}>Product #: </Text>
						</View>
						<View style = {styles.rowInput}>
							<TextInput
							style = {styles.textInput}
							placeholder = 'Ex: 11335-03'
							value = {this.state.productNum}
							returnKeyType = 'next'
							onChange = {this.productNumChanged.bind(this)}
							onSubmitEditing = {() => this.productName.focus()}/>
						</View>
						<View style = {styles.rowPlaceholder}/>
					</View>

					<View style = {styles.inputRow}>
						<View style = {styles.rowPlaceholder}/>
						<View style = {styles.rowStaticText}>
							<Text style = {styles.staticText}>Name: </Text>
						</View>
						<View style = {styles.rowInput}>
							<TextInput
								style = {styles.textInput}
								ref = {(ref) => this.productName = ref}
								placeholder = 'Ex: Alligator'
								value = {this.state.productName}
								returnKeyType = 'next'
								onChange = {this.productNameChanged.bind(this)}
								onSubmitEditing = {() => this.color.focus()}/>
						</View>
						<View style = {styles.rowPlaceholder}/>
					</View>

					<View style = {styles.inputRow}>
						<View style = {styles.rowPlaceholder}/>
						<View style = {styles.rowStaticText}>
							<Text style = {styles.staticText}>Color: </Text>
						</View>
						<View style = {styles.rowInput}>
							<TextInput
							style = {styles.textInput}
							ref = {(ref) => this.color = ref}
							placeholder = 'Ex: Aqua'
							value = {this.state.color}
							returnKeyType = 'next'
							onChange = {this.colorChanged.bind(this)}
							onSubmitEditing = {() => this.price.focus()}/>
						</View>
						<View style = {styles.rowPlaceholder}/>
					</View>

					<View style = {styles.inputRow}>
						<View style = {styles.rowPlaceholder}/>
						<View style = {styles.rowStaticText}>
							<Text style = {styles.staticText}>Price: </Text>
						</View>
						<View style = {styles.rowInput}>
							<TextInput
							style = {styles.textInput}
							ref = {(ref) => this.price = ref}
							placeholder = 'Ex: 37/10'
							value = {this.state.price}
							onChange = {this.priceChanged.bind(this)}
							onSubmitEditing = {this.onAddPressed.bind(this)}/>
						</View>
						<View style = {styles.rowPlaceholder}/>
					</View>
	
					<TouchableHighlight
		                style = {styles.addButton}
		                underlayColor = '#4d0000'
		                onPress = {this.onAddPressed.bind(this)}>
		                <Text style = {styles.buttonText}>Add</Text>
		            </TouchableHighlight>
	            </KeyboardHandler>
            
		);
	}

	onAddPressed(){
		//console.log(this.props);
		if (this.state.productName === '' || this.state.productNum === '' || this.state.color === '' || this.state.price === ''){
			Alert.alert('All fields must be filled out.', null);
		}else if (this.state.price.match(/[a-z]/i)){
			Alert.alert('Invalid Price', 'Price field should have no letters.');
		}else{
			var JSONproduct = {
				"name": this.state.productName,
				"productnum": this.state.productNum,
				"color": this.state.color,
				"price": this.state.price
			};
			this.props.updatePatterns(JSONproduct);
			this.props.toBack();
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