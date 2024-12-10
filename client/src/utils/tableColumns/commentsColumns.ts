import { RouterLink } from 'vue-router'
import type { ColumnDef } from '@tanstack/vue-table'
import type { CommentsWithBooks } from '@/utils/supaQueries'

export const commentsColumns: ColumnDef<CommentsWithBooks[0]>[] = [
  {
    accessorKey: 'text',
    header: () => h('div', { class: 'text-left' }, 'Text'),
    cell: ({ row }) => {
      return h(RouterLink, { to: `/comments/${row.original.id}`, class: 'text-left font-medium' }, () => row.getValue('text'))
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
    accessorKey: 'books',
    header: () => h('div', { class: 'text-left' }, 'Book'),
    cell: ({ row }) => {
      return row.original.books ? h(RouterLink, { to: `/books/${row.original.books.slug}`, class: 'text-left font-medium' }, () => row.original.books?.title) : ''
    },
  },
]
