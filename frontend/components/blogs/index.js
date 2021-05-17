import React from "react"
import style from "./style.module.scss"

const Tile = ({post})=>{
 
    return <a className={style.tile} href={"/posts/"+post.slug}>
      <div className={style.image}>
        <img src={post.images && post.images.length>0 && post.images[0] && post.images[0].image} />
      </div>
    </a>
}
const Posts = (props) => {

  return (
  <div className={style.block} >
      <div className={style.anchor} id="posts" />
      <h1 className={style.title}>{props.title}</h1>
      <div className={style.content}>
            <div className={style.grid}>
              {data && data[props.id] && data[props.id].posts && data[props.id].posts &&  data[props.id].posts.map((e, i)=>(
                <div key={i}>
                  <Tile post={e} />
                </div>
              ))}
            </div>
          </div>
        </div>
  )}

export default Posts