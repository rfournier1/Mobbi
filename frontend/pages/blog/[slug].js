import  React, {useEffect} from 'react'
import ReactMarkdown from 'react-markdown'
import { usePlugin, useForm } from 'tinacms'
import Layout from '../../components/Layout'
import useSettings, {checkLoggedIn} from "../../plugins/djangoBackend/settings"
import { useCMS } from 'tinacms';
import style from "./style.module.scss"
const BlogTemplate= ({ initialValue, slug }) => {

  const cms=useCMS();
  useEffect(()=>checkLoggedIn(cms),[cms]);
  const formOptions = {
    label: 'Blog Page',
    initialValues: initialValue,
    fields: [
      {
        label: 'Hero Image',
        name: "posts."+slug+'.hero_image',
        component: 'image',
        // Generate the frontmatter value based on the filename
        parse: media => media.previewSrc,
      },
      {
        name: "posts."+slug+'.title',
        label: 'Title',
        component: 'text',
      },
      {
        name: "posts."+slug+'.date',
        label: 'Date',
        component: 'date',
      },
      {
        name: "posts."+slug+'.author',
        label: 'Author',
        component: 'text',
      },
      {
        name: "posts."+slug+'.body',
        label: 'Blog Body',
        component: 'markdown',
      },
    ],
    onSubmit: (content) =>{
      const settings = useSettings("posts")
      settings.save(content.posts)
    }
  }

  const [post, form] = useForm(formOptions)
  usePlugin(form)
   
  function reformatDate(fullDate) {
    const date = new Date(fullDate)
    return date.toDateString().slice(4)
  }

  return (
    <Layout  initialValue={{siteConfig: initialValue.siteConfig}}>
      <article className={style.page}>
        <figure className="blog__hero">
          <img
            src={post && post.posts && post.posts[slug] && post.posts[slug].hero_image}
            alt={`blog_hero_${post && post.posts && post.posts[slug] && post.posts[slug].title}`}
          />
        </figure>
        <div className="blog__info">
          <h1>{post && post.posts && post.posts[slug] && post.posts[slug].title}</h1>
          <h3>{reformatDate(post && post.posts && post.posts[slug] && post.posts[slug].date)}</h3>
        </div>
        <div className="blog__body">
          <ReactMarkdown source={post && post.posts && post.posts[slug]&& post.posts[slug].body} />
        </div>
        <h2 className="blog__footer">Written By: {post && post.posts && post.posts[slug]&& post.posts[slug].author}</h2>
  </article>
     
    </Layout>
  )
}

export async function getServerSideProps({params}) {
  const slug = params.slug;
  const settings = useSettings("posts")
  const siteConfigSettings = useSettings("siteConfig")
  let postData  = await settings.getByKey(slug);
  let siteConfig = await siteConfigSettings.get();
  let initialValue = {siteConfig : siteConfig}
  initialValue["posts"]={};
  initialValue["posts"][slug]=postData;
  return {
    props: { initialValue, slug },
  }
}

export default BlogTemplate