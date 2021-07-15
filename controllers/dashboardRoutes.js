const router = require("express").Router();
const { Post , User } = require("./../models/");
const withAuth = require("./../utils/auth");

// -----------------------------------------|
//    DASHBOARD ROUTE - POSTS BY USER       | 
// -----------------------------------------|

router.get("/", withAuth, async (req, res) => {
     try {
          const userPost = await User.findOne({
               where: {
                    id: req.session.user_id,
               },
               attributes: ["id", "username"],
               include: [
                    {
                         model: Post,
                         attributes: ["id", "title", "content", "user_id", "created_at"],
                    },
               ],
          });
          // Render dashboard and all data
          const userPosts = userPost.get({ plain: true });
          console.log(userPosts);
          res.render("dashboard", {
               userPosts,
               loggedIn: true,
          });
     } catch (err) {
          console.log(err);
          res.status(500).json(err);
     }
});

// -----------------------------------------|
//        DASHBOARD ROUTE - ADD POST        | 
// -----------------------------------------|

router.get("/add", (req, res) => {
     // Render dashboard to Add Post
     res.render("dashboardAdd", {
          loggedIn: true,
     });
});

// -----------------------------------------|
//      DASHBOARD ROUTE - UPDATE POST       | 
// -----------------------------------------|

router.get("/update/:id", async (req, res) => {
     const posts = await Post.findByPk(req.params.id);
     const post = posts.get({ plain: true });
     // Render's dashboard to Update or Delete Post
     res.render("dashboardUpdate", { post, loggedIn: true });
});

module.exports = router;