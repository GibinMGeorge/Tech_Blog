const Comment = require('../models/Comment');

exports.addComment = async (req, res) => {
    try {
        const { postId, content } = req.body;
        
        // Validation
        if (!postId || !content || typeof postId !== 'number' || typeof content !== 'string' || content.trim() === '') {
            return res.status(400).json({ error: 'Invalid data provided for comment' });
        }

        // Create the comment
        const newComment = await Comment.create({ postId, content, userId: req.session.userId });
        res.status(201).json({ message: 'Comment added successfully', comment: newComment });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Error adding comment' });
    }
};

exports.editComment = async (req, res) => {
    const commentId = req.params.id;
    const { content } = req.body;
    try {
        await Comment.update({ content }, { where: { id: commentId } });
        res.redirect('/');
    } catch (error) {
        console.error('Error editing comment:', error);
        res.status(500).json({ error: 'Error editing comment' });
    }
};

exports.deleteComment = async (req, res) => {
    const commentId = req.params.id;
    try {
        await Comment.destroy({ where: { id: commentId } });
        res.redirect('/');
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ error: 'Error deleting comment' });
    }
};
