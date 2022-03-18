const router = require("express").Router();
const User = require("../model/User");
const passport = require("passport");
const bcrypt = require("bcryptjs");

router.get("/login", (req,res) => {
    try{
        return res.render("login", {pageTitle: "Login"});
    }catch(err){
        return res.redirect("/");
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/signin');
});


router.get("/register", (req,res) => {
    try{
        return res.render("register", {pageTitle: "Register"});
    }catch(err){
        return res.redirect("/");
    }
});


router.post('/register', async (req,res) => {
    try{
        const {username, firstname, lastname, email, phone, referral, currency, plans, country, password} = req.body;
        console.log(req.body);
        const user = await User.findOne({email});
        const user1 = await User.findOne({username});
        if(user || user1){
            return res.render("register", {...req.body, error_msg:"A User with that email or username already exists", pageTitle: "Signup"});
        } else{
            if(!username || !firstname || !lastname || !country || !email || !phone || !password){
                return res.render("register", {...req.body, error_msg:"Please fill all fields", pageTitle: "Signup"});
            }
            if(password.length < 6 ){
                return res.render("register", {...req.body, error_msg:"Password length should be min of 6 chars", pageTitle: "Signup"});
            }

            const newUser = {
                username,
                firstname,
                lastname,
                referral,
                currency,
                plans,
                email,
                phone,
                country,
                password,
            };
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(password, salt);
            newUser.password = hash;
            const _newUser = new User(newUser);
            await _newUser.save();
            req.flash("success_msg", "Register success, you can now login");
            return res.redirect("/login");    
        }
    }catch(err){
        console.log(err)
    }
})



module.exports = router;