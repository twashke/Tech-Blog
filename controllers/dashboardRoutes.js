const router = require("express").Router();
const { Post , User } = require("./../models/");
const withAuth = require("./../utils/auth");

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
                         attributes: ["id", "title", "content", "user_id"],
                    },
               ],
          });
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

router.get("/add", (req, res) => {
     res.render("dashboardAdd", {
          loggedIn: true,
     });
});

router.get("/update/:id", async (req, res) => {
     const posts = await Post.findByPk(req.params.id);
     const post = posts.get({ plain: true });
     res.render("dashboardUpdate", { post, loggedIn: true });
});
module.exports = router;