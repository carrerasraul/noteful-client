import React, { Component } from 'react'



class NotePageNavError extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <h2>Could not display page. Please try again later.</h2>
            )
        }
        return this.props.children;
    }
}
export default NotePageNavError