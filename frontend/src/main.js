/**
 * @file ~/frontend/src/main.js
 * @description The main entry point for the Vue.js application. This file imports the root Vue component,
 * initializes the application instance, and mounts it to the DOM. It also imports the main SCSS file
 * for global styling.
 * @module Main
 */
import { createApp } from 'vue' // Imports the function to create a Vue app
import App from './App.vue'     // Imports the main component
import './styles/main.scss';    // Imports main sass file

// Creates the Vue application instance
const app = createApp(App);

// Mounts the app to the HTML element with the ID 'app'
app.mount('#app');