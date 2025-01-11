import User from '../models/User.js';
import { validateLoginUser, validateUser } from '../validators/userValidator.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createUser = async (req, res) => {
    try {
        const { email, phone, password } = req.body;
        const validatedData = await validateUser(req.body);


        const isUserEmailExist = await User.findOne({ email })
        const isUserPhoneExist = await User.findOne({ phone })

        if (isUserEmailExist) {
            res.status(409).json({ error: true, success: false, message: "Email Already Exist" });
        } else if (isUserPhoneExist) {
            res.status(409).json({ error: true, success: false, message: "Phone Already Exist" });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({
                ...validatedData,
                password: hashedPassword
            });
            await user.save();
            res.status(201).json({ error: false, success: true, message: "User Registered Successfully", user });
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Login Controller
export const loginUser = async (req, res) => {
    try {
        console.log("hey");
        const { email, password } = req.body;
        const validatedData = await validateLoginUser(req.body);
        // Find the user by email
        if (validatedData) {
            const user = await User.findOne({ email });
            console.log(user);
            if (!user) {
                return res.status(404).json({
                    error: true,
                    success: false,
                    message: "User not found"
                });
            }

            // Compare passwords
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({
                    error: true,
                    success: false,
                    message: "Invalid credentials"
                });
            }

            // Generate a JWT token
            const token = jwt.sign(
                { userId: user._id, email: user.email , role : user.role},
                process.env.JWT_SECRET || 'your_secret_key',
                { expiresIn: '1h' } // Token expires in 1 hour
            );

            // Successful login
            res.status(200).json({
                error: false,
                success: true,
                message: "Login successful",
                token,
                user: {
                    name: user.name
                }
            });

        }

    } catch (error) {
        res.status(500).json({
            error: true,
            success: false,
            message: "An error occurred",
            details: error.message
        });
    }
};

// Change Password Controller
export const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const { userId } = req.user;  // Assuming you have a middleware to authenticate the user and add userId to req.user
console.log(req.user , "change");
        // Find the user by userId
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                error: true,
                success: false,
                message: "User not found"
            });
        }

        // Compare old password
        const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isOldPasswordValid) {
            return res.status(401).json({
                error: true,
                success: false,
                message: "Old password is incorrect"
            });
        }

        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update the password
        user.password = hashedNewPassword;
        await user.save();

        // Respond with success
        res.status(200).json({
            error: false,
            success: true,
            message: "Password updated successfully"
        });

    } catch (error) {
        res.status(500).json({
            error: true,
            success: false,
            message: "An error occurred",
            details: error.message
        });
    }
};
