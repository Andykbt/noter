import React, { useState } from 'react'
import { Card, Modal, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { db } from '../firebase';
import { setDoc, deleteDoc, doc } from '@firebase/firestore';

import * as classes from './Note.module.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Note({ id, title, content }) {
    const [show, setShow] = useState(false)
    const { register, handleSubmit } = useForm();

    const updateNote = async (data) => {
        await setDoc(doc(db, "notes", id), {
            title: data.title,
            note: data.content
        })

        console.log(`Updated note...`)
    }

    const deleteNote = async () => { await deleteDoc(doc(db, "notes", id)) }

    return (
        <>
            <Card style={{borderRadius: '10px'}} onClick={() => setShow(true)}>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{content}</Card.Text>
                </Card.Body>
            </Card>

            <Modal show={show} onHide={() => setShow(false)} centered size="md">
                <form onSubmit={handleSubmit(updateNote)}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <input {...register("title")} defaultValue={title}/>
                            <input {...register("content")} defaultValue={content}/>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button variant="danger" onClick={deleteNote}>Delete</Button>
                        <Button variant="primary" type={'submit'}>Save Changes</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}
 