const { Sequelize, DataTypes } = require('sequelize')

// Development
// const db = new Sequelize('postgres://berk:123456@localhost:5432/amms')
// const db = new Sequelize('postgres://postgres:password@localhost:5432/AMMS')
//const db = new Sequelize(
//  'postgres://postgres:PwdPostgre@localhost:5432/hypermedia-test'
//)

// Production
const pg = require('pg')
pg.defaults.ssl = true
const db = new Sequelize(process.env.DATABASE_URL, {
  ssl: true,
  dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
})

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
      image: DataTypes.STRING,
      alt: DataTypes.TEXT,
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
      image: DataTypes.STRING,
      alt: DataTypes.TEXT,
    },
    {
      underscored: true,
    }
  )

  const Feature = db.define(
    'feature',
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      underscored: true,
    }
  )

  const Employee = db.define(
    'employee',
    {
      name: DataTypes.STRING,
      designation: DataTypes.STRING,
      presentation: DataTypes.TEXT,
      image: DataTypes.STRING,
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
  // Creating associations
  Area.hasMany(Type)
  Area.hasMany(Employee)
  Area.hasMany(Product)

  Employee.belongsTo(Area, { foreignKey: 'area_id' })
  Employee.belongsToMany(Product, { through: 'ProductEmployee' })

  Type.hasMany(Product)
  Type.belongsTo(Area, { foreignKey: 'area_id' })

  Product.belongsToMany(Employee, { through: 'ProductEmployee' })
  Product.hasMany(Feature)
  Product.hasMany(Product)
  Product.belongsTo(Type)
  Product.belongsTo(Area, { foreignKey: 'area_id' })

  db._tables = {
    Area,
    Employee,
    Type,
    Product,
    Feature,
  }
}

/**
 * Function to insert some fake info in the database
 */
async function insertFakeData() {
  const { Area, Product, Type, Employee } = db._tables
  const surface = await Area.create({
    name: 'SurfaceBooks',
    introduction:
      'Working remotely with Fake' +
      'From home office to kitchen table to living room couch, Fake delivers the power to get it done, hi-res touchscreens and Dolby® Audio™ for music and shows, HD cameras to stay in touch, and the Fake OS you know.',
    description:
      'Live, work, and play with Surface' +
      'Staying connected to what matters is easy when you and your loved ones can work, learn, play, and catch up with devices designed for every part of your life. Easily connect, share experiences, and celebrate big momentsSurface and Skype help you connect with the people who matter most. Built for one-on-one and group conversations of up to 50 people.Get things done, wherever you are' +
      'Whether in your home office, at the kitchen table, or on your living room couch, be creative, work your way, and have fun. From a fresh, sleek take on classic laptop design to detachable tablets to our signature adjustable Kickstand, there’s a lot to love about Surface PCs that adapt to you.Built-in cameras that show your best side' +
      'All Surface computers have HD video webcams that orient your face from whatever angle you take your calls, meetings, virtual get togethers, and more. Also, don’t drop video when you share your screen.',
    image: '/assets/areas/pc/previewimage.jpeg',
    alt:
      'Image that shows three products of the product line that represent the area as a whole',
  })

  const monitors = await Type.create({
    name: 'monitors',
    description: '',
  })

  const accessories = await Type.create({
    name: 'accessories',
    description: '',
  })

  const laptops = await Type.create({
    name: 'laptops',
    description: '',
  })

  const book = await Product.create({
    name: 'Galaxy Book S Qualcomm, 13", Earthy Gold',
    description:
      'Samsung Galaxy Book S bring the advantages of the smartphone to a new computing device that’s fast, turns on in an instant, connects with LTE and goes far on a single charge. The super stylish, ultra-light design for a life without limits',
    catchphrase: 'Introducing the first mobile-PC by Galaxy',
    image: '/assets/products/pc/book.png',
    alt: 'Image that shows the galaxy book s product from the front',
  })

  const flexblue = await Product.create({
    name: 'Galaxy Book Flex, 15", i7, Royal Blue',
    description:
      'Control your laptop from a distance with a Bluetooth-powered S Pen that doubles as a gesture-sensitive remote control. Make presentations, stop, pause or play videos and more – from several meters away! ',
    catchphrase: 'S Pen Air Action',
    image: '/assets/products/pc/flexblue.png',
    alt:
      'Image that shows both the Galaxy Book Flex product and the included S pen accessory',
  })

  const ionwhite = await Product.create({
    name: 'Galaxy Book Ion, 15", i7, Silver',
    description:
      'Images and videos become more lifelike than ever – thanks to a QLED display with VDE-certified 100% colour volume* – like that used in our number one selling TVs**. Its bright, max 600-nit outdoor screen mode lets you watch videos and play games even when you’re outside. Three slim bezels provide a wider and more immersive experience. ',
    catchphrase:
      'Computing muscle meets lightweight design 100% Colour volume* QLED Display',
    image: '/assets/products/pc/ionwhite.png',
    alt: 'Image that shows the galaxy book ion product from the front',
  })

  const monitorcurve = await Product.create({
    name: '49" G95T Curved DQHD, 240Hz, QLED Monitor',
    description:
      "Superior picture execution. A new level of vibrant resolution is achieved by QLED's bright and realistic shades and hues. Enjoy awe-inspiring game scenes with accuracy in every last detail. HDR1000 and HDR10+" +
      'Imagery even closer to reality. HDR1000 darkens darks and brightens whites for more dimensional contrast. HDR10+ optimises brightness and contrast, so game scenes look exactly how the developer intended. Visuals look out of this world and just like true life, all at the same time.',
    catchphrase: 'The curve revolution',
    image: '/assets/products/pc/monitorcurve.png',
    alt: 'Image that shows the dqhd monitor from the front.',
  })

  const ssd = await Product.create({
    name: '970 PRO NVMe M.2 SSD 512GB',
    description:
      'Experience the best. For intensive workloads on PCs and workstations, the 970 PRO gives utmost performance enabled by Samsung†s NVMe SSD leadership. The latest V-NAND technology and new Phoenix controller in a compact M.2 (2280) form factor surpass the demands of tech enthusiasts and professionals.',
    catchphrase: 'The SSD that goes beyond',
    image: '/assets/products/pc/ssd.png',
    alt: 'Image that shows the PRO NVMe SSD from the front.',
  })

  const uhdmonitor = await Product.create({
    name: '32" Curved UHD high resolution monitor',
    description:
      "The leader in curved monitors. Samsung has led the curved monitor market since being the first to introduce the innovative displays to the world in 2015. With industry-leading technology in a full line-up, Samsung's curved monitors are consistently number one in market share and consumer choice.",
    catchphrase: 'Complete Immersion in True Detail The curve champion',
    image: '/assets/products/pc/uhdmonitor.png',
    alt: 'Image that shows the curved uhd monitor from the front.',
  })

  const usb = await Product.create({
    name: 'Duo Plus USB Type-C Flash Drive (2020) 256GB',
    description:
      'Double up on convenience. The DUO Plus is a Type-C drive with a super-useful Type-A adapter. Eliminate worries as the intuitive integrated Type-A adapter works with your older devices. Now you can flexibly move data and free up space with superior speed and performance. Either way is the right way',
    catchphrase: 'Two flash drives, in one.',
    image: '/assets/products/pc/usb.png',
    alt: 'Image that shows the usb type-c flash drive closed from the side.',
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

  const employee1 = await Employee.create({
    name: 'Tom Hanks',
    designation: 'Founder and Cheif Executive Officer',
    presentation: `Thomas Jeffrey Hanks is an American actor and filmmaker. Known for both his comedic and dramatic roles, he is one of the most popular and recognizable film stars worldwide, and is regarded as an American cultural icon. Hanks's films have grossed more than $4.9 billion in North America and more than $9.96 billion worldwide, making him the fourth-highest-grossing actor in North America.

      Hanks made his breakthrough with leading roles in the comedies Splash and Big. He won two consecutive Academy Awards for Best Actor for starring as a gay lawyer suffering from AIDS in Philadelphia and the title character in Forrest Gump. Hanks collaborated with film director Steven Spielberg on five films: Saving Private Ryan, Catch Me If You Can, The Terminal, Bridge of Spies, and The Post, as well as the 2001 miniseries Band of Brothers, which launched him as a director, producer, and screenwriter. Hanks's other films include the romantic comedies Sleepless in Seattle and You've Got Mail; the dramas Apollo 13, The Green Mile, Cast Away, Road to Perdition, and Cloud Atlas; and the biographical dramas Charlie Wilson's War, Captain Phillips, Saving Mr. Banks, Sully, A Beautiful Day in the Neighborhood, and News of the World. He has also appeared as the title character in the Robert Langdon film series, and has voiced Sheriff Woody in the Toy Story film series.`,
    image: '/assets/employees/tom_hanks.jpg',
  })

  const employee2 = await Employee.create({
    name: 'Will Smith',
    designation: 'Founder and Cheif product Officer',
    presentation: `Willard Carroll Smith Jr is an American actor, rapper, and film producer. Smith has been nominated for five Golden Globe Awards and two Academy Awards, and has won four Grammy Awards.

      During the late 1980s, he achieved modest fame as a rapper under the name The Fresh Prince. In 1990, his popularity increased dramatically when he began starring in the NBC television series The Fresh Prince of Bel-Air, which ran for six seasons until 1996. After the series ended, Smith transitioned from television to film and went on to star in numerous blockbuster films. He is the only actor to have starred in eight consecutive films which grossed over $100 million in the United States box office, eleven consecutive films which grossed over $150 million internationally, and eight consecutive films which opened at the number one spot in the US box office tally.

      Smith has been ranked as the most bankable star worldwide by Forbes. In April 2007, Newsweek called him "the most powerful actor in Hollywood". As of 2014, 17 of the 21 films in which he has had leading roles have accumulated worldwide gross earnings of over $100 million each, with five taking in over $500 million each in global box office receipts. As of 2016, his films have grossed $7.5 billion at the global box office. For his performances as boxer Muhammad Ali in Ali and stockbroker Chris Gardner in The Pursuit of Happyness, Smith received Academy Award nominations for Best Actor.`,
    image: '/assets/employees/will_smith.jpg',
  })

  const employee3 = await Employee.create({
    name: 'Denzel Washington',
    designation: 'Cheif Technology Officer',
    presentation: `Denzel Hayes Washington Jr. is an American actor, director, and producer. 
      He has been described as an actor who reconfigured "the concept of classic movie stardom," 
      mostly associating with characters defined by their grace, dignity, humanity, and inner strength.`,
    image: '/assets/employees/denzel_washington.jpg',
  })

  const employee4 = await Employee.create({
    name: 'Leonardo DiCaprio',
    designation: 'Cheif Business Officer',
    presentation: `Leonardo Wilhelm DiCaprio is an American actor, film producer, and environmentalist. 
      He has often played unconventional roles, particularly in biopics and period films. 
      As of 2019, his films have grossed $7.2 billion worldwide, 
      and he has placed eight times in annual rankings of the world's highest-paid actors.`,
    image: '/assets/employees/leonardo_dicaprio.jpg',
  })

  const employee5 = await Employee.create({
    name: 'Morgan Freeman',
    designation: 'Cheif Marketing Officer',
    presentation: `Morgan Freeman is an American actor, director, and narrator. 
      He has appeared in a range of film genres portraying character roles and is particularly known for his distinctive deep voice. 
      Freeman is the recipient of various accolades, including an Academy Award, a Golden Globe Award, and a Screen Actors Guild`,
    image: '/assets/employees/morgan_freeman.jpg',
  })

  const employee6 = await Employee.create({
    name: 'Brad Pitt',
    designation: 'Cheif Operating Officer',
    presentation: `William Bradley Pitt is an American actor and film producer. He has received multiple awards, including two Golden Globe Awards and an Academy Award for his acting, in addition to another Academy Award, another Golden Globe Award and a Primetime Emmy Award as a producer under his production company, Plan B Entertainment.

      Pitt first gained recognition as a cowboy hitchhiker in the road film Thelma & Louise. His first leading roles in big-budget productions came with the drama films A River Runs Through It and Legends of the Fall, and the horror film Interview with the Vampire. He gave critically acclaimed performances in the crime thriller Seven and the science fiction film 12 Monkeys, the latter earning him a Golden Globe Award for Best Supporting Actor and an Academy Award nomination.

      Pitt starred in Fight Club and the heist film Ocean's Eleven, as well as its sequels, Ocean's Twelve and Ocean's Thirteen. His greatest commercial successes have been Ocean's Eleven , Troy, Mr. & Mrs. Smith, World War Z, and Once Upon a Time in Hollywood, for which he won a second Golden Globe Award and the Academy Award for Best Supporting Actor. Pitt's other Academy Award nominated performances were in The Curious Case of Benjamin Button and Moneyball. He produced The Departed and 12 Years a Slave, both of which won the Academy Award for Best Picture, and also The Tree of Life, Moneyball, and The Big Short, all of which were nominated for Best Picture. Alongside George Clooney, Pitt is one of two actors to have won Academy Awards for both Best Supporting Actor and Best Picture.`,
    image: '/assets/employees/brad_pitt.jpg',
  })

  await surface.addType(monitors)
  await surface.addType(accessories)
  await surface.addType(laptops)

  await surface.addProduct(book)
  await surface.addProduct(flexblue)
  await surface.addProduct(ionwhite)
  await surface.addProduct(monitorcurve)
  await surface.addProduct(uhdmonitor)
  await surface.addProduct(ssd)
  await surface.addProduct(usb)

  await laptops.addProduct(book)
  await laptops.addProduct(flexblue)
  await laptops.addProduct(ionwhite)
  await monitors.addProduct(monitorcurve)
  await monitors.addProduct(uhdmonitor)
  await accessories.addProduct(ssd)
  await accessories.addProduct(usb)

  await employee1.addProduct(book)

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

  await flagshipV1.addProduct(flagshipV2.id)
  await flagshipV1.addProduct(flagshipV3.id)
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
