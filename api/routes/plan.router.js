const { planlist,planaddservice,planeditservice,planeditshow,planupdatestatus,plandeletesuper,getplanlist,testimoniallist,testimonialaddservice,testimonialupdatestatus,testimonialdeletesuper,testimonialeditshow,testimonialeditservice,gettestimonial } = require('../controllers/plan.controller');
const { checkToken } = require("../middleware/authjwt.js");
const express = require('express');
const router = express.Router();

//router.post('/', createUser);
router.post('/planlist', checkToken,planlist);
router.post('/planaddservice',checkToken, planaddservice);
router.post('/planeditshow', checkToken, planeditshow);
router.post('/testimonialeditshow', checkToken, testimonialeditshow);
router.post('/planeditservice',checkToken, planeditservice);
router.post('/gettestimonial', gettestimonial);
router.post('/testimonialeditservice',checkToken, testimonialeditservice);
router.post("/planupdatestatus", checkToken, planupdatestatus);
router.post("/testimonialupdatestatus", checkToken, testimonialupdatestatus);
router.post('/plandeletesuper',checkToken, plandeletesuper);
router.post('/testimonialdeletesuper',checkToken, testimonialdeletesuper);
router.post('/getplanlist',checkToken, getplanlist);
router.post('/testimoniallist', checkToken,testimoniallist);
router.post('/testimonialaddservice', checkToken,testimonialaddservice);

module.exports = router;