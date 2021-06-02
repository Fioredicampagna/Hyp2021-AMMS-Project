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

## Breadcrumns info

The breadcrumps in this website don't reflect neither the user interaction history neither the page structure in Nuxt. There reasons behind this choice are the following.
First of all, the user can reach the same page from different navigation paths, so it's not relevant to put breadcrumps taht reflect the user interaction history.
Then, the page structure in Nuxt is good for implementation purposes, but, if reflect on breadcrumbs, not from the point of view of the user experience. For instance, all product pages in Nuxt are under the product folder, but in the breadcrumps the user should able to go back to the relative area and, if present, the relative type.
