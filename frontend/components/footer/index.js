import React from "react"
import style from "./style.module.scss"
import useSettings from "../../plugins/djangoBackend/settings"
import { usePlugin, useForm } from 'tinacms'

const Footer = (props) => {
  const formOptions = {
    id:"Footer",
    label: "Footer",
    initialValues: props.initialValue,
    fields: [
      {
        label: 'Liens',
        name: 'footer.links',
        component: 'group-list',
        defaultItem: () => ({
          id: Math.random()
            .toString(36)
            .substr(2, 9),
          text : "New link"
        }),
        itemProps: (item) => ({
          key: item.id,
          label: item.text
        }),
        fields:[
          {
            name: 'text',
            label: 'Texte',
            component: 'text',
          },
          {
            name: 'link',
            label: 'Lien',
            component: 'text',
          },
        ]
      },
      {
        name: "footer.text",
        label: "Texte",
        component: "html",
      },
    ],
    onSubmit: (content) =>{
      const settings = useSettings("footer")
      settings.save(content.footer)
    }

  }
  const [data, form] = useForm(formOptions)
  usePlugin(form)
   
  return (
  <footer>
      <div className={style.block}>
        <div className={style.content}>
          <div className={style.links} >
            {(data && data.footer && data.footer.links && Array.isArray(data.footer.links) ) && data.footer.links.map((element, index)=>(
              <a
                href={element.link}
                key={index}
                className= {style.footerLink}
              >
                {element.text}
              </a>
            ))}
          </div>
          <div className={style.text}>
            {(data && data.footer  && data.footer.text) && <div dangerouslySetInnerHTML={{__html : data.footer.text}} /> }
          </div>
        </div>
        
      </div>
  </footer>
  )}

export default Footer
