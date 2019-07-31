import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator,createAppContainer } from 'react-navigation';

import Home from './screens/Home'
import Settings from './screens/Settings'
import adminLogin from './screens/Login/LoginAdmin2'
import signUpAdmin from './screens/SignUp/SignUpAdmin2'
class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: 'green',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  /* render function, etc */
}
const RootStack = createStackNavigator(
  {
    Main: {
      screen: Home
    },
    Setting: {
      screen: Settings
    },
    LoginAdmin: {
      screen: adminLogin
    },
    SignUpAdmin: {
      screen: signUpAdmin
    }
  },
  {
    initialRouteName: 'Main'
  },
  {
    defaultNavigationOptions: {
      //headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: 'red',
      },
    },
    navigationOptions: {
      tabBarLabel: 'Home!',
    },
  }

);

class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

export default createAppContainer(RootStack)