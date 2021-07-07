// Declare Express Router Variable
const router = require('express').Router();
// Declare Required Models
const { Post, User } = require('../../models');

// -----------------------------------------|
//            API Posts Endpoint            | 
// -----------------------------------------|

// Find All Posts
router.get("/", async (req, res) => {
    try {
      // Declare variable
      const postData = await Post.findAll({
        order: [["createdAt", "DESC"]],
        // Include associated Models
        include: [
          { model: User,
            attributes: ["id", "username"]
          }, 
        ]
      });
      // Return OK Status and data
      res.status(200).json(postData);
    // Catch for any errors
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Find one Post by it's "id" value
router.get("/:id", async (req, res) => {
  try {
    // Declare variable
    const postData = await Post.findByPk(req.params.id, {
        // Include associated Models
        include: [
          { model: User,
            attributes: ["id", "username"]
          }, 
        ]
      });
    // If specified id is not found, send 404 response and message
    if (!postData) {
      res.status(404).json({ message: 'No Post found with that id!' });
      return;
    }
    // Return OK Status and data
    res.status(200).json(postData);
    // Catch for any errors
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new Post
router.post('/', async (req, res) => {
  try {
  // Declare variable
  const postData = await Post.create({
    title: req.body.title,
    content: req.body.content,
    user_id: req.body.user_id
    // user_id: req.session.user_id 
  });
  // Return OK Status and data
  res.status(200).json(postData);
  // Catch for any errors
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a Post by its "id" value
router.put("/:id", async (req, res) => {
  try {
    // Declare variable
    const postData = await Post.update({
      title: req.body.title,
      content: req.body.content,
    }, 
    {
      where: {
        id: req.params.id 
      }
    });
    // If specified id is not found, send 404 response and message
    if (!postData) {
      res.status(404).json({ message: 'No Post with this id!' });
      return;
    }
    // Return OK Status and data
    res.status(200).json(postData);  
  // Catch for any errors
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a Post by its "id" value
router.delete("/:id", async (req, res) => {
  try {
    // Declare variable
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
    },
    });
    // If specified id is not found, send 404 response and message
    if (!postData) {
      res.status(404).json({ message: 'No Post with this id!' });
      return;
    }
    // Return OK Status and data
    res.status(200).json(postData);
  // Catch for any errors
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
