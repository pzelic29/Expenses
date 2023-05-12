import React, { useContext, useState } from 'react';
import { FlatList,View, Text, StyleSheet } from 'react-native';
import { ExpensesContext } from '../../store/store';
import ExpenseItem from '../../components/Expenses/ExpenseItem';
import SelectedListComponent from '../../components/ManageExpenses/SelectedListComponent';

function ExpensesByCategoryScreen() {
  const { expenses } = useContext(ExpensesContext);
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredExpenses = expenses.filter(
    (expense) => expense.category === selectedCategory
  );

  return (
    <View style={styles.screen}>
      <SelectedListComponent
        label="Select category"
        onSelectedChange={setSelectedCategory}
        category={selectedCategory}
      />
      {filteredExpenses.length === 0 ? (
        <Text style={styles.emptyMessage}>No expenses found.</Text>
      ) : (
        <FlatList
          data={filteredExpenses}
          renderItem={({ item }) => <ExpenseItem {...item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
}

export default ExpensesByCategoryScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    backgroundColor: "#80ced6",
  },
  emptyMessage: {
    textAlign: 'center',
    marginVertical: 20,
    color: 'white',
    fontSize: 16,
  },
});
