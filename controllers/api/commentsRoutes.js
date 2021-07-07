// Declare Express Router Variable
const router = require('express').Router();
// Declare Required Models
const { Comment } = require('../../models');
const withAuth = require("../../utils/auth");

// -----------------------------------------|
//          COMMENTS API REQUESTS           | 
// -----------------------------------------|

// Find All Comments
router.get("/", withAuth, async (req, res) => {
    try {
        // Declare variable
        const commentData = await Comment.findAll({
            order: [["id", "DESC"]]
        });
        // Return OK Status and data
        res.status(200).json(commentData);
        // Catch for any errors
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create a new Comment
router.post('/', withAuth, async (req, res) => {
    try {
    // Declare variable
    const commentData = await Comment.create(
    {
        text: req.body.text,
        user_id: req.body.user_id,
        // user_id: req.session.user_id
        post_id: req.body.post_id
    });
        // Return OK Status and data
        res.status(200).json(commentData);
    // Catch for any errors
    } catch (err) {
        res.status(400).json(err);
    }
});

// Update a Post by its "id" value
router.put("/:id", withAuth, async (req, res) => {
    try {
    // Declare variable
    const commentData = await Comment.update({
        text: req.body.text
    }, 
    {
        where: {
            id: req.params.id 
        }
    });
    // If specified id is not found, send 404 response and message
    if (!commentData) {
        res.status(404).json({ message: 'No Comment with this id!' });
        return;
    }
        // Return OK Status and data
        res.status(200).json(commentData);  
    // Catch for any errors
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete a Comment by its "id" value
router.delete("/:id", withAuth, async (req, res) => {
    try {
        // Declare variable
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
            },
    });
    // If specified id is not found, send 404 response and message
    if (!commentData) {
        res.status(404).json({ message: 'No Comment with this id!' });
        return;
    }
        // Return OK Status and data
        res.status(200).json(commentData);
    // Catch for any errors
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
