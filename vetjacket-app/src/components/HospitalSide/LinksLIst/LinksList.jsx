import React, { useState } from 'react';
import { useAuth } from '../../../store/useAuth';
import { toast } from 'react-hot-toast';
import Button from '../../base/Button';
import '../LinksLIst/LinksLIst.css';

const LinksList = () => {
    const { user } = useAuth();
    const baseURL = process.env.REACT_APP_BASE_URL;

    const [showFullOnboardingURL, setShowFullOnboardingURL] = useState(false);
    const [showFullIntakeURL, setShowFullIntakeURL] = useState(false);
    const [showFullrecordRequestURL, setShowFullrecordRequestURL] = useState(false);

    if (!user) {
        return <p>Please log in to see this page.</p>;
    }

    const onboardingURL = `${baseURL}/new-client-onboarding/${user.id}`;
    const intakeURL = `${baseURL}/patient-intake/${user.id}`;
    const recordRequestURL = `${baseURL}/records-request/${user.id}`;

    const copyToClipboard = (url) => {
        navigator.clipboard.writeText(url).then(() => {
            toast.success('URL copied to clipboard');
        }).catch(err => {
            toast.error('Failed to copy URL');
            console.error('Failed to copy: ', err);
        });
    };

    const toggleOnboardingURL = () => {
        setShowFullOnboardingURL(!showFullOnboardingURL);
    };

    const toggleIntakeURL = () => {
        setShowFullIntakeURL(!showFullIntakeURL);
    };
    const togglerecordRequestURL = () => {
        setShowFullrecordRequestURL(!showFullrecordRequestURL);
    };
    
    return (
        <div className="links-container"> 
            <h2 className="title">Client Links</h2>
            <p className="description">
            To make client onboarding and patient intake easier, we've created these special links.  You can add these links to your website or send them to your clients via email or text message.  Rest assured, all forms are securely stored, and you'll receive a copy in your email inbox.
        </p>
            <div className="links-grid"> 
                {/* <div className="link-item">
                    <span className="bold-text">User ID:</span> {user.id}
                </div> */}
                <div className="link-item">
                    <span className="bold-text">Onboarding URL:</span>
                    {showFullOnboardingURL ? (
                        <span className="url-text">{onboardingURL}</span>
                    ) : (
                        <span className="url-text">{onboardingURL.substring(0, 50)}...</span>
                    )}
                    <button className="toggle-button" onClick={toggleOnboardingURL}>
                        {showFullOnboardingURL ? 'Show Less' : 'Show More'}
                    </button>
                    <Button variant="primary" onClick={() => copyToClipboard(onboardingURL)}>
                        Copy URL
                    </Button>
                </div>
                <div className="link-item">
                    <span className="bold-text">Patient Intake URL:</span>
                    {showFullIntakeURL ? (
                        <span className="url-text">{intakeURL}</span>
                    ) : (
                        <span className="url-text">{intakeURL.substring(0, 50)}...</span>
                    )}
                    <button className="toggle-button" onClick={toggleIntakeURL}>
                        {showFullIntakeURL ? 'Show Less' : 'Show More'}
                    </button>
                    <Button variant="primary" onClick={() => copyToClipboard(intakeURL)}>
                        Copy URL
                    </Button>
                    <Button variant="" onClick={() => copyToClipboard(intakeURL)}>
                        Email Client Link
                    </Button>
                </div>
                <div className="link-item">
                    <span className="bold-text">Records Request URL:</span>
                    {showFullrecordRequestURL? (
                        <span className="url-text">{recordRequestURL}</span>
                    ) : (
                        <span className="url-text">{recordRequestURL.substring(0, 50)}...</span>
                    )}
                    <button className="toggle-button" onClick={togglerecordRequestURL}>
                        {showFullrecordRequestURL ? 'Show Less' : 'Show More'}
                    </button>
                    <Button variant="primary" onClick={() => copyToClipboard(recordRequestURL)}>
                        Copy URL
                    </Button>
                    <Button variant="" onClick={() => copyToClipboard(intakeURL)}>
                        Email Client Link
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default LinksList;
