<script setup lang="ts">
	import { booksColumns } from '@/utils/tableColumns/booksColumns'

	const booksLoader = useBooksStore()
	const { books } = storeToRefs(booksLoader)
	const { getBooks } = booksLoader

	await getBooks()
</script>

<template>
	<div>
		<DataTable v-if="books" :columns="booksColumns" :data="books" />
	</div>
</template>
