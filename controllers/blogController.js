const BlogPost = require('../models/BlogPost');
const Comment = require('../models/Comment');

exports.renderHomePage = async (req, res) => {
    try {
        const blogPosts = await BlogPost.findAll();
        res.render('home', { blogPosts });
    } catch (error) {
        console.error('Error rendering homepage:', error);
        res.status(500).send('Error rendering homepage');
    }
};

exports.renderDashboard = async (req, res) => {
    try {
        const userId = req.session.userId;
        const userPosts = await BlogPost.findAll({ where: { userId } });
        res.render('dashboard', { userPosts });
    } catch (error) {
        console.error('Error rendering dashboard:', error);
        res.status(500).send('Error rendering dashboard');
    }
};

exports.createBlogPostForm = (req, res) => {
    res.render('createPost');
};

exports.createBlogPost = async (req, res) => {
    const { title, content } = req.body;
    try {
        const userId = req.session.userId;
        await BlogPost.create({ title, content, userId });
        res.redirect('/blog/dashboard');
    } catch (error) {
        console.error('Error creating blog post:', error);
        res.status(500).send('Error creating blog post');
    }
};

exports.viewBlogPost = async (req, res) => {
    const postId = req.params.id;
    try {
        const blogPost = await BlogPost.findByPk(postId, { include: Comment });
        res.render('viewPost', { blogPost });
    } catch (error) {
        console.error('Error viewing blog post:', error);
        res.status(500).send('Error viewing blog post');
    }
};

exports.addComment = async (req, res) => {
    const { content } = req.body;
    const postId = req.params.id;
    try {
        const userId = req.session.userId;
        await Comment.create({ content, userId, blogPostId: postId });
        res.redirect(`/blog/post/${postId}`);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).send('Error adding comment');
    }
};
