const router = require("express").Router();
const {ensureAuthenticated} = require("../config/auth");
const User = require("../model/User");
const History = require("../model/History");
const bcrypt = require("bcryptjs");

router.get("/dashboard", ensureAuthenticated, (req,res) => {
    try{
        return res.render("dashboard", {pageTitle: "Dashbaord", layout: 'layout2', req});
    }catch(err){
        return res.redirect("/");
    }
});

router.get("/payment-method", ensureAuthenticated, (req,res) => {
    try{
        return res.render("invest", {pageTitle: "Deposit Funds", layout: 'layout2', req});
    }catch(err){
        return res.redirect("/");
    }
});

router.get("/pay-using-bitcoin", ensureAuthenticated, (req,res) => {
    try{
        return res.render("make_payment", {pageTitle: "Deposit Funds", layout: 'layout2', req});
    }catch(err){
        return res.redirect("/");
    }
});

router.post("/pay-using-bitcoin", ensureAuthenticated, (req,res) => {
    try{
        return res.render("paymentResponse", {pageTitle: "Payment Sent", layout: 'layout2', req});
    }catch(err){
        return res.redirect("/");
    }
});

router.get("/exchanger", ensureAuthenticated, (req,res) => {
    try{
        return res.render("exchanger", {pageTitle: "Exchanger", layout: 'layout2', req});
    }catch(err){
        return res.redirect("/");
    }
});

router.get("/edit-profile", ensureAuthenticated, (req,res) => {
    try{
        return res.render("edit-profile", {pageTitle: "Edit Profile", layout: 'layout2', req});
    }catch(err){
        return res.redirect("/");
    }
});

router.get("/change-password", ensureAuthenticated, (req,res) => {
    try{
        return res.render("change-password", {pageTitle: "Change Password", layout: 'layout2', req});
    }catch(err){
        return res.redirect("/");
    }
});

router.get("/faq2", ensureAuthenticated, (req,res) => {
    try{
        return res.render("faq2", {pageTitle: "FAQ", layout: 'layout2', req});
    }catch(err){
        return res.redirect("/");
    }
});

router.get("/profile", ensureAuthenticated, (req,res) => {
    try{
        return res.render("profile", {pageTitle: "Profile", layout: 'layout2', req});
    }catch(err){
        return res.redirect("/");
    }
});

router.get("/transactions", ensureAuthenticated, (req,res) => {
    try{
        return res.render("transactions", {pageTitle: "Transactions", layout: 'layout2', req});
    }catch(err){
        return res.redirect("/");
    }
});

router.get("/deposits", ensureAuthenticated, async (req,res) => {
    try{
        const history = await History.find({userID: req.user.id});
        return res.render("deposits", {pageTitle: "Deposits", history, layout: 'layout2', req});
    }catch(err){
        return res.redirect("/");
    }
});

router.get("/withdraw", ensureAuthenticated, (req,res) => {
    try{
        return res.render("withdraw", {pageTitle: "Withdraw Funds", layout: 'layout2', req});
    }catch(err){
        return res.redirect("/");
    }
});

router.post("/withdraw", ensureAuthenticated, async (req,res) => {
    try{
        const {amount, address} = req.body;
        if(!amount){
            req.flash("error_msg", "Please enter amount to withdraw");
            return res.redirect("/withdraw");
        }
        if(!address){
            req.flash("error_msg", "Please enter wallet address");
            return res.redirect("/withdraw");
        }
        if(req.user.balance < amount || amount < 0){
            req.flash("error_msg", "Insufficient balance. Fund your account.");
            return res.redirect("/withdraw");
        }
        else{
            return res.render("withdrawResponse", {pageTitle: "Payment Sent", layout: 'layout2', req});
        }
    }catch(err){
        return res.redirect("/");
    }
});

router.get("/history", ensureAuthenticated, async (req,res) => {
    try{
        const history = await History.find({userID: req.user.id});
        return res.render("history", {pageTitle: "Hisotry", history, layout: 'layout2', req});
    }catch(err){
        return res.redirect("/");
    }
});

router.post("/edit-profile", ensureAuthenticated, async (req,res) => {
    try{
        const {email, country, phone, pin} = req.body;

        if( !email || !country || !phone || !pin){
            req.flash("error_msg", "Provide all required info");
            return res.redirect("/edit-profile");
        }

        const update = {
            email,
            country,
            phone,
            pin
        }

        await User.updateOne({_id: req.user.id}, update);
        req.flash("success_msg", "Account updated successfully")
        return res.redirect("/edit-profile");

    }catch(err){
        req.flash("error_msg", "Something went wrong")
        return res.redirect("/edit-profile");
    }
});

router.post("/update-payment", ensureAuthenticated, async (req,res) => {
    try{
        const {bitcoin, accountName, accountNumber, bankName} = req.body;

        if(!bitcoin || !accountName || !accountNumber || !bankName){
            req.flash("error_msg", "Enter all fileds");
            return res.redirect("/settings");
        }

        const update = {
            bitcoin,
            accountName,
            accountNumber,
            bankName
        }
        await User.updateOne({_id: req.user.id}, update);
        req.flash("success_msg", "Account updated successfully")
        return res.redirect("/settings");

    }catch(err){

    }
});

module.exports = router;