<template> 
    <div id="app">
      <h1>Book Counter</h1>
      <button @click="getBookCount">Get Book Count</button>
      <p v-if="count !== null">Total number of books: {{ count }}</p>
      <p v-if="error">{{ error }}</p>

      <!-- Update form for new book entries -->
      <h2>Add a New Book</h2>
      <input v-model="newBook.isbn" placeholder="Enter ISBN">
      <input v-model="newBook.name" placeholder="Enter Book Name">
      <button @click="addBook">Add Book</button>
      <p v-if="addStatus">{{ addStatus }}</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      count: null,
      error: null,
      newBook: {
        isbn: '',
        name: ''
      },
      addStatus: ''
    };
  },
  methods: {
    async getBookCount() {
      try {
        const response = await axios.get('https://countbooks-7rexeyanqa-uc.a.run.app');
        this.count = response.data.count;
        this.error = null;
      } catch (error) {
        console.error('Error fetching book count:', error);
        this.error = error;
        this.count = null;
      }
    },
    
  },
};
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center; 
}
</style>
