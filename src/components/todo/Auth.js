import axios from "axios";
import {API_URL} from '../../URLs'

export const USER_AUTH_SESSION_ATTRIBUTE_NAME = 'userAuthenticated'
export const SESSION_ATTRIBUTE_USERNAME = 'username'

class Authenticate {
  userLoggedin(username, password) {
    sessionStorage.setItem(SESSION_ATTRIBUTE_USERNAME, username)
    sessionStorage.setItem(USER_AUTH_SESSION_ATTRIBUTE_NAME, true)

    this.axiosInterceptor(this.createBasicAuthToken(username, password))
  }

  userLoggedwithJWT(username, token){
    sessionStorage.setItem(SESSION_ATTRIBUTE_USERNAME, username)
    sessionStorage.setItem(USER_AUTH_SESSION_ATTRIBUTE_NAME, true)

    this.axiosInterceptor(this.createJWTauthToken(token))
  }

  logout() {
    sessionStorage.removeItem(USER_AUTH_SESSION_ATTRIBUTE_NAME)
    sessionStorage.removeItem(SESSION_ATTRIBUTE_USERNAME)
  }

  currentUser() {
    return sessionStorage.getItem(SESSION_ATTRIBUTE_USERNAME)
  }

  isUserLoggedIn(){
    return sessionStorage.getItem(USER_AUTH_SESSION_ATTRIBUTE_NAME)
  }

  executeBasicAuthService(username, password){
    return axios.get(`${API_URL}/basic_auth`,{
      headers: {
        authorization: this.createBasicAuthToken(username, password)
      }
    })
  }

  executeJWTtokenAuth(username, password){
    return axios.post(`${API_URL}/authenticate`, {username, password})
  }

  createBasicAuthToken(username, password){
    return 'Basic '+ window.btoa(username + ":" + password)
  }

  createJWTauthToken(token){
    return 'Bearer ' + token;
  }

  axiosInterceptor(AuthHeader) {
    axios.interceptors.request.use(
      (config) => {
        if(this.isUserLoggedIn()){
          config.headers.authorization = AuthHeader
        }
        return config
      })
  }
}

export default new Authenticate();