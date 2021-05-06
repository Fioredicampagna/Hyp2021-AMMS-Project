import express from 'express'
import initializeDatabase from '../db-conn'
const app = express()

// We need this one if we send data inside the body as JSON
app.use(express.json())

async function init() {
  // Call the init function that returns the Database
  const db = await initializeDatabase()
  // Let's extract all the objects we need to perform queries inside the endpoints
  const { Area, Product } = db._tables
  // API to get all the articles
  app.get('/areas', async (req, res) => {
    const areas = await Area.findAll()
    return res.json(areas)
  })
  // API to get an article by ID.
  // This one will return also the comments
  app.get('/areas/:name', async (req, res) => {
    const { name } = req.params
    const area = await Area.findOne({
      where: { name },
      include: { model: Product }, // -> this is the way we "include" also comments inside Articles
    })
    return res.json(area)
  })
  // This one is just an example
  app.get('/ad', (req, res) => {
    return res.json({
      url:
        'https://wordstream-files-prod.s3.amazonaws.com/s3fs-public/styles/simple_image/public/images/media/images/google-display-ads-example-2-final.png?oV7qevVB2XtFyF_O64TG6L27AFM3M2oL&itok=TBfuuTM_',
    })
  })
}

init()

export default app
