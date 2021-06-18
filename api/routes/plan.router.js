const { planlist,planaddservice,planeditservice,planeditshow,planupdatestatus,plandeletesuper } = require('../controllers/plan.controller');
const { checkToken } = require("../middleware/authjwt.js");
const express = require('express');
const router = express.Router();

//router.post('/', createUser);
router.post('/planlist', checkToken,planlist);
router.post('/planaddservice',checkToken, planaddservice);
router.post('/planeditshow', checkToken, planeditshow);
router.post('/planeditservice',checkToken, planeditservice);
router.post("/planupdatestatus", checkToken, planupdatestatus);
router.post('/plandeletesuper',checkToken, plandeletesuper);

module.exports = router;