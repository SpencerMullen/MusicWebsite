import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/requestUtils';

function LoginPage({ userStatus, handleUserStatus }) {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Check authentication status when the component mounts
    useEffect(() => {
        // If user is already authenticated, redirect to home
        if (userStatus.isAuthenticated) {
            navigate('/');
        }
    }, [userStatus, navigate]);

    const handleLogin = async () => {
        try {
            const response = await login(username, password);

            // Check if the login was successful based on your server response
            if (response.username) {
                // Handle login success
                // const status = await getUserStatus();
                const status = { isAuthenticated: true, username: response.username, role: response.role };
                handleUserStatus(status);
                navigate('/');
            } else {
                // Handle login failure (invalid username or password)
                console.error('Login failed:', response.message);
            }
        } catch (err) {
            console.error('Error during login:', err.message);
        }
    }

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: '20px', marginTop: '50px' }}>
                <Typography variant="h5" gutterBottom>
                    Login (Admin Only)
                </Typography>
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleLogin();
                        }
                    }}
                />
                <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
                    Login
                </Button>
            </Paper>
        </Container>
    );
}

export default LoginPage;
