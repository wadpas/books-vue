<script setup lang="ts">
	import { commentsWithBooksQuery, type CommentsWithBooks } from '@/utils/supaQueries'
	import { commentsColumns } from '@/utils/tableColumns/commentsColumns'

	useBooksStore().books.title = 'Comments'

	const comments = ref<CommentsWithBooks | null>(null)

	const getComments = async () => {
		const { data, error, status } = await commentsWithBooksQuery
		if (error) console.log(error, status)

		if (error) useErrorsStore().setError({ error, customCode: status })
		comments.value = data
	}

	await getComments()
</script>

<template>
	<div>
		<DataTable
			v-if="comments"
			:columns="commentsColumns"
			:data="comments" />
	</div>
</template>
