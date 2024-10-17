<template>
  <div>
    <h1>Books with ISBN > 1000</h1>
    <ul>
      <li v-for="book in books" :key="book.id">
        <div>
          {{ book.name }} - ISBN: {{ book.isbn }}
          <button v-if="!editBookId || editBookId !== book.id" @click="startEdit(book)">Edit</button>
          <div v-else>
            <input v-model="editName" placeholder="New name">
            <input v-model="editIsbn" placeholder="New ISBN">
            <button @click="updateBook(book.id)">Save</button>
            <button @click="cancelEdit">Cancel</button>
          </div>
          <button @click="deleteBook(book.id)">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>


  
<script>
import { ref, onMounted } from 'vue';
import db from '../firebase/init.js';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';

export default {
  setup() {
    const books = ref([]);
    const editBookId = ref(null);
    const editName = ref('');
    const editIsbn = ref('');

    // Fetches books with complex querying: filter, sort, and limit
    const fetchBooks = async () => {
      const booksQuery = query(
        collection(db, 'books'),
        where('isbn', '>', 1000), // Filtering condition
        orderBy('name', 'asc'),   // Sorting by name ascending
        limit(10)                // Limiting results to 10
      );
      const querySnapshot = await getDocs(booksQuery);
      books.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    };

    const startEdit = (book) => {
      editBookId.value = book.id;
      editName.value = book.name;
      editIsbn.value = book.isbn;
    };

    const updateBook = async (id) => {
      const bookRef = doc(db, 'books', id);
      await updateDoc(bookRef, {
        name: editName.value,
        isbn: editIsbn.value
      });
      fetchBooks(); // Refresh the list after update
      cancelEdit(); // Reset edit mode
    };

    const deleteBook = async (id) => {
      const bookRef = doc(db, 'books', id);
      await deleteDoc(bookRef);
      fetchBooks(); // Refresh the list after deletion
    };

    const cancelEdit = () => {
      editBookId.value = null;
      editName.value = '';
      editIsbn.value = '';
    };

    onMounted(() => {
      fetchBooks(); // Initial fetch of the books
    });

    return {
      books,
      editBookId,
      editName,
      editIsbn,
      updateBook,
      deleteBook,
      startEdit,
      cancelEdit
    };
  }
};
</script>



