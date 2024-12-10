<script setup lang="ts">
  import { booksQuery, type Books } from '@/utils/supaQueries'
  import { booksColumns } from '@/utils/tableColumns/booksColumns'

  useBooksStore().books.title = 'Books'

  const books = ref<Books | null>(null)

  const getBooks = async () => {
    const { data, error } = await booksQuery
    if (error) {
      console.log(error)
      return
    }
    books.value = data
  }

  await getBooks()
</script>

<template>
  <div>
    <DataTable
      v-if="books"
      :columns="booksColumns"
      :data="books" />
  </div>
</template>
