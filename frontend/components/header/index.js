import React, {useState, useCallback} from "react"
import style from "./style.module.scss"
import useMedia from 'use-media';
import {Drawer, Button} from '@material-ui/core';
import {Menu as MenuIcon} from "@material-ui/icons"
import { useForm, usePlugin } from 'tinacms'
import useSettings from "../../plugins/djangoBackend/settings"
import Link from "next/link";
import { useRouter } from 'next/router'

const Header = (props) => {
  const formOptions = {
    id:"header",
    label: "Header",
    initialValues: props.initialValue,
    fields: [
      {
        label: 'Image',
        name: 'header.image',
        component: 'image',
        clearable: true,
        parse: (media => media.previewSrc)
      },
    ],
    onSubmit: (content) =>{
      const settings = useSettings("header")
      settings.save(content.header)
    }

  }
  const [data, form] = useForm(formOptions)
  usePlugin(form)
  const links=[
    {
      link:"/",
      title:"Accueil"
    },
    {
      link:"/blog",
      title:"Blog"
    },
    {
      link:"/qui-sommes-nous",
      title:"Qui sommes-nous ?"
    },
    {
      link:"/contact",
      title:"Contact"
    },
  ];
  const [drawer,setDrawer] = useState(false);

  const isWide = useMedia({minWidth: style.tabletBreakpoint});
  const toggleDrawer = useCallback(() => {
    setDrawer(old=>!old)
  },[setDrawer]);

  const { asPath } = useRouter()

  return (
  <header>
    <div className={style.block}>
      <div className={style.navbar}>
        <Drawer anchor="top" onClose={toggleDrawer} open={drawer} >
          <div className={style.drawerMenu}>
              {links.map((element, index)=>(
                 <Link
                    key={index}
                    href={{ pathname: element.link }}
                  >
                    <a className={element.link === asPath ? style.activeLink : style.link}>
                      <span>{element.title}</span>
                      <span className={style.divider}/>
                    </a>
                </Link>
              ))}
          </div>
        </Drawer>
        
      <div className={style.content}>
        <a
            href="/"
            className={style.link}
          >
          {data && data.header && data.header.image && <img src={data && data.header.image} className={style.logo} alt="logo"/> }
          
        </a>      
          {isWide? 
          <div className={style.buttons}>
           {links.map((element, index)=>(
                 <Link
                    key={index}
                    href={{ pathname: element.link }}
                  >
                    <a className={element.link === asPath ? style.activeLink : style.link}>
                      <span>{element.title}</span>
                      <span className={style.divider}/>
                    </a>
                </Link>
              ))}
        </div>
        :<div className={style.mobileButton}>  
        <Button onClick={toggleDrawer}><MenuIcon/></Button>        
       
        </div>
        }
      </div>
      </div>
    </div>
  </header>
  )}

export default Header
