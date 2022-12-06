import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Info extends Component {
    render() {
        return (
            <div>
                <Link to={`/world`}>
                    Navigate to World Map
                </Link>
            </div>
        )
    }
}

export default Info;