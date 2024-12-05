import React from 'react'
import styles from './chatroom.module.scss'
import {  Form, InputGroup } from 'react-bootstrap'
import { SendOutlined,PlusOutlined,LeftOutlined } from '@ant-design/icons';
import {Image} from "antd"

const ChatRoom = ({selecteduser,
  sendmsghandler,messages,
  message,setMessage,
  setChatVisble,chatvisible
}) => {
 
  return (
    <div >
      {selecteduser?._id?
      <div className={styles.wrapper}>
         <div className={styles.header}>
         {chatvisible&&
         <div className={styles.backKey} onClick={()=>setChatVisble(false)}>
          <LeftOutlined />
          </div>}
          <div className={styles.imageItem}> 
          <Image src='/defaultUser.png' height={"3.5rem"} 
          style={{border:"1px solid #ccc",borderRadius:"50%"}} />
          </div>
          <div className={styles.headText}>{selecteduser?.name}</div>
          </div>
      <div className={styles.chatBody}>
        <div className={styles.messages}>
        {messages?.map((msg)=>(
          <div className={`${msg?.byme&&styles.messageCont}`}>
            <div className={`${msg?.byme?styles.sent:styles.recv}`}>{msg?.message?.text}</div>
          </div>
        ))}
        </div>
      </div>
      {selecteduser?._id&&
      <div className={styles.chatinputContainer}>
       <div className={styles.attachItem}>
          <PlusOutlined style={{fontSize:"1.8rem"}}/>
       </div>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="send message"
          aria-label="send message"
          aria-describedby="basic-addon1"
          onChange={(e)=>setMessage(e.target.value)}
          value={message}
        />
        <div onClick={()=>sendmsghandler(message)} className={styles.sendItem}>
            <SendOutlined style={{fontSize:"1.8rem"}} />
        </div>
      </InputGroup>
      </div>
      }
      </div>:
      <div className={styles.startchartCont}>
        <div className={styles.text}>
          Start Chart with You're Contacts
        </div>
        </div>}
    </div>
  )
}

export default ChatRoom