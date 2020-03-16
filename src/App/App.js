import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { findFolder, findNote, getNotesForFolder, countNotesForFolder } from '../notes-helpers'
import PropTypes from 'prop-types'
import NotefulContext from '../NotefulContext';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import AddFolder from '../AddFolder/AddFolder'
import './App.css';
import AddNote from '../AddNote/AddNote';
import AppError from './AppError';

const API_ENDPOINT = `http://localhost:9090/`

class App extends Component {
    state = {
        notes: [],
        folders: [],
        
    };
    handleNewFolder = (data) => {
        const newFolders = 
            this.state.folders.concat([data]);
        this.setState({
            folders: newFolders
        })   
    }
    handleNewNote = (data) => {
        const newNotes = 
            this.state.notes.concat([data]);
            this.setState({
                notes: newNotes
            })
    }

    setNotes = notes => {
        this.setState({
            notes,
            
        })
    }

    setFolders = folders => {
        this.setState({
            folders,
            
        })
    }

    componentDidMount() {
        Object.keys(this.state).forEach(state => {
        const url = API_ENDPOINT + state; 
        fetch(url,  {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
            })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => Promise.reject(error))
                }
                return res.json()
            })
            .then(data => 
                state === 'notes'
                    ? this.setNotes(data)
                    : this.setFolders(data)
        )
        .catch(error => {
            console.log(error)
            this.setState({error})
        })
    })    
    } 


       

    renderNavRoutes() {
        const contextValue = {
            notes: this.state.notes,
            folders: this.state.folders,
        }
        return (
            <>
            <NotefulContext.Provider
                value={contextValue}>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />
                ))}
              
                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        const {noteId} = routeProps.match.params;
                        const note = findNote(this.state.notes, noteId) || {};
                        const folder = findFolder(this.state.folders, note.folderId);
                        return <NotePageNav {...routeProps} folder={folder}/>
                    }} />
                
                
                </NotefulContext.Provider>
            </>
        )
    }

    renderMainRoutes() {
        const contextValue = {
            notes: this.state.notes,
            folders: this.state.folders,
        }
        return (
            <>
            <NotefulContext.Provider
                value={contextValue}>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    component={NotePageMain}
                />
                <Route path="/add-note" render={(routeProps) => <AddNote handleNew={this.handleNewNote}{...routeProps} />} />

                <Route exact path="/add-folder" render={(routeProps) => <AddFolder handleNew={this.handleNewFolder}{...routeProps} /> } />
                </NotefulContext.Provider>
            </>
        );
    }

    render() {
        return (
            <div className="App">
                <AppError>
                    <nav className="App__nav">{this.renderNavRoutes()}</nav>
                    <header className="App__header">
                        <h1>
                            <Link to="/">Noteful</Link>{' '}
                            <FontAwesomeIcon icon="check-double" />
                        </h1>
                    </header>
                    <main className="App__main">{this.renderMainRoutes()}</main>
                </AppError>
            </div>
        );
    }
    PropTypes = {
        url: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        contextValue: PropTypes.objectOf(PropTypes.shape({
            notes: PropTypes.arrayOf(PropTypes.Object),
            folders: PropTypes.arrayOf(PropTypes.Object),
        })),
        
    }
}

export default App;