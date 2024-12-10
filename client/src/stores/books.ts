export const useBooksStore = defineStore('books-store', () => {
  const books = ref({
    title: '',
  })

  return {
    books,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBooksStore, import.meta.hot))
}
