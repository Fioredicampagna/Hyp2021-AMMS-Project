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
      alt: DataTypes.TEXT,
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
  Product.belongsToMany(Product, { as: 'related', through: 'RelatedProducts' })
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
  const galaxybooks = await Area.create({
    name: 'Galaxy Books',
    introduction:
      'From home office to kitchen table to living room couch. Reach the world with your book',
    description:
      'Staying connected to what matters is easy when you and your loved ones can work, learn, play, and catch up with devices designed for every part of your life. Galaxy Books help you connect with the people who matter most.',
    image: 'areas/pc/previewimage.jpg',
    alt:
      'Image that shows three products of the product line that represent the area as a whole',
  })

  const monitors = await Type.create({
    name: 'Monitors',
    description: '',
  })

  const accessories = await Type.create({
    name: 'Accessories',
    description: '',
  })

  const laptops = await Type.create({
    name: 'Laptops',
    description: '',
  })

  const book = await Product.create({
    name: 'Galaxy Book S Qualcomm, 13", Earthy Gold',
    description:
      'Samsung Galaxy Book S bring the advantages of the smartphone to a new computing device that’s fast, turns on in an instant, connects with LTE and goes far on a single charge. The super stylish, ultra-light design for a life without limits',
    catchphrase: 'Introducing the first mobile-PC by Galaxy',
    image: 'products/pc/book.png',
    alt: 'Image that shows the galaxy book s product from the front',
  })

  const pro = await Product.create({
    name: 'Galaxy Book Pro 360, 13.3", Mystic Navy',
    description:
      'Make everything you do look unbelievably brilliant with a 13.3”/15.6” AMOLED screen that’s the most advanced ever in a Galaxy Book. Lose yourself in your favorite content with vibrant cinematic-like viewing at 100% color volume and a contrast ratio that’s millions-to-one. Work inside or in direct sunlight, either way, the screen adapts to your space to constantly give you perfect color and lessen eye strain by reducing harmful blue light.',
    catchphrase: 'Make everything easy on the eyes',
    image: 'products/pc/pro.jpg',
    alt: 'Image that shows the Galaxy Book Pro product from the front',
  })

  const portablessd = await Product.create({
    name: 'Portable SSD T5 USB 3.1 1TB (Black)',
    description:
      'Get your entertainment, coursework, or games anywhere, on any device. Feel the freedom of huge storage and speedy transfers to laptops, smartphones, game consoles and more. The latest T5 easily slides in your pocket or purse.',
    catchphrase: 'The world in your pocket',
    image: 'products/pc/portablessd.jpg',
    alt: 'Image that shows the Portable SSD product from the front',
  })

  const hires = await Product.create({
    name:
      '34" S65UA Ultra WQHD High Resolution Monitor with 1000R curvature and USB-C',
    description:
      'Within games, movies or design projects, surround yourself with the 34" ultra-wide curved display featuring a 21:9 aspect ratio. Ultra-WQHD provides the simplest way to maximize your screen real estate and experience truly seamless multitasking on just one screen.',
    catchphrase: 'Feel fully immersed',
    image: 'products/pc/hires.jpg',
    alt: 'Image that shows the High Resolution Monitor product from the front',
  })

  const flexblue = await Product.create({
    name: 'Galaxy Book Flex, 15", i7, Royal Blue',
    description:
      'Control your laptop from a distance with a Bluetooth-powered S Pen that doubles as a gesture-sensitive remote control. Make presentations, stop, pause or play videos and more – from several meters away! ',
    catchphrase: 'S Pen Air Action',
    image: 'products/pc/flexblue.png',
    alt:
      'Image that shows both the Galaxy Book Flex product and the included S pen accessory',
  })

  const ionwhite = await Product.create({
    name: 'Galaxy Book Ion, 15", i7, Silver',
    description:
      'Images and videos become more lifelike than ever – thanks to a QLED display with VDE-certified 100% colour volume* – like that used in our number one selling TVs**. Its bright, max 600-nit outdoor screen mode lets you watch videos and play games even when you’re outside. Three slim bezels provide a wider and more immersive experience. ',
    catchphrase:
      'Computing muscle meets lightweight design 100% Colour volume* QLED Display',
    image: 'products/pc/ionwhite.png',
    alt: 'Image that shows the galaxy book ion product from the front',
  })

  const monitorcurve = await Product.create({
    name: '49" G95T Curved DQHD, 240Hz, QLED Monitor',
    description:
      "Superior picture execution. A new level of vibrant resolution is achieved by QLED's bright and realistic shades and hues. Enjoy awe-inspiring game scenes with accuracy in every last detail. HDR1000 and HDR10+" +
      'Imagery even closer to reality. HDR1000 darkens darks and brightens whites for more dimensional contrast. HDR10+ optimises brightness and contrast, so game scenes look exactly how the developer intended. Visuals look out of this world and just like true life, all at the same time.',
    catchphrase: 'The curve revolution',
    image: 'products/pc/monitorcurve.png',
    alt: 'Image that shows the dqhd monitor from the front.',
  })

  const ssd = await Product.create({
    name: '970 PRO NVMe M.2 SSD 512GB',
    description:
      'Experience the best. For intensive workloads on PCs and workstations, the 970 PRO gives utmost performance enabled by Samsung†s NVMe SSD leadership. The latest V-NAND technology and new Phoenix controller in a compact M.2 (2280) form factor surpass the demands of tech enthusiasts and professionals.',
    catchphrase: 'The SSD that goes beyond',
    image: 'products/pc/ssd.png',
    alt: 'Image that shows the PRO NVMe SSD from the front.',
  })

  const uhdmonitor = await Product.create({
    name: '32" Curved UHD high resolution monitor',
    description:
      "The leader in curved monitors. Samsung has led the curved monitor market since being the first to introduce the innovative displays to the world in 2015. With industry-leading technology in a full line-up, Samsung's curved monitors are consistently number one in market share and consumer choice.",
    catchphrase: 'Complete Immersion in True Detail The curve champion',
    image: 'products/pc/uhdmonitor.png',
    alt: 'Image that shows the curved uhd monitor from the front.',
  })

  const usb = await Product.create({
    name: 'Duo Plus USB Type-C Flash Drive (2020) 256GB',
    description:
      'Double up on convenience. The DUO Plus is a Type-C drive with a super-useful Type-A adapter. Eliminate worries as the intuitive integrated Type-A adapter works with your older devices. Now you can flexibly move data and free up space with superior speed and performance. Either way is the right way',
    catchphrase: 'Two flash drives, in one.',
    image: 'products/pc/usb.png',
    alt: 'Image that shows the usb type-c flash drive closed from the side.',
  })

  const software = await Area.create({
    name: 'Software',
    introduction:
      'Powerful creativity and productivity tools — apps that help you explore, connect and work more efficiently.',
    description:
      'From home to business, from desktop to web and the devices in between, we deliver the tools you need to create your best work.',
    image: 'areas/software/softwarePreview.jpeg',
    alt:
      'Image that shows a silhouette of a pc with a gear logo on it, which simbolizes utility software.',
  })

  const trello = await Product.create({
    name: 'Trello',
    description: `Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way your team works is unique—accomplish it all with Trello.`,
    catchphrase: 'Trello helps teams move work forward.',
    image: 'products/software/trello.png',
    alt: 'Image that shows an icon representing Trello services.',
  })

  const pocket = await Product.create({
    name: 'Pocket',
    description: `Save articles, videos and stories from any publication, page or app. Curate your own space filled with everything you can’t wait to learn. Immerse yourself in great content anywhere – even offline. Read or listen without distraction, on any device.`,
    catchphrase: 'Save content from everywhere.',
    image: 'products/software/pocket.png',
    alt: 'Image that shows an icon representing pocket services.',
  })

  const woven = await Product.create({
    name: 'Woven',
    description: `Built for today’s problems, Woven makes it easy to plan, join, and manage video events — helping you schedule with Zoom or Google Hangouts. And with multiple time zone integrations, Woven is built for remote work. `,
    catchphrase: 'Power the future of work today. ',
    image: 'products/software/woven.png',
    alt: 'Image that shows an icon representing woven services.',
  })

  const evernote = await Product.create({
    name: 'Evernote',
    description: `Because there’s no single tool for all of your organizing needs, Evernote integrates with your favorite apps like Google Drive, Outlook, Salesforce, and Slack so you can be more productive from brainstorm to execution. `,
    catchphrase: 'Accomplish more with better notes.',
    image: 'products/software/evernote.png',
    alt: 'Image that shows an icon representing evernote services.',
  })

  const todoist = await Product.create({
    name: 'Todoist',
    description: `Todoist gives you the confidence that everything’s organized and accounted for, so you can make progress on the things that are important to you.`,
    catchphrase: 'From overwhelmed to on top of it.',
    image: 'products/software/todoist.png',
    alt: 'Image that shows an icon representing todoist services.',
  })

  const cloud = await Area.create({
    name: 'Cloud services',
    introduction:
      'Cloud services are services available via a remote cloud computing server rather than an on-site server. ',
    description:
      'The term "cloud services" refers to a wide range of services delivered on demand to companies and customers over the internet. These services are designed to provide easy, affordable access to applications and resources, without the need for internal infrastructure or hardware.' +
      "Cloud services are fully managed by cloud computing vendors and service providers. They’re made available to customers from the providers' servers, so there's no need for a company to host the applications on its own on-premises servers. ",
    image: 'areas/cloud/cloudPreview.png',
    alt:
      'Image that shows clouds containing icons of utility software exchanging messages between them.',
  })

  const databases = await Product.create({
    name: 'Databases',
    description: `Migrate and manage enterprise data with security, reliability, high availability, and fully managed data services. `,
    catchphrase: 'State of the art data management.',
    image: 'products/cloud/db.jpg',
    alt: 'Image that shows an icon representing database services.',
  })

  const aiml = await Product.create({
    name: 'AI & Machine Learning',
    description: `Equip your teams with AI and ML solutions to increase efficiency within customer care, recruiting, and beyond. `,
    catchphrase: 'Make our hardware do the thinking for you.',
    image: 'products/cloud/ai.jpg',
    alt: 'Image that shows an icon representing artificial intelligence.',
  })

  const media = await Product.create({
    name: 'Media & Entertainment',
    description: `Create world-class content, streamline workflows, quickly launch new digital services, and transform audience experiences. `,
    catchphrase: 'Be part of the modern entertainment world.',
    image: 'products/cloud/media-icon.svg',
    alt: 'Image that shows an icon representing media services.',
  })

  const business = await Product.create({
    name: 'Business application platform',
    description: `Securely automate processes and easily create applications without coding by extending your existing data with APIs. `,
    catchphrase: 'No need to do yourself the boring stuff.',
    image: 'products/cloud/devops-icon.svg',
    alt: 'Image that shows an icon representing the developer tools.',
  })

  const security = await Product.create({
    name: 'Security',
    description: `Detect, investigate, and respond to online threats with proven security solutions to help protect your business. `,
    catchphrase: 'Epic in every way.',
    image: 'products/cloud/security.svg',
    alt: 'Image that shows an icon representing the security services',
  })

  const smartphone = await Area.create({
    name: 'Smartphones',
    introduction: 'A smartphone for everyone',
    description: `Explore Galaxy. Find your place in the Galaxy. 
    With 2 dynamic, cutting-edge lines of phones designed for everyone 
    from creatives and business professionals to students and gamers, Galaxy has a phone built for you.`,
    image: 'areas/smartphone/previewSmartphone.png',
    alt: 'Image that showsh a smartphone held in one hand.',
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
    image: 'products/smartphone/flagshipV4.jpg',
    alt: 'Image that shows front and back of the flagshipV4.',
  })

  const flagshipV3 = await Product.create({
    name: 'Flagship-V3',
    description: `This is the phone made for people who want it all. 
      It's packed with features tailor-made for fans on all kinds—whether you love photography, 
      gaming or filling your feed with all that inspires you. This is the phone that leaves compromise behind, 
      delivering the innovations of Flagship V3 to make incredible technology available to all. 
      From $399.99 with eligible trade-inᶿ or $11.11/mo for 36 months`,
    catchphrase: 'All you want, to do all you love',
    image: 'products/smartphone/flagshipV3.png',
    alt: 'Image that shows front and back of the flagshipV3.',
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
    image: 'products/smartphone/flagshipV2.jpg',
    alt: 'Image that shows front and back of the flagshipV2.',
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
    image: 'products/smartphone/flagshipV1.jpg',
    alt: 'Image that shows front and back of the flagshipV1.',
  })

  const budgetV3 = await Product.create({
    name: 'Budget-V3',
    description: `Introducing the Budget V3, a smartphone that delivers all of the incredible features 
      and performance you want from a Galaxy device, at an amazing value. 
      With blazing 5G speed, a long-lasting battery, and an impressive quad camera, 
      it’s time to see why the V3 gives you so much more than you bargained for. 
      The Budget V3 series phone starts at $349.99 with eligible trade-in.`,
    catchphrase: '5G for all.',
    image: 'products/smartphone/budgetV3.png',
    alt: 'Image that shows front and back of the budgetV3.',
  })

  const budgetV2 = await Product.create({
    name: 'Budget-V2',
    description: `Outfitted with awesome innovations and core features, 
      the budget V2 lets you stay connected without breaking the bank. 
      Capture share-worthy photos or videos with a tap of a finger, go longer with a 2-day battery, 
      scroll through your feed at lightning speed and stream what you want, when you want.`,
    catchphrase: 'Introducing the Budget V2.',
    image: 'products/smartphone/budgetV2.jpg',
    alt: 'Image that shows front and back of the budgetV2.',
  })

  const budgetV1 = await Product.create({
    name: 'Budget-V1',
    description: `Budget V1 pairs awesome core features with our most affordable 5G devices on the market. 
      That means you get a long-lasting battery, expandable storage, multiple cameras, 
      a super-crisp display and blazing-fast 5G speed`,
    catchphrase: 'Introducing the Budget V1.',
    image: 'products/smartphone/budgetV1.jpg',
    alt: 'Image that shows front and back of the budgetV1.',
  })

  const tomhanks = await Employee.create({
    name: 'Tom Hanks',
    designation: 'Founder and Chief Executive Officer',
    presentation: `Thomas Jeffrey Hanks is an American actor and filmmaker. Known for both his comedic and dramatic roles, he is one of the most popular and recognizable film stars worldwide, and is regarded as an American cultural icon. Hanks's films have grossed more than $4.9 billion in North America and more than $9.96 billion worldwide, making him the fourth-highest-grossing actor in North America.

      Hanks made his breakthrough with leading roles in the comedies Splash and Big. He won two consecutive Academy Awards for Best Actor for starring as a gay lawyer suffering from AIDS in Philadelphia and the title character in Forrest Gump. Hanks collaborated with film director Steven Spielberg on five films: Saving Private Ryan, Catch Me If You Can, The Terminal, Bridge of Spies, and The Post, as well as the 2001 miniseries Band of Brothers, which launched him as a director, producer, and screenwriter. Hanks's other films include the romantic comedies Sleepless in Seattle and You've Got Mail; the dramas Apollo 13, The Green Mile, Cast Away, Road to Perdition, and Cloud Atlas; and the biographical dramas Charlie Wilson's War, Captain Phillips, Saving Mr. Banks, Sully, A Beautiful Day in the Neighborhood, and News of the World. He has also appeared as the title character in the Robert Langdon film series, and has voiced Sheriff Woody in the Toy Story film series.`,
    image: 'employees/tom_hanks.jpg',
    alt: 'Front view of the employee Tom Hanks.',
  })

  const willsmith = await Employee.create({
    name: 'Will Smith',
    designation: 'Founder and Chief Product Officer',
    presentation: `Willard Carroll Smith Jr is an American actor, rapper, and film producer. Smith has been nominated for five Golden Globe Awards and two Academy Awards, and has won four Grammy Awards.

      During the late 1980s, he achieved modest fame as a rapper under the name The Fresh Prince. In 1990, his popularity increased dramatically when he began starring in the NBC television series The Fresh Prince of Bel-Air, which ran for six seasons until 1996. After the series ended, Smith transitioned from television to film and went on to star in numerous blockbuster films. He is the only actor to have starred in eight consecutive films which grossed over $100 million in the United States box office, eleven consecutive films which grossed over $150 million internationally, and eight consecutive films which opened at the number one spot in the US box office tally.

      Smith has been ranked as the most bankable star worldwide by Forbes. In April 2007, Newsweek called him "the most powerful actor in Hollywood". As of 2014, 17 of the 21 films in which he has had leading roles have accumulated worldwide gross earnings of over $100 million each, with five taking in over $500 million each in global box office receipts. As of 2016, his films have grossed $7.5 billion at the global box office. For his performances as boxer Muhammad Ali in Ali and stockbroker Chris Gardner in The Pursuit of Happyness, Smith received Academy Award nominations for Best Actor.`,
    image: 'employees/will_smith.jpg',
    alt: 'Front view of the employee Will Smith.',
  })

  const denzwashington = await Employee.create({
    name: 'Denzel Washington',
    designation: 'Chief Technology Officer',
    presentation: `Denzel Hayes Washington Jr. is an American actor, director, and producer. 
      He has been described as an actor who reconfigured "the concept of classic movie stardom," 
      mostly associating with characters defined by their grace, dignity, humanity, and inner strength.`,
    image: 'employees/denzel_washington.jpg',
    alt: 'Front view of the employee Denzel Washington.',
  })

  const leodicaprio = await Employee.create({
    name: 'Leonardo DiCaprio',
    designation: 'Chief Business Officer',
    presentation: `Leonardo Wilhelm DiCaprio is an American actor, film producer, and environmentalist. 
      He has often played unconventional roles, particularly in biopics and period films. 
      As of 2019, his films have grossed $7.2 billion worldwide, 
      and he has placed eight times in annual rankings of the world's highest-paid actors.`,
    image: 'employees/leonardo_dicaprio.jpg',
    alt: 'Front view of the employee Leonardo DiCaprio.',
  })

  const morgfreeman = await Employee.create({
    name: 'Morgan Freeman',
    designation: 'Chief Marketing Officer',
    presentation: `Morgan Freeman is an American actor, director, and narrator. 
      He has appeared in a range of film genres portraying character roles and is particularly known for his distinctive deep voice. 
      Freeman is the recipient of various accolades, including an Academy Award, a Golden Globe Award, and a Screen Actors Guild`,
    image: 'employees/morgan_freeman.jpg',
    alt: 'Front view of the employee Morgan Freeman.',
  })

  const bradpitt = await Employee.create({
    name: 'Brad Pitt',
    designation: 'Chief Operating Officer',
    presentation: `William Bradley Pitt is an American actor and film producer. He has received multiple awards, including two Golden Globe Awards and an Academy Award for his acting, in addition to another Academy Award, another Golden Globe Award and a Primetime Emmy Award as a producer under his production company, Plan B Entertainment.

      Pitt first gained recognition as a cowboy hitchhiker in the road film Thelma & Louise. His first leading roles in big-budget productions came with the drama films A River Runs Through It and Legends of the Fall, and the horror film Interview with the Vampire. He gave critically acclaimed performances in the crime thriller Seven and the science fiction film 12 Monkeys, the latter earning him a Golden Globe Award for Best Supporting Actor and an Academy Award nomination.

      Pitt starred in Fight Club and the heist film Ocean's Eleven, as well as its sequels, Ocean's Twelve and Ocean's Thirteen. His greatest commercial successes have been Ocean's Eleven , Troy, Mr. & Mrs. Smith, World War Z, and Once Upon a Time in Hollywood, for which he won a second Golden Globe Award and the Academy Award for Best Supporting Actor. Pitt's other Academy Award nominated performances were in The Curious Case of Benjamin Button and Moneyball. He produced The Departed and 12 Years a Slave, both of which won the Academy Award for Best Picture, and also The Tree of Life, Moneyball, and The Big Short, all of which were nominated for Best Picture. Alongside George Clooney, Pitt is one of two actors to have won Academy Awards for both Best Supporting Actor and Best Picture.`,
    image: 'employees/brad_pitt.jpg',
    alt: 'Front view of the employee Brad Pitt.',
  })

  const billgates = await Employee.create({
    name: 'Bill Gates',
    designation: 'IT director',
    presentation: `William Henry Gates III is an American business magnate, software developer, investor, author, and philanthropist He is considered one of the best known entrepreneurs of the microcomputer revolution of the 1970s and 1980s.

      Gates launched their first retail version of Microsoft Windows on November 20, 1985 in an attempt to fend off competition from Apple's Macintosh GUI, which had bewitched consumers with its simplicity and ease of use.

      Since 1987, Bill Gates has been included in the Forbes list of the world's wealthiest people. From 1995 to 2017, he held the Forbes title of the richest person in the world every year except from 2010 to 2013.`,
    image: 'employees/billgates.jpg',
    alt: 'Front view of the employee Bill Gates.',
  })

  const edboon = await Employee.create({
    name: 'Ed Boon',
    designation: 'IT manager',
    presentation: `Edward John Boon is an American video game programmer, voice actor, and director who was employed for over 15 years at Midway Games. Boon is best known for the widely popular Mortal Kombat series, which he created with John Tobias.

      After graduation, he was employed by Williams Entertainment in their pinball department, working on approximately 20 pinball games over the next two years. During this time, he was called the Mortal Master, an early indicator towards a future creation.

      Boon was ranked #100 in IGN's 2009 list of "Top 100 Game Creators" for his involvement in the Mortal Kombat series. He continues to be directly involved with the MK franchise and its multimedia side projects, and has also provided voice acting and motion capture work for the games.`,
    image: 'employees/edboon.jpg',
    alt: 'Front view of the employee Ed Boon.',
  })

  const filsaime = await Employee.create({
    name: 'Reggie Fils-Aimé',
    designation: 'Sales and Marketing Director',
    presentation: `Reginald Fils-Aimé is an American businessman best known for being the president and chief operating officer of Nintendo of America, the North American division of the Japanese video game company Nintendo, from 2006 to 2019.

    Fils-Aimé gained celebrity status among gamers following his appearance at Nintendo's E3 2004 press conference in May 2004, and helped to revitalize Nintendo's image as a major contender among the other video game console makers. Fils-Aimé had held previous sales and marketing executive roles at Procter & Gamble, Pizza Hut, Guinness, Derby Cycle, Panda Express, and VH1.
    
    Fils-Aimé retired as president of Nintendo of America on April 15, 2019. He subsequently became a Leader in Residence at Cornell University and later named to the Board of Directors for AMMS.`,
    image: 'employees/filsaime.jpg',
    alt:
      'Photograph of the Employee Reggie Fils-Aimé where he is talking for an audience.',
  })

  const johncarmack = await Employee.create({
    name: 'John Carmack',
    designation: 'Lead Senior Programmer',
    presentation: `John D. Carmack II is an American computer programmer, video game developer and engineer. He co-founded the video game company id Software and was the lead programmer of its games Commander Keen, Wolfenstein 3D, Doom, Quake, and their sequels. 
    
    Carmack made innovations in 3D computer graphics, such as his Carmack's Reverse algorithm for shadow volumes. 
    
    In 2013, he resigned from id to work full-time at AMMS, where he serves as Lead Senior Programmer`,
    image: 'employees/johncarmack.jpeg',
    alt: 'Front view of the employee John Carmack.',
  })

  const johnromero = await Employee.create({
    name: 'John Romero',
    designation: 'Junior Programmer',
    presentation: `Alfonso John Romero is an American director, designer, programmer, and developer in the video game industry. 
    
    He is best known as a co-founder of id Software and designer for many of their games, including Wolfenstein 3D, Dangerous Dave, Hexen, Doom, Doom II and Quake. 
    
    His game designs and development tools, along with new programming techniques created and implemented by id Software's lead programmer John D. Carmack, led to a mass popularization of the first-person shooter in the 1990s.`,
    image: 'employees/johnromero.jpg',
    alt: 'Front view of the employee John Romero.',
  })

  const kaneko = await Employee.create({
    name: 'Kazuma Kaneko',
    designation: 'Art Director',
    presentation: `Kazuma Kaneko is a Japanese art director, illustrator and employee at AMMS. While working for AMMS, he has also done freelance work for Capcom and Konami among many others.
    
    Kaneko designed concept art for games like Devil May Cry 3 and Zone of the Enders 2. 
    
    He also illustrates covers for several novels such as The Case of the Dragon Slayer.`,
    image: 'employees/Kaneko.webp',
    alt:
      'Edited portrait of the employee Kazuma Kaneko, which shows his title and name in a stylized way.',
  })

  const linus = await Employee.create({
    name: 'Linus Torvalds',
    designation: 'IT Systems Architect',
    presentation: `Linus Benedict Torvalds is a Finnish-American software engineer who is the creator and, historically, the main developer of the Linux kernel, used by Linux distributions and other operating systems such as Android.
    
    He also created the distributed revision control system Git and the scuba dive logging and planning software Subsurface.

    He was honored, along with Shinya Yamanaka, with the 2012 Millennium Technology Prize by the Technology Academy Finland "in recognition of his creation of a new open source operating system for computers leading to the widely used Linux kernel."`,
    image: 'employees/linus.jpg',
    alt: 'Front view of the employee Linus Torvalds.',
  })

  const michelancel = await Employee.create({
    name: 'Michel Ancel',
    designation: 'Cloud Infrastructure Architect',
    presentation: `Michel Ancel is a French video game designer. He is best known for creating the Rayman franchise, and was the lead designer or director for several of the games, including Rayman Origins and its sequel Rayman Legends.
    
    He is also known for the cult hit video game Beyond Good & Evil and for King Kong, based on Peter Jackson's film King Kong, which was critically acclaimed.
    
    In 2017 he began working for AMMS, putting his creative skills to great use for the company.`,
    image: 'employees/michelancel.jpg',
    alt: 'Front view of the employee Michel Ancel.',
  })

  const miyamoto = await Employee.create({
    name: 'Shigeru Miyamoto',
    designation: 'Development Director',
    presentation: `Shigeru Miyamoto is a Japanese software designer, producer and development director at AMMS, where he serves as one of its representative directors.
    
    He is the creator of some of the most acclaimed and best-selling game franchises of all time, including Mario and The Legend of Zelda.

    Born in Sonobe, Japan, Miyamoto graduated from Kanazawa Municipal College of Industrial Arts. He originally sought a career as a manga artist, until developing an interest in video games and software development.`,
    image: 'employees/miyamoto.jpg',
    alt: 'Front view of the employee Shigeru Miyamoto.',
  })

  const molyneux = await Employee.create({
    name: 'Peter Molyneux',
    designation: 'Computer Systems Manager',
    presentation: `Peter Douglas Molyneux is an English video game designer and programmer.
    
    He created the god games Populous, Dungeon Keeper, and Black & White, as well as Theme Park, the Fable series, Curiosity – What's Inside the Cube?, and Godus. 
    
    He currently works at AMMS as .`,
    image: 'employees/molyneux.jpg',
    alt: 'Front view of the employee Peter Molyneux.',
  })

  const nagoshi = await Employee.create({
    name: 'Toshihiro Nagoshi',
    designation: 'Chief Information Officer ',
    presentation: `Toshihiro Nagoshi is a Japanese video game producer and designer. 
    
    He was the chief creative officer for Sega until 2021 when he left the company to become chief information officer for AMMS.`,
    image: 'employees/nagoshi.jpg',
    alt:
      "Photograph of the employee Toshihiro Nagoshi, while he's attending an interview.",
  })

  const stevejobs = await Employee.create({
    name: 'Steve Jobs',
    designation: 'Chief Security Officer',
    presentation: `Steven Paul Jobs is an American business magnate, industrial designer, investor, and media proprietor.
    
    He was the chairman, chief executive officer (CEO), and co-founder of Apple Inc. before moving to AMMS; the chairman and majority shareholder of Pixar; a member of The Walt Disney Company's board of directors following its acquisition of Pixar; and the founder, chairman, and CEO of NeXT. 
    
    Jobs is widely recognized as a pioneer of the personal computer revolution of the 1970s and 1980s, along with his early business partner and fellow Apple co-founder Steve Wozniak.`,
    image: 'employees/stevejobs.jpg',
    alt:
      "Photograph of the employee Steve Jobs presenting one of the company's new products.",
  })

  const toddhoward = await Employee.create({
    name: 'Todd Howard',
    designation: 'Executive Producer',
    presentation: `Todd Andrew Howard is an American video game designer, director, and producer. 
    
    He serves as executive producer at AMMS, where he has led the development of the majority of the software services offered by the company.`,
    image: 'employees/toddhoward.jpg',
    alt: 'Front view of the employee Todd Howard.',
  })

  const chrislattner = await Employee.create({
    name: 'Chris Lattner',
    designation: 'Software engineer',
    presentation: `Chris Lattner is an American software engineer best known as the main author of LLVM and related projects such as the Clang compiler and the Swift programming language.
    
    He joined AMMS as Software Engineer, after two years at Google Brain.
    
    Prior to that, he briefly served as Vice President of Autopilot Software at Tesla, Inc. and worked at Apple Inc. as Senior Director of the Developer Tools department, leading the Xcode, Instruments, and compiler teams.`,
    image: 'employees/chrislattner.jpg',
    alt:
      'Photograph of the Employee Chris Lattner where he is talking for an audience.',
  })

  await galaxybooks.addType(monitors)
  await galaxybooks.addType(accessories)
  await galaxybooks.addType(laptops)

  await galaxybooks.addProduct(book)
  await galaxybooks.addProduct(flexblue)
  await galaxybooks.addProduct(ionwhite)
  await galaxybooks.addProduct(monitorcurve)
  await galaxybooks.addProduct(uhdmonitor)
  await galaxybooks.addProduct(ssd)
  await galaxybooks.addProduct(usb)
  await galaxybooks.addProduct(pro)
  await galaxybooks.addProduct(hires)
  await galaxybooks.addProduct(portablessd)

  await laptops.addProduct(book)
  await laptops.addProduct(flexblue)
  await laptops.addProduct(ionwhite)
  await laptops.addProduct(pro)
  await monitors.addProduct(monitorcurve)
  await monitors.addProduct(uhdmonitor)
  await monitors.addProduct(hires)
  await accessories.addProduct(ssd)
  await accessories.addProduct(usb)
  await accessories.addProduct(portablessd)

  //await galaxybooks.addEmployee(tomhanks)
  //await galaxybooks.addEmployee(denzwashington)

  await tomhanks.addProduct(book)
  await denzwashington.addProduct(ionwhite)

  await cloud.addProduct(databases)
  await cloud.addProduct(aiml)
  await cloud.addProduct(business)
  await cloud.addProduct(security)
  await cloud.addProduct(media)

  await software.addProduct(trello)
  await software.addProduct(todoist)
  await software.addProduct(pocket)
  await software.addProduct(woven)
  await software.addProduct(evernote)

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

  await willsmith.addProduct(flagshipV1)
  await leodicaprio.addProduct(budgetV2)
  await morgfreeman.addProduct(flagshipV2)
  await bradpitt.addProduct(flagshipV3)

  //await smartphone.addEmployee(willsmith)
  //await smartphone.addEmployee(leodicaprio)
  //await smartphone.addEmployee(morgfreeman)
  //await smartphone.addEmployee(bradpitt)

  //await flagshipV1.addProduct(flagshipV2.id)
  //await flagshipV1.addProduct(flagshipV3.id)
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
