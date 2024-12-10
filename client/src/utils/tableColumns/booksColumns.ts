import { RouterLink } from 'vue-router'
import type { ColumnDef } from '@tanstack/vue-table'
import type { Books } from '@/utils/supaQueries'

export const booksColumns: ColumnDef<Books[0]>[] = [
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
  // {
  //   accessorKey: 'genre',
  //   header: () => h('div', { class: 'text-left' }, 'Genre'),
  //   cell: ({ row }) => {
  //     return h('div', { class: 'text-left font-medium' }, row.getValue('genre'))
  //   },
  // },
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
