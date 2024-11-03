// handles the fetch boilerplate
const basicFetch = async (url, context) => {
    const response = await fetch(url, context)
    const body = await response.json()
    return body
  }
  
  // gets the username and password from an event
  const getCredentials = (e) => {
    const uname = document.querySelector("#uname").value;
    const pword = document.querySelector("#password").value;
    return [uname, pword]
  }
  
  const handleAuth = (e) => {
    e.preventDefault()
    const [uname, pword] = getCredentials(e)
    const checkbox = document.querySelector("#signup")
    if(checkbox.checked) {
      signUp(uname, pword)
    } else {
      console.log("not implemented yet")
    }
  }
  
  const signUp = (uname, pword) => {
    const data = { username: uname, password: pword };
    const context = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  
    basicFetch("http://127.0.0.1:8000/accounts/signup", context)
      .then((response) => {
        console.log("Response:", response); // Log the entire response object
  
        // Check if the response status is available
        const status = response.status !== undefined ? response.status : "unknown";
        console.log("Response status:", status); // Log the response status
  
        if (status === 201) {
            // Redirect the user to another page
            window.location.href = "http://127.0.0.1:5500/pkbld.html";
        } 
        else {
          console.error("Account creation failed:", response.statusText);
          // Additional user feedback
          alert("Account creation failed! Please check your details and try again.");
  
          // Log the response for debugging purposes
          console.log(response);
        }
      })
      .catch((error) => {
        console.error("Error during account creation:", error);
        // Additional user feedback (e.g., network issue)
        alert("An error occurred. Please try again later.");
      });
  };
  
  
  
  
  const getToken = async (uname, pword) => {
    const data = {username: uname, password: pword}
    const context = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    }
    const body = await basicFetch("http://127.0.0.1:8000/accounts/get-token", context)
    return body["token"]
  }
  
  const fetchResults = async () => {
    const token = localStorage.getItem("token")
    const context =   {
      method: "GET",
      headers: {
        "Content-Type": "application/json" ,
        "Authorization": `Token ${token}`
      }
    }
    return basicFetch("http://127.0.0.1:5500/pkbld.html", context)
  }
  
  window.onload = () => {
    const form = document.querySelector("#form")
    form.onsubmit = (e) => handleAuth(e)
  }

