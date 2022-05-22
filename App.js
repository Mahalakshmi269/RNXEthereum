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
   TouchableOpacity,
   Alert,
 } from 'react-native';
 import EthereumTx from 'ethereumjs-tx';
 import util from 'ethereumjs-util';
 import Web3 from 'web3';
 const web3 = new Web3();
 web3.setProvider(new web3.providers.HttpProvider('https://mainnet.infura.io/v3/5209c849762f40ce866e3b1332596997'));

 
 const App: () => Node = () => {
 
   const [amount, onChangeTrnxValue] = useState(null);
   const [ethAccount, setETHAccount] = useState(null);
   const [receiver, onChangeReceiver] = useState(undefined);

   const checkTextInputValues = () => {
     if (!value) {
       alert('Please Enter Trnx Value');
       return;
     }
     if (!address) {
       alert('Please Enter Address');
       return;
     }
   };

   createWallet = async () => {
    const account = await web3.eth.accounts.create();
    console.log(account);
    await setETHAccount({account});
    storeData();
  }

  storeData = async () => {
    try {
      await AsyncStorage.setItem('account', JSON.stringify(ethAccount));
      // this.props.checkWallet();
    } catch (error) {
      console.log(error);
    }
  };
 
  checkWallet = async () => {
    try {
      const value = await AsyncStorage.getItem('account');
      if (value == null) {
      } else {
        setETHAccount({ ethAccount: JSON.parse(value) }, () => {
          getETHBalance();
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  getETHBalance = async () => {
    let balance = await web3.eth.getBalance(ethAccount.address);
    balance = web3.utils.fromWei(balance, 'ether');
    console.log(`ETH Balance: ${balance}`);
    console.log(`ETH Balance: ${Number(balance).toFixed(3)}`);
    await this.setState({ ETHBalance: Number(balance).toFixed(3) });
  }

  const transferEther = () => {
    //Receiver and amount validations
    checkTextInputValues();

    // ETH address validation
    if (receiver === undefined || receiver.length !== 42 || web3.utils.isAddress(receiver) === false ) {
      Alert.alert(
        'Wrong Ethereum Address!',
        'The Ethereum address you entered is not valid!',
        [
          {text: 'OK', onPress: () => console.log("")},
        ]
      );
      return new Error('wrong address'); 
    }
    const privateKey = util.toBuffer(ethAccount.privateKey);
    let count = await web3.eth.getTransactionCount(ethAccount.address);
    let gasPriceGwei = 3;
    let gasLimit = 3000000;
    
    let newAmount = 1000000000000000000 * Number(amount)
    console.log(newAmount);

    let rawTransaction = {
      "from": ethAccount.address,
      "to": receiver,
      "value": web3.utils.toHex(newAmount),
      "gasPrice": web3.utils.toHex(gasPriceGwei * 1e9),
      "gasLimit": web3.utils.toHex(gasLimit),
      "nonce": "0x" + count.toString(16)
    };

    let tx = new EthereumTx(rawTransaction);
    // sign transaction with private key
    tx.sign(privateKey);
    let serializedTx = tx.serialize();

    Alert.alert(
      'Processing...',
      '',
      [
        {text: 'OK', onPress: () => console.log('Processing...')},
      ]
    );

    // Send signed transaction to Ethereum blockchain
    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).then(result => {
      console.log(result);
      
      Alert.alert(
        'Sent successfully!',
        '',
        [
          {text: 'OK', onPress: () => console.log('Success')},
        ]
      );
    }).catch(error => {
      console.log(error);
      setState({ error, receiver: undefined });
      
      Alert.alert(
        'Insufficient funds!',
        '',
        [
          {text: 'OK', onPress: () => console.log(error)},
        ]
      );
    });
  }

   return (
     <SafeAreaView style={styles.container}>
       <Text style={styles.titleText}>React Native X Ethereum</Text>
       <TouchableOpacity style={{ width: '100%' }} onPress={() => {createWallet()}}>
          <View style={{ paddingVertical: 20 }} >
            <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}> Create Wallet </Text>
            <Text style={{ color: '#8A8D97', fontSize: 12, textAlign: 'center' }}> Create a new Ethereum wallet. </Text>
          </View>
        </TouchableOpacity>
        <Text style={{ textAlign: 'center', color: '#E5BF30', fontSize: 20 }}>
          Available Balance:  { ETHBalance } ETH
        </Text>
        <Text style={styles.descText}>Enter trnx (eth) value</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeTrnxValue}
          value={amount}
          placeholder="Value of trnx"
          keyboardType="numeric"
        />
        <Text style={styles.descText}>Enter Address</Text>
        <TextInput
          style={styles.multiLineInput}
          multiline
          numberOfLines={2}
          onChangeText={onChangeReceiver}
          value={receiver}
          placeholder="Address"
        />
        <View style={styles.buttonWrapper}>
          <Button
            title="Submit"
            onPress={transferEther}
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
 