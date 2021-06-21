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

  app.get('/products/:name', async (req, res) => {
    const { name } = req.params
    const products = await Product.findOne({
      where: { name },
      order: [
        [
          { model: Product, as: 'related', through: 'RelatedProducts' },
          'name',
          'ASC',
        ],
        [Employee, 'name', 'ASC'],
      ],
      include: [
        {
          model: Product,
          through: 'RelatedProducts',
          as: 'related',
          attributes: ['name', 'image', 'alt'],
          through: {
            // through again doesn't create any issue
            attributes: [], // this helps removing the join table in returned data
            //where: {completed: true}
          },
        },
        { model: Type, attributes: ['name'] },
        { model: Employee, attributes: ['name', 'image', 'alt'] },
        { model: Area, attributes: ['name'] },
      ],
    })
    return res.json(products)
  })

  app.get('/types/:name', async (req, res) => {
    const { name } = req.params
    const type = await Type.findOne({
      where: { name },
      order: [
        ['name', 'ASC'],
        [Product, 'name', 'ASC'],
      ],
      include: [{ model: Product }, { model: Area, attributes: ['name'] }],
    })
    return res.json(type)
  })

  app.get('/types/:id', async (req, res) => {
    const { id } = req.params
    const type = await Type.findOne({
      where: { id },
      attributes: ['name'],
    })
    return res.json(type)
  })

  // API to get all the areas
  app.get('/areas', async (req, res) => {
    const areas = await Area.findAll({ order: [['name', 'ASC']] })
    return res.json(areas)
  })

  // API to get an area by name.
  // This one will return also the comments
  app.get('/areas/:name', async (req, res) => {
    const { name } = req.params
    const area = await Area.findOne({
      where: { name },
      order: [
        [Product, 'name', 'ASC'],
        [Employee, 'name', 'ASC'],
      ],
      include: [
        {
          model: Product,
          attributes: ['name', 'image', 'alt'],
        },
        {
          model: Employee,
          attributes: ['name', 'image', 'alt'],
        },
        { model: Type, attributes: ['name'], order: [['name', 'ASC']] },
      ], // -> this is the way we "include" also products inside Areas
    })
    return res.json(area)
  })

  // API to get the areas names for the built of the landmarks.
  app.get('/landmarks', async (req, res) => {
    const landmarks = await Area.findAll({
      attributes: ['name'],
      order: [[Type, 'name', 'ASC']],
      include: { model: Type, attributes: ['name'] },
    })
    return res.json(landmarks)
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
      order: [[Product, 'name', 'ASC']],
      include: [{ model: Product }, { model: Area, attributes: ['name'] }], // -> this is the way we "include" also comments inside Articles
    })
    return res.json(employee)
  })
}

init()

export default app
