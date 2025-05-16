import React, { useState } from 'react';
import { app } from '../../firebase';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { signInFailure, signInStart, signInSuccess } from '../../redux/userSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import { InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../api';
import { motion } from 'framer-motion';
import { CircularProgress, TextField, Button as MuiButton, Typography, Link, Paper, Box } from '@mui/material';
import { validatePassword } from '../../utils/validation';
export default function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [passwordErrors, setPasswordErrors] = useState([]);
    const authType = searchParams.get('type') || 'login';
   

    const handleGoogle = async () => {
        try {
            dispatch(signInStart());
            setLoading(true);
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);

            const formData = {
                username: result?.user?.displayName,
                email: result?.user?.email,
                avatar: result?.user?.photoURL
            };
            const response = await axios.post(`${BASE_URL}/auth/google-sign-in`, formData);
            dispatch(signInSuccess(response?.data?.user));
            toast.success(response?.data?.message, {
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
            console.log(error);
            dispatch(signInFailure(error.message));
            toast.error("Login failed. Please try again.", {
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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validation = validatePassword(formData.password);
  
  if (!validation.isValid) {
    setPasswordErrors(validation.errors);
    return;
  }
        try {
            dispatch(signInStart());
            setLoading(true);
            
            const endpoint = authType === 'register' ? 'register' : 'login';
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

    const Star = ({ size, left, top, delay }) => {
        return (
            <motion.div
                style={{
                    position: 'absolute',
                    width: `${size}px`,
                    height: `${size}px`,
                    left: `${left}%`,
                    top: `${top}%`,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '50%',
                    zIndex: 0
                }}
                animate={{
                    opacity: [0.3, 1, 0.3],
                }}
                transition={{
                    duration: 2 + Math.random() * 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: delay
                }}
            />
        );
    };

    // Generate random stars
    const stars = Array.from({ length: 50 }).map((_, i) => (
        <Star 
            key={i}
            size={Math.random() * 2 + 1}
            left={Math.random() * 100}
            top={Math.random() * 100}
            delay={Math.random() * 2}
        />
    ));
    const darkTextFieldStyles = {
        '& .MuiOutlinedInput-root': {
          color: 'rgba(255,255,255,0.9)',
          '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
          '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.4)' },
          '&.Mui-focused fieldset': { borderColor: 'rgba(72,149,239,0.7)!important' },
          '&.Mui-filled': { 
            '& .MuiOutlinedInput-input': { color: 'rgba(255,255,255,0.8)' },
            '& fieldset': { borderColor: 'rgba(255,255,255,0.15)!important' }
          },
          '& .MuiOutlinedInput-input': { 
            backgroundColor: 'transparent!important',
            '&:-webkit-autofill': {
              WebkitBoxShadow: '0 0 0 100px rgba(30,35,40,0.9) inset',
              WebkitTextFillColor: 'rgba(255,255,255,0.8)'
            }
          }
        },
        '& .MuiInputLabel-root': {
          color: 'rgba(255,255,255,0.6)',
          '&.Mui-focused, &.Mui-filled': { color: 'rgba(72,149,239,0.8)!important' }
        }
      };
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            width: '100vw',
            position: 'relative',
            overflow: 'hidden',
            background: `
                radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)`,
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `
                    linear-gradient(to bottom, rgba(1, 11, 16, 0.9), rgba(5, 15, 26, 0.9))`,
                zIndex: 0
            }
        }}>
            {/* Star particles */}
            {stars}

            {/* Auth Container */}
            <Paper elevation={3} sx={{
                width: { xs: '90%', sm: '400px' },
                p: 4,
                zIndex: 1,
                borderRadius: 3,
                backgroundColor: 'rgba(30, 35, 40, 0.85)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.36)'
            }}>
                <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ 
                    fontWeight: 700,
                    color: 'white',
                    mb: 3,
                    background: 'linear-gradient(90deg, #4361ee, #3a0ca3)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    {authType === 'register' ? 'Create Account' : 'Welcome Back'}
                </Typography>

                {authType !== 'google' && (
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        {authType === 'register' && (
                    <TextField
                        label="Username"
                        type="text"
                        id="username"
                        onChange={handleChange}
                        required
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        sx={darkTextFieldStyles}
                    />
                )}
                
                <TextField
                    label="Email"
                    type="email"
                    id="email"
                    onChange={handleChange}
                    required
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    sx={darkTextFieldStyles}
                />
                
                <TextField
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    onChange={(e) => {
                        handleChange(e);
                        const validation = validatePassword(e.target.value);
                        setPasswordErrors(validation.errors);
                      }}
                      required
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      error={passwordErrors.length > 0}
                      helperText={
                        passwordErrors.length > 0 ? (
                          <ul style={{ paddingLeft: '20px', margin: '4px 0' }}>
                            {passwordErrors.map((error, i) => (
                              <li key={i} style={{ fontSize: '0.75rem' }}>{error}</li>
                            ))}
                          </ul>
                        ) : null
                      }
                    InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    sx={darkTextFieldStyles}
                />

                        
                        <MuiButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loading}
                            sx={{ 
                                mt: 3, 
                                mb: 2, 
                                py: 1.5,
                                background: 'linear-gradient(45deg, #4361ee 0%, #3a0ca3 100%)',
                                color: 'white',
                                fontWeight: 600,
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 4px 20px rgba(58, 12, 163, 0.4)'
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 
                             authType === 'register' ? 'Register' : 'Login'}
                        </MuiButton>
                    </Box>
                )}

                <Typography variant="body2" align="center" sx={{ mt: 2, color: 'rgba(255, 255, 255, 0.7)' }}>
                    {authType === 'register' ? (
                        <>
                            Already have an account?{' '}
                            <Link href="/sign-in?type=login" color="primary" underline="hover" sx={{ color: '#4895ef' }}>
                                Login here
                            </Link>
                        </>
                    ) : (
                        <>
                            Don't have an account?{' '}
                            <Link href="/sign-in?type=register" color="primary" underline="hover" sx={{ color: '#4895ef' }}>
                                Register here
                            </Link>
                        </>
                    )}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', my: 3 }}>
                    <Box sx={{ flexGrow: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)' }} />
                    <Typography variant="body2" sx={{ px: 2, color: 'rgba(255, 255, 255, 0.5)' }}>OR</Typography>
                    <Box sx={{ flexGrow: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)' }} />
                </Box>

                <MuiButton
                    fullWidth
                    variant="outlined"
                    onClick={handleGoogle}
                    disabled={loading}
                    sx={{
                        py: 1.5,
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        color: 'white',
                        '&:hover': {
                            borderColor: '#4895ef',
                            backgroundColor: 'rgba(72, 149, 239, 0.1)'
                        },
                        transition: 'all 0.3s ease'
                    }}
                >
                    <Box 
                        component="img" 
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJKSURBVHgBvZTPaxNBFMffm93VpI2QQOqpyuhFBKFbUKmguIt6j9568z+Iihd/0YiCHgTTu2BzEKkIyUkvtRk9iUa7/gVdD2o9SFZaadP9Mc7uJtvNtlmtQr+w7OzbN595b+bNQxigtn58zEGvBIglAE4BMC/Mhhib3OWNvexDbat5mDQsamo+R+QpAboEKeIcTAUcrTC/8Hkg8JumUokoTUSg8JfquDA+yt4bvW85HtlWMARucUBTDC3x+GmrsTAro6xlxP0j4DCRHm6KTExY9nLTBxizNrKYoLLk1sW/xsh86zYkFKS8+hKozehipzWysZKHaqH57hNsUySYvEsuZ899gczJpSiyf4EFrBCAwb5kTi2BvH8F1p4cnkk66vfXx8Bz82mw5vXs6yBle05ud+vMpzPlrKMnnc/cXWlyBC0NCHyYknCEqStvR10gt2K2/4L3Ioxq6aNdVNXHpU1QF+Ey8bgef5ADi/t4jvUzPBTkTByMNrt6EKq/joA8xMvC2ldj7Eaur4C1e22KnkJ7V028DVYpWEGEDpFrd5bVABaIY+XYs/OnIU2uUhYQGn1zqRqlnNXXzBfr+6pxf+4RdnT2wlSS42/HiUcP6gQh1jzQfHUzW+tG2nWsl/JKR1rg0H/9RKlYYq966UZ3mdhFGPp6DYhTBH8/527tYX1AXxNPS9RFqZmEDpIPzXy/cvHN1UNRbyRxh7eTDdPe7Y6LVWb+BBNdyPTkG3ocFtoHKIyWlEXrUoWXChzyInJTdCQDPJxuTT5nsBP6DEkW1QHQYUIiAAAAAElFTkSuQmCC" 
                        alt="Google Logo" 
                        sx={{ width: 20, height: 20, mr: 1.5 }} 
                    />
                    Continue with Google
                </MuiButton>
            </Paper>
        </Box>
    );
}