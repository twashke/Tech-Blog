const router = require("express").Router();
const sequelize = require("./../config/connection");
const { Post, User, Comment } = require("./../models/");
const withAuth = require("./../utils/auth");

router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            order: [["created_at", "DESC"]],
            include: [
                {
                  model: Comment,
                  attributes: ["id", "text", "user_id", "post_id","created_at"],
                  include: {
                    model: User,
                    attributes: ["username"],
                  },
                },
                {
                  model: User,
                  attributes: ["username"],
                },
              ],
            });

        const posts = postData.map((post) => post.get({ plain: true }));

        console.log(posts)
        
            res.render("homepage", { 
                posts,
                loggedIn: req.session.logged_in,
            });
        
    } catch {
        res.status(500).json(err);
    }
});
router.get("/posts/:id", withAuth, async (req, res) => {
    try {
      const postData = await Post.findOne({
        where: {
          id: req.params.id,
        },
        include: [
          {
            model: Comment,
            attributes: ["id", "text", "user_id", "post_id","created_at"],
            include: {
              model: User,
              attributes: ["username"],
            },
          },
          {
            model: User,
            attributes: ["username"],
          },
        ],
      });
      if (!postData) {
        res.status(404).json({ message: "No posts found" });
        return;
      }
      const posts = postData.get({ plain: true });
    
      console.log(posts)
      res.render("single-post", {
        posts,
        loggedIn: req.session.logged_in,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });


router.get("/comment/:id", withAuth, async (req, res) => {
    try {
    const currentUser = req.session.user_id
    const user = "Not User"
    const comments = await Comment.findByPk(req.params.id);
    const comment = comments.get({ plain: true });

    console.log("Comment: ", comment);
    console.log("Current User: ", currentUser);

    if(currentUser === comment.user_id) {
        res.render("single-comment", { comment, loggedIn: req.session.logged_in });
    } else {
        console.log(user);
        return user;

    } 
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

router.get("/comment/update/:id", withAuth, async (req, res) => {
    const comments = await Comment.findByPk(req.params.id);
    const comment = comments.get({ plain: true });
    res.render("commentUpdate", { comment, loggedIn: req.session.logged_in });
})

router.get("/login", (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect("dashboard");
        return;
    }

    res.render("login");
});

module.exports = router;