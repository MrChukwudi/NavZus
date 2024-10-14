


/*
npm install @react-navigation/native @react-navigation/drawer @react-navigation/bottom-tabs @react-navigation/native-stack zustand react-native-screens react-native-safe-area-context react-native-reanimated react-native-gesture-handler






/src
  /navigation
    AppNavigator.js
  /screens
    HomeScreen.js
    RegisterScreen.js
    ProductListScreen.js
    ProductDetailScreen.js
    ProductPurchaseScreen.js
    ReceiptScreen.js
    CreateProductScreen.js
  /store
    useStore.js
  /models
    User.js
    Product.js









app.js setUp:


    // App.js
import React from 'react';
import { SafeAreaView } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppNavigator />
    </SafeAreaView>
  );
};

export default App;




AppNavigator:

// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ProductPurchaseScreen from '../screens/ProductPurchaseScreen';
import ReceiptScreen from '../screens/ReceiptScreen';
import CreateProductScreen from '../screens/CreateProductScreen';

// Create navigators
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Register" component={RegisterScreen} />
    </Tab.Navigator>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Tabs" component={TabNavigator} />
      <Drawer.Screen name="ProductList" component={ProductListScreen} />
      <Drawer.Screen name="Receipt" component={ReceiptScreen} />
      <Drawer.Screen name="CreateProduct" component={CreateProductScreen} />
    </Drawer.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Drawer" component={DrawerNavigator} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="ProductPurchase" component={ProductPurchaseScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;







SCREENS:

Home Screen:

// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Button title="Go to Product List" onPress={navigateToProductList} />
    </View>
  );
};

// Standalone function to navigate to Product List
const navigateToProductList = (navigation) => {
  navigation.navigate('ProductList');
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;


Register Screen:

// src/screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import useStore from '../store/useStore';

const RegisterScreen = ({ navigation }) => {
  const addUser = useStore((state) => state.addUser);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleRegister = () => {
    addUser(name, email, age, phoneNumber);
    // Navigate back to Home after registration
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        style={styles.input}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});

export default RegisterScreen;




ProductListScreen:

// src/screens/ProductListScreen.js
import React from 'react';
import { View, FlatList, Text, Button, StyleSheet } from 'react-native';
import useStore from '../store/useStore';

const ProductListScreen = ({ navigation }) => {
  const products = useStore((state) => state.products);

  const renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <Text style={styles.productName}>{item.name}</Text>
      <Button title="View Details" onPress={() => navigateToProductDetail(item, navigation)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.name} // Unique key for each product
      />
    </View>
  );
};

// Standalone function to navigate to Product Detail
const navigateToProductDetail = (product, navigation) => {
  navigation.navigate('ProductDetail', { product });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  productContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductListScreen;



Product Detal Screen:

// src/screens/ProductDetailScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params; // Get the product passed from Product List

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.name}</Text>
      <Text>Category: {product.category}</Text>
      <Text>Price: ${product.price}</Text>
      <Button title="Purchase" onPress={() => navigateToProductPurchase(navigation)} />
    </View>
  );
};

// Standalone function to navigate to Product Purchase
const navigateToProductPurchase = (navigation) => {
  navigation.navigate('ProductPurchase');
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ProductDetailScreen;


Product Purchase Screen:

// src/screens/ProductPurchaseScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import useStore from '../store/useStore';

const ProductPurchaseScreen = ({ navigation }) => {
  const addReceipt = useStore((state) => state.addReceipt);

  const handlePurchase = () => {
    // Mock receipt for now
    const receipt = {
      product: 'Sample Product',
      date: new Date().toLocaleDateString(),
    };
    addReceipt(receipt);
    navigation.navigate('Receipt');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Purchase</Text>
      <Button title="Confirm Purchase" onPress={handlePurchase} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ProductPurchaseScreen;


ReceiptScreen:

// src/screens/ReceiptScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import useStore from '../store/useStore';

const ReceiptScreen = () => {
  const receipts = useStore((state) => state.receipts);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Receipts</Text>
      <FlatList
        data={receipts}
        renderItem={({ item }) => (
          <View style={styles.receiptContainer}>
            <Text>Product: {item.product}</Text>
            <Text>Date: {item.date}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()} // Use index as key
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  receiptContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default ReceiptScreen;




Create Product Screen:

// src/screens/CreateProductScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import useStore from '../store/useStore';

const CreateProductScreen = ({ navigation }) => {
  const addProduct = useStore((state) => state.addProduct);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');

  const handleCreateProduct = () => {
    addProduct(name, category, parseFloat(price)); // Parse price to float
    navigation.navigate('ProductList');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Product</Text>
      <TextInput
        placeholder="Product Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />
      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        style={styles.input}
        keyboardType="numeric"
      />
      <Button title="Create Product" onPress={handleCreateProduct} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});

export default CreateProductScreen;



Zustand SetUp:

// src/store/useStore.js
import create from 'zustand';
import { User } from '../models/User';
import { Product } from '../models/Product';

const useStore = create((set) => ({
  userList: [],
  products: [],
  receipts: [],
  
  // Add a user to the store
  addUser: (name, email, age, phoneNumber) => set((state) => ({
    userList: [...state.userList, new User(name, email, age, phoneNumber)],
  })),

  // Add a product to the store
  addProduct: (name, category, price) => set((state) => ({
    products: [...state.products, new Product(name, category, price)],
  })),

  // Get a product by ID
  getProduct: (id) => {
    const state = get();
    return state.products[id]; // Assuming ID is the index here for simplicity
  },

  // Add a receipt (simplified for example)
  addReceipt: (receipt) => set((state) => ({
    receipts: [...state.receipts, receipt],
  })),
}));

export default useStore;







Using Zustand in screens:

import React from 'react';
import { View, FlatList, Text, Button } from 'react-native';
import useStore from '../store/useStore';

const ProductListScreen = ({ navigation }) => {
  const products = useStore(state => state.products);
  
  return (
    <View>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Button title="View Details" onPress={() => navigateToProductDetail(item.id, navigation)} />
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

// Standalone function to navigate
const navigateToProductDetail = (id, navigation) => {
  navigation.navigate('ProductDetail', { id });
};

export default ProductListScreen;



Product Model:

// src/models/Product.js
export class Product {
  constructor(name, category, price) {
    this.name = name; // Product name
    this.category = category; // Product category
    this.price = price; // Product price
  }
}




User Model:

// src/models/User.js
export class User {
  constructor(name, email, age, phoneNumber) {
    this.name = name; // User's name
    this.email = email; // User's email
    this.age = age; // User's age
    this.phoneNumber = phoneNumber; // User's phone number
  }
}









*/