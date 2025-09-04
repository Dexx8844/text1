const userModel = require ('../models/user.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')






// REGISTER
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please provide all fields" });
        }

        // Check if user exists
        const existing = await userModel.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            isLoggedIn: true
        });

        await newUser.save();

        // Create JWT token
        const token = await jwt.sign({ registerId: newUser._id, isLoggedIn: true }, process.env.SECRET, { expiresIn: '10mins' })

        res.status(201).json({
            message: "User registered successfully",
            token,
            data: newUser
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// LOGIN
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ 
                message: "Please provide email and password" 
            });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                 message: "Invalid credentials" 
                });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ 
                message: "Invalid credentials" 
            });
        }

        // Mark user as logged in
        user.isLoggedIn = true;
        await user.save();

        // Create JWT token
        const token = jwt.sign({ userId: user._id, isLoggedIn: true },process.env.SECRET, { expiresIn: "7d" });

        res.status(200).json({
            message: "Login successful",
            token,
            data: user,
            token: token
        });
    } catch (error) {
        res.status(500).json({
             message: error.message 
            });
    }
};




// exports.register = async (req, res) => {
//     try {
//         const { fullName, email, password } = req.body
//         const userExist = await userModel.findOne({ email: email.toLowerCase() });
//         if (userExist) {
//             return res.status(400).json({
//                 message: `email: ${email} already in use`
//             })
//         }
//         const hashedPassword = await bcrypt.hash(password, 10)
//         const user = new userModel({
//             fullName,
//             email,
//             password: hashedPassword
//         })
//         const token = await jwt.sign({ userId: user._id,  }, process.env.SECRET, { expiresIn: '10mins' })
//         const link = `${req.protocol}://${req.get('host')}/api/v1/verify-user/${token}`
//         const firstName = user.fullName.split('')[0]
//         const mailDetails = {
//             email: user.email,
//             subject: 'Welcome to AI Podcast',
//             html: signUpTemplate(link, firstName)
//         }
//         await user.save()
//         await sendEmail(mailDetails)
//         res.status(201).json({
//             message: `user created successfully`,
//             data: user

//         })
//     } catch (error) {
//         console.log(error.message)
//         res.status(500).json({
//             message: 'internal server error'
//         })
//     }
// }

// exports.login = async (req, res) => {
//     try {
//         //Extract theh user's email and password from the request body
//         const { email, password } = req.body;
    
//         //Find the user in the database
//         if (email == undefined || password == undefined) {
//           return res.status(400).json({
//             message: "Please enter your email and password",
//           });
//         }  
        
//         //check for the user and throw error if not found
//         const user = await userModel.findOne({ email: email.toLowerCase() });
//         if (user === null) {
//           return res.status(404).json({
//             message: "User not found",
//           });
//         }
//         //check the password and throw error if not correct
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (isPasswordValid === false) {
//             return res.status(400).json({
//                 message: "Invalid password",
//             });
//         }

//         //Generate a token for the user
//         const token = await jwt.sign({ userId: user._id, isAdmin: user.isAdmin, isSuperAdmin: user.isSuperAdmin}, process.env.SECRET, {expiresIn: "1d"});

//        const  {password: hashedPassword, ...data} = user._doc;
//         //Send a response to the user
//         res.status(200).json({
//             message: "Login successful",
//             data: data,
//             token: token
//         });
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).json({
//           message: "Internal server error",
//         });
//       }
//     };
