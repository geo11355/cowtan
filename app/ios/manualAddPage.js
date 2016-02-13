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
	Alert,
	ActivityIndicatorIOS
} = React;

function generateUrl(productNum) {
   return 'http://cowtandb.com/inventory.php?productnum=' + productNum;
};

var styles = StyleSheet.create({
	titleContainer: {
        marginTop: 10,
        borderBottomWidth: 1.5,
    },
    formContainer: {
        backgroundColor: '#f6f4f4',
        //borderBottomWidth: 1.5,
        //borderColor: '#b9b6b6',
        //marginBottom: 20,
        shadowRadius: 4,
        shadowOpacity: 0.8,
        shadowColor: 'gray',
        shadowOffset: {
            width: 2,
            height: 2
        }
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 5
    },
	inputRow: {
		flexDirection: 'row',
        marginTop: 15,
        alignItems: 'flex-end',
        marginBottom: 15
	},
	rowPlaceholder: {
		flex: 0,
	},
	rowStaticText: {
		//flex: 0.27,
        marginLeft: 10
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
        //borderBottomWidth: 1,
        //borderColor: '#800000',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: 'white',
        borderRadius: 6,
        borderColor: '#b9b6b6',
        marginRight: 25,
        borderWidth: 1,
        marginLeft: 5
	},
	textInput: {
        height: 30,
        //padding: 4,
        marginRight: 5,
        marginLeft: 5,
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
			failedEntry: false,
			isLoading: false,
		}
	}

	render(){
		var errorMessage = this.state.failedEntry ? 
            (<Text style = {styles.error}>*All fields must be filled out</Text>):
            (<View/>);

        var addButton = this.state.isLoading ?
            (<TouchableHighlight
                style = {styles.addButton}
                underlayColor = '#4d0000'>
                <View>
                    <ActivityIndicatorIOS
                        size = 'small'/>
                </View>
            </TouchableHighlight>):
            (<TouchableHighlight
                style = {styles.addButton}
                underlayColor = '#4d0000'
                onPress = {this.onAddPressed.bind(this)}>
                <Text style = {styles.buttonText}>Add</Text>
            </TouchableHighlight>);

		return(
			
				<KeyboardHandler
					keyboardShouldPersistTaps = {true}>
					<View style = {styles.titleContainer}>
                    	<Text style = {styles.title}>Manually Add Item</Text>
                	</View>
                	<View style = {styles.formContainer}>
						<View style = {styles.inputRow}>
							<View style = {styles.rowPlaceholder}/>
							<View style = {styles.rowStaticText}>
								<Text style = {styles.staticText}>Product Number: </Text>
							</View>
							<View style = {styles.rowInput}>
								<TextInput
								style = {styles.textInput}
								placeholder = 'Ex: 11335-03'
								value = {this.state.productNum}
								returnKeyType = 'next'
								onChange = {this.productNumChanged.bind(this)}
								onSubmitEditing = {this.onAddPressed.bind(this)}/>
							</View>
							<View style = {styles.rowPlaceholder}/>
						</View>
					</View>


					{/*
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
					*/}
	
					{/*<TouchableHighlight
		                style = {styles.addButton}
		                underlayColor = '#4d0000'
		                onPress = {this.onAddPressed.bind(this)}>
		                <Text style = {styles.buttonText}>Add</Text>
		            </TouchableHighlight>*/}
		            {addButton}
	            </KeyboardHandler>
            
		);
	}

	onAddPressed(){
		this.setState({isLoading: true});
		var JSONproduct = {
			"name": this.state.productName,
			"productnum": this.state.productNum,
			"color": this.state.color,
			"price": this.state.price
		};

		fetch(generateUrl(JSONproduct.productnum))
		  .then(response => response.json())
		  .then(json => this.props.updatePatterns(json))
		  .then(this.props.toBack)
		  .catch(error => {
		  	Alert.alert('Fetch failed', 'error');
		  	this.setState({isLoading: false});
		  });
	}

	//Event Handlers
	productNumChanged(event) {
        this.setState({ productNum: event.nativeEvent.text });
    }
    // productNameChanged(event) {
    //     this.setState({ productName: event.nativeEvent.text });
    // }
    // colorChanged(event) {
    //     this.setState({ color: event.nativeEvent.text });
    // }
    // priceChanged(event) {
    //     this.setState({ price: event.nativeEvent.text });
    // }
}

module.exports = ManualAddPage;