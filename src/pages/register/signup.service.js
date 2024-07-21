export  function signup(requestOptions) {
    const data =fetch(`http://localhost:4040/user/signup`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }

   export  function LoginService(requestOptions) {
    const data =fetch(`http://localhost:4040/user/login`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }

   export  function getAllUsers(requestOptions,userId) {
    const data =fetch(`http://localhost:4040/user/getusers/${userId}`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }