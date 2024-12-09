<template>
  <div>Comments</div>
  <router-link to="/">Home</router-link>
  <div>
    <DataTable
      v-if="comments"
      :columns="columns"
      :data="comments" />
  </div>
</template>

<script setup lang="ts">
  import { h, ref } from 'vue'
  import { supabase } from '@/lib/supabaseClient.'
  import type { Tables } from '../../../database/types'
  import type { ColumnDef } from '@tanstack/vue-table'
  import DataTable from '@/components/ui/data-table/DataTable.vue'
  import { RouterLink } from 'vue-router'

  const comments = ref<Tables<'comments'>[] | null>(null)

  ;(async () => {
    const { data, error } = await supabase.from('comments').select('*')
    if (error) {
      console.log(error)
      return
    }
    comments.value = data
  })()

  const columns: ColumnDef<Tables<'comments'>>[] = [
    {
      accessorKey: 'text',
      header: () => h('div', { class: 'text-left' }, 'Text'),
      cell: ({ row }) => {
        return h(RouterLink, { to: `/books/${row.original.id}`, class: 'text-left font-medium' }, () => row.getValue('text'))
      },
    },
    {
      accessorKey: 'rating',
      header: () => h('div', { class: 'text-left' }, 'Rating'),
      cell: ({ row }) => {
        return h('div', { class: 'text-left font-medium' }, row.getValue('rating'))
      },
    },
    {
      accessorKey: 'book_id',
      header: () => h('div', { class: 'text-left' }, 'Book'),
      cell: ({ row }) => {
        return h('div', { class: 'text-left font-medium' }, row.getValue('book_id'))
      },
    },
  ]
</script>

<style scoped></style>
