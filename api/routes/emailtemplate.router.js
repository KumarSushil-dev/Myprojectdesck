const { emailtemplatelist,emailtemplateaddservice,emailtemplateeditservice,emailtemplateeditshow,emailtemplateupdatestatus,emailtemplatedeletesuper } = require('../controllers/emailtemplate.controller');
const { checkToken } = require("../middleware/authjwt.js");
const express = require('express');
const router = express.Router();

//router.post('/', createUser);
router.post('/emailtemplatelist', checkToken,emailtemplatelist);
router.post('/emailtemplateaddservice',checkToken, emailtemplateaddservice);
router.post('/emailtemplateeditshow', checkToken, emailtemplateeditshow);
router.post('/emailtemplateeditservice',checkToken, emailtemplateeditservice);
router.post("/emailtemplateupdatestatus", checkToken, emailtemplateupdatestatus);
router.post('/emailtemplatedeletesuper',checkToken, emailtemplatedeletesuper);

module.exports = router;