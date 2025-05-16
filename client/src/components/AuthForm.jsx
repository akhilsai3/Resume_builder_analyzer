import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure } from '../redux/userSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../api';
import { Button, TextField, Typography, Link, Paper } from '@mui/material';

const AuthForm = ({ type }) => {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(signInStart());
            setLoading(true);
            
            const endpoint = type === 'register' ? 'register' : 'login';
            const response = await axios.post(`${BASE_URL}/auth/${endpoint}`, formData);
            
            dispatch(signInSuccess(response.data.user));
            toast.success(response.data.message, {
                position: "top-left",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setLoading(false);
            navigate('/');

        } catch (error) {
            setLoading(false);
            dispatch(signInFailure(error.response?.data?.message || "Something went wrong"));
            toast.error(error.response?.data?.message || "Something went wrong", {
                position: "top-left",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    return (
        <Paper elevation={3} style={{ 
            padding: '2rem', 
            maxWidth: '400px', 
            margin: '2rem auto',
            backgroundColor: 'rgba(255, 255, 255, 0.8)'
        }}>
            <Typography variant="h4" gutterBottom align="center">
                {type === 'register' ? 'Register' : 'Login'}
            </Typography>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {type === 'register' && (
                    <TextField
                        label="Username"
                        type="text"
                        id="username"
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                )}
                
                <TextField
                    label="Email"
                    type="email"
                    id="email"
                    onChange={handleChange}
                    required
                    fullWidth
                />
                
                <TextField
                    label="Password"
                    type="password"
                    id="password"
                    onChange={handleChange}
                    required
                    fullWidth
                    inputProps={{ minLength: 6 }}
                />
                
                <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary"
                    disabled={loading}
                    fullWidth
                >
                    {loading ? 'Processing...' : type === 'register' ? 'Register' : 'Login'}
                </Button>
            </form>
            
            <Typography variant="body2" style={{ marginTop: '1rem', textAlign: 'center' }}>
                {type === 'register' ? (
                    <>
                        Already have an account?{' '}
                        <Link href="/sign-in?type=login" underline="hover">Login here</Link>
                    </>
                ) : (
                    <>
                        Don't have an account?{' '}
                        <Link href="/sign-in?type=register" underline="hover">Register here</Link>
                    </>
                )}
            </Typography>
            
            <Typography variant="body2" align="center" style={{ marginTop: '1rem' }}>
                Or continue with{' '}
                <Link href="/sign-in" underline="hover">Google</Link>
            </Typography>
        </Paper>
    );
};

export default AuthForm;