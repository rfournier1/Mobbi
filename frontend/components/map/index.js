import React from "react";
import dynamic from "next/dynamic";
import useSettings from "../../plugins/djangoBackend/settings"
import { usePlugin, useForm } from 'tinacms'

const MapComponent = dynamic(
    () => import('./map'),
    { ssr: false }
)

const Map =(props)=>{

    const formOptions = {
        id: "map",
        label: "Carte",
        initialValues: props.initialValue,
        fields: [
          {
            label: 'Markers',
            name: 'map.markers',
            component: 'group-list',
            defaultItem: () => ({
              id: Math.random()
                .toString(36)
                .substr(2, 9),
              name : "New marker"
            }),
            itemProps: (item) => ({
              key: item.id,
              label: item.text
            }),
            fields:[
              {
                name: 'name',
                label: 'Name',
                component: 'text',
              },
              {
              name: 'lon',
              label: 'Longitude',
              component: 'number',
              step: 0.01
              },
              {
              name: 'lat',
              label: 'Latitude',
              component: 'number',
              step: 0.01
              },
              {
                name: 'link',
                label: 'Lien vers la réalisation',
                component: 'text',
              },
            ]
          },
        ],
        onSubmit: (content) =>{
          const settings = useSettings("map")
          settings.save(content.map)
        }
    
      }
      const [data, form] = useForm(formOptions)
      usePlugin(form)

    return <MapComponent markers={data && data.map && data.map.markers}/>
            
}

export default Map