import axios from "axios"
import {API_URL, JPA_API_URL} from '../../URLs'

class TodoService {
     get_user_todos(username) {
        // return axios.get(`${API_URL}/users/${username}/todos`)
        return axios.get(`${JPA_API_URL}/users/${username}/todos`)
    }

    triggerPathrequest(name){
        return axios.get(`${API_URL}/hellosays/${name}`)
    }

    delete_todo(id, username){
        return axios.delete(`${JPA_API_URL}/users/${username}/todos/${id}`)
    }

    get_todo(id, username){
        // return axios.get(`${API_URL}/users/${username}/todos/${id}`)
        return axios.get(`${JPA_API_URL}/users/${username}/todos/${id}`)
    }

    update_todo(id, username, todo){
        return axios.put(`${JPA_API_URL}/users/${username}/todos/${id}`, todo)
    }

    add_todo(username, todo){
        return axios.post(`${JPA_API_URL}/users/${username}/todos`, todo)
    }
}

export default new TodoService()