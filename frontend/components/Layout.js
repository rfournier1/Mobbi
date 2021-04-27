import { usePlugin, useForm } from 'tinacms'
import useSettings from "../plugins/djangoBackend/settings"

export default function Layout(props) {
  
  const formOptions = {
    id:"0--site-config",
    label: "Site Config",
    initialValues: props.initialValue,
    fields: [
      {
        name: 'siteConfig.title',
        label: 'Site Title',
        component: 'text',
      },
      {
        name: 'siteConfig.description',
        label: 'Site Description',
        component: 'text',
      },
    ],
    onSubmit: (content) =>{
      const settings = useSettings("siteConfig")
      settings.save(content.siteConfig)
    }

  }
  const [data, form] = useForm(formOptions)
  usePlugin(form)
  const siteTitle= data && data.siteConfig && data.siteConfig.title ? data.siteConfig.title : ""
  const siteDescription=data && data.siteConfig && data.siteConfig.description ?data.siteConfig.description : "" 
  return (
    <section
    className={`layout ${
      props.pathname == "info" &&
      "info_page"}`
    }
    style={{
      backgroundColor: `${props.bgColor && props.bgColor}`,
      color: `${props.pathname == "info" && 'white'}`
    }}
  >
    <div className="content">{props.children}</div>
   
  </section>
  );
}