<script setup lang="ts">
  import { commentQuery, type Comment } from '@/utils/supaQueries'

  const route = useRoute('/comments/[id]')
  const comment = ref<Comment | null>(null)

  watch(
    () => comment.value?.text,
    () => {
      useBooksStore().books.title = `Book ${comment.value?.text || ''}`
    }
  )

  const getComment = async () => {
    const { data, error } = await commentQuery(route.params.id)
    if (error) {
      console.log(error)
      return
    }
    comment.value = data
  }

  await getComment()
</script>

<template>
  <Table v-if="comment">
    <TableRow>
      <TableHead> Text </TableHead>
      <TableCell> {{ comment.text }} </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Rating </TableHead>
      <TableCell> {{ comment.rating }}</TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Created </TableHead>
      <TableCell> {{ comment.created_at }} </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Book </TableHead>
      <TableCell> {{ comment.books?.title }} </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Collaborators </TableHead>
      <TableCell>
        <div class="flex">
          <Avatar
            class="-mr-4 transition-transform border border-primary hover:scale-110"
            v-for="n in 5"
            :key="n">
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
    <TableRow class="hover:bg-transparent">
      <TableHead class="pt-4 align-top"> Comments </TableHead>

      <TableCell>
        Comments cards goes in here..

        <div class="flex flex-col justify-between p-3 my-2 rounded-md bg-muted">
          <textarea
            placeholder="Add your comment.."
            class="w-full max-w-full p-3 overflow-y-auto prose-sm prose border rounded dark:prose-invert hover:border-muted bg-background border-muted">
          </textarea>
          <div class="flex justify-between mt-3">
            <Button> Comment </Button>
            <div class="flex gap-4">
              <button
                variant="ghost"
                @click.prevent>
                <iconify-icon icon="lucide:paperclip"></iconify-icon>
                <span class="sr-only">Attach file</span>
              </button>
              <button
                variant="ghost"
                @click.prevent>
                <iconify-icon icon="lucide:image-up"></iconify-icon>

                <span class="sr-only">Upload image</span>
              </button>
            </div>
          </div>
        </div>
      </TableCell>
    </TableRow>
  </Table>
</template>
