import { databases } from './generated'

async function create() {
  const response = await databases.Tasks.savePage({
    where: databases.Tasks.Name.contains(''),
    properties: {
      Name: databases.Tasks.Name.fill('test1'),
      Text: databases.Tasks.Text.fill({ text: 'test3' }),
      MultiSelect: databases.Tasks.MultiSelect.fill(['test10']),
      Select: databases.Tasks.Select.fill('test10'),
      Checkbox: databases.Tasks.Checkbox.fill(true),
      Number: databases.Tasks.Number.fill(10),
      URL: databases.Tasks.URL.fill('https://example.com'),
      Status: databases.Tasks.Status.fill('In progress'),
      Date: databases.Tasks.Date.fill({
        start: new Date('2025-01-01').toISOString(),
        end: null,
      }),
    },
  })
  if (response.isOk()) {
    console.log(response.value)
  }
}

async function findBy() {
  const response = await databases.Tasks.findPagesBy({
    where: databases.Tasks.Name.contains('test1'),
  }).map((results) => {
    const result = results[0]
    return result.properties.MultiSelect
  })
  if (response.isOk()) {
    console.dir(response.value, { depth: null })
  }
}

async function findById() {
  const response = await databases.Tasks.findPageById('16c34b35bfa4812fadc5c275593d7f8f').map(
    (result) => {
      return result.properties.MultiSelect
    },
  )
  if (response.isOk()) {
    console.dir(response.value, { depth: null })
  }
}

async function chain() {
  const response = await databases.Tasks.chain({
    where: databases.Tasks.Name.contains('test1'),
    from: databases.Tasks.Epic,
    middle: databases.Epic.Category,
    to: databases.Tasks.Category,
  })
  if (response.isOk()) {
    console.log('chain success')
  }
}

// void create()
// void findBy()
// void findById()
void chain()
