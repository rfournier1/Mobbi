import {useEffect} from "react"
import useSettings from "../../plugins/djangoBackend/settings"
import Layout from '../../components/Layout'
import Footer from '../../components/footer'
import Header from '../../components/header'
import BlogList from "../../components/BlogList"
import style from "./style.module.scss"
import { checkLoggedIn } from "../../plugins/djangoBackend/settings";
import { useCMS } from 'tinacms';


const Index = ({ initialValue }) => {

  const cms=useCMS();
  useEffect(()=>checkLoggedIn(cms),[cms]);


  return (
    <Layout
      pathname="/blog"
      initialValue={{siteConfig: initialValue.siteConfig}}
    >
      <section className={style.page}>
        <Header initialValue={{header: initialValue.header}}  />
        <BlogList allBlogs = {initialValue.posts}  />
        <Footer initialValue={{footer: initialValue.footer}}  />
      </section>
    </Layout>
  )
}


export async function getServerSideProps() {
  const settings = useSettings(["header","footer","posts"])
  let initialValue  = await settings.get();
  console.log(initialValue)
  return {
    props: { initialValue },
  }
}

export default Index
