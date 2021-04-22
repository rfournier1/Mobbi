import React, {useState, useCallback} from "react"
import style from "./style.module.scss"
import useMedia from 'use-media';
import {Drawer, Button} from '@material-ui/core';
import {Menu as MenuIcon} from "@material-ui/icons"
import { useForm, usePlugin } from 'tinacms'
import useSettings from "../../plugins/djangoBackend/settings"

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
      title:" ACCUEIL"
    },
    {
      link:"/a-propos",
      title:" À PROPOS"
    },
 
  ];
  const [drawer,setDrawer] = useState(false);

  const isWide = useMedia({minWidth: style.mobileBreakpoint});
  const toggleDrawer = useCallback(() => {
    setDrawer(old=>!old)
  },[setDrawer]);

  return (
  <header>
    <div className={style.block}>
      <div className={style.navbar}>
        <Drawer anchor="right" onClose={toggleDrawer} open={drawer} >
          <div className={style.drawerMenu}>
              {links.map((element, index)=>(
                <a
                  href={element.link}
                  key={index}
                >
                  <span>{element.title}</span>
                  <span className={style.divider}/>
                </a>
              ))}
          </div>
        </Drawer>
        <a
          href="/"
          className={style.link}
        >
          {data && data.header && data.header.image && <img src={data && data.header.image} className={style.logo} alt="logo"/> }
          
        </a>      
      <div className={style.content}>
        {isWide? 
        <div className={style.buttons}>
          {links.map((element, index)=>(
            <a
              href={element.link}
              key={index}
              className= {style.headerLink}
            >
              <span>{element.title}</span>
            </a>
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
