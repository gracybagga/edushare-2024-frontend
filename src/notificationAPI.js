import axios from 'axios';

const createNotification = async (notificationString, token) => {
    try {
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        const data = { notificationString };

        const response = await axios.post(`${process.env.REACT_APP_API_URL}/notification`, data, { headers });

        if (response.status === 201) {
            console.log('Notification created successfully');
            return true; // Notification created successfully
        } else {
            console.error('Failed to create notification:', response.data.message);
            return false; // Notification creation failed
        }
    } catch (error) {
        console.error('Error creating notification:', error);
        return false; // Notification creation failed
    }
};

export default createNotification;
