import React, { useState } from 'react'
import styles from './chatroom.module.scss'
import { Button, Form, InputGroup } from 'react-bootstrap'

const ChatRoom = ({selecteduser,sendmsghandler,messages}) => {
  const [message,setMessage]=useState()
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>Chat with {selecteduser?.name}</div>
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
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="send message"
          aria-label="send message"
          aria-describedby="basic-addon1"
          onChange={(e)=>setMessage(e.target.value)}
        />
        <Button onClick={()=>sendmsghandler(message)}>send</Button>
      </InputGroup>
      </div>
      }
    </div>
  )
}

export default ChatRoom