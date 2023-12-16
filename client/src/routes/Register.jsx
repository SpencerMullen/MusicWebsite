import React, { useState } from 'react';
import { TextField, Button, Container, Paper, Typography, Link } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { register } from '../utils/requestUtils';

function RegisterPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [registrationDisabled, setRegistrationDisabled] = useState(false);

    const handleRegister = async () => {
        try {
            // Implement the register function based on your server requirements
            const response = await register(username, password);

            // Check if the registration was successful
            if (response.username) {
                // Handle registration success
                navigate('/login');
            } else {
                console.log(response.statusCode === 503);
                // Handle registration failure
                console.error('Registration failed:', response.message);
            }
        } catch (err) {
            if (err.message.includes('503')) {
                // Registration is currently disabled
                setRegistrationDisabled(true);
            }
            console.error('Error during registration:', err.message);
        }
    }

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: '20px', marginTop: '50px' }}>
                <Typography variant="h5" gutterBottom>
                    Register
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
                />
                <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>
                    Register
                </Button>
                {registrationDisabled && (
                    <Typography variant="body2" style={{ marginTop: '10px', color: 'red' }}>
                        Registration currently disabled
                    </Typography>
                )}
                <Typography variant="body2" style={{ marginTop: '10px' }}>
                    Already have an account? <Link component={RouterLink} to="/login">Login</Link>
                </Typography>
            </Paper>
        </Container>
    );
}

export default RegisterPage;
