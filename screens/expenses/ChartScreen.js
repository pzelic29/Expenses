import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { ExpensesContext } from "../../store/store";

function ChartScreen() {
  const { expenses } = useContext(ExpensesContext);
  const [displayPercentage, setDisplayPercentage] = useState(false);

  const expensesByCategory = expenses.reduce((acc, expense) => {
    const { category } = expense;
    acc[category] = acc[category]
      ? acc[category] + expense.amount
      : expense.amount;
    return acc;
  }, {});

  const totalExpense = Object.values(expensesByCategory).reduce(
    (total, expense) => total + expense,
    0
  );

  const data = Object.keys(expensesByCategory).map((category) => {
    const value = expensesByCategory[category];
    const label = displayPercentage
      ? `${((value / totalExpense) * 100).toFixed(2)}%`
      : `${value.toFixed(2)}€`;
    return {
      name: category,
      value,
      label,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    };
  });

  return (
    <View style={styles.container}>
      <View>
        <PieChart
          data={data}
          width={300}
          height={300}
          chartConfig={{
            backgroundGradientFrom: "#1E2923",
            backgroundGradientTo: "#08130D",
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          hasLegend={false}
          accessor={"value"}
          backgroundColor={"transpparent"}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setDisplayPercentage(!displayPercentage)}
      >
        <Text style={styles.buttonText}>
          {displayPercentage ? "Amount" : "Percentage"}
        </Text>
      </TouchableOpacity>
      <View style={styles.legendContainer}>
        <Text style={styles.legendTitle}>Legend</Text>
        {data.map((item, index) => (
          <View style={styles.legendItem} key={index}>
            <View
              style={[styles.legendColor, { backgroundColor: item.color }]}
            />
            <Text style={styles.legendText}>
              {item.name} - {item.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#80ced6",
  },
  button: {
    backgroundColor: "#0066CC",
    padding: 10,
    borderRadius: 5,
    marginVertical: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  legendContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  legendTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  legendColor: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  legendText: {
    fontSize: 16,
  },
});

export default ChartScreen;
