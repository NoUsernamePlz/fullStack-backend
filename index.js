require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const cookieSession = require("cookie-session");
const passport = require("passport");
const passportStrategy = require("./passport");
const content = require("./models/content");
const Content = require("./models/content");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
}));

app.use(
	cookieSession({
		name: "session",
		keys: ["komal"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

app.use(passport.initialize());
app.use(passport.session());


// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

//google auth
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));


app.get('/auth/google/callback',
  passport.authenticate('google', { successRedirect: 'http://localhost:3000/', failureRedirect: '/login' }));

app.get("/getAllcontent", async (req,res ) => {
    try{
        const allContent = await Content.find({});
        res.send({status:"ok",data:allContent});
    }
    catch(error){
        console.log(error);
    }

});


const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));