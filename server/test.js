const mongoose = require('mongoose');

const dbURL = process.env.MONGODB_URL;
const User = require('./models/user');

mongoose.connect(dbURL, { useUnifiedTopology: true, useNewUrlParser: true });


const db = mongoose.connection;
// Add a user to the database
const addUser = async (user) => {
    try {
        await User.register(user, 'password');
        console.log('User added to the database');
    } catch (err) {
        console.log(err);
    }
};

// Add the user to the database after the connection is established
db.once('open', async () => {
    await addUser({
        username: 'spencer',
        role: 'admin'
    });
    db.close();
});