import React,{Component} from "react"
import {Route, Redirect} from 'react-router-dom'

class AuthenticatedRoute extends Component{
    render(){
            if(sessionStorage.getItem('userAuthenticated')){
                return <Route {...this.props}></Route>;
            }
            else{
                return <Redirect to='/login'/>
            }
    }
}

export default AuthenticatedRoute