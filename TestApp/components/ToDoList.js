// import * as React from "react";
// import { List, Colors } from "react-native-paper";
// import data from "./test.json";

// import {
//   StyleSheet,
//   View,
//   ListView,
//   Image,
//   Text,
//   AppRegistry
// } from "react-native";

// const customData = data.filter(x => x.verified === 0);

// export default class ToDoList extends React.Component {
//   constructor(props) {
//     super(props);
//     var ds = new ListView.DataSource({
//       rowHasChanged: (r1, r2) => r1 !== r2
//     });

//     this.state = {
//       dataSource: ds.cloneWithRows(customData)
//     };
//   }

//   renderRow(Information) {
//     return (
//       <View style={styles.row}>
//         <View style={styles.info}>
//           <Text style={styles.items}>{Information.stallName}</Text>
//           <Text style={styles.address}>
//             {Information.firstName} {Information.lastName}
//           </Text>
//         </View>
//         <View style={styles.total}>
//           <Text style={styles.date}>{Information.present}</Text>
//           <Text style={styles.price}>{Information.verified}</Text>
//         </View>
//       </View>
//     );
//   }
//   render() {
//     return (
//       <View style={styles.mainContainer}>
//         <ListView
//           dataSource={this.state.dataSource}
//           renderRow={this.renderRow}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     backgroundColor: "#fff"
//   },
//   row: {
//     borderColor: "#f1f1f1",
//     borderBottomWidth: 5,
//     flexDirection: "row",
//     marginLeft: 10,
//     marginRight: 10,
//     paddingTop: 20,
//     paddingBottom: 20
//   },
//   icon: {
//     tintColor: "#fff",
//     height: 22,
//     width: 22
//   },
//   info: {
//     flex: 1,
//     paddingLeft: 25,
//     paddingRight: 25
//   },
//   items: {
//     fontWeight: "bold",
//     fontSize: 16,
//     marginBottom: 5
//   },
//   address: {
//     color: "#ccc",
//     fontSize: 14
//   },
//   total: {
//     width: 80
//   },
//   date: {
//     fontSize: 12,
//     marginBottom: 5
//   },
//   price: {
//     color: "#1cad61",
//     fontSize: 25,
//     fontWeight: "bold"
//   }
// });
