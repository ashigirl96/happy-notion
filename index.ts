import { databases } from './generated'

console.dir(
  await databases.Tasks.findBy({
    where: databases.Tasks.Name.contains('香山'),
  }),
  { depth: null },
)
