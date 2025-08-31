<template>
  <div id="vue-app">
    <h1>Hello from Vue.js!</h1>
    <p>This is your main application component.</p>
    <MyButton :curr-Letter="currLetter" @button-click="incrementCount"></MyButton>
    <UserProfile :user-name="userName" :user-age="userAge"></UserProfile>
    <Table :data="tableData" />
    <div style="margin: 0 auto;">
      <Reel></Reel>
      <h1>I am a banana</h1>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
// Import the new Table component
import Table from './components/practice/Table.vue';
import MyButton from './components/practice/MyButton.vue';
import UserProfile from './components/practice/UserProfile.vue';
import Reel from './components/practice/Reel.vue';

export default {
  // Register the component
  components: {
    Table,
    MyButton,
    UserProfile,
    Reel
  },
  setup() {
    /**
     * MyButton Counter
     * @see MyButton
     */
    // 1. Declare and initialize the reactive variables
    const count       = ref(0);
    const letters     = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const currLetter  = ref(letters[0]); // Initialize with the first letter

    // 2. Add the method to change the letter on button click
    const incrementCount = () => {
        count.value++;
        currLetter.value = letters[count.value];
    };
    
    /**
     * Table
     * @see Table
     */
    // Sample data for the table
    const tableData = ref([
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 }
    ]);

    /**
     * User Profile
     * @see UserProfile
     */
    const userName  = "Apollo";
    const userAge   = 14;

    return {
      count,
      letters,
      currLetter,
      incrementCount,
      tableData,
      userName,
      userAge
    };
  }
};
</script>

<style lang="scss">
@use 'sass:color';

#vue-app {
  font-family: Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
  h1 {
    color: #42b983;
  }
  button {
    background-color: #42b983;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 8px;
    transition: background-color 0.3s;
    &:hover {
      background-color: color.adjust(#42b983, $lightness: -10%);
    }
  }
}
</style>