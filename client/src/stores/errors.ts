import type { CustomError, ExtendedPostgrestError } from '@/types/error'
import type { PostgrestError } from '@supabase/supabase-js'

export const useErrorsStore = defineStore('error-store', () => {
  const activeError = ref<null | CustomError | ExtendedPostgrestError>(null)

  const setError = ({ error, customCode }: { error: Error | PostgrestError; customCode?: number }) => {
    activeError.value = error
    activeError.value.statusCode = customCode || 500
  }

  return {
    activeError,
    setError,
  }
})
