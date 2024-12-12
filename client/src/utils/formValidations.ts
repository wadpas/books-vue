export const validateEmail = (email: string) => {
	const trimEmail = email.trim()
	if (!trimEmail) return []

	const errors = []

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

	if (!emailRegex.test(trimEmail)) {
		errors.push('Invalid email format')
	}

	return errors
}

export const validatePassword = (password: string) => {
	const trimPassword = password.trim()
	if (!trimPassword) return []

	const errors = []

	if (trimPassword.length < 8) {
		errors.push('Password must be at least 8 characters long')
	}

	if (!/[A-Z]/.test(trimPassword)) {
		errors.push('Password must contain at least one uppercase letter')
	}

	if (!/[a-z]/.test(trimPassword)) {
		errors.push('Password must contain at least one lowercase letter')
	}

	if (!/\d/.test(trimPassword)) {
		errors.push('Password must contain at least one digit')
	}

	if (!/[!@#$%^&*(),.?":{}|<>]/.test(trimPassword)) {
		errors.push('Password must contain at least one special character')
	}

	return errors
}
