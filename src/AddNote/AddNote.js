import React, { Component } from 'react'
import './AddNote.css'
import PropTypes from 'prop-types'
import AddNoteError from './AddNoteError'
import NotefulContext from '../NotefulContext'
const API_ENDPOINT = `http://localhost:9090/`



class AddNote extends Component {
    static contextType = NotefulContext;
    constructor(props) {
        super(props);
        this.folderInput = React.createRef();
        this.content = React.createRef();
        this.name = React.createRef();
        this.state = {
            error: null
        }
};
    createId = () => {
        return '_' + Math.random().toString(36).substr(2,9);
};
clickCancel = () => {
    this.props.history.goBack();
}
onAddNote = (data) => {
    console.log(data);
    this.props.handleNew(data);
    this.props.history.goBack();
}
   
    handleSubmit = e => {
        e.preventDefault();
        const url = API_ENDPOINT + 'notes';
        const name = this.name.current;
        const content = this.content.current;
        const folder = this.folderInput.current;
        const newNote = {
            id: this.createId(),
            name: name.value,
            folderId: folder.value,
            content: content.value,
        }
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(newNote),
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(res => {
            if(!res.ok) {
                return res.json().then(error => {
                    throw error
                })
            }
            return res.json();
        })
        .then(data => {
            name.value = ''
            content.value = ''
            folder.value = ''
            this.onAddNote(data)
        })

};
    render() {
        const { folders } = this.context
        return(
            <div className='AddNote-contain'>
                <AddNoteError>
                <form className='AddNote-form' onSubmit={this.handleSubmit}>
                <select name='folder-input' ref={this.folderInput} placeholder='Select' required>
                    {Object.values(folders).map(folder => {
                        const index = folders.indexOf(folder)
                        return <option key={index} value={folder.id}>{folder.name}</option>
                    })}
                </select>
                <input 
                    type='text'
                    name='newName'
                    id='newName'
                    placeholder='Note Title'
                    ref={this.name}
                    required></input>
                <input 
                    type='text'
                    name='newNote'
                    id='newNote'
                    placeholder='Your new note!'
                    ref={this.content}
                    required></input>
                <button type='button' 
                    role='link'
                    onClick={this.clickCancel}>
                        Cancel
                </button>
                <button type='submit'>Submit</button>
                </form>
                </AddNoteError>
            </div>
        )
}

PropTypes = {
    contextType: PropTypes.arrayOf(PropTypes.object),
    index: PropTypes.number.isRequired,
    newNote: PropTypes.objectOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        folderId: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
    })),
    folders: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    })),
    
}}



export default AddNote