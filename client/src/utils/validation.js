export const validatePassword = (password) => {
    const errors = [];
    
    if (password.length < 8) {
      errors.push("At least 8 characters");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("At least one uppercase letter (A-Z)");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("At least one lowercase letter (a-z)");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("At least one number (0-9)");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("At least one special character (!@#$%&*)");
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  };
  
  // Remove the default export and validation object wrapper