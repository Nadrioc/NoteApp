let authResult;
let onAuthStateChange;


export const setup = (_onAuthStateChange) => {
    onAuthStateChange = _onAuthStateChange;

    authResult = (() => {
      try {
        return JSON.parse(localStorage.getItem("token"))
      }
      catch(err){
        return null;
      }
    })();

    onAuthStateChange(isAuthenticated());
};

export const doAuth = (username, password) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "password");
    urlencoded.append("username", username);
    urlencoded.append("password", password);
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    return fetch("https://note.dev.cloud.lightform.com/token", requestOptions)
      .then(response => response.text())
      .then(result => {
    	    authResult = JSON.parse(result);
            if(authResult.error){
              authResult = null;
            } else {
              localStorage.setItem('token', result);
            }
            onAuthStateChange(isAuthenticated());
   		})
      .catch(error => console.log('error', error));
}

export const verifyExistingAuthToken = async () => {
    const header = getAuthHeader();
    const requestOptions = {
        method: 'GET', 
        headers: {...header}
    };
    fetch('https://note.dev.cloud.lightform.com/notes', requestOptions)
    .then(response => {
      if (!response.ok) {
        localStorage.removeItem("token");
        authResult = null;
        onAuthStateChange(isAuthenticated());
      }
    });
}

export const logOut = () => {
    localStorage.removeItem("token");
    authResult = null;
    onAuthStateChange(isAuthenticated());
}

export const isAuthenticated = () => {
    return authResult !== null;
}

export const getAuthHeader = () => {
    if(isAuthenticated()){
	    return {'Authorization': authResult.token_type + ' ' + authResult.access_token}
    } else {
        return {}
    }
}