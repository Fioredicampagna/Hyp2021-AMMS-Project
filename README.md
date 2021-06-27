# Nuxt Website

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Design Choices 

### Project Structuring 

We followed few best practises while building this website, one among them is good naming conventions we followed uniform naming structre through out our project which eased organising our project and also for assets loading in our website. Which helped our website to be very dymanic and easy to add more components and also to increase the complexity of the page contents. We came up with the simplistic way of organising our project code strictly with the right naming and groupings. 

### Breadcrumns info

The breadcrumps in this website don't reflect neither the user interaction history neither the page structure in Nuxt. There reasons behind this choice are the following.
First of all, the user can reach the same page from different navigation paths, so it's not relevant to put breadcrumps taht reflect the user interaction history.
Then, the page structure in Nuxt is good for implementation purposes, but, if reflect on breadcrumbs, not from the point of view of the user experience. For instance, all product pages in Nuxt are under the product folder, but in the breadcrumps the user should able to go back to the relative area and, if present, the relative type.

### Rendering

Our website is a mimic of the Tech company with the mix of e-commerce. We have heavy images content on our pages even though
the current version of our website is simplistic, there is a good scope of scaling it to much bigger website. Keeping this in mind We decided to take **Server Side Rendering(SSR)** approch.


## Website Content

In our project We have three major Components.

* Areas - Where we are showing a glimce of what our company can offer.
* Employees - We as a company takes great pride in showcasing our teams and their contributions.
* Products - Here we are showing every detail possible about the products.

