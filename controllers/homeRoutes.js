const router = require("express").Router();
const sequelize = require("./../config/connection");
const { Post, User, Comment } = require("./../models/");

router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            order: [["created_at", "DESC"]],
            include: [
                {   
                    model: User,
                    attributes: ["id", "username"],
                },
            ],
        });
        const commentData = await Comment.findAll({
            include: [
                { model: User,
                attributes: ["id", "username"]
                }
            ]
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        const comments = commentData.map((comment) => comment.get({ plain: true }));

        if (req.session.logged_in) {
            res.render("homepage", { 
                loggedIn: req.session.logged_in,
                posts, comments,
            });
            console.log(comments);
        } else {
            res.render("homepage", {
                loggedIn: req.session.logged_in,
                posts,
            });
            console.log(posts);
        }
    } catch {
        res.status(500).json(err);
    }
});


router.get("/login", (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect("dashboard");
        return;
    }

    res.render("login");
});

module.exports = router;