<script setup lang="ts">
  import { bookQuery, type Book } from '@/utils/supaQueries'

  const route = useRoute('/books/[slug]')
  const book = ref<Book | null>(null)

  watch(
    () => book.value?.title,
    () => {
      useBooksStore().books.title = `Book ${book.value?.title || ''}`
    }
  )

  const getBook = async () => {
    const { data, error } = await bookQuery(route.params.slug)
    if (error) {
      console.log(error)
      return
    }
    book.value = data
  }

  await getBook()
</script>

<template>
  <Table v-if="book">
    <TableRow>
      <TableHead> Title </TableHead>
      <TableCell> {{ book.title }} </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Author </TableHead>
      <TableCell>{{ book.author }}</TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Description </TableHead>
      <TableCell> {{ book.description }} </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Genre </TableHead>
      <TableCell>
        <div class="flex">
          <Avatar
            class="-mr-4 transition-transform border border-primary hover:scale-110"
            v-for="g in book.genre"
            :key="g">
            {{ g }}
            <RouterLink
              class="flex items-center justify-center w-full h-full"
              to="">
              <AvatarImage
                src=""
                alt="" />
              <AvatarFallback> </AvatarFallback>
            </RouterLink>
          </Avatar>
        </div>
      </TableCell>
    </TableRow>
  </Table>

  <section
    v-if="book"
    class="flex flex-col justify-between gap-5 mt-10 md:flex-row grow">
    <div class="flex-1">
      <h2>Comments</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead> Name </TableHead>
            <TableHead> Status </TableHead>
            <TableHead> Due Date </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-for="c in book.comments"
            :key="c.id">
            <TableCell> Lorem ipsum dolor sit amet. </TableCell>
            <TableCell> In progress </TableCell>
            <TableCell> 22/08/2024 </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
    <div class="flex-1">
      <h2>Documents</h2>
      <p class="px-4 py-3 text-sm font-semibold text-muted-foreground">This project doesn't have documents yet...</p>
      <!-- <Table>
          <TableHeader>
            <TableRow>
              <TableHead> Name </TableHead>
              <TableHead> Visibility </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell> Lorem ipsum dolor sit amet. </TableCell>
              <TableCell> Private </TableCell>
            </TableRow>
          </TableBody>
        </Table> -->
    </div>
  </section>
</template>

<style>
  th {
    @apply w-[100px];
  }

  h2 {
    @apply mb-4 text-lg font-semibold w-fit;
  }
</style>
