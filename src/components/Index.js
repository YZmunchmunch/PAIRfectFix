import React from 'react'
import { Card, Button} from 'react-bootstrap'
import { Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function Index() {

    return (
        <div>
            <div>
                <Link to="/dashboard"><Button>User</Button></Link>
            </div>
            <div>
                <Link to="/business-dashboard"><Button>Business</Button></Link>
            </div>
            
        </div>
    )
}