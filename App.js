/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {useState} from 'react';
 import type {Node} from 'react';
 import {
   SafeAreaView,
   StyleSheet,
   Text,
   TextInput,
   View,
   Button,
 } from 'react-native';
 
 
 const App: () => Node = () => {
 
   const [value, onChangeTrnxValue] = useState(null);
   const [address, onChangeAdderess] = useState(null);
 
   const checkTextInputValues = () => {
     if (!value) {
       alert('Please Enter Trnx Value');
       return;
     }
     if (!address) {
       alert('Please Enter Address');
       return;
     }
 
     alert('Success');
   };
 
   return (
     <SafeAreaView style={styles.container}>
       <Text style={styles.titleText}>React Native X Ethereum</Text>
       <Text style={styles.descText}>Enter trnx (eth) value</Text>
       <TextInput
         style={styles.input}
         onChangeText={onChangeTrnxValue}
         value={value}
         placeholder="Value of trnx"
         keyboardType="numeric"
       />
       <Text style={styles.descText}>Enter Address</Text>
       <TextInput
         style={styles.multiLineInput}
         multiline
         numberOfLines={2}
         onChangeText={onChangeAdderess}
         value={address}
         placeholder="Address"
       />
       <View style={styles.buttonWrapper}>
         <Button
           title="Submit"
           onPress={checkTextInputValues}
         />
       </View>
     </SafeAreaView>
   );
 };
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     padding: 10,
   },
   titleText: {
     fontSize: 20,
     fontWeight: "bold",
     alignSelf: 'center',
   },
   descText:{
     fontSize: 16,
     margin:10
   },
   input: {
     height: 50,
     marginHorizontal: 10,
     borderWidth: 1,
     padding: 10,
   },
   multiLineInput:{
     marginHorizontal: 10,
     borderWidth: 1,
     padding: 10,
   }, 
   buttonWrapper: {
     width: 100,
     margin: 20,
     alignSelf: 'center'
   }
 });
 
 export default App;
 