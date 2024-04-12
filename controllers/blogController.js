const BlogPost = require('../models/BlogPost'); // Assuming you have a BlogPost model defined
const Comment = require('../models/Comment'); // Assuming you have a Comment model defined

exports.renderHomePage = async (req, res) => {
    try {
        const blogPosts = await BlogPost.findAll(); // Fetch all existing blog posts from the database
        res.render('home', { blogPosts }); // Render the homepage view with existing blog posts
    } catch (error) {
        console.error('Error rendering homepage:', error);
        res.status(500).send('Error rendering homepage');
    }
};

exports.renderDashboard = async (req, res) => {
    try {
        const user = req.session.user; // Retrieve the logged-in user from the session
        const userPosts = await BlogPost.findAll({ where: { userId: user.id } }); // Fetch the user's blog posts from the database
        res.render('dashboard', { userPosts }); // Render the dashboard view with the user's blog posts
    } catch (error) {
        console.error('Error rendering dashboard:', error);
        res.status(500).send('Error rendering dashboard');
    }
};

exports.createBlogPostForm = (req, res) => {
    res.render('createPost'); // Render the form for creating a new blog post (createPost.handlebars)
};

exports.createBlogPost = async (req, res) => {
    const { title, content } = req.body;
    try {
        const user = req.session.user; // Retrieve the logged-in user from the session
        await BlogPost.create({ title, content, userId: user.id }); // Create a new blog post associated with the logged-in user
        res.redirect('/blog/dashboard'); // Redirect to the dashboard after creating the blog post
    } catch (error) {
        console.error('Error creating blog post:', error);
        res.status(500).send('Error creating blog post');
    }
};

exports.viewBlogPost = async (req, res) => {
    const postId = req.params.id;
    try {
        const blogPost = await BlogPost.findByPk(postId, { include: Comment }); // Fetch the blog post and its associated comments from the database
        res.render('viewPost', { blogPost }); // Render the view for the specific blog post (viewPost.handlebars)
    } catch (error) {
        console.error('Error viewing blog post:', error);
        res.status(500).send('Error viewing blog post');
    }
};

exports.addComment = async (req, res) => {
    const { content } = req.body;
    const postId = req.params.id;
    try {
        const user = req.session.user; // Retrieve the logged-in user from the session
        await Comment.create({ content, userId: user.id, blogPostId: postId }); // Create a new comment associated with the logged-in user and the specified blog post
        res.redirect(`/blog/post/${postId}`); // Redirect to the view for the specific blog post after adding the comment
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).send('Error adding comment');
    }
};
