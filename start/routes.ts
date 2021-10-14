/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/
import Database from '@ioc:Adonis/Lucid/Database'
import Route from '@ioc:Adonis/Core/Route'
import Application from '@ioc:Adonis/Core/Application'
import Migrator from '@ioc:Adonis/Lucid/Migrator'

Route.get('/', async () => {
  const migrator = new Migrator(Database, Application, {
    direction: 'up',
    dryRun: false,
    // connectionName: 'pg',
  })

  await migrator.run()
  return migrator.migratedFiles
})

// USER MANAGEMENT
Route.get('/users/check', async () => {
  return { hello: 'checking for user account' }
})

Route.post('users/add', async ({ request, response }) => {
  const name = request.input('name')
  const companyName = request.input('company_name')
  const mobileNumber = request.input('mobile_number')
  const firebaseId = request.input('firebase_id')
  const status = 'pending'

  const postId = await Database.table('users')
    .insert({
      name: name,
      company_name: companyName,
      mobile_number: mobileNumber,
      firebase_id: firebaseId,
    })
    .returning('id')

  return response.created('Invalid credentials')
})

// TIMESHEETS
Route.get('/sheets/getallforuser', async ({ request }) => {
  const limit = 20
  const page = request.input('page', 1)

  return Database.from('posts')
    .select('*')
    .orderBy('id', 'desc') // 👈 get latest first
    .paginate(page, limit) // 👈 paginate using page numbers
})
