import axios from "axios"
import path from 'path'
import config from "../../config.json"

export default class DjangoMediaStore{

    accept = '*'
    
    async persist(files) {
        const uploaded = []
        try{
        
            for (const { file } of files) {
                var fileBlob = new Blob([file]);
                var name = file.name;
                var bodyFormData = new FormData();
                bodyFormData.append('media',fileBlob, name);
                let response = await axios({
                    method : 'post',
                    url: config.api.baseurl+'/api/settings/media/upload',
                    headers: {'Authorization': 'JWT ' + localStorage.getItem('token')}, 
                    data: bodyFormData
                })
                uploaded.push(contentToMedia(response.data))
                
            }
        }catch(e){
          window.alert("Impossible d'uploader le media: " + e);
        }
        return uploaded;
    }
  
    async delete(media) {
        axios({
            method : 'delete',
            url: config.api.baseurl+'/api/settings/media/delete/'+media.id,
            headers: {'Authorization': 'JWT ' + localStorage.getItem('token')}, 
        }).then(response => {
            return contentToMedia(response);
        }).catch(e => {
            window.alert("Impossible de supprimer le media: " + e);
        })
    }
  
    async previewSrc(src) {
      try {
        return src
      } catch {
        return src
      }
    }
    
    async list(options){
      //const directory = options && options.directory? options.directory : ''
      const offset = options && options.offset? options.offset : 0
      const limit = options && options.limit ? options.limit : 50
      try{
        let response = await axios({
          method : 'get',
          url: config.api.baseurl+'/api/settings/media/list',
          headers: {'Authorization': 'JWT ' + localStorage.getItem('token')}, 
        })
        return {
            items: response.data.map(contentToMedia).slice(offset, offset + limit),
            offset,
            limit,
            nextOffset: nextOffset(offset, limit, response.data.length),
            totalCount: response.data.length,
          }
        ;
      }catch(e) {
          window.alert("Impossible de lister les medias: " + e);
          return null;
      }

    }
}
  
const nextOffset = (offset, limit, count) => {
  if (offset + limit < count) return offset + limit
  return undefined
}

const contentToMedia = (item) => {
  const previewable = ['.jpg', '.jpeg', '.png', '.webp', '.svg']
  const mediaItem = {
    id: item.id,
    filename: config.api.mediaurl+item.media_url,
    directory: "",
    type: 'file',
  }

  if (previewable.includes(path.extname(item.media_url).toLowerCase())) {
    mediaItem.previewSrc = config.api.mediaurl+item.media_url
  }

  return mediaItem
}
