import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import DoneList from '../components/DoneList';
import Searchbar from '../components/SearchBar';
import FlatListDone from '../components/FlatListDone'


export default function LinksScreen() {
  return (
    <View style={styles.container}>
      {/**
       * Go ahead and delete ExpoLinksView and replace it with your content;
       * we just wanted to provide you with some helpful links.
       */}
       <FlatListDone/>
    </View>
  );
}

LinksScreen.navigationOptions = {
  title: 'Verified',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
