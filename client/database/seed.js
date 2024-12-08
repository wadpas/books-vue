import { faker } from "@faker-js/faker"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SERVICE_ROLE_KEY)

const seedBooks = async (numEntries) => {
  const books = []
  for (let i = 0; i < numEntries; i++) {
    books.push({
      title: faker.book.title(),
      author: faker.book.author(),
      description: faker.lorem.paragraph(),
      genre: faker.helpers.arrayElements(["triller", "horror"]),
      year: faker.number.int({ min: 2008, max: 2024 }),
      cover: faker.image.urlLoremFlickr({ category: "book" }),
    })
  }
  const { data, error } = await supabase.from("books").insert(books).select("id")
  if (error) console.log(error)
  return data
}

const seedComments = async (numEntries, projectsIds) => {
  const comments = []
  for (let i = 0; i < numEntries; i++) {
    comments.push({
      rating: 4.5,
      text: faker.lorem.paragraph(),
      book_id: faker.helpers.arrayElement(projectsIds),
    })
  }
  const { data, error } = await supabase.from("comments").insert(comments).select("id")
  if (error) console.log(error)
  return data
}

const seedDatabase = async (numEntries) => {
  const booksIds = (await seedBooks(numEntries)).map((book) => book.id)
  await seedComments(numEntries, booksIds)
}

const numEntries = 10

seedDatabase(numEntries)
