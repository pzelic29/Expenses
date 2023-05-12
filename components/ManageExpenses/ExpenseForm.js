import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import SelectedListComponent from "./SelectedListComponent";
import Input from "./Input";
import Button from "../UI/Button";
import DateTimePickerModal from "react-native-modal-datetime-picker";

function ExpenseForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
  const [inputValues, setInputValues] = useState({
    amount: defaultValues ? defaultValues.amount.toString() : "",
    date: defaultValues ? defaultValues.date : new Date(),
    description: defaultValues ? defaultValues.description : "",
    category: defaultValues ? defaultValues.category : "",
  });

  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputValues((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  function submitHandler() {
    Keyboard.dismiss(); // dismiss the keyboard when the form is submitted
    const expenseData = {
      amount: +inputValues.amount,
      date: inputValues.date,
      description: inputValues.description,
      category: inputValues.category,
    };
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid date";
    const descriptionIsValid = expenseData.description.trim().length > 0;
    const categoryIsValid = expenseData.category !== "";
    if (!amountIsValid || !dateIsValid || !descriptionIsValid || !categoryIsValid) {
      Alert.alert("Invalid input", "Please check your input values");
      return;
    }
    onSubmit(expenseData);
  }

  function showDatePicker() {
    setIsDatePickerVisible(true);
  }

  function hideDatePicker() {
    setIsDatePickerVisible(false);
  }

  function handleDateConfirm(date) {
    hideDatePicker();
    setInputValues((prevState) => ({
      ...prevState,
      date: date,
    }));
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Your Expense</Text>
        <Input
          style={styles.input}
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "amount"),
            value: inputValues.amount,
          }}
        />
        <TouchableOpacity onPress={showDatePicker}>
          <Input
            style={styles.input}
            label="Date"
            textInputConfig={{
              editable: false,
              value: inputValues.date.toLocaleDateString(),
            }}
          />
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          date={inputValues.date}
          maximumDate={new Date()}
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
        />
        <Input
          style={styles.input}
          label="Description"
          textInputConfig={{
            multiline: true,
            onChangeText: inputChangedHandler.bind(this, "description"),
            value: inputValues.description,
          }}
        />
        <SelectedListComponent
          style={styles.input}
          label="Category"
          category={inputValues.category}
          onSelectedChange={(category) => {
            setInputValues((prevState) => ({
              ...prevState,
              category: category,
            }));
          }}
        />
        <View style={styles.buttons}>
          <Button style={styles.button} mode="flat" onPress={onCancel}>
            Cancel
          </Button>
          <Button style={styles.button} onPress={submitHandler}>
            {submitButtonLabel}
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginVertical: 24,
    textAlign: "center",
  },
  input: {
    marginBottom: 16,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 32,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});
