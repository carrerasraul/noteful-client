import React from 'react'
import ReactDOM from 'react-dom'
import AddFolder from './AddFolder'

it('reanders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <AddFolder />,
        div
    )
    ReactDOM.unmountComponentAtNode(div)
})