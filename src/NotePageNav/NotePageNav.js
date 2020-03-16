import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import NotePageNavError from './NotePageNavError'
import CircleButton from '../CircleButton/CircleButton'
import './NotePageNav.css'
 
export default function NotePageNav(props){
  return (
    <div className='NotePageNav'>
      <NotePageNavError>
      <CircleButton
        tag='button'
        role='link'
        onClick={() => props.history.goBack()}
        className='NotePageNav__back-button'
      >
        <FontAwesomeIcon icon='chevron-left' />
        <br />
        Back
      </CircleButton>
      {props.folders && (
        <h3 className='NotePageNav__folder-name'>
          {props.folders.name}
        </h3>
      )}
      </NotePageNavError>
    </div>
  )
}
NotePageNav.propTypes = {
  folders: PropTypes.array
}




