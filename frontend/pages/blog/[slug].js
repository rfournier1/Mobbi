import  React, {useEffect} from 'react'
import ReactMarkdown from 'react-markdown'
import "slick-carousel/slick/slick.css";import { usePlugin, useForm } from 'tinacms'
import Layout from '../../components/Layout'
import useSettings, {checkLoggedIn} from "../../plugins/djangoBackend/settings"
import { useCMS } from 'tinacms';
import style from "./style.module.scss"
import Right from "../../components/shared/right-chevron.svg";
import Left from "../../components/shared/left-chevron.svg";
import Header from '../../components/header'
import Footer from '../../components/footer'

const Arrow = ({color, next, ...props})=>{
  const { className, style, onClick } = props;

  return <div style={{...style, cursor: "pointer"}} className={className} onClick={onClick}>
      {next? 
      <Right style={{fill: color}} />
      :<Left style={{fill: color}} />
      }
  </div>
}
const BlogTemplate= ({ initialValue, index }) => {

  const cms=useCMS();
  useEffect(()=>checkLoggedIn(cms),[cms]);
  const formOptions = {
    label: 'Post',
    initialValues: initialValue,
     fields: [
      {
        label: 'Hero Image',
        name: "blogPosts.posts."+index+'.hero_image',
        component: 'image',
        // Generate the frontmatter value based on the filename
        parse: media => media.previewSrc,
      },
      { 
        label: "Slug",
        name: "blogPosts.posts."+index+".slug",
        component: 'text',
        placeholder: 'attention doit être unique'
      },
      {
        name: "blogPosts.posts."+index+'.title',
        label: 'Title',
        component: 'text',
      },
      {
        name: "blogPosts.posts."+index+'.date',
        label: 'Date',
        component: 'date',
      },
      {
        name: "blogPosts.posts."+index+'.author',
        label: 'Author',
        component: 'text',
      },
      {
        name: "blogPosts.posts."+index+'.body',
        label: 'Blog Body',
        component: 'markdown',
      },
    ],
    onSubmit: (content) =>{
      const settings = useSettings("blogPosts");
      settings.save(content.blogPosts);
      setTimeout(()=>{
        window.location.replace("/posts/"+content.blogPosts.posts[index].slug);
      }, 1000)
    }
  }

  const [post, form] = useForm(formOptions)
  usePlugin(form)

  return (
    <Layout  initialValue={{siteConfig: initialValue.siteConfig}}>
      <Header initialValue={{header: initialValue.header}}  />

      <article className={style.block}>
      {post && post.blogPosts && post.blogPosts.posts && post.blogPosts.posts[index] &&
      <>
        <figure className="blog__hero">
          <img
            src={ post.blogPosts.posts[index].hero_image}
            alt={`blog_hero_${post.blogPosts.posts[index].title}`}
          />
        </figure>
        <div className="blog__info">
          <h1>{post.blogPosts.posts[index].title}</h1>
          <h3>{reformatDate(post.blogPosts.posts[index].date)}</h3>
        </div>
        <div className="blog__body">
          <ReactMarkdown source={post.blogPosts.posts[index].body} />
        </div>
        <h2 className="blog__footer">Par: {post.blogPosts.posts[index].author}</h2>
        </>
      }
    </article>
    <Footer initialValue={{footer: initialValue.footer}}  />
  </Layout>
  )
}

export async function getServerSideProps({params}) {
  const slug = params.slug;
  const settings = useSettings(["posts", "siteConfig", "header", "footer"])
  let postData  = await settings.get();
  let initialValue=postData;
  let index = postData.blogPosts.posts.findIndex(e=>e.slug === slug);
  return {
    props: { initialValue, index },
  }
}

export default BlogTemplate