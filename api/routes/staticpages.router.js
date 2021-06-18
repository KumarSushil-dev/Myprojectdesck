const { staticpageslist,staticpagesaddservice,staticpageseditservice,staticpageseditshow,staticpagesupdatestatus,staticpagesdeletesuper } = require('../controllers/staticpages.controller');
const { checkToken } = require("../middleware/authjwt.js");
const express = require('express');
const router = express.Router();

//router.post('/', createUser);
router.post('/staticpageslist', checkToken,staticpageslist);
router.post('/staticpagesaddservice',checkToken, staticpagesaddservice);
router.post('/staticpageseditshow', checkToken, staticpageseditshow);
router.post('/staticpageseditservice',checkToken, staticpageseditservice);
router.post("/staticpagesupdatestatus", checkToken, staticpagesupdatestatus);
router.post('/staticpagesdeletesuper',checkToken, staticpagesdeletesuper);

module.exports = router;