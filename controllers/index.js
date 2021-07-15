const router = require('express').Router();

// Declare route variables
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require("./dashboardRoutes");

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use("/dashboard", dashboardRoutes);



module.exports = router;