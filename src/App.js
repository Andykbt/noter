import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap';

import { db } from './firebase'
import { collection, query, onSnapshot, orderBy } from '@firebase/firestore'
import Note from './components/Note';
import AddCard from './components/AddCard';

function App() {
  const [notes, setNotes] = useState();

  useEffect(() => {
    const q = query(collection(db, "notes"), orderBy("createdAt", "desc"))
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
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gridGap:'25px'}}>
          {notes.map((item) => {
            return <Note id={item.id} title={item.title} content={item.note}/>
          })}
        </div>
        }
    </Container>
  );
}

export default App;
