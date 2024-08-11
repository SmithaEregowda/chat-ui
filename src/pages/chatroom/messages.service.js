export  function getUserMessages(requestOptions) {
    const data =fetch(`https://chat-apis-crde.onrender.com/message`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }

   export  function AddMessage(requestOptions) {
    const data =fetch(`https://chat-apis-crde.onrender.com/message/add`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }