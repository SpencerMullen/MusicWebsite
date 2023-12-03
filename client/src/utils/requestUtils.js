import axios from 'axios';

// URL for API calls
let API_URL;
if (process.env.NODE_ENV !== 'production') {
    API_URL = 'http://localhost:8080';
} else {
    API_URL = '';
}

/* Entry API calls */

// Get all entries
const getEntries = async () => {
    const url = API_URL + '/entry';
    const response = await axios.get(url, { withCredentials: true });
    return response.data;
};

// Create a new entry
const createEntry = async (formData) => {
    const url = API_URL + '/entry';
    const response = await axios.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        withCredentials: true
    });
    return response.data;
}

// Get a specific entry
const getEntry = async (id) => {
    const url = API_URL + '/entry/' + id;
    const response = await axios.get(url, { withCredentials: true });
    return response.data;
}

// Update an entry
const updateEntry = async (id, updatedEntry) => {
    const url = API_URL + '/entry/' + id;
    const response = await axios.put(url, { entry: updatedEntry }, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });
    return response.data;
}

// Delete an entry
const deleteEntry = async (id) => {
    const url = API_URL + '/entry/' + id;
    const response = await axios.delete(url, { withCredentials: true });
    return response.data;
}

/* User API calls */

// Login
const login = async (username, password) => {
    const url = API_URL + '/login';
    const credentials = {
        username: username,
        password: password
    };
    const response = await axios.post(url, credentials, { withCredentials: true });
    return response.data;
};

const logout = async () => {
    const url = API_URL + '/logout';
    const response = await axios.get(url, { withCredentials: true });
    return response.data;
};

// Get user status
const getUserStatus = async () => {
    const url = API_URL + '/user';
    const response = await axios.get(url, { withCredentials: true });
    const userInfo = {
        username: response.data.username || null,
        role: response.data.role || null,
        isAuthenticated: response.data.username ? true : false
    }
    // console.log("getUserStatus: ", userInfo);
    return userInfo;
};

export { getEntries, createEntry, getEntry, updateEntry, deleteEntry,
    login, logout, getUserStatus };