import React from "react"
import style from "./style.module.scss"
import useSettings from "../../plugins/djangoBackend/settings"
import { usePlugin, useForm } from 'tinacms'

const Tile = ({media, index})=>{


  return <>
  <div className={style.tile} key={index}>
    <div className={style.tileBackground}>
      <div className={style.image} >
          <img src={media.image} />
      </div>
    </div>
  </div>
  </>
}
const Partners = (props) => {
  const formOptions = {
    id: props.priority+props.id,
    label: props.title,
    initialValues: props.initialValue,
    fields: [
      {
        label: 'Images',
        name: props.id+'.images',
        component: 'group-list',
        defaultItem: () => ({
          id: Math.random()
            .toString(36)
            .substr(2, 9),
        }),
        itemProps: (item) => ({
          key: item.id
        }),
        fields:[
          {
            name: "image",
            label: 'image',
            component: 'image',
            clearable: true,
            parse: (media => media.previewSrc)
          },
        ]
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
        <h3 className={style.title}>{props.title}</h3>
        <div className={style.grid}>
        {(data && data[props.id]) &&  data[props.id].images && 
          data[props.id].images.map((e, i)=>(
              <Tile media={e} index={i}/>
          ))        
        }
        </div> 
      </div>
  </div>
  )}

export default Partners