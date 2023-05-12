import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';

const backgroundImage = require('../../assets/expenses-1.jpg');

const LoginScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: ''
  });

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLogin = () => {
    // Check if input is a valid email address
    const isEmail = /\S+@\S+\.\S+/.test(formData.email);
    if (
      (isEmail && formData.email === 'pzelic@pmfst.hr') ||
      (!isEmail && formData.userName === 'pzelic')
    ) {
      if (formData.password === '123456') {
        navigation.navigate('ExpensesOverview', { userName: formData.userName });
      } else {
        Alert.alert('Invalid login', 'Incorrect password');
      }
    } else {
      Alert.alert('Invalid login', 'Please check your input values');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.square}>
        <Image
          source={backgroundImage}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.form}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={(text) => handleInputChange('email', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => handleInputChange('password', text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Expense tracker app!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  square: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  form: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  input: {
    width: '80%',
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 15,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
