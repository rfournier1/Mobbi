import  React, {useEffect} from 'react'
import ReactMarkdown from 'react-markdown'
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";import { usePlugin, useForm } from 'tinacms'
import Layout from '../../components/Layout'
import useSettings, {checkLoggedIn} from "../../plugins/djangoBackend/settings"
import { useCMS } from 'tinacms';
import style from "./style.module.scss"
import Right from "../../components/shared/right-chevron.svg";
import Left from "../../components/shared/left-chevron.svg";
import Header from '../../components/header'
import Footer from '../../components/footer'
import LeftArrow from "../../components/shared/left-arrow.svg"

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
    label: 'Réalisation',
    initialValues: initialValue,
    fields:[
      {
        label: 'Images',
        name: 'realisations.realisations.'+index+'.images',
        component: 'group-list',
        defaultItem: () => ({
          id: Math.random()
            .toString(36)
            .substr(2, 9),
        }),
        itemProps: (item) => ({
          key: item.id,
          label: "image"
        }),
        fields:[
          {
            name: "image",
            label: "image",
            component: 'image',
            clearable: true,
            parse: (media => media.previewSrc)
          },
        ]
      },
      { 
        label: "Titre",
        name: 'realisations.realisations.'+index+'.title',
        component: 'text',
      },
      { 
        label: "Slug",
        name: 'realisations.realisations.'+index+".slug",
        component: 'text',
        placeholder: 'attention doit être unique'
      },
      { 
        label: "Description",
        name: 'realisations.realisations.'+index+".description",
        component: 'markdown',
      },
    ],
    onSubmit: (content) =>{
      const settings = useSettings("realisations");
      settings.save(content.realisations);
      setTimeout(()=>{
        window.location.replace("/realisations/"+content.realisations.realisations[index].slug);
      }, 1000)
    }
  }

  const [post, form] = useForm(formOptions)
  usePlugin(form)
  const settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <Arrow next={true} color={style.green} className={style.arrow} />,
    prevArrow: <Arrow next={false} color={style.green}  className={style.arrow} />,
    appendDots: dots => {
      return <ul className={style.dots} style={{borderColor: "white"}}> {dots} </ul>
    },
  };


  return (
    <Layout  initialValue={{siteConfig: initialValue.siteConfig}}>
      <Header initialValue={{header: initialValue.header}}  />

      <article className={style.block}>
        <div className={style.content}>
        {post.realisations.realisations && post.realisations.realisations[index] &&
        <>
          <div className={style.headRow}>
            <h1 className={style.title}>{ post.realisations.realisations[index].title}</h1>
            <a className={style.return} href="/#realisations"><LeftArrow /></a>
          </div>
           <Slick {...settings} className={style.slider}>
             { post.realisations.realisations[index].images && Array.isArray( post.realisations.realisations[index].images) &&  post.realisations.realisations[index].images.map((calque, index) => (
               <img src={calque.image} className={style.image} key={index}/>
             ))}
           </Slick>
          <div className={style.description}>
            <ReactMarkdown source={ post.realisations.realisations[index].description} />
          </div>
        </>}
        </div>
      </article>
      <Footer initialValue={{footer: initialValue.footer}}  />

    </Layout>
  )
}

export async function getServerSideProps({params}) {
  const slug = params.slug;
  const settings = useSettings(["realisations", "siteConfig", "header", "footer"])
  let postData  = await settings.get();
  let initialValue=postData;
  let index = postData.realisations.realisations.findIndex(e=>e.slug === slug);
  return {
    props: { initialValue, index },
  }
}

export default BlogTemplate