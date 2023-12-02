import React, { useState } from 'react';
import { TextField, Button, Container, Paper, Typography } from '@mui/material';
import { useNavigate, useOutletContext } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Redirect to home page if user is already logged in
    if(userStatus.isAuthenticated) {
        navigate('/');
    }

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/login', {
                username: username,
                password: password
            }, { withCredentials: true });

            // Check if the login was successful based on your server response
            if (response.data.username) {
                // const userStatus = await axios.get('http://localhost:8080/user', { withCredentials: true });
                // setUserStatus({ username: userStatus.data.username, role: userStatus.data.role, isAuthenticated: true });
                // console.log('User status:', userStatus.data);
                navigate('/');
            } else {
                // Handle login failure (invalid username or password)
                console.error('Login failed:', response.data.message);
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
