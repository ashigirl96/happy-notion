import { databases } from './generated'

async function create() {
  const response = await databases.Tasks.savePage({
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
  const response = await databases.Tasks.findBy({
    where: databases.Tasks.Name.contains('test1'),
  })
  if (response.isOk()) {
    console.log(response.value)
  }
}

void create()
// void findBy()
