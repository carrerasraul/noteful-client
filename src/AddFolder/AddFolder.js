import React, { Component } from 'react'
import AddFolderError from './AddFolderError'
import PropTypes from 'prop-types'
import './AddFolder.css'
import NotefulContext from '../NotefulContext'
const API_ENDPOINT = `http://localhost:9090/`


class AddFolder extends Component {
    static contextType = NotefulContext;
    constructor(props) {
        super(props)
        this.name = React.createRef();
        this.state = {
            error: null,
        }
}

    createId = () => {
        return '_' + Math.random().toString(36).substr(2,9);
    };
    onAddFolder = (data) => {
        this.props.handleNew(data);
        this.props.history.goBack();
    }

    handleSubmit = e => {
        e.preventDefault();
        const name = e.target.name;
        const newFolder = {
            id: this.createId(),
            name: name.value,
        }
        fetch(API_ENDPOINT + 'folders', {
            method: 'POST',
            body: JSON.stringify(newFolder),
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
            return res.json()
        })   
        .then(data => {
            name.value = ''
            this.onAddFolder(data)
        })
        .catch(error => {
            this.setState({ error })
            console.log(error)
        })
    };

    render() {
        
        return (
            <section className='AddFolder'>
                <AddFolderError> 
                <div className='AddFolder-error' role='alert'>
                    {this.state.error && <p>{this.state.error.message}</p>}
                </div>
                <form 
                className='AddFolder-form'
                onSubmit={this.handleSubmit}>
                <input type='text' name='name' id='name' placeholder='New Folder' ref={this.name} required /> 
                <div className='AddFolder-buttons'> 
                <button 
                type='button'
                role='link'
                onClick={() => this.props.history.goBack()} >
                Cancel
                </button>
                <button type='submit'>
                Save
                </button>
                </div>
                </form>
                </AddFolderError>
            </section>
        )
    }
    PropTypes = {
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        
    }
}


export default AddFolder