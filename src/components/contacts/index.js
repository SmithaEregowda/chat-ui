import React from 'react'
import styles from './contact.module.scss'
import { Col, Image, Row, Stack } from 'react-bootstrap'

const Contacts = ({contacts,handleselectuser,selecteduser}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}></div>
    <div className={styles.contactList}>
      {contacts?.map((item)=>(
        <div className={`${styles.contactItem} ${selecteduser&&styles.active}`} onClick={()=>handleselectuser(item)}>
          <Image src="holder.js/171x180" roundedCircle />
          {item?.name}
        </div>
      ))}
    </div>
    </div>
  )
}

export default Contacts