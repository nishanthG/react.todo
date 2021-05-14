import { ErrorMessage, Field, Form, Formik} from "formik";
import moment from "moment";
import React, {Component} from "react"
import TodoService from "../../api/todo/TodoService";
import './Todo.css'


class UpdateTodoComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            id: this.props.match.params.id,
            username: this.props.match.params.username,
            desc: "",
            date: ''
        }
    }

    componentDidMount() {
        this.populateData()
    }

    populateData =() =>{
        TodoService.get_todo(this.state.id, this.state.username)
        .then(response => this.setState({
            desc: response.data.description,
            date: moment(response.data.date).format('YYYY-MM-DD')
        }))
    }

    onSubmit = (values) => {
        TodoService.update_todo(this.state.id, this.state.username, {
            'id': this.state.id,
            'username': this.state.username,
            'description': values.description,
            'date': values.date
        })
        .then(() => this.props.history.push(`/todo/${this.state.username}/todos`))
    }

    validateFields = (values) => {
        let errors = {}

        if(!values.description){
            errors.description = 'Enter a valid Description'
        }
        else if(!moment(values.date).isValid()){
            errors.date = "Enter a valid Date"
        }
        else if(values.description.length < 5){
            errors.description = 'Description should have more than 5 characters'
        }
        return errors
    }

    goback = () => {
        let username = this.state.username
        this.props.history.push(`/todo/${username}/todos/`)
    }

    render(){
        let description = this.state.desc
        let date = this.state.date

        return (
            <>
                <div className="container">
                    <h2>Update Todo</h2>
                    <Formik initialValues = {{ description, date }} onSubmit={this.onSubmit} validate={this.validateFields}
                    validateOnChange={false} validateOnBlur={false} enableReinitialize={true} >
                        {
                            (props) =>
                            <Form>
                                <ErrorMessage name="description" component='div' className='alert alert-warning'/>
                                <ErrorMessage name="date" component='div' className='alert alert-warning'/>
                                <fieldset className="form-group">
                                    <label>description</label>
                                    <Field className="form-control" type='text' name='description'></Field>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>date</label>
                                    <Field className="form-control" type='date' name='date'></Field>
                                </fieldset>
                                <button className="btn btn-dark" type="button" onClick={this.goback}>Back</button>
                                <button className="btn btn-info update-submitbtn" type='submit'>Submit</button>
                            </Form>
                        }
                    </Formik>
                </div>
            </>
        );
    }
}

export default UpdateTodoComponent