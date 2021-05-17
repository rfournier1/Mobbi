import style from "./style.module.scss"
import React, { useCallback } from "react"


const ContactForm = ()=>{

    const handleSubmit = useCallback(()=>{

    },[])

    return <div className={style.block}>
            <form className={style.form} onSubmit={handleSubmit}>
                <input type="text" name="nom" placeholder="Nom" required />
                <input type="text" name="prenom" placeholder="Prénom" required/>
                <input type="text" name="entreprise" placeholder="Entreprise" required/>
                <input type="text" name="email" placeholder="E-mail" required/>
                <textarea name="message" placeholder="Message" required rows="10"/>
                <div className={style.buttonRow}>
                    <button type="submit">Envoyer</button>
                </div>
            </form>
        </div>
}

export default ContactForm