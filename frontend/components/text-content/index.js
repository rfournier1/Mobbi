import React, { useCallback, useEffect, useState, useRef } from "react"
import style from "./style.module.scss"
import useSettings from "../../plugins/djangoBackend/settings"
import { usePlugin, useForm } from 'tinacms'
import ReactPlayer from 'react-player'
import {Dialog} from "@material-ui/core"
const Tile = ({mode, media})=>{
  const [open, setOpen]=useState(false);
  const ref = useRef();

  const autoPlay = useCallback(()=>{
    ref.current.getInternalPlayer().playVideo();
  },[])

  return <>
  {mode && <Dialog maxWidth={false} open={open} onClose={()=>setOpen(false)}> 
    <div className={style.playerWrapper}>
      <ReactPlayer url={media.url} className={style.player} ref={ref} width="100%" height="100%" onReady={autoPlay}  />
    </div>
    </Dialog>

  } 
  <div className={style.tile}>
    <div className={style.tileBorder}>
      <div className={style.tileContent}>
        <div className={mode? style.media : style.image} >
          {mode?
            <img src={media.thumbnail} onClick={()=>setOpen(true)} />
          : <img src={media} />
          }
        </div>
   
      </div>
    </div>
    
    </div>
  </>
}
const TextContent = (props) => {
  const formOptions = {
    id: props.priority+props.id,
    label: props.title,
    initialValues: props.initialValue,
    fields: [
      {
        name: props.id+'.switch',
        component: 'toggle',
        label: 'Inverser',
        toggleLabels: {
          true: 'Oui',
          false: 'Non',
        },
      },
      {
        name: props.id+'.leftText',
        component: 'html',
        label: 'Texte colonne',
      },
      { 
        name:  props.id+'.mode',
        label: "Mode", 
        component: "toggle",
        toggleLabels: {
          true: 'Vidéo',
          false: 'Image',
        },
      },
      {
        label: 'Vidéos',
        name: props.id+'.videos',
        component: 'group',
        fields: [
          {
            label: 'Vidéos',
            name: 'videos',
            component: 'group-list',
            defaultItem: () => ({
              id: Math.random()
                .toString(36)
                .substr(2, 9),
            }),
            itemProps: (item) => ({
              key: item.id,
              label: "Vidéo"
            }),
            fields: [{ 
              label: "URL",
              name: "url",
              component: 'text',
              placeholder: "video url"
            },
            {
              label: "Thumbnail",
              name: "thumbnail",
              component: 'image',
              clearable: true,
              parse: (media => media.previewSrc)
            },
          ],
          },
        ]
      },
      {
        label: 'Images',
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
            }),
            itemProps: (item) => ({
              key: item.id,
              label: "Image"
            }),
            fields:[
              {
                name: "image",
                component: 'image',
                clearable: true,
                parse: (media => media.previewSrc)
              },
              { 
                label: "caption",
                name: "caption",
                component: 'text',
              },
            ]
          },
        ]
      }
     
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
            <div className={(data && data[props.id] && data[props.id].switch)? style.switchGrid : style.grid}>
              <div className={style.left}>
                {(data && data[props.id]  && data[props.id].leftText) && <div dangerouslySetInnerHTML={{__html : data[props.id].leftText}} /> }
              </div>
              <div className={style.right}>
                <div className={style.grid}>
                  {(data && data[props.id]  && data[props.id].mode)?
                    data[props.id].videos &&  data[props.id].videos.videos && data[props.id].videos.videos.map((e, index)=>(
                      <div key={index}>
                        <Tile mode={data[props.id].mode} media={e} />
                      </div>
                    ))
                  : 
                    data[props.id].videos &&  data[props.id].videos.videos && data[props.id].videos.videos.map((e, index)=>(
                    <div key={index}>
                      <Tile mode={data[props.id].mode} media={e} />
                    </div>
                  ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

  </div>
  )}

export default TextContent