---
title: Learning about Nuxt Content
description: Nuxt Content is a powerful module that allows you to fetch content from different file types and import it into your site. This gives you the ability to add a git based CMS (content management system) to your project.
img: books.jpg
alt: learning about nuxt-content
photographerLink: https://unsplash.com/@kimberlyfarmer?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
unsplashLink: https://unsplash.com/s/photos/blog?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
photographer: Kimberly Farmer
date: 08-01-2021
---

Nuxt by itself is a powerful tool for creating websites and applications. Part of what makes it powerful is the ability it gives us to use modules to enhance the capabilities of the framework.

## Nuxt Content

A popular Nuxt module is the Nuxt/Content module. The Nuxt content module allows you to fetch content from different file types and import it into your site. This gives you what is essentially a git based CMS (content management system).

After you’ve installed the Nuxt/Content module into your Nuxt project, you can start using it by adding a content folder at the root of the project. Inside this folder you can add Markdown, JSON, YAML, CSV, and XML files which will be parsed and made available in the rest of your project. You can even separate different types of content within the content directory. For example, if you are building out a personal portfolio page/blog, you can have sub-directories for your projects and also one for your blog posts.

### Getting Started

With that, let’s create the content folder in our example app a tthe root of the project. Let’s add an `index.md` and an `about.md` page inside of there.

![content folder structure](/nuxt-content-blog/content-folder.png)

Inside of our markdown files we can add some YAML code to attach some properties to each file if we want. This YAML code at the top of markdown files is called “Front Matter” and must be the first thing in the file. For example, I want each page to have a title and a description, this is where I would add that.

```yml
---
title: Home
description: This is my homepage
---
```

Below the front matter, I can now add my article/blog content.

Here is the content for `index.md`

```md
---
title: Home
description: This is my homepage
---

## Welcome

You can edit me in <code>content/index.md</code>.

Same for the [about](/about) page!
```

And here is the content for `about.md`

```md
---
title: About
description: This is my About page
---

# About page

I am the about page, you can edit me in <code>content/about.md</code>

Link to [home](/)
```

## Getting Access to the Content

Now that we’ve written our content, we need to get access to that content inside of our app. First, create a `_slug.vue` file in the `pages` folder of the project.
![pages folder structure](/nuxt-content-blog/slug-file.png)

To do this we will use the asyncData method provided by Nuxt. The Nuxt/Content module injects the $content instance into the app, so we can destructure it from the context object argument on asyncData along with the params object. Using the params object we can grab the slug, or path name from the url. Let’s assign that to a constant called slug.

```js
async asyncData({ $content, params, error }) {
    const slug = params.slug || "index";
    return
  },
};
```

Now we want to get the page content. To do this, we use the $content instance to fetch the page by passing in the file path of the page we want, which we’ve stored in our slug constant, and then calling fetch on that. For good measure, we’ve added a catch function in case it can’t find the page. Once that is fetched, it will then return out into our component properties.

Your `asyncData` function should look like this now:

```js
async asyncData({ $content, params, error }) {
    const slug = params.slug || "index";
    const page = await $content(slug)
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: "Page not found" });
      });

    return {
      page,
    };
  },
};
```

## Displaying the Content

So now we have the page content available on our page component. We just need to display that content. For each page, we will want to display the title and description we put into the front matter of each markdown file. With the rest of the page content, we pass that into the nuxt-content component as the document property. That will then display our page content.

```html
<template>
  <div>
    <h1>{{ page.title }}</h1>
    <p>{{ page.description }}</p>
    <nuxt-content :document="page" />
  </div>
</template>
```

The full `_slug.vue` file should look like this:

```html
<template>
  <div>
    <h1>{{ page.title }}</h1>
    <p>{{ page.description }}</p>
    <nuxt-content :document="page" />
  </div>
</template>

<script>
  export default {
    async asyncData({ $content, params, error }) {
      const slug = params.slug || "index";
      const page = await $content(slug)
        .fetch()
        .catch((err) => {
          error({ statusCode: 404, message: "Page not found" });
        });

      return {
        page,
      };
    },
  };
</script>
```

As you can see, the nuxt content module has made it really easy to add a git based CMS to your sites. This has been a really brief introduction to the module. I would encourage you to look at the docs to learn more and better understand the different use cases for it.
