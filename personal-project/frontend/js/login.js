window.onload = () => {
    console.log("loaded")
  }

  
// handles the fetch boilerplate
const basicFetch = async (url, context) => {
    const response = await fetch(url, context)
    const body = await response.json()
    return body
  }
  
  // gets the username and password from an event
  const getCredentials = (e) => {
    const uname = e.target.uname.value
    const pword = e.target.password.value
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
  
  // makes a POST request to create an account
  const signUp = (uname, pword) => {
    const data = {username: uname, password: pword}
    const context = {
      method: "POST",
      headers: {
        "Content-Type": "application/json" ,
      },
      body: JSON.stringify(data)
    }
    basicFetch("http://127.0.0.1:8000/accounts/signup", context)
  }
  
  
  window.onload = () => {
    const form = document.querySelector("#form")
    form.onsubmit = (e) => handleAuth(e)
  }