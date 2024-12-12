import type { LoginForm } from '@/types/AuthForm'
import type { AuthError } from '@supabase/supabase-js'

type FormErrors<T> = {
	[K in keyof T]: string[]
}

export const useFormErrors = () => {
	const serverError = ref('')
	const realtimeErrors = ref<FormErrors<LoginForm>>()

	const handleServerError = (error: AuthError) => {
		serverError.value =
			error.message === 'Invalid login credentials' ? 'Invalid email or password' : error.message
	}

	const handleLoginForm = async (formData: LoginForm) => {
		console.log(formData)

		realtimeErrors.value = {
			email: [],
			password: [],
		}
		const { validateEmail, validatePassword } = await import('@/utils/formValidations')

		const emailError = validateEmail(formData.email)
		if (emailError.length) {
			realtimeErrors.value.email = emailError
		}

		const passwordError = validatePassword(formData.password)
		if (passwordError.length) {
			realtimeErrors.value.password = passwordError
		}
	}

	return {
		serverError,
		handleServerError,
		handleLoginForm,
		realtimeErrors,
	}
}
