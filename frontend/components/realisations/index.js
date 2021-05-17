import React from "react"
import style from "./style.module.scss"
import useSettings from "../../plugins/djangoBackend/settings"
import { usePlugin, useForm } from 'tinacms'

const Tile = ({realisation})=>{
 
    return <a className={style.tile} href={"/realisations/"+realisation.slug}>
      <div className={style.image}>
        <img src={realisation.images && realisation.images.length>0 && realisation.images[0] && realisation.images[0].image} />
      </div>
    </a>
}
const Realisations = (props) => {
  const formOptions = {
    id: props.priority+props.id,
    label: props.title,
    initialValues: props.initialValue,
    fields: [
    
      {
        label: 'Réalisations',
        name: props.id+'.realisations',
        component: 'group-list',
        defaultItem: () => ({
          id: Math.random()
            .toString(36)
            .substr(2, 9),
          title: "New realisation"
        }),
        itemProps: (item) => ({
          key: item.id,
          label: item.title
        }),
        fields:[
          {
            label: 'Images',
            name: 'images',
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
            name: "title",
            component: 'text',
          },
          { 
            label: "Slug",
            name: "slug",
            component: 'text',
            placeholder: 'attention doit être unique'
          },
          { 
            label: "Description",
            name: "description",
            component: 'markdown',
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
  <div className={style.block} >
      <div className={style.anchor} id="realisations" />
      <h1 className={style.title}>{props.title}</h1>
      <div className={style.content}>
            <div className={style.grid}>
              {data && data[props.id] && data[props.id].realisations && data[props.id].realisations &&  data[props.id].realisations.map((e, i)=>(
                <div key={i}>
                  <Tile realisation={e} />
                </div>
              ))}
            </div>
          </div>
        </div>
  )}

export default Realisations