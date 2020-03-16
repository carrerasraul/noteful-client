import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NoteListMainError from './NoteListMainError.js'
import NotefulContext from '../NotefulContext'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import './NoteListMain.css'




class NoteListMain extends Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = NotefulContext;

  render() {
    const getNotesForFolder = (notes=[], folderId) => (
      (!folderId)
        ? notes
        : notes.filter(note => note.folderId === folderId)
    )
    const { notes } = this.context;
    const { folderId } = this.props.match.params
    const getNotes = getNotesForFolder(notes, folderId)
  return (
    <section className='NoteListMain'>
      <NoteListMainError>
      <ul>
        {getNotes.map(note =>
          <li key={note.id}>
            <Note
              id={note.id}
              name={note.name}
              modified={note.modified}
            />
          </li>
        )}
      </ul>
      <div className='NoteListMain__button-container'>
        
        <CircleButton
          tag={Link}
          to='add-note'
          type='button'
          className='NoteListMain__add-note-button' >
            <FontAwesomeIcon icon='plus' />
            <br/>
            Note              
          </CircleButton>
        </div> 
        </NoteListMainError>
    </section>
  )
}
}

export default NoteListMain