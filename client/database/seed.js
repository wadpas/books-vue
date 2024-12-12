import { faker } from '@faker-js/faker'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SERVICE_ROLE_KEY)

const seedBooks = async (numEntries) => {
	const books = []
	for (let i = 0; i < numEntries; i++) {
		const title = faker.book.title(4)
		books.push({
			title: title,
			slug: title.toLowerCase().replace(/ /g, '-'),
			author: faker.book.author(),
			description: faker.lorem.paragraph(),
			genre: faker.helpers.arrayElements(['triller', 'horror']),
			year: faker.number.int({ min: 2008, max: 2024 }),
			cover: faker.image.urlLoremFlickr({ category: 'book' }),
		})
	}
	const { data, error } = await supabase.from('books').insert(books).select('id')
	if (error) console.log(error)
	console.log(data)
	return data
}

const seedComments = async (numEntries, projectsIds, userId) => {
	const comments = []
	for (let i = 0; i < numEntries; i++) {
		comments.push({
			rating: faker.number.float({ min: 1, max: 5 }),
			text: faker.lorem.paragraph(),
			profile_id: userId,
			book_id: faker.helpers.arrayElement(projectsIds),
		})
	}
	const { data, error } = await supabase.from('comments').insert(comments).select('id')
	if (error) console.log(error)
	return data
}

const seedDatabase = async (numEntries) => {
	const booksIds = (await seedBooks(numEntries)).map((book) => book.id)
	await seedComments(numEntries, booksIds, 'c0b465bc-7a60-4ca6-b317-f87c02251b1f')
}

const numEntries = 10

seedDatabase(numEntries)
