import React from 'react'

const NotefulContext = React.createContext({
    notes: [],
    folders: [],
    deleteNote: () => {},
    AddFolder: () => {},
    AddNote: () => {}
})

export default NotefulContext