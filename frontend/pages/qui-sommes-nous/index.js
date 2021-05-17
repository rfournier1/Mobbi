import {useEffect} from "react"
import useSettings from "../../plugins/djangoBackend/settings"
import Layout from '../../components/Layout'
import Footer from '../../components/footer'
import Header from '../../components/header'
import TextContent from "../../components/text-content"
import style from "./style.module.scss"
import { checkLoggedIn } from "../../plugins/djangoBackend/settings";
import { useCMS } from 'tinacms';


const Index = ({ initialValue }) => {

  const cms=useCMS();
  useEffect(()=>checkLoggedIn(cms),[cms]);


  return (
    <Layout
      pathname="/qui-sommes-nous"
      initialValue={{siteConfig: initialValue.siteConfig}}
    >
      <section className={style.page}>
        <Header initialValue={{header: initialValue.header}}  />
          <TextContent id="nous" priority="98" title="Qui sommes nous" initialValue={{nous: initialValue.nous}}  />
        <Footer initialValue={{footer: initialValue.footer}}  />
      </section>
    </Layout>
  )
}


export async function getServerSideProps() {
  const settings = useSettings(["siteConfig", "footer", "header", "nous"])
  let initialValue  = await settings.get();
  return {
    props: { initialValue },
  }
}

export default Index
