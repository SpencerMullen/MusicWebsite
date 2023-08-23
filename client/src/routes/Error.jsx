import React from 'react'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function ErrorPage() {
    return (
        <>
            <Alert severity="error" sx = {{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '50%',
                margin: 'auto',
                textAlign: 'left',
                padding: '1rem'
            }}><AlertTitle>Uh-oh!</AlertTitle>
            404: Page not found</Alert>
        </>
    )}

export default ErrorPage