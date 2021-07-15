const router = require("express").Router();
const sequelize = require("./../config/connection");
const { Post, User, Comment } = require("./../models/");
const withAuth = require("./../utils/auth");

// -----------------------------------------|
//      HOMEPAGE ROUTE - ALL USER POSTS     | 
// -----------------------------------------|

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
            // Render homepage and all data
            res.render("homepage", { 
                posts,
                loggedIn: req.session.logged_in,
            });
        
    } catch {
        res.status(500).json(err);
    }
});

// -----------------------------------------|
//        HOMEPAGE ROUTE - POST BY ID       | 
// -----------------------------------------|

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
    // If No Post with that ID
    if (!postData) {
        res.status(404).json({ message: "No posts found" });
        return;
    }
    const posts = postData.get({ plain: true });
    // Render single-post page with data
    res.render("single-post", {
        posts,
        loggedIn: req.session.logged_in,
    });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// -----------------------------------------|
//      HOMEPAGE ROUTE - COMMENT BY ID      | 
// -----------------------------------------|

router.get("/comment/:id", withAuth, async (req, res) => {
    try {
    const currentUser = req.session.user_id
    const comments = await Comment.findByPk(req.params.id);
    const comment = comments.get({ plain: true });
    // If current user, send to single-comment page to update or delete
    if(currentUser === comment.user_id) {
        res.render("single-comment", { comment, loggedIn: req.session.logged_in });
    } else {
        // If not user don't render new page
        return;
    } 
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// -----------------------------------------|
//      HOMEPAGE ROUTE - COMMENT UPDATE     | 
// -----------------------------------------|

router.get("/comment/update/:id", withAuth, async (req, res) => {
    try {
        const comments = await Comment.findByPk(req.params.id);
        const comment = comments.get({ plain: true });

        // Render page for user to update comment 
        res.render("commentUpdate", { comment, loggedIn: req.session.logged_in });
    } catch {
        console.log(err);
        res.status(500).json(err);
    }
});

// -----------------------------------------|
//         HOMEPAGE ROUTE - LOGIN           | 
// -----------------------------------------|

router.get("/login", (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect("dashboard");
        return;
    }
    // Render login screen if not logged in
    res.render("login");
});

module.exports = router;