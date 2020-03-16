import React from 'react'
import Note from '../Note/Note'
import NotePageMainError from './NotePageMainError'
import './NotePageMain.css'

export default function NotePageMain(props) {
  return (
    <section className='NotePageMain'>
      <NotePageMainError>
      <Note
        id={props.note.id}
        name={props.note.name}
        modified={props.note.modified}
      />
      <div className='NotePageMain__content'>
        {props.note.content.split(/\n \r|\n/).map((para, i) =>
          <p key={i}>{para}</p>
        )}
      </div>
      </NotePageMainError>
    </section>
  )
}

NotePageMain.defaultProps = {
  note: {
    content: '',
  }
}