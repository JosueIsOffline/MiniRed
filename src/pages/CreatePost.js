import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const CreatePost = () => {
    let history = useHistory()
    const initialValues = {
        title: '',
        postText: '',
        username: ''
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('You must input a Title'),
        postText: Yup.string().required(),
        username:  Yup.string().min(3).max(15).required()
    })


    const onSubmit = (data) => {
        axios.post('http://localhost:3001/posts', data).then((res) => {
          history.push('/')
        })
    }

    


  return (
    <div className='createPostPage'>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className='formContainer'>

                <lable>Title:</lable>
                <ErrorMessage name='title' component='span'/>
                <Field 
                    autocomplete='off'
                    id='inputCreatePost' 
                    name='title' 
                    placeholder='{Ex. Title...}'
                />

                <lable>Post:</lable>
                <ErrorMessage name='postText' component='span'/>
                <Field 
                    autocomplete='off'
                    id='inputCreatePost' 
                    name='postText' 
                    placeholder='{Ex. Post...}'
                />

                <lable>Username:</lable>
                <ErrorMessage name='username' component='span'/>
                <Field 
                    autocomplete='off'
                    id='inputCreatePost' 
                    name='username' 
                    placeholder='{Ex. Jhon123...}'
                />

                <button type='submit'>Create Post</button>
            </Form>
        </Formik>
    </div>
  )
}

export default CreatePost