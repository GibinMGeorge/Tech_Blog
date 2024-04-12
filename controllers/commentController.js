const Comment = require('../models/Comment'); // Assuming you have a Comment model defined

exports.addComment = async (req, res) => {
    try {
        const { postId, content } = req.body;
        // Check if postId and content are provided
        if (!postId || !content) {
            return res.status(400).send('Post ID and content are required');
        }
        // Create the comment
        const newComment = await Comment.create({ postId, content, userId: req.session.userId });
        res.status(201).json({ message: 'Comment added successfully', comment: newComment });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding comment');
    }
};

exports.editComment = async (req, res) => {
    const commentId = req.params.id;
    const { content } = req.body;
    try {
        await Comment.update({ content }, { where: { id: commentId } }); // Update the content of the comment in the database
        res.redirect('/'); // Redirect to the homepage after editing the comment
    } catch (error) {
        console.error('Error editing comment:', error);
        res.status(500).send('Error editing comment');
    }
};

exports.deleteComment = async (req, res) => {
    const commentId = req.params.id;
    try {
        await Comment.destroy({ where: { id: commentId } }); // Delete the comment from the database
        res.redirect('/'); // Redirect to the homepage after deleting the comment
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).send('Error deleting comment');
    }
};
