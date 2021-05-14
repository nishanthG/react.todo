import axios from "axios"

class HelloWorldService {
     triggerRequest() {
        console.log('request triggered from client class')
        return axios.get('http://localhost:8080/hello-world-bean')
    }

    triggerPathrequest(name){
        return axios.get(`http://localhost:8080/hellosays/${name}`)
    }
}

export default new HelloWorldService()