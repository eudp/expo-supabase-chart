# 📊 Expo Stock Management App

This project is a mobile application built with Expo for inventory management, featuring data visualizations. It uses interactive charts and a secure authentication system, providing a simple solution for tracking products and analyzing stock.

## 🛠️ Technologies Used
- React Native: For building the user interface.
- Expo: Framework used to simplify app development.
- React Native Gifted Charts: For creating bar and pie charts.
- Supabase: For authentication and  database management.
- Expo Router: For managing app navigation and tabs.

## 🚀 Key Features

1. Secure Authentication
Sign In and Sign Up: Users can register and log in using their email and password.
Session Management: Utilizes Supabase’s authentication system with auto-refreshing tokens.
2. Profile Management
Profile Update: Users can update their username, website, and avatar directly from the app.
Image Upload: Avatar upload with preview capability is implemented.
3. Data Visualization
Bar Chart: Displays stock distribution by product categories (Electronics, Clothing, Food, Furniture, etc.).
Pie Chart: Provides a percentage breakdown of total stock, allowing users to easily identify proportions of each category.
4. Inventory Management
Supabase Data: Product data is fetched directly from the Supabase database.

## 🔧 Project Setup

```sh
npm install
npx expo start 
```
