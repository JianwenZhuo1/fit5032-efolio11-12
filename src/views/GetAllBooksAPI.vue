<template>
    <div class="all-books">
      <pre>{{ books }}</pre>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'GetAllBooksAPI',
    data() {
      return {
        books: null
      };
    },
    async created() {
      try {
        const response = await axios.get('https://app-7rexeyanqa-uc.a.run.app/AllBooks');
        this.books = response.data;
      } catch (error) {
        console.error('Error fetching all books:', error);
        this.books = 'Failed to fetch books';
      }
    }
  };
  </script>
  
  <style>
  .all-books {
    padding: 20px;
    font-family: monospace;
  }
  </style>
  