import React from "react"
import style from "./style.module.scss"
import useSettings from "../../plugins/djangoBackend/settings"
import { usePlugin, useForm } from 'tinacms'
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import Right from "./right-chevron.svg";
import Left from "./left-chevron.svg";

const Arrow = ({color, next, ...props})=>{
  const { className, style, onClick } = props;

  return <div style={{...style, cursor: "pointer"}} className={className} onClick={onClick}>
      {next? 
      <Right style={{fill: color}} />
      :<Left style={{fill: color}} />
      }
  </div>
}

const Slider = (props) => {
  const formOptions = {
    id: props.priority+props.id,
    label: props.label,
    initialValues: props.initialValue,
    fields: [
      {
        label: 'Images',
        name: 'slider.images',
        component: 'group-list',
        defaultItem: () => ({
          id: Math.random()
            .toString(36)
            .substr(2, 9),
        }),
        itemProps: (item) => ({
          key: item.id,
          label: "Calque"
        }),
        fields:[
          {
            name: "image",
            component: 'image',
            clearable: true,
            parse: (media => media.previewSrc)
          },
        ]
      },
      {
        name: "slider.background",
        label: "Background",
        component: 'image',
        clearable: true,
        parse: (media => media.previewSrc)
      },
    ],
    onSubmit: (content) =>{
      const settings = useSettings("slider")
      settings.save(content.slider)
    }

  }
  const [data, form] = useForm(formOptions)
  usePlugin(form)
  
  const settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <Arrow next={true} color="white" />,
    prevArrow: <Arrow next={false} color="white" />,
    appendDots: dots => {

        return <ul className={style.dots} style={{borderColor: "white"}}> {dots} </ul>
    },
};


  return (
  <div className={style.block}>
    <div className={style.content}>
        {data && data.slider && 
          <>
            <img src={data.slider.background && data.slider.background} className={style.background} />
            <div  className={style.sliderContainer}>
            <Slick {...settings} className={style.slider}>
              {data.slider.images && Array.isArray(data.slider.images) && data.slider.images.map((calque, index) => (
                <img src={calque.image} className={style.calque} key={index}/>
              ))}
            </Slick>
            </div>
            
          </>
        }
      </div>

  </div>
  )}

export default Slider
