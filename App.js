import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute} from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AllExpenses from './screens/expenses/AllExpenses';
import ManageExpense from './screens/expenses/ManageExpenses';
import RecentExpenses from './screens/expenses/RecentExpenses';
import ExpensesByCategoryScreen from './screens/expenses/ExpensesByCategoryScreen';
import ChartScreen from './screens/expenses/ChartScreen';
import ButtonIcon from './components/UI/ButtonIcon';
import ExpensesContextProvider from './store/store';
import LoginScreen from './screens/user/LoginScreen';
import SignOutScreen from './screens/user/SignOutScreen';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview({userName}) {
  const route = useRoute();
  const navigation = route.params.navigation;
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerRight: () => (
          <ButtonIcon
            icon="add"
            size={24}
            color="black"
            onPress={() => {
              navigation.navigate('ManageExpense');
            }}
          />
        ),
        headerLeft: () => (
          <ButtonIcon
            icon="log-out-outline"
            size={24}
            color="black"
            onPress={() => {
              navigation.navigate('SignOut', { userName: userName });
            }}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All Expenses',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="card-outline" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="ExpenseByCategory"
        component={ExpensesByCategoryScreen}
        options={{
          title: 'Expenses by Category',
          tabBarLabel: 'Category',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="pricetag-outline" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="ChartScreen"
        component={ChartScreen}
        options={{
          title: 'Chart',
          tabBarLabel: 'Chart',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="pie-chart-outline" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App({navigation}) {
  return (
    <>
      <StatusBar style="auto" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ExpensesOverview"
              component={ExpensesOverview}
              options={{ headerShown: false }}
              // Pass the navigation prop to ExpensesOverview component
              initialParams={{ navigation: navigation }}
            />
            <Stack.Screen name="ManageExpense" component={ManageExpense} />
            <Stack.Screen name="SignOut" component={SignOutScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}

