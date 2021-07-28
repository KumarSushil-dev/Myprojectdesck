const {countrylist,getselectedstate,getSearch,statelist,loginuser,signupuser,signupuserweb,getallusers,savepunchin,savepunchout,userupdatestatus,userdeletesuper,activationverification,planupgrades,getDetail,addsubscriptions,billingdetail,billingcompany,getsubscription,getsubscriptiondetail,editprofile,usereditservice,updatepayment,datatransfer,productivityinfo,companyuser,addcompanyuser,checkemailexist,viewdetail,viewdetailprofileservice,breaklist,activeactivity,savebreakstart,savebreakstop,tasklist,savetaskstart,savetaskstop,timeline,snapshotdetail,companysettings,getcompanysettings,dailyattendance,monthlyattendance,monthlyinout,projectsmain,projectsadd,companyprojects,projectsedit,taskadd,taskview,companytask,presence,attendancerecord,todayinfo,dashboards,applicationusage,getinitialinfo,gettodayproductivitytr,userupdatestatusteam,getproductivity,getsnapshot,snapshotmoredetail,getdailyattendance,getmonthlyattendance,getmonthlyinout} = require('../controllers/user.controller');
const { checkToken } = require("../middleware/authjwt.js");
const express = require('express');
const router = express.Router();

//router.post('/', createUser);
router.get('/countrylist', countrylist);
router.post("/getstate",  getselectedstate);
router.post("/checkemailexist",  checkemailexist);
router.post("/updatepayment",  updatepayment);
router.post("/getSearch",  getSearch);
router.post("/getDetail",  getDetail);
router.post("/getsubscription",  getsubscription);
router.post("/getsubscriptiondetail",checkToken,  getsubscriptiondetail);
router.get('/statelist', statelist);
router.post('/login', loginuser);
router.post('/signup', signupuser);
router.post('/signupweb', signupuserweb);
router.post("/userlist", checkToken, getallusers);
router.post("/getproductivity", checkToken, getproductivity);
router.post("/getsnapshot", checkToken, getsnapshot);
router.post("/snapshotmoredetail", checkToken, snapshotmoredetail);
router.post('/billingdetail',checkToken, billingdetail);
router.post('/billingcompany',checkToken, billingcompany);
router.post("/userupdatestatus", checkToken, userupdatestatus);
router.post("/userupdatestatusteam", checkToken, userupdatestatusteam);
router.post('/userdeletesuper',checkToken, userdeletesuper);
router.post("/punchin", checkToken, savepunchin);
router.post("/breakstart", checkToken, savebreakstart);
router.post("/taskstart", checkToken, savetaskstart);
router.post("/punchout", checkToken, savepunchout);
router.post("/breakstop", checkToken, savebreakstop);
router.post("/taskstop", checkToken, savetaskstop);
router.post("/activationverification",  activationverification);
router.post("/planupgrades",checkToken,  planupgrades);
router.post("/addsubscriptions",checkToken,  addsubscriptions);
router.post("/usereditservice",checkToken,  usereditservice);
router.post("/viewdetailprofileservice",checkToken,  viewdetailprofileservice);
router.post("/editprofile",checkToken,  editprofile);
router.post("/viewdetail",checkToken,  viewdetail);
router.post("/snapshotdetail",checkToken,  snapshotdetail);
router.post("/datatransfer",checkToken,  datatransfer);
router.post("/gettodayproductivitytr",checkToken,  gettodayproductivitytr);
router.get("/productivityinfo",checkToken,  productivityinfo);
router.post("/dashboards",checkToken,  dashboards);
router.get("/breaklist",checkToken,  breaklist);
router.get("/tasklist",checkToken,  tasklist);
router.get("/activeactivity",checkToken,  activeactivity);
router.get("/todayinfo",checkToken,  todayinfo);
router.get("/attendancerecord",checkToken,  attendancerecord);
router.post("/companyuser",checkToken,  companyuser);
router.post("/timeline",checkToken,  timeline);
router.post("/getcompanysettings",checkToken,  getcompanysettings);
router.post("/addcompanyuser",checkToken,  addcompanyuser);
router.post("/projectsadd",checkToken,  projectsadd);
router.post("/projectsedit",checkToken,  projectsedit);
router.post("/companysettings",checkToken,  companysettings);
router.post("/dailyattendance",checkToken,  dailyattendance);
router.post("/getdailyattendance",checkToken,  getdailyattendance);
router.post("/monthlyattendance",checkToken,  monthlyattendance);
router.post("/getmonthlyattendance",checkToken,  getmonthlyattendance);
router.post("/getmonthlyinout",checkToken,  getmonthlyinout);
router.post("/monthlyinout",checkToken,  monthlyinout);
router.post("/projectsmain",checkToken,  projectsmain);
router.post("/companyprojects",checkToken,  companyprojects);
router.post("/companytask",checkToken,  companytask);
router.post("/presence",checkToken,  presence);
router.post("/taskview",checkToken,  taskview);
router.post("/taskadd",checkToken,  taskadd);
router.post("/applicationusage",checkToken,  applicationusage);
router.get("/getinitialinfo",checkToken,  getinitialinfo);
/*router.post('/createcalllog/:id', createcalllog);
router.post('/createsmslog/:id', createsmslog);
router.post('/createlocation/:id', createlocation);
router.post('/createapplist/:id', createapplist);
router.post('/uploadphotodetail/:id', uploadphotodetail);
router.post('/loginuserweb', loginuserweb);
router.post('/calllogweb', calllogweb);
router.post('/smslogweb', smslogweb);
router.post('/applistweb', applistweb);
router.post('/locationweb', locationweb);
router.post('/locationweblist', locationweblist);
router.post('/captureweb', captureweb);
router.post('/recordweb', recordweb);
router.post('/deletelocation', deletelocation);
router.post('/userdeletesuper', userdeletesuper);
router.post('/deletecalllog', deletecalllog);
router.post('/deletesmslog', deletesmslog);
router.post('/deleteapplist', deleteapplist);
router.post('/deletecapturelist', deletecapturelist);
router.post('/deleterecord', deleterecord);
router.post('/userlist', userlist);
router.post('/userupdatestatus', userupdatestatus);
router.post('/testimonial', testimonial);
router.post('/testimonialstatus', testimonialstatus);
router.post('/testimonialdelete', testimonialdelete);
router.post('/testimonialedit', testimonialedit); 
router.post('/testimonialedituserservice', testimonialedituserservice); 
router.post('/testimonialaddservice', testimonialaddservice); 
router.post('/signupweb', signupweb);  */
//router.get('/', getalluser);
//router.get('/:id', getuserbyID);
//router.patch('/', updateuserbyID);
// router.delete('/', deleteuserbyID);
module.exports = router;