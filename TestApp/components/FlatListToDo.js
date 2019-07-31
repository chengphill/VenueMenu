import * as React from "react";
// import Searchbar from "../components/SearchBar";
import { ListItem, SearchBar } from "react-native-elements";

import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  SectionList,
  Text,
  TouchableOpacity,
  Platform,
  Button,
  Alert
} from "react-native";

import { Icon } from "react-native-elements";

export default class FlatListToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      dataSource: []
    };
    this.arrayholder = [];
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData = () => {
    this.setState({ loading: true });
    fetch("http://vm.projectwolverine.net/API/Views/VerifyInfo", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        responseJson = responseJson.map(item => {
          item.VID = 1;
          item.isSelect = false;
          item.selectedClass = styles.list;
          return item;
        });
        this.setState({
          loading: false,
          dataSource: responseJson
        });
        this.arrayholder = responseJson;
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };
  FlatListItemSeparator = () => <View style={styles.line} />;
  selectItem = data => {
    data.item.isSelect = !data.item.isSelect;
    data.item.selectedClass = data.item.isSelect
      ? styles.selected
      : styles.list;
    const index = this.state.dataSource.findIndex(
      item => data.item.CID === item.CID
    );
    this.state.dataSource[index] = data.item;
    this.setState({
      dataSource: this.state.dataSource
    });
  };

  updateVerify = () => {
    const send = this.state.dataSource.filter(item => item.isSelect);
    var test = {};
    for (var i = 0; i < send.length; i++) {
      var ID = send[i].stallName;
      test = {
        VID: send[i].VID,
        CID: send[i].CID
      };
    }
    // console.log("THIS send:\n" + test + "\n\nTHIS RES:\n");
    // var test3 = send;
    // var VID = {"VID": 1};
    // test3.push({VID});
    // var test2 = typeof test3;
    // // test3["VID"] = '1';
    // var test4 = JSON.stringify(test3);
    // console.log("test2 type: " + test2 + "\ntest4 JSON: " + JSON.stringify(test4) +"\n" );
    if (send.length > 0) {
      console.log("THIS send:\n" + test);
      this.setState({ loading: true });
      fetch("http://vm.projectwolverine.net/API/Administration/Verify", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(test)
      })
        .then(response => console.log("\n\nTHIS RES:\n" + response))
        .then(this.componentDidMount());
    } else {
      this.componentDidMount();
    }
  };

  searchFilterFunction = text => {
    this.setState({
      value: text
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.stallName.toUpperCase()} ${item.firstName.toUpperCase()} ${item.lastName.toUpperCase()} ${item.stall.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData
    });
  };

  renderItem = data => (
    <TouchableOpacity
      style={[styles.list, data.item.selectedClass]}
      onPress={() => this.selectItem(data)}
    >
      <Text style={styles.lightText}>{data.item.stall} </Text>
      <Text style={styles.lightText2}>
        {data.item.firstName} {data.item.lastName}
      </Text>
      <Text style={styles.lightText2}>{data.item.stallName}</Text>
    </TouchableOpacity>
  );
  render() {
    const itemNumber = this.state.dataSource.filter(item => item.isSelect)
      .length;
    const checkedIn = this.state.dataSource.filter(x => x.present === 1 && x.verified === 0);
    const notCheckedIn = this.state.dataSource.filter(x => x.present === 0 && x.verified === 0);

    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="purple" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <SearchBar
          placeholder="Search"
          lightTheme
          round
          onChangeText={text => this.searchFilterFunction(text)}
          autoCorrect={false}
          value={this.state.value}
        />
        <Text style={styles.title}>Stalls To Be Verified</Text>
        <SectionList
          sections={[
            {title: 'Client - Checked In', data: checkedIn},
            {title: 'Client - Not Checked In', data: notCheckedIn}
          ]}
          renderSectionHeader={ ({section}) => <Text style={styles.SectionHeader}> { section.title } </Text> }
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={item => this.renderItem(item)}
          keyExtractor={item => item.SID.toString()}
          extraData={this.state}
        />
        <View style={styles.numberBox}>
          <Text style={styles.number}>{itemNumber}</Text>
        </View>
        <TouchableOpacity style={styles.icon}>
          <View>
            <Icon
              raised
              name="done-all"
              type="font-done"
              size={30}
              onPress={() => this.updateVerify()}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#99ff99",
    paddingVertical: 20,
    position: "relative"
  },
  title: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 3,
    borderBottomColor: "#fff"
  },
  SectionHeader:{
    backgroundColor : '#29d9a1',
    fontSize : 20,
    color: '#fff',
 },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  list: {
    borderBottomWidth: 3,
    borderBottomColor: "#fff",
    paddingVertical: 30,
    margin: 3,
    flexDirection: "row",
    backgroundColor: "#21c28f",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: -1
  },
  lightText: {
    color: "#f7f7f7",
    fontSize: 15,
    width: 30,
    flexWrap: "wrap"
  },
  lightText2: {
    color: "#f7f7f7",
    fontSize: 15,
    width: 125,
    flexWrap: "wrap"
  },
  line: {
    height: 0.5,
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.5)"
  },
  icon: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    left: 250,
    zIndex: 1
  },
  numberBox: {
    position: "absolute",
    bottom: 49,
    width: 30,
    height: 30,
    borderRadius: 15,
    left: 250,
    zIndex: 3,
    backgroundColor: "#e3e3e3",
    justifyContent: "center",
    alignItems: "center"
  },
  number: { fontSize: 14, color: "#000" },
  selected: { backgroundColor: "#FA7B5F" }
});
