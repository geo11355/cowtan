'use strict';

var React = require('react-native');
var Router = require('react-native-simple-router');
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
  },
  header: {
    backgroundColor: '#800000'
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
    }, 500);
  }

  setTimePassed(){
    this.setState({timePassed: true});
  }

  render() {
      return (
        <Router
          firstRoute = {{
            component: LoginPage,
            name: 'Sign In',
          }}
          headerStyle = {styles.header}/>
      );
  }
}

AppRegistry.registerComponent('cowtan', () => CowtanApp);
