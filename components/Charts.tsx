import React, { useCallback, useContext, useEffect, useState } from "react";
import { Alert, StyleSheet, View, ActivityIndicator } from "react-native";
import { Text } from "@rneui/themed";
import { BarChart, PieChart } from "react-native-gifted-charts";
import { UserContext } from "../app/_layout";
import { supabase } from "../lib/supabase";

type Product = {
  name: string;
  type: string;
  stock: number;
};

type BarChartDataItem = {
  value: number;
  label: string;
  frontColor: string;
};

type PieChartDataItem = {
  value: number;
  color: string;
  text: string;
};
export default function Charts() {
  const session = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [barData, setBarData] = useState<BarChartDataItem[]>([]);
  const [pieData, setPieData] = useState<PieChartDataItem[]>([]);

  useEffect(() => {
    if (session) fetchProductsData();
  }, [session]);

  const fetchProductsData = useCallback(async () => {
    try {
      setIsLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("products")
        .select("name, type, stock");

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        // Process data for charts
        processChartData(data);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, [session]);

  const processChartData = useCallback((data: Product[]) => {
    // Group data by type and sum the stocks for the bar chart
    const barChartData = data.reduce((acc: BarChartDataItem[], product) => {
      const foundIndex = acc.findIndex((item) => item.label === product.type);
      if (foundIndex !== -1) {
        acc[foundIndex].value += product.stock;
      } else {
        acc.push({
          value: product.stock,
          label: product.type,
          frontColor: generateColorByType(product.type),
        });
      }
      return acc;
    }, []);

    // Prepare data for pie chart
    const pieChartData = barChartData.map((item) => ({
      value: item.value,
      color: item.frontColor,
      text: `${Math.round(
        (item.value / data.reduce((sum, curr) => sum + curr.stock, 0)) * 100
      )}%`,
    }));

    setBarData(barChartData);
    setPieData(pieChartData);
  }, []);

  const generateColorByType = (type: string) => {
    switch (type) {
      case "Electronics":
        return "#177AD5";
      case "Clothing":
        return "#79D2DE";
      case "Food":
        return "#ED6665";
      case "Furniture":
        return "#FFC300";
      default:
        return "#8E44AD";
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#177AD5" />
      ) : (
        <>
          <Text style={styles.title}>Product Stock Distribution</Text>
          <View style={{ marginBottom: 32 }}>
            <BarChart
              data={barData}
              barWidth={36}
              noOfSections={4}
              barBorderRadius={4}
              yAxisThickness={0}
              xAxisThickness={0}
              hideRules
              adjustToWidth
            />
          </View>
          <View>
            <PieChart
              data={pieData}
              radius={150}
              textSize={16}
              showText
              textColor="black"
              textBackgroundRadius={20}
              backgroundColor="#F0F3F4"
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    margin: 16,
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#34495E",
  },
});
