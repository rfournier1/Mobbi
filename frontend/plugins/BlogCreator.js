import useSettings from "./djangoBackend/settings"

const MISSING_FILENAME_MESSAGE =
  'createBlogButton must be given `filename(form): string`'
const MISSING_FIELDS_MESSAGE =
  'createBlogButton must be given `fields: Field[]` with at least 1 item'

export class BlogCreatorPlugin {
  __type = 'content-creator'
  name
  fields

  // Markdown Specific
  slug
  value
  

  constructor(options) {
    if (!options.slug) {
      console.error(MISSING_FILENAME_MESSAGE)
      throw new Error(MISSING_FILENAME_MESSAGE)
    }

    if (!options.fields || options.fields.length === 0) {
      console.error(MISSING_FIELDS_MESSAGE)
      throw new Error(MISSING_FIELDS_MESSAGE)
    }

    this.name = options.label
    this.fields = options.fields
    this.slug = options.slug
    this.value = options.value || (() => ({}))
  }

  async onSubmit(form) {
    const settings = useSettings("posts")
    const slug = await this.slug(form)
    const value = await this.value(form)
    let setting = {};
    setting[slug] = value;
    settings.save(setting)
  }
}

export const CreateBlogPlugin = new BlogCreatorPlugin({
  label: 'Add New Post',
  slug: form => {
    return form.title.replace(/\s+/g, '-').toLowerCase()
  },
  fields: [
    {
      label: 'Title',
      name: 'title',
      component: 'text',
      required: true,
    },
    {
      label: 'Date',
      name: 'date',
      component: 'date',
      description: 'The default will be today',
      required: true,
    },
    {
      label: 'Author',
      description: 'Who wrote this, yo?',
      name: 'author',
      component: 'text',
      required: true,
    },
  ],
  value: postInfo => ({
    title: postInfo.title,
    date: postInfo.date || new Date(),
    author: postInfo.author || 'Unknown',
    hero_image: '/static/alfons-taekema-bali.jpg',
    body: "New post, who dis?"
  }),
})
