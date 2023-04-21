import User from "../models/User.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const TOKEN = "WepoekYFpo"
class UserController {
     async register(req, res) {
         try {
             // Get user input
             const {username, email, password } = req.body;

             // Validate user input
             if (!(email && password && username)) {
                 res.status(400).send("All input is required");
             }

             // check if user already exist
             // Validate if user exist in our database
             const oldUser = await User.findOne({ email });

             if (oldUser) {
                 return res.status(409).send("User Already Exist. Please Login");
             }

             //Encrypt user password
             const encryptedPassword = await bcrypt.hash(password, 10);

             // Create user in our database
             const user = await User.create({
                 username: username,
                 email: email.toLowerCase(), // sanitize: convert email to lowercase
                 password: encryptedPassword,
             });

             // Create token
             // save user token
             const token = jwt.sign(
                 {user_id: user._id, username: user.username, email},
                 TOKEN,
                 {
                     expiresIn: "2h",
                 }
             );

             // return new user
             res.cookie('auth', token);
             res.status(201).json({
                 username: user.username
             });
         } catch (err) {
             console.log(err);
         }
     }
    async login(req, res) {
        try {
            // Get user input
            const { email, password } = req.body;

            // Validate user input
            if (!(email && password)) {
                res.status(400).send("All input is required");
            }
            // Validate if user exist in our database
            const user = await User.findOne({ email });

            if (user && (await bcrypt.compare(password, user.password))) {
                // Create token
                const token = jwt.sign(
                    { user_id: user._id, username: user.username, email },
                    TOKEN,
                    {
                        expiresIn: "2h",
                    }
                );
                res.cookie('auth', token);
                res.status(200).json({username: user.username})
            } else {
                res.status(400).send("Invalid Credentials");
            }
        } catch (err) {
            console.log(err);
        }
    }
    async getMe(req, res) {
         res.status(200).json(req.user.username)
    }
 }
 export default new UserController()