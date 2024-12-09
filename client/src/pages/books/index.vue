<template>
  <div>Books</div>
  <router-link to="/">Home</router-link>
  <div>
    <DataTable
      v-if="books"
      :columns="columns"
      :data="books" />
  </div>
</template>

<script setup lang="ts">
  import { h, ref } from 'vue'
  import { supabase } from '@/lib/supabaseClient.'
  import type { Tables } from '../../../database/types'
  import type { ColumnDef } from '@tanstack/vue-table'
  import DataTable from '@/components/ui/data-table/DataTable.vue'
  import { RouterLink } from 'vue-router'

  const books = ref<Tables<'books'>[] | null>(null)
  ;(async () => {
    const { data, error } = await supabase.from('books').select('*')
    if (error) {
      console.log(error)
      return
    }
    books.value = data
  })()

  const columns: ColumnDef<Tables<'books'>>[] = [
    {
      accessorKey: 'title',
      header: () => h('div', { class: 'text-left' }, 'Title'),
      cell: ({ row }) => {
        return h(RouterLink, { to: `/books/${row.original.slug}`, class: 'text-left font-medium' }, () => row.getValue('title'))
      },
    },
    {
      accessorKey: 'author',
      header: () => h('div', { class: 'text-left' }, 'Author'),
      cell: ({ row }) => {
        return h('div', { class: 'text-left font-medium' }, row.getValue('author'))
      },
    },
    {
      accessorKey: 'description',
      header: () => h('div', { class: 'text-left' }, 'Description'),
      cell: ({ row }) => {
        return h('div', { class: 'text-left font-medium' }, row.getValue('description'))
      },
    },
    {
      accessorKey: 'genre',
      header: () => h('div', { class: 'text-left' }, 'Genre'),
      cell: ({ row }) => {
        return h('div', { class: 'text-left font-medium' }, row.getValue('genre'))
      },
    },
    {
      accessorKey: 'year',
      header: () => h('div', { class: 'text-left' }, 'Year'),
      cell: ({ row }) => {
        return h('div', { class: 'text-left font-medium' }, row.getValue('year'))
      },
    },
    {
      accessorKey: 'average_rating',
      header: () => h('div', { class: 'text-left' }, 'Rating'),
      cell: ({ row }) => {
        return h('div', { class: 'text-left font-medium' }, row.getValue('average_rating'))
      },
    },
  ]
</script>

<style scoped></style>
