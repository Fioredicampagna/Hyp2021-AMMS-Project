import express from 'express'
import initializeDatabase from '../db-conn'
const app = express()

// We need this one if we send data inside the body as JSON
app.use(express.json())

async function init() {
  // Call the init function that returns the Database
  const db = await initializeDatabase()

  // Let's extract all the objects we need to perform queries inside the endpoints
  const { Area, Employee, Product, Type } = db._tables

  app.get('/products/:product_name', async (req, res) => {
    const { product_name } = req.params
    const products = await Product.findAll({
      where : {product_name}
    })
    return res.json(products)
  })


  app.get('/types/:id', async (req, res) => {
    const { id } = req.params
    const type = await Type.findOne({
      where : {id}
    })
    return res.json(type)
  })
  
  // API to get all the areas
  app.get('/areas', async (req, res) => {
    const areas = await Area.findAll()
    return res.json(areas)
  })

  // API to get an area by name.
  // This one will return also the comments
  app.get('/areas/:name', async (req, res) => {
    const { name } = req.params
    const area = await Area.findOne({
      where: { name },
      include: { model: Product }, // -> this is the way we "include" also products inside Areas
    })
    return res.json(area)
  })

  // API to get the areas names for the built of the landmarks.
  app.get('/areas-name', async (req, res) => {
    const names = await Area.findAll({ attributes: ['name'] })
    return res.json(names)
  })

  // API to get all the employees
  app.get('/employees', async (req, res) => {
    const employees = await Employee.findAll()
    return res.json(employees)
  })

  // API to get an employee by name
  app.get('/employees/:name', async (req, res) => {
    const { name } = req.params
    const employee = await Employee.findOne({
      where: { name },
      // include: { model: Product }, // -> this is the way we "include" also comments inside Articles
    })
    return res.json(employee)
  })

  // APi to get all the smartphones
  app.get('/smartphones', async (req, res) => {
    const smartphones = await Product.findAll()
    return res.json(smartphones)
  })

  // API to get a smartphone by name
  app.get('/smartphones/:name', async (req, res) => {
    const { name } = req.params
    const smartphone = await Product.findOne({
      where: { name },
    })
    return res.json(smartphone)
  })
}

init()

export default app
