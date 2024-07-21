export  function getUserMessages(requestOptions) {
    const data =fetch(`http://localhost:4040/message`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }

   export  function AddMessage(requestOptions) {
    const data =fetch(`http://localhost:4040/message/add`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }