import React, { useState } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  Modal,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Searchbar } from "react-native-paper";

export let itemList = [];
let modalItem = "";

const Search = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  return (
    <View style={{ paddingHorizontal: 7, paddingVertical: 7 }}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{
          backgroundColor: "#fff",
          shadowColor: "black",
          shadowOffset: { width: -2, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        }}
      />
    </View>
  );
};

const listTab = [
  {
    category: "All",
    image: require("../assets/images/All_Text.png"),
  },
  {
    category: "Patties",
    image: require("../assets/images/Krabby_Patty.png"),
  },
  {
    category: "Meals",
    image: require("../assets/images/KK_Meal.png"),
  },
  {
    category: "Drinks",
    image: require("../assets/images/KK_Soda.png"),
  },
  {
    category: "Sides",
    image: require("../assets/images/KK_Sides.png"),
  },
];

const data = [
  {
    id: 1,
    name: "Krabby Patty",
    price: 1.25,
    category: "Patties",
    image: require("../assets/images/KrabbyPatty.png"),
  },
  {
    id: 2,
    name: "Double Krabby Patty",
    price: 2.0,
    category: "Patties",
    image: require("../assets/images/Deluxe_Krabby_Patty.png"),
  },
  {
    id: 3,
    name: "Triple Krabby Patty",
    price: 3.0,
    category: "Patties",
    image: require("../assets/images/Logo.png"),
  },
  {
    id: 4,
    name: "Coral Bits",
    price: 1.0,
    category: "Sides",
    image: require("../assets/images/Coral_Bits.png"),
  },
  {
    id: 5,
    name: "Kelp Rings",
    price: 1.5,
    category: "Sides",
    image: require("../assets/images/KrabbyPatty.png"),
  },
  {
    id: 6,
    name: "Krabby Meal",
    price: 3.5,
    category: "Meals",
    image: require("../assets/images/KrabbyPatty.png"),
  },
  {
    id: 7,
    name: "Double Krabby Meal",
    price: 3.75,
    category: "Meals",
    image: require("../assets/images/KrabbyPatty.png"),
  },
  {
    id: 8,
    name: "Triple Krabby Meal",
    price: 4.0,
    category: "Meals",
    image: require("../assets/images/KrabbyPatty.png"),
  },
  {
    id: 9,
    name: "Salty Sea Dog",
    price: 1.25,
    category: "Meals",
    image: require("../assets/images/KrabbyPatty.png"),
  },
  {
    id: 10,
    name: "Sailors Surprise",
    price: 3.0,
    category: "Meals",
    image: require("../assets/images/KrabbyPatty.png"),
  },
  {
    id: 11,
    name: "Kelp Shake",
    price: 2.0,
    category: "Drinks",
    image: require("../assets/images/KrabbyPatty.png"),
  },
  {
    id: 12,
    name: "Seafoam Soda",
    price: 1.0,
    category: "Drinks",
    image: require("../assets/images/KrabbyPatty.png"),
  },
];

const MenuPage = () => {
  const [count, setCount] = useState(0);
  const [category, setStatus] = useState("All");
  const [datalist, setDataList] = useState(data);

  const setStatusFilter = (category) => {
    if (category !== "All") {
      setDataList([...data.filter((e) => e.category === category)]);
    } else {
      setDataList(data);
    }
    setStatus(category);
  };
  const renderItem = ({ item, index }) => {
    return (
      <View key={index} style={styles.itemContainer}>
        <View style={styles.itemLogo}>
          {/*<Image
            style={styles.itemImage}
            source={item.image}
    />*/}
        </View>
        <View style={styles.itemBody}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text>${item.price}</Text>
        </View>
        <MaterialCommunityIcons
          name="plus"
          size={25}
          style={{ alignSelf: "center", marginRight: 40 }}
          onPress={() => {
            itemList.push(item.name);
            modalItem = item.name;
            console.log(itemList);
            setModalVisible(true);
            {
              setCount(count + item.price);
            }
          }}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <MaterialCommunityIcons
                name="close"
                size={25}
                style={{
                  verticalAlign: "top",
                  alignSelf: "flex-end",
                  position: "absolute",
                  paddingRight: 20,
                  paddingTop: 20,
                  color: "white",
                }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              />
              <Text style={styles.modalText}>{modalItem} added to order</Text>
            </View>
          </View>
        </Modal>
      </View>
    );
  };
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={require("../assets/images/Logo.png")}
            style={{ width: 80, height: 80 }}
          />
        </View>
        <Search />
        <View style={styles.listTab}>
          {listTab.map((e) => (
            <TouchableOpacity
              style={[
                styles.btnTab,
                category === e.category && styles.btnTabActive,
              ]}
              onPress={() => setStatusFilter(e.category)}
            >
              <Text
                style={
                  (styles.textTab,
                  category === e.category && styles.textTabActive)
                }
              >
                {/* {e.category}*/}
              </Text>
              <Image style={styles.itemImage} source={e.image} />
            </TouchableOpacity>
          ))}
        </View>
        <FlatList
          style={styles.items}
          data={datalist}
          keyExtractor={(e, i) => i.toString()}
          renderItem={renderItem}
        />
        <Text>{count}</Text>  
      </ScrollView>
    </SafeAreaView>
  );
};

export default MenuPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  listTab: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 3,
  },
  btnTab: {
    width: Dimensions.get("window").width / 6,
    flexDirection: "row",
    backgroundColor: "#fff",
    shadowColor: "black",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    padding: 10,
    margin: 5,
    justifyContent: "center",
    borderRadius: 10,
  },
  textTab: {
    fontSize: 16,
  },
  btnTabActive: {
    backgroundColor: "#F8EACB",
  },
  textTabActive: {
    color: "black",
  },
  itemContainer: {
    flexDirection: "row",
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 3,
    shadowColor: "black",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  itemImage: {
    width: 35,
    height: 35,
  },
  itemBody: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  itemName: {
    fontSize: 18,
  },
  itemStatus: {
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: "20.2%",
  },
  modalView: {
    backgroundColor: "#06a94d",
    padding: 20,
    alignItems: "center",
  },
  modalText: {
    textAlign: "center",
    fontSize: 16,
    color: "white",
  },
  button: {
    borderRadius: 20,
    elevation: 2,
  },
});
