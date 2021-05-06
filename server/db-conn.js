const { Sequelize, DataTypes } = require('sequelize')

// Development
const db = new Sequelize('postgres://postgres:password@localhost:5432/AMMS')

// Production
// const pg = require('pg')
// pg.defaults.ssl = true
// const db = new Sequelize(process.env.DATABASE_URL, {
//   ssl: true,
//   dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
// })

/**
 * Function to define the structure of the database
 */
function defineDatabaseStructure() {
  const Area = db.define(
    'area',
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      introduction: DataTypes.TEXT,
      // image: DataTypes.STRING,
    },
    {
      underscored: true,
    }
  )

  const Product = db.define(
    'product',
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      catchphrase: DataTypes.STRING,
    },
    {
      underscored: true,
    }
  )

  const Employee = db.define(
    'employee',
    {
      name: DataTypes.STRING,
      presentation: DataTypes.TEXT,
      /* image: {
        type: DataTypes.STRING,
        allowNull: true,
      }, */
    },
    {
      underscored: true,
    }
  )

  const Type = db.define(
    'type',
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      underscored: true,
    }
  )
  // Creating the 1 -> N association between Article and Comment
  // More on association: https://sequelize.org/master/manual/assocs.html
  Area.hasMany(Type, { foreignKey: 'article_name' })
  Area.hasMany(Employee, { foreignKey: 'employee_name' })
  Area.hasMany(Product, { foreignKey: 'product_name' })
  Employee.belongsToMany(Product, { through: 'product_name' })
  Type.hasMany(Product, { foreignKey: 'product_name' })
  Product.belongsToMany(Employee, { through: 'employee_name' })

  db._tables = {
    Area,
    Employee,
    Type,
    Product,
  }
}

/**
 * Function to insert some fake info in the database
 */
async function insertFakeData() {
  const { Area } = db._tables
  await Article.create({
    name: 'PCs area',
    introduction: 'PCs area INTRODUCTION',
    description: 'PCs area DESCRIPTION',
  })
  await Article.create({
    name: 'Smarthones area',
    introduction: 'Smartphones area INTRODUCTION',
    description: 'Smartphones area DESCRIPTION',
  })
  await Article.create({
    name: 'Software area',
    introduction: 'Software area INTRODUCTION',
    description: 'Software area DESCRIPTION',
  })
  await Article.create({
    name: 'Cloud area',
    introduction: 'Cloud area INTRODUCTION',
    description: 'Cloud area DESCRIPTION',
  })
}
/**
 * Function to initialize the database. This is exported and called in the main api.js file
 */
async function initializeDatabase() {
  // Call the function for the database structure definition
  defineDatabaseStructure()
  // Synchronize Sequelize with the actual database
  await db.sync({ force: true })
  // Call the function to insert some fake data
  await insertFakeData()
  return db
}

export default initializeDatabase
