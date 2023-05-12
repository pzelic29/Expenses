import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SignOutScreen = ({ navigation, route }) => {
  const handleSignOut = () => {
    // Perform sign out functionality
    navigation.navigate('Login');
  };

  const handleNo = () => {
    navigation.navigate('AllExpenses');
  };
  const userName = route.params.userName || 'pzelic';

  return (
    <View style={styles.container}>
      <View style={styles.square}>
        <Text style={styles.title}>Welcome, {userName}!</Text>
        <Text style={styles.subtitle}>Are you sure you want to sign out?</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSignOut}>
            <Text style={styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonNo} onPress={handleNo}>
            <Text style={styles.buttonText}>No</Text>
          </TouchableOpacity>
        </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '80%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonNo: {
    backgroundColor: '#f00',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignOutScreen;
