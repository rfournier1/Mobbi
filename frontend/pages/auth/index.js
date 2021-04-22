import React, { useCallback, useState } from 'react';
import axios from 'axios';
import style from './style.module.scss';
import {Paper, TextField, Button} from "@material-ui/core";
//import { Redirect } from "react-router-dom";
import config from "../../config.json"

function Page() {
    const [user, setUser] = useState("");
    const [mdp, setMdp] = useState("");
    const [loading, setLoading] = useState(false)

    const login = useCallback(()=>{
        setLoading(true)
         axios.post(config.api.baseurl+'/auth',  {username: user, password : mdp}).then(res => {
           localStorage.setItem('token',res.data.token);
           axios({
             method : 'get',
             url : config.api.baseurl+'/api/user',
             headers: {'Authorization': 'JWT ' + localStorage.getItem('token')},
           })
           .then(response => {
             window.location.href="/"
           })
           .catch(e => {
             console.error(e);
             setLoading(false);
           });
           
         }).catch(e => {
            setLoading(false);
         })
       }, [setLoading, mdp, user])
      return <div className={style.page}> 
        <div className={style.block}>
            <div className={style.content}>
              <Paper className={style.paper} elevation={3}>
                <h4 className={style.normal}>Administration du site</h4>
                <TextField value={user} fullWidth variant="outlined" onChange={(e)=>setUser(e.target.value)} label="utilisateur" disabled={loading}/>
                <TextField value={mdp} fullWidth type="password" variant="outlined" onChange={(e)=>setMdp(e.target.value)} disabled={loading} label="mot de passe" />
                <Button onClick={login}>Connexion</Button>
              </Paper>
            </div>
        </div>
      </div>
}

export default Page;
