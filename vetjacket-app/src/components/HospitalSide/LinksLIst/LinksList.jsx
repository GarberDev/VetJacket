import React from 'react';
import { useAuth } from '../../../store/useAuth';
import { toast } from 'react-hot-toast';

const LinksList = () => {
    const { user } = useAuth();
    const baseURL = process.env.REACT_APP_BASE_URL;

    if (!user) {
        return <p>Please log in to see this page.</p>;
    }

    const onboardingURL = `${baseURL}/new-client-onboarding/${user.id}`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(onboardingURL).then(() => {
            toast.success('URL copied to clipboard');
        }).catch(err => {
            toast.error('Failed to copy URL');
            console.error('Failed to copy: ', err);
        });
    };

    return (
        <div>
            <h1>Links for {user.name}</h1>
            <ul>
                <li>User ID: {user.id}</li>
                <li>
                    Onboarding URL: 
                    <span>{onboardingURL}</span>
                    <button onClick={copyToClipboard}>
                        Copy URL
                    </button>
                </li>
            </ul>
        </div>
    ); 
};

export default LinksList;
