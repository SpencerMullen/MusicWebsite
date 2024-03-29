import axios from 'axios';

// URL for API calls
let API_URL;
if (process.env.NODE_ENV !== 'production') {
    API_URL = 'http://localhost:8080';
} else {
    // API_URL = process.env.BACKEND_URL;
    // process.env does not work for static sites on render so manually input the URL
    API_URL = 'https://music-list-backend-6p8g.onrender.com';
}

/* Entry API calls */

// Get all entries
const getEntries = async (filters) => {
    const url = API_URL + '/entry';
    const response = await axios.get(url,
        {
            params:
                { filters: filters }
        }
        , { withCredentials: true });
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

// Update an entry's image
const updateEntryImage = async (id, formData) => {
    const url = API_URL + '/entry/' + id + '/image';
    const response = await axios.put(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        withCredentials: true
    });
    return response.data;
}

// Update an entry's image by inputting a new image url
const updateEntryImage2 = async (id, imageUrl) => {
    const url = API_URL + '/entry/' + id + '/image2';
    const response = await axios.put(url, { imageUrl: imageUrl }, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });
    return response.data;
}

/* User API calls */

// Register
const register = async (username, password) => {
    const url = API_URL + '/register';
    const credentials = {
        username: username,
        password: password
    };
    const response = await axios.post(url, credentials, { withCredentials: true });
    return response.data;
};

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

// Logout
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

/* Discogs API calls */

// Get releases by the search query
const getReleases = async (artist, title, format, page) => {
    const url = API_URL + '/discogs';
    const response = await axios.get(url,
        {
            params:
            {
                artist: artist,
                title: title,
                format: format,
                page: page
            }
        }
        , { withCredentials: true });
    return response.data;
};

// Post a new entry from using search data from Discogs api
const postDiscogsEntry = async (entry) => {
    const url = API_URL + '/entry/discogs';
    const response = await axios.post(url, { entry: entry }, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });
    return response.data;
}

export {
    getEntries, createEntry, getEntry, updateEntry, deleteEntry, 
    updateEntryImage, updateEntryImage2,
    register, login, logout, getUserStatus,
    getReleases, postDiscogsEntry
};