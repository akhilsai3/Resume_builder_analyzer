import React, { useState } from 'react';
import resume1 from '../assets/resume_template1.jpg';
import resume2 from '../assets/resume_template2.jpg';
import { useNavigate } from 'react-router-dom';
import { IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import '../styles/template.css';

const Templates = () => {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [template, setTemplate] = useState(1);
    const navigate = useNavigate();

    const handleTemplateClick = (template) => {
        setSelectedTemplate(template);
    };

    const handleClose = () => {
        setSelectedTemplate(null);
    };

    const handleResumeClick = (templateNumber) => {
        navigate(`/resume/template=${templateNumber}`);
    };

    const handleAnalyzeResume = () => {
        // Open your Streamlit app in a new tab
        window.open('https://ats-insight-6wqfhbfhpd9q2thbkz5we2.streamlit.app/', '_blank');
    };

    return (
        <div className='container'>
            <h2 className='heading'>Resume Templates</h2>
            <div className="template-container">
                <div onClick={() => handleTemplateClick(resume1)}>
                    <img className="template" src={resume1} alt="Template 1" width={'280px'} height={'380px'} />
                    <p onClick={() => handleResumeClick(1)}>Use Template</p>
                </div>
                <div onClick={() => handleTemplateClick(resume2)}>
                    <img className="template" src={resume2} alt="Template 2" width={'280px'} height={'380px'} />
                    <p onClick={() => handleResumeClick(2)}>Use Template</p>
                </div>
            </div>
            {selectedTemplate && (
                <div className="template-preview-overlay" onClick={handleClose}>
                    <div className="template-preview">
                        <IconButton onClick={handleClose} style={{ position: "absolute", top: "10px", right: "10px" }}>
                            <CloseIcon />
                        </IconButton>
                        <img src={selectedTemplate} alt="Selected Template" />
                    </div>
                </div>
            )}
            
            {/* Add Analyze Resume button at the bottom */}
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                marginTop: '2rem',
                marginBottom: '2rem'
            }}>
                <Button 
    onClick={handleAnalyzeResume} 
    variant="contained" 
    size="large"
    sx={{
        backgroundColor: '#1976d2',  // changed to previous blue
        '&:hover': {
            backgroundColor: '#1565c0', // darker shade for hover
        },
        color: 'white',
        fontWeight: 'bold',
        padding: '10px 24px',
        borderRadius: '30px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        textTransform: 'none'
    }}
>
    Analyze Your Resume
</Button>

            </div>
        </div>
    );
};

export default Templates;