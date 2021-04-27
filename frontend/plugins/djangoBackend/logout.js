import React, { useCallback, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import styles from "./style.module.scss"
import useMedia from "use-media"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const ColorButton = withStyles(() => ({
    root: {
        color: "white",
        height:"40px",
        textTransform:"capitalize",
        padding:"0px 20px",
        borderRadius: "50px",
        backgroundColor: "rgb(34, 150, 254)",
        boxShadow: "rgba(0, 0, 0, 0.12) 0px 2px 3px 0px",
        '&:hover': {
            backgroundColor: "rgb(34, 150, 254, 0.8)",
        },
    },
}))(Button);

function LogoutButton(){
    const disconnect = useCallback(()=>{
        localStorage.removeItem('token');
        window.location.reload();
    },[]);
   
    const isMobile = useMedia({maxWidth : styles.tabletBreakpoint})

    return <div style={{display: "flex", justifyContent: "center", marginTop: "30px"}}><ColorButton onClick={disconnect}>{isMobile? <CloseIcon /> : <span>Déconnexion</span>}</ColorButton> </div>
           
}   

function LogoutAction(){
    useEffect(()=>{
        localStorage.removeItem('token');
        window.location.reload();
    })
    return <div style={{display: "flex", justifyContent: "center", marginTop: "30px", textAlign: "center"}}>Déconnexion...</div>
}
export const ButtonWidget = {
    __type: 'screen',
    name: 'Déconnexion',
    layout: 'popup',
    Icon: ExitToAppIcon,
    Component: LogoutAction,
  }

export default ButtonWidget;
export {ColorButton};