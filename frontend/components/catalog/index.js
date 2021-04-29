import React, {useState } from "react"
import style from "./style.module.scss"
import useSettings from "../../plugins/djangoBackend/settings"
import { usePlugin, useForm } from 'tinacms'
import ReactMarkdown from 'react-markdown'

import {Dialog} from "@material-ui/core"
const Tile = ({media})=>{
  const [open, setOpen]=useState(false);

  return <>
  <Dialog maxWidth={false} open={open} onClose={()=>setOpen(false)}>
    <div className={style.dialogContent}>
      <div className={style.caption}>{media.caption}</div>
      <img src={media.image} />
      {media && media.description && <div className={style.description}>
        <ReactMarkdown source={media.description} />
      </div>
      }
    </div> 
    </Dialog>
    <div className={style.tile} onClick={()=>setOpen(true)}>
      <div className={style.caption}>{media.caption}</div>
      <div className={style.image}>
        <img src={media.image} />
      </div>
    </div>
  </>
}
const Catalog = (props) => {
  const formOptions = {
    id: props.priority+props.id,
    label: props.title,
    initialValues: props.initialValue,
    fields: [
      {
        name: props.id+".text",
        label: "Texte haut",
        component: "html",
      },
      {
        label: 'Modules',
        name: props.id+'.images',
        component: 'group',
        fields: [
          {
            label: 'Images',
            name: 'list',
            component: 'group-list',
            defaultItem: () => ({
              id: Math.random()
                .toString(36)
                .substr(2, 9),
              caption: "New product"
            }),
            itemProps: (item) => ({
              key: item.id,
              label: item.caption
            }),
            fields:[
              {
                name: "image",
                label: 'image',
                component: 'image',
                clearable: true,
                parse: (media => media.previewSrc)
              },
              { 
                label: "Titre",
                name: "caption",
                component: 'text',
              },
              { 
                label: "Description",
                name: "description",
                component: 'markdown',
              },
            ]
          },
        ]
      },
      {
        name: props.id+".textbottom",
        label: "Texte Bas",
        component: "html",
      },
     
    ],
    onSubmit: (content) =>{
      const settings = useSettings(props.id)
      settings.save(content[props.id])
    }
  }

  const [data, form] = useForm(formOptions)
  usePlugin(form)
  
  return (
  <div className={style.block}>
      <div className={style.content}>
        <div className={style.block}>
          <div className={style.content}>
          <div className={style.wysiwyg}>
              {(data && data[props.id]  && data[props.id].text) && <div dangerouslySetInnerHTML={{__html : data[props.id].text}} /> }
            </div>
            <div className={style.grid}>
              {data && data[props.id] && data[props.id].images && data[props.id].images.list &&  data[props.id].images.list.map((e, i)=>(
                <div key={i}>
                  <Tile media={e} />
                </div>
              ))}
            </div>
            <div className={style.wysiwygBottom}>
              {(data && data[props.id]  && data[props.id].text) && <div dangerouslySetInnerHTML={{__html : data[props.id].textbottom}} /> }
            </div>
          </div>
        </div>
      </div>
  </div>
  )}

export default Catalog