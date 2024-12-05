import React, { useEffect, useRef, useState } from 'react'
import styles from './chat.module.scss'
import Contacts from '../../components/contacts'
import ChatRoom from '../../components/chatroom'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router'
import { getAllUsers } from '../register/signup.service'
import { AddMessage, getUserMessages } from './messages.service'
import io from 'socket.io-client'

const Chat = () => {
    const cookies = new Cookies(null, { path: '/' });
    const userId= cookies.get("user");
    const [contacts,setContacts]=useState();
    const navigate=useNavigate();
    const [selecteduser,setSelectedUser]=useState();
    const [messages,setMessages]=useState([]);
    const [arrivalMsg,setArrivalMsg]=useState([]);
    const socket = useRef(null);
    const [message,setMessage]=useState()
    const [chatvisible,setChatVisble]=useState(false);

    useEffect(()=>{
       const token= cookies.get("token");
      
       if(!token){
        navigate('/login')
       }
    },[])

    useEffect(()=>{
        if(userId){
            console.log(userId)
            getAllcontacts()
            socket.current = io("https://chat-apis-crde.onrender.com/",{
                transports: ["websocket"]
            });
            console.log("emmited")
            socket.current.emit("add-user", userId);
            
        }
    },[userId])

    useEffect(()=>{
        if (socket.current) {
            socket.current.on("recv-msg", (msg) => {
                console.log("first",msg)
              setArrivalMsg({ byme: false, message: {
                text:msg
              } });
            });
          }
    },[socket])

    useEffect(()=>{
        console.log(arrivalMsg)
        arrivalMsg && setMessages((prev) => [...prev, arrivalMsg]);
    },[arrivalMsg])

    const getAllcontacts=()=>{
        const requestOptions = {
            method: 'GET',
             headers: { 'Content-Type': 'application/json' }
        };
        getAllUsers(requestOptions,userId).then((data)=>{
            setContacts(data?.users)
        })
    }

    const handleselectuser=(item)=>{
        setChatVisble(true);
        setSelectedUser(item)
        getMessages(item?._id)
    }

    const getMessages=(to)=>{
        const requestOptions = {
            method: 'POST',
             headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                from:userId,
                to:to
            })
        };

        getUserMessages(requestOptions).then(data => {
            let modifiedMsg=data?.messages?.map((item)=>{
                if(item?.sender===userId){
                    item["byme"]=true
                }
                return item
            })
            console.log(modifiedMsg)
            setMessages(modifiedMsg)
        })
    }

    const sendmsghandler=(msg)=>{
        socket.current.emit("add-msg",{
            from:userId,
            to:selecteduser?._id,
            msg
        })
        const requestOptions = {
            method: 'POST',
             headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                from:userId,
                to:selecteduser?._id,
                message:msg
            })
        };
        AddMessage(requestOptions).then(data => {
            setMessage('')
            getMessages(selecteduser?._id)
        })
    }

  return (
        <div className={styles.chatcontainer}>
            <div className={styles.chatHeader}></div>
            <div className={`${styles.chatConetnt}`}>
                <div className={`${styles.contacts} ${chatvisible&&styles.contactHide}`}>
                <Contacts 
                    {...{
                        contacts,
                        handleselectuser,
                        selecteduser
                    }}
                />
                </div>
                <div className={`${styles.chatRoom} ${chatvisible&&styles.chatRoomVisible}`}>
                <ChatRoom {...{
                    selecteduser,
                    sendmsghandler,
                    messages,
                    message,
                    setMessage,
                    setChatVisble,
                    chatvisible
                }}/>
                </div>
            </div>
        </div>
  )
}

export default Chat