export async function verifyUser (token){
    //returns userId
    let response = await fetch("/api/user/verify", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "x-access-token": token
        }
        })
      .then((response) => {
          return  response.json();
      })
      .then((body) => {
          return body["userId"]
      });
      return response
}