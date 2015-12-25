/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var LoginPage = require('./ios/loginPage');
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
  render() {
    return (
      <NavigatorIOS
        style = {styles.container}
        initialRoute = {{
          title: 'Sign In',
          component: LoginPage
        }}/>
    );
  }
}

AppRegistry.registerComponent('cowtan', () => CowtanApp);
