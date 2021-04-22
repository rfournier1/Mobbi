import axios from 'axios';
import config from "../../config.json"

const putSettings = async(content, blockKey)=>{
    axios(
    {
        method: "put",
        url: config.api.baseurl+'/api/settings/save/'+String(blockKey),
        headers: {'Authorization': 'JWT ' + localStorage.getItem('token')}, 
        data: JSON.stringify(content)
    }
    ).then(()=>{
        window.alert('Sauvegardé !');
    }).catch((err)=>{
        window.alert("Erreur, impossible de sauvegarder : "+err )
    })
}

const putMultipleSettings = async(content)=>{
    axios(
    {
        method: "put",
        url: config.api.baseurl+'/api/settings/save-multiple',
        headers: {'Authorization': 'JWT ' + localStorage.getItem('token')}, 
        data: JSON.stringify(content)
    }
    ).then(()=>{
    
        window.alert('Sauvegardé !');
    }).catch((err)=>{
        window.alert("Erreur, impossible de sauvegarder : "+err )
    })
}

const getSettings = (blockKey)=>  axios.get(config.api.baseurl+'/api/settings/'+blockKey).then((response) => response.data).catch((e)=>{});

const getSettingsKey = (blockKey, key)=>  axios.get(config.api.baseurl+'/api/settings/'+blockKey+"/"+key).then((response) => response.data).catch((e)=>{});

const getMultipleSettings = async (blockKey)=>{
    let settings = {};
    let promises = [];
    for(let block of blockKey){
        promises.push(
            axios.get(config.api.baseurl+'/api/settings/'+block).then((response) =>{ 
                /*for(let [setting, val] of Object.entries(response.data)){
                    settings[block+"."+setting]= val;
                }*/
                settings[block]=response.data;
            }).catch((e)=>{})
        )
    }
    await Promise.all(promises);
    return settings;

   
   
    
}

const useSettings = (blockKey)=> {

    return{
        save(content){
            if(Array.isArray(blockKey)){
                return putMultipleSettings(content);
            }else{
                return putSettings(content, blockKey)
            }
        },
        get(){
            if(Array.isArray(blockKey)){
                return getMultipleSettings(blockKey)
            }else{
                return getSettings(blockKey)
            }
        },
        getByKey(key){
            return getSettingsKey(blockKey, key)
        }
    }
}

const checkLoggedIn = (cms)=>{
    axios({
        method : 'get',
        url : config.api.baseurl+'/api/user',
        headers: {'Authorization': 'JWT ' + localStorage.getItem('token')},
      })
      .then(() => {
        cms.enable();
      })
      .catch(e => {
        console.error(e);
        cms.disable();
      });
}
export default useSettings
export {putSettings, getSettings, checkLoggedIn}