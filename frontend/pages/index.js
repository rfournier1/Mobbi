import {useEffect} from "react"
import useSettings from "../plugins/djangoBackend/settings"
import Layout from '../components/Layout'
import BlogList from '../components/BlogList'
import Footer from '../components/footer'
import Slider from '../components/Slider'
import Header from '../components/header'
import TextContent from "../components/text-content"
import style from "./style.module.scss"
import { checkLoggedIn } from "../plugins/djangoBackend/settings";
import { useCMS } from 'tinacms';
import { usePlugin, useForm } from 'tinacms'
import { InlineForm } from 'react-tinacms-inline'

const Index = ({ initialValue }) => {

  const cms=useCMS();
  useEffect(()=>checkLoggedIn(cms),[cms]);


  return (
    <Layout
      pathname="/"
      initialValue={{siteConfig: initialValue.siteConfig}}
    >
      <section className={style.page}>
        <Header initialValue={{header: initialValue.header}}  />
          <Slider id="slider" priority="99" label="Slider" initialValue={{slider: initialValue.slider}}  />
          <TextContent id="concept" priority="98" title="Concept" initialValue={{concept: initialValue.concept}}  />
          <BlogList allBlogs={initialValue.posts} />
        <Footer initialValue={{footer: initialValue.footer}}  />
      </section>
    </Layout>
  )
}


export async function getServerSideProps() {
  const settings = useSettings(["siteConfig", "posts", "footer", "header", "slider", "concept"])
  let initialValue  = await settings.get();
  return {
    props: { initialValue },
  }
}

export default Index
