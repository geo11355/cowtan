/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var LoginPage = require('./ios/loginPage');
var LoadingPage = require('./ios/loadingPage');

var {
  Component,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} = React;

var styles = StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
  container: {
    flex: 1
  }
});


class CowtanApp extends Component {
  constructor(props){
    super(props);
    this.state = {
      timePassed: false
    };
  }

  componentDidMount(){
    setTimeout( () => {
      this.setTimePassed();
    }, 1500);
  }

  setTimePassed(){
    this.setState({timePassed: true});
  }

  render() {
    if (!this.state.timePassed){
      return <LoadingPage/>;
    }else{
      return (
        <NavigatorIOS
          style = {styles.container}
          initialRoute = {{
            component: LoginPage,
            title: 'Sign In',
          }}/>
      );
    }
  }
}

AppRegistry.registerComponent('cowtan', () => CowtanApp);
