const express = require('express');
const cors = require('cors');
const {sequelize} = require('./utils/database');
const {User} = require('./models/user')
const {Post} = require('./models/post')

const app = express();

const PORT = process.env.PORT || 4004

app.use(express.json());
app.use(cors());

//? CB Functions
const {login, register} = require('./controllers/auth');
const {getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost} = require('./controllers/posts');
const { isAuthenticated } = require('./middleware/isAuth');


//? Relationship between User and Post
    User.hasMany(Post);
    Post.belongsTo(User);


//~ Routes(EndPoints)
app.post('/register', register);
app.post('/login', login);

app.get('/posts', getAllPosts);

app.get('/userposts/:userId', getCurrentUserPosts)
app.post('/posts', isAuthenticated, addPost)
app.put('/posts/:id', isAuthenticated, editPost)
app.delete('/posts/:id', isAuthenticated, deletePost)


// the force: true is for development -- it DROPS tables!!!
// you can use it if you like while you are building.
// sequelize.sync({ force: true })
// use the .sync method to connect to our database
sequelize.sync()
.then(() => {
        app.listen(PORT, () => console.log(`db sync successful and server running on port ${PORT}`));
    })
.catch(err => console.error(err));