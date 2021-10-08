import logo from './logo.svg';
import * as classes from './App.css';
import React, { useState, useEffect } from 'react'
import { Container, Row } from 'react-bootstrap';

import { db } from './firebase'
import { collection, query, onSnapshot } from '@firebase/firestore'
import Note from './components/Note';
import AddCard from './components/AddCard';

function App() {
  const [notes, setNotes] = useState();

  useEffect(() => {
    const q = query(collection(db, "notes"))
    const unsub = onSnapshot(q, (querySnapshot) => {
        let arr = []
        querySnapshot.forEach((doc) => {
          arr.push({ ...doc.data(), id: doc.id })
        })
  
        setNotes(arr)
    })
    return () => unsub()
  }, [])
  console.log(notes)

  return (
    <Container>
        <AddCard/>

        {notes &&
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gridGap:'25px'}}>
          {notes.map((item) => {
            return <Note id={item.id} title={item.title} content={item.note}/>
          })}
        </div>
        }
    </Container>
  );
}

export default App;
