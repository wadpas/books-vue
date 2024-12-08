<template>
  <div>Comments</div>
  <router-link to="/">Home</router-link>
  <div>
    <ul>
      <li v-for="comment in comments" :key="comment.id">
        {{ comment.text }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { supabase } from "@/lib/supabaseClient."
import type { Tables } from "../../../database/types"

const comments = ref<Tables<"comments">[] | null>(null)
;(async () => {
  const { data, error } = await supabase.from("comments").select("*")
  if (error) {
    console.log(error)
    return
  }
  comments.value = data
})()
</script>

<style scoped></style>
