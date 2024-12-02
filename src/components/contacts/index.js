import React from 'react'
import styles from './contact.module.scss'
import { Image } from 'antd'

const Contacts = ({contacts,handleselectuser,selecteduser}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}></div>
    <div className={styles.contactList}>
      {contacts?.map((item)=>(
        <div className={`${styles.contactItem} ${selecteduser?._id===item?._id&&styles.active}`} onClick={()=>handleselectuser(item)}>
          <div className={styles.imageItem}> 
          <Image src='/defaultUser.png' height={"2.5rem"} 
          style={{border:"1px solid #ccc",borderRadius:"50%"}} />
          </div>
          <div className={styles.headText}>{item?.name}</div>
        </div>
      ))}
    </div>
    </div>
  )
}

export default Contacts