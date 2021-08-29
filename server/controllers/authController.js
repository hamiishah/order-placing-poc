const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const io = require("../util/socket");
const Account = require("../models/account");
module.exports = {
    login: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            let loadedUser;

            let account = await Account.findOne({email: email});
            if (!account) {
                const error = new Error("Account Not found");
                error.statusCode = 404;
                throw error;
            }
            loadedUser = JSON.parse(JSON.stringify(account));
            let isEqual = await bcrypt.compare(password, account?.password);
            if (!isEqual) {
                const error = new Error("Invalid email/password combination.");
                error.statusCode = 401;
                throw error;
            }
            delete loadedUser?.password
            const token = jwt.sign(
                {user: loadedUser},
                process.env.SECRET_KEY,
                {expiresIn: "10h"}
            );
            return res
                .status(200)
                .json({
                    message: "Logged-in successfully",
                    id: loadedUser?._id,
                    role: loadedUser?.role,
                    token: token,
                });
        } catch (err) {
            console.log(err);
            if (!err.statusCode) err.statusCode = 500;
            next(err);
        }
    },
    resetPassword: async (req, res, next) => {
        const {email} = req.body;
        let account = await Account.findOne({email: email});
        if (!account) {
            return res.status(404).json({
                message: "Account Not Found for given email",
            });
        }
        let hashedPassword = await bcrypt.hash("12345678", 12);
        account.password = hashedPassword;
        account.save();
        return res.status(200).json({
            data: {email:email,password:"12345678"},
            success: true,
            message: "We Set a temporary Password for you Please, Change your temporary password after login",
        });

    }


}
