import { booksQuery, type Books } from '@/utils/supaQueries'
import { useMemoize } from '@vueuse/core'

export const useBooksStore = defineStore('books-store', () => {
	const books = ref<Books | null>(null)
	const loadBooks = useMemoize(async (key: string) => await booksQuery)

	const validateCache = () => {
		if (books.value?.length) {
			booksQuery.then(({ data }) => {
				if (JSON.stringify(books.value) !== JSON.stringify(data)) {
					loadBooks.delete('books')
				}
			})
		}
	}

	const getBooks = async () => {
		const { data, error, status } = await loadBooks('books')
		if (error) {
			useErrorStore().setError({ error, customCode: status })
		}
		books.value = data
	}
	validateCache()
	return { books, getBooks }
})
