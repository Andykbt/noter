import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useSpring, animated as a } from 'react-spring'

import { collection, addDoc, serverTimestamp } from '@firebase/firestore'
import { db } from '../firebase'

import * as classes from './AddCard.module.scss'

export default function AddCard() {
    const { register, handleSubmit, reset } = useForm();
    const [ focus, setFocus ] = useState(false)

    const onSubmit = async (data) => {
        const docRef = await (addDoc(collection(db, "notes"), {
            title: data.title,
            note: data.content,
            createdAt: serverTimestamp(),
        }))

        console.log("Document written with ID: " , docRef.id)
        reset()
    }

    const props = useSpring({
        height: focus ? 50 : 0
    })

    return (
        <Card style={{width: '50vw'}} className={classes.container}> 
            <form autoComplete={"off"} onSubmit={handleSubmit(onSubmit)} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}>
                <a.input
                    className={classes.formTitle}
                    {...register("title", {required: true })}
                    placeholder={'Title'}
                    style={props}/>
                <input {...register("content")} placeholder={'Take a note...'}/>
                <button className={classes.formSubmit} type="submit"><span>+</span></button>
            </form>
        </Card>
    )
}
