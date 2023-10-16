import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const Registration = () => {

    let history = useHistory()
    const initialValues = {
        username: '',
        password: '',
    }

    const validationSchema = Yup.object().shape({
        username:  Yup.string().min(3).max(15).required(),
        password:  Yup.string().min(4).max(20).required()
    })

    const onSubmit= (data) => {
        axios.post('http://localhost:3001/auth', data).then(() => {
            history.push('/login')
        })
    }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}  validationSchema={validationSchema}>
    <Form className='formContainer'>
        <lable>Username:</lable>
        <ErrorMessage name='username' component='span'/>
        <Field 
            autocomplete='off'
            id='inputCreatePost' 
            name='username' 
            placeholder='{Ex. Jhon123...}'
        />

        <lable>Password:</lable>
        <ErrorMessage name='password' component='span'/>
        <Field 
            autocomplete='off'
            type='password'
            id='inputCreatePost' 
            name='password' 
            placeholder='Your password...'
        />

        <button type='submit'>Register</button>
    </Form>
</Formik>
  )
}

export default Registration