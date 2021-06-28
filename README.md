# AMMS Group Website

## Group Information

### Group Name: AMMS

### Group Members:

#### 1. Amarù Giovanni

Person Code: 10605272&nbsp;
Mail: giovanni1.amaru@mail.polimi.it

Contribution: Worked on productLinks, areaPreview and employeeLinks components, worked on design and implementation of pages under areas folder, Who we are page, contact us page, all products page, product types page. Worked on DB design, ORM mapping and relationship design with sequelize and content fetching with rest APIs.

#### 2. Matteo Merz

#### 3. Morkoc Berk

Person Code: 10672278&nbsp;
Mail: berk.morkoc@mail.polimi.it

Contribution: Worked on products and areas pages, DB design and relations of entities, designed and created the main page as well as general structure of the pages, fixed CSS and responsivess failures.

#### 4. Sai Ram Sadineni

Person Code: 10744802&nbsp;
Mail: sairam.sadineni@mail.polimi.it

Contribution: Worked on productLinks and employeeLinks components, pages under areas folder, few products page, worked on CSS and responsiveness of navigation header and multiple pages. Worked on website content of few pages.

## Technical documentation

### Server and DB technologies

For the backend express is used, to handle REST api calls and to allow the content of the database to be retrieved as JSON files, which follow the structure of the ORM objects defined in db-config.js.
The website is hosted and deployed on the Heroku website, which also has native integration with a PostgreSQL implementation. The website reads the base URL of the server and URL of the DB from the environment variables which are set in Heroku.

### Components of the website

#### areaPreview.vue

This component, like the two that will follow, has the main purpose of displaying a preview of a piece of content we want to have as a link in the website.
In this case, areaPreview has the purpose of displaying a preview version of an Area we want to go into.
The structure of this component is pretty simple, it consists of a div which contains a name, which is retrieved from the props, and the image of the area we want to preview, which is also retrieved from the props, together with the alternative text to be shown.

#### employeeLinks.vue

This component has the purpose of taking a set of Employees and displaying them as a grid of cards which hold both the name, the job title (when present) and the image of each employee. This solution was created with the intent of reutilising this same component on each instance in which a set of employees has to be shown, like in the page of a single area, the page of all employees or the page of a single product. Each preview card is a div which contains the image and the name and job title, which is then contained in a upper level div which is styled to display each element in a grid. This component takes directly an array of Employees as a prop.

#### productLinks.vue

This component takes a set of products and shows them as a set of preview cards with the image and the name of each product. Like employeeLinks this was made with the intent of being utilized whenever possible, therefore all pages that show a preview of a group of products make use of this component. It consists of an outer div which iterates over the set of products using the v-for attribute, which then contains an inner div for each product, which contains the image and the name of the product. It takes as prop an array of Products.

#### TheBreadcrumbs.vue

#### TheHeader.vue

### Routing

The routing in the website is handled by the framework NuxtJS, which allows great ease of traversing from page to page, because the routing is built-in when accessing a page with a given name.

### Rendering

The website is by intention a website of a potentially large ICT company which wants to display all of their products. The content, mainly the images of each area, product or employee, has a large file size. Even though
the current version of the website is simplistic, it could scale to a bigger size. Keeping this in mind it was decided to use **Server Side Rendering(SSR)** for the rendering of content.

### Store

A store file was added to handle the rendering of both the dynamic landmarks and the breadcrumbs of the website. Since both of these are retrieved dynamically and have to be loaded before the website starts rendering, they are put inside the index.js file inside the store directory and the method nuxtServerInit is called before rendering to make those components display correctly.

## Framework usage and best practices

### Dynamic pages

One of the main advantages of using NuxtJS is its capabilty of automatic routing and dynamic content creation. Each of the kind of topics that are present in the website are retrieved dynamically and the names of the pages are also retrieved dynamically. Also the default index.vue page that can be associated to a path in the website was used to create the pages in which all of the areas, products and employees are shown, to better display the hyerarchy between groups and kinds of topics. In this way, i.e. the page /areas will show all the areas of the website and the page /areas/area1 will show one of the areas that belong to the group of all areas, so that the hyerarchy between content and grouping is correctly respected.

### Asset loading

The majority of images in the assets folder is loaded dynamically, by putting the URI of the image inside the image attribute of the entities in the DB. In this way it is easy to change the image associated to a piece of content and it is easy to design every page or component that needs to display an image loaded dynamically by accessing the image property of each ORM object.

### Reusability

The components that were developed for this website have been utilized to their full extent in all the pages that necessitated them. This helped increase the complexity of the pages without having to produce more content. Also for this reason all pages and components have been named in an easy and straightforward way, so that it is clear when and why they are used.

### Breadcrumbs

The breadcrumbs in the website don't reflect neither the user interaction history neither the page structure in Nuxt. The reasons behind this choice are the following:
First of all, the user can reach the same page from different navigation paths, so it's not relevant to put breadcrumbs that reflect the user interaction history.
Secondly, the page structure in Nuxt is good for implementation purposes, but, when reflected on the breadcrumbs, it is not that good from the point of view of the user experience. For instance, all the product pages in Nuxt are under the products folder, but in the breadcrumbs the user should able to go back to the relative area and, if present, the relative type, so that the grouping of content is made clear and shown correctly.
For this reason the breadcrumbs used are path-based and depend strictly on the page the user is navigating in.

### SEO

### Accessibility

The main issues the team tackled about accessibility are mainly about the readability of the website and the ease of navigation between pages. For this reason, the website presents a high contrast ratio between background and elements, all the images present alt attributes so that the content can be read when the images cannot be loaded, and all the links are named directly after the content they redirect to. The ease of navigation is addressed by the presence of the landmarks, which redirect to the main sections of interest of the website, and, in the case the areas of the website, they can also expand to make the navigation to a specific area or a specific type of products much easier. In addition to this, all links are clearly distinguishable from static content.

### Responsiveness

The website adapts itself to be read from different devices. Through the use of css media queries, the website changes layout when it detects that it is displayed on screen smaller than a given threshold, usually the screen of a smartphone. When that is detected, the website presents its content as if it lies in one column, and the landmarks are shown vertically instead of horizontally, to allow a smartphone user to click on them without trouble.
