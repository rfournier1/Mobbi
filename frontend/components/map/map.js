import style from "./style.module.scss"
import React from "react"
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet'

const Map =()=>{
    return <div className={style.block}>

        <svg id="svgfilters" aria-hidden="true" style={{position: "absolute", width: 0, height: 0, overflow: "hidden"}} version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <defs>
                <filter id="filter" x="-10%" y="-10%" width="120%" height="120%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feColorMatrix type="matrix" 
                    values=".33 .33 .33 0 0
                            .33 .33 .33 0 0
                            .33 .33 .33 0 0
                            0 0 0 1 0" in="SourceGraphic" result="colormatrix"/>
                    <feComponentTransfer in="colormatrix" result="componentTransfer">
                    <feFuncR type="table" tableValues="1 1 1 1 1 1 1 0.80"/>
		<feFuncG type="table" tableValues="1 1 1 1 1 1 1 0.88"/>
		<feFuncB type="table" tableValues="1 1 1 1 1 1 1 0.77"/>
                    <feFuncA type="table" tableValues="0 1"/>
                    </feComponentTransfer>
                    <feBlend mode="normal" in="componentTransfer" in2="SourceGraphic" result="blend"/>
                </filter>
            </defs>
        </svg>
            <MapContainer center={[47.00, 2.35]} zoom={5} scrollWheelZoom={true} className={style.map} >

                <TileLayer
                    url='https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png'
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    subdomains='abcd'
                />
                </MapContainer>
        </div>
}

export default Map