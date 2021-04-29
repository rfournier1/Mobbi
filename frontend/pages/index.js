import {useEffect} from "react"
import useSettings from "../plugins/djangoBackend/settings"
import Layout from '../components/Layout'
import Spacer from '../components/spacer'
import Footer from '../components/footer'
import Slider from '../components/Slider'
import Header from '../components/header'
import TextContent from "../components/text-content"
import Catalog from "../components/catalog";
import Realisations from "../components/realisations"
import style from "./style.module.scss"
import { checkLoggedIn } from "../plugins/djangoBackend/settings";
import { useCMS } from 'tinacms';


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
          <TextContent id="concept" priority="98" title="Le concept" initialValue={{concept: initialValue.concept}}  />
          <Catalog id="catalog" priority="97" title="Catalogue" initialValue={{catalog: initialValue.catalog}}  />
          <Spacer />
          <Realisations id="realisations" priority="96" title="Nos réalisations" initialValue={{realisations: initialValue.realisations}}  />
        <Footer initialValue={{footer: initialValue.footer}}  />
      </section>
    </Layout>
  )
}


export async function getServerSideProps() {
  const settings = useSettings(["siteConfig", "posts", "footer", "header", "slider", "concept", "catalog", "realisations"])
  let initialValue  = await settings.get();
  return {
    props: { initialValue },
  }
}

export default Index
