const { Sequelize, DataTypes } = require('sequelize')

// Development
// const db = new Sequelize('postgres://berk:123456@localhost:5432/amms')
const db = new Sequelize(
  'postgres://postgres:PwdPostgre@localhost:5432/hypermedia-test'
)

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
  Area.hasMany(Type, { foreignKey: 'type_name' })
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
  const { Area, Product, Type } = db._tables
  await Area.create({
    name: 'PCs',
    introduction: 'PCs area INTRODUCTION',
    description: 'PCs area DESCRIPTION',
  })
  const smartphone = await Area.create({
    name: 'Smarthones',
    introduction: 'A smartphone for everyone',
    description: `Explore Galaxy. Find your place in the Galaxy. 
    With 2 dynamic, cutting-edge lines of phones designed for everyone 
    from creatives and business professionals to students and gamers, Galaxy has a phone built for you.`,
  })
  await Area.create({
    name: 'Software',
    introduction: 'Software area INTRODUCTION',
    description: 'Software area DESCRIPTION',
  })
  await Area.create({
    name: 'Cloud',
    introduction: 'Cloud area INTRODUCTION',
    description: 'Cloud area DESCRIPTION',
  })

  const flagship = await Type.create({
    name: 'flagship',
    description: `Starting from $999.99.
      If you are looking to transform the ordinary into the extraordinary, 
      the Flagship series has you covered. Revolutionary 8K cameras, all-day power 
      and hyper-fast streaming just got a makeover for 2021 with the all-new, epic Flagship V4.`,
  })

  const budget = await Type.create({
    name: 'budget',
    description: `Starting from $199.99.
        The Budget series has everything you want in a smartphone, 
        like long-lasting, fast-charging batteries, multi-lens cameras and 
        Infinity Displays—at the incredible value you deserve.`,
  })

  const flagshipV4 = await Product.create({
    name: 'Flagship-V4',
    description: `Introducing Flagship V4.The highest resolution photos and video on a smartphone.
      Flagship's fastest processor yet. A battery that goes all-day—and then some. 
      First ever Pen compatibility. A striking new design. It's an Ultra that easily lives up to its name. 
      From $499.99 with eligible trade-in or $13.89/mo for 36 months⊕ with the highest online instant trade-in values.`,
    catchphrase: 'Epic in every way.',
  })

  const flagshipV3 = await Product.create({
    name: 'Flagship-V3',
    description: `This is the phone made for people who want it all. 
      It's packed with features tailor-made for fans on all kinds—whether you love photography, 
      gaming or filling your feed with all that inspires you. This is the phone that leaves compromise behind, 
      delivering the innovations of Flagship V3 to make incredible technology available to all. 
      From $399.99 with eligible trade-inᶿ or $11.11/mo for 36 months`,
    catchphrase: 'All you want, to do all you love',
  })

  const flagshipV2 = await Product.create({
    name: 'Flagship-V2',
    description: `We do more than hit the reset button. 
    Before any device gets labeled Samsung Certified Pre-Owned, it gets completely taken apart and rebuilt 
    by the same engineers who build our new phones. They replace worn out pieces, 
    and we include the same one-year warranty our new phones come with for extra peace of mind. 
    Connected Living. Better Together. 
    When everything works together, you can focus on what matters most. 
    Learn how you can make Samsung Connected Living a part of your world.`,
    catchphrase: 'Epic in every way.',
  })

  const flagshipV1 = await Product.create({
    name: 'Flagship-V1',
    description: `We do more than hit the reset button. 
      Before any device gets labeled Samsung Certified Pre-Owned, it gets completely taken apart and rebuilt 
      by the same engineers who build our new phones. They replace worn out pieces, 
      and we include the same one-year warranty our new phones come with for extra peace of mind. 
      Connected Living. Better Together. 
      When everything works together, you can focus on what matters most. 
      Learn how you can make Samsung Connected Living a part of your world.`,
    catchphrase: 'A New Kind of New.',
  })

  const budgetV3 = await Product.create({
    name: 'Budget-V3',
    description: `Introducing the Budget V3, a smartphone that delivers all of the incredible features 
      and performance you want from a Galaxy device, at an amazing value. 
      With blazing 5G speed, a long-lasting battery, and an impressive quad camera, 
      it’s time to see why the V3 gives you so much more than you bargained for. 
      The Budget V3 series phone starts at $349.99 with eligible trade-in.`,
    catchphrase: '5G for all.',
  })

  const budgetV2 = await Product.create({
    name: 'Budget-V2',
    description: `Outfitted with awesome innovations and core features, 
      the budget V2 lets you stay connected without breaking the bank. 
      Capture share-worthy photos or videos with a tap of a finger, go longer with a 2-day battery, 
      scroll through your feed at lightning speed and stream what you want, when you want.`,
    catchphrase: 'Introducing the Budget V2.',
  })

  const budgetV1 = await Product.create({
    name: 'Budget-V1',
    description: `Budget V1 pairs awesome core features with our most affordable 5G devices on the market. 
      That means you get a long-lasting battery, expandable storage, multiple cameras, 
      a super-crisp display and blazing-fast 5G speed`,
    catchphrase: 'Introducing the Budget V1.',
  })

  await smartphone.addType(flagship)
  await smartphone.addType(budget)

  await flagship.addProduct(flagshipV1.id)
  await flagship.addProduct(flagshipV2.id)
  await flagship.addProduct(flagshipV3.id)
  await flagship.addProduct(flagshipV4.id)

  await budget.addProduct(budgetV1.id)
  await budget.addProduct(budgetV2.id)
  await budget.addProduct(budgetV3.id)

  await smartphone.addProduct(flagshipV1.id)
  await smartphone.addProduct(flagshipV2.id)
  await smartphone.addProduct(flagshipV3.id)
  await smartphone.addProduct(flagshipV4.id)
  await smartphone.addProduct(budgetV1.id)
  await smartphone.addProduct(budgetV2.id)
  await smartphone.addProduct(budgetV3.id)
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
