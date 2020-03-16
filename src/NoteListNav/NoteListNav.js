import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import NotefulContext from '../NotefulContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import { countNotesForFolder } from '../notes-helpers'
import NoteListNavError from './NoteListNavError'
import './NoteListNav.css'

class NoteListNav extends Component {
  static contextType = NotefulContext;
  render() {
    const { folders=[], notes=[] } = this.context
  return (
    <div className='NoteListNav'>
      <NoteListNavError>
      <ul className='NoteListNav__list'>
        {folders.map(folder =>
          <li key={folder.id}>
            <NavLink
              className='NoteListNav__folder-link'
              to={`/folder/${folder.id}`}
            >
              <span className='NoteListNav__num-notes'>
                {countNotesForFolder(notes.notes, folder.id)}
              </span>
              {folder.name}
            </NavLink>
          </li>
      )} 
      </ul>
      <div className='NoteListNav__button-wrapper'>
        <CircleButton
          tag={Link}
          to='/add-folder'
          type='button'
          className='NoteListNav__add-folder-button'
        >
          <FontAwesomeIcon icon='plus' />
          <br />
          Folder
        </CircleButton>
      </div>
      </NoteListNavError>
    </div>
  )
}
}
NoteListNav.defaultProps = {
  folders: []
}

export default NoteListNav