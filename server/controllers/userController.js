const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Account = require("../models/account");
const Order = require("../models/order");
const io = require("../util/socket");
const app = require("../app");
const auth = require("../middleware/auth")
module.exports = {
    getUser: (req, res, next) => {
        const {loggedInUserId} = req;
        Account.findById(loggedInUserId)
            .where({isDelete: false})
            .select('-password')
            .sort({createdAt: -1})
            .then((user) => {
                res.status(200).json({
                    data: user,
                });
            })
            .catch((err) => {
                if (!err.statusCode) err.statusCode = 500;
                next(err);
            });
    },
    getUsers: async (req, res, next) => {
        try {
            let users = await Account.find({})
                .where({isDelete: false})
                .select('-password')
                .sort({createdAt: -1});
            if (users) {
                return res.status(200).json({
                    success: true,
                    message: "User List Fetched Successfully",
                    data: users,
                });
            }
        } catch (err) {
            if (!err.statusCode) err.statusCode = 500;
            next(err);
        }
    },
    updateUser: (req, res, next) => {
        const {_id, email, password} = req.body;
        Account.findById({_id: _id})
            .then((user) => {
                if (!user) {
                    return res.status(404).json({message: "User Not Found"});
                }
                if (password) {
                    bcrypt.hash(password, 12).then((hashedPassword) => {
                        user.password = hashedPassword;
                        return user.save();
                    });
                } else {
                    user.email = email;
                    return user.save();
                }
            })
            .then((updatedUser) => {
                res.status(200).json({
                    data: updatedUser,
                    success: true,
                    message: "User Updated Successfully",
                });
            })
            .catch((err) => {
                if (!err.statusCode) err.statusCode = 500;
                next(err);
            });
    },
    removeUser: (req, res, next) => {
        Account.findOneAndUpdate({_id: req.body._id}, {
            isDelete: true
        }, {new: true})
            .then((user) => {
                if (!user) {
                    return res.status(404).json({message: "User not found"});
                }
                return res
                    .status(200)
                    .json({success: true, message: "User Deleted Successfully"});
            })
            .catch((err) => {
                if (!err.statusCode) err.statusCode = 500;
                next(err);
            });
    },
    addUser: async (req, res, next) => {
        let account = await Account.findOne({email: req.body.email})
        let data = req.body;
        if (account) {
            return res.status(404).send({statusCode:404,message: "User Already Exists"});
        } else {
            const user = new Account({
                ...data
            });
            let salt = await bcrypt.genSalt(10);
            let hash = await bcrypt.hash(user.password, salt);
            user.password = hash;
            let result = await user.save();
            let newUser = JSON.parse(JSON.stringify(result));
            delete newUser?.password;
            return res.status(200).json({success: true, message: "User Created Successfully", data: newUser})
        }
    },
    postOrder: async (req, res, next) => {
        try{
            const decodedToken = io.getLoggedInUserId(req);
        const {card_number, month, year, cvc, amount} = req.body;
        const found = Order.findOne({createdBy: decodedToken?.user?._id})
            if(found){

            }
        const order = new Order({
            card: {
                card_number,
                month,
                year,
                cvc,
                amount
            },
            createdBy: decodedToken?.user?._id
        });
        await order.save();
        return res.status(200).json({message: "Order Created Successfully", status: true, data: order});
        }
        catch (err) {
            console.log(err);
            if (!err.statusCode) err.statusCode = 500;
            next(err);
        }
    },
    getOrders: async (req, res, next) => {
        try {
            let orders = await Order.find()
                .sort({
                    createdAt: -1,
                });

            return res.status(200).json({message: "Fetch All Cards Info", status: true, data: orders});
        } catch
            (err) {
            if (!err.statusCode) err.statusCode = 500;
            next(err);
        }
    },
    getOrder: async (req, res, next) => {
        try {
            const {loggedInUserId} = req;
            let orders = await Order.findOne({createdBy:loggedInUserId});
            if(!orders){
                return res.status(404).send({message:"Not Found",data:{}});
            }
            return res.status(200).json({message: "Fetch Cards Info", status: true, data: orders});
        } catch
            (err) {
            if (!err.statusCode) err.statusCode = 500;
            next(err);
        }
    },
    postOrderStatus: (req, res, next) => {
        const {_id, status} = req.body;
        const decodedToken = io.getLoggedInUserId(req);
        if (!status) {
            const error = new Error("Status Not Provided");
            error.statusCode = 404;
            throw error;
        }
        Order.findById(_id)
            .then((order) => {
                if (!order) {
                    const error = new Error(
                        "Could Not find any Order with the given orderId"
                    );
                    error.statusCode = 404;
                    throw error;
                }

                order.status = status;
                order.updatedBy = decodedToken?.user?._id
                return order.save();
            })
            .then((updatedOrder) => {
                io.getIO().emit("orders", {action: "update", order: updatedOrder});
                res.status(200).json({message:"Status Updated Successfully",updatedOrder});
            })
            .catch((err) => {
                if (!err.statusCode) err.statusCode = 500;
                next(err);
            });
    },
    getConnectedClients: (req, res, next) => {
        res.json({clients: app.clients});
    },
    updateProfile: async (req, res, next) => {
        try {
            const decodedToken = io.getLoggedInUserId(req);
            const {email, lastName, firstName} = req.body
            let userProfile = await Account.findById(decodedToken?.user?._id);
            if (!userProfile) {
                return res.status(404).json({message: "User Not Found", data: userProfile});
            }
            ;
            let user = await Account.findOneAndUpdate({_id: decodedToken?.user?._id}, {
                firstName,
                lastName,
                email
            }, {new: true}).select('-password');
            return res.status(200).json({status: true, message: "Profile updated successfully ", data: user});
        } catch (err) {
            if (!err.statusCode) err.statusCode = 500;
            next(err);
        }
    },
    changePassword: async (req, res, next) => {
        try {
            const {oldPassword, newPassword} = req.body;
            let decodedToken = await io.getLoggedInUserId(req);
            let account = await Account.findOne({_id: decodedToken?.user?._id})
            if (!account) {
                const error = new Error("Account Not found");
                error.statusCode = 404;
                throw error;
            }
            let isEqual = await bcrypt.compare(oldPassword, account?.password);
            if (!isEqual) {
                const error = new Error("Password Mismatched");
                error.statusCode = 401;
                throw error;
            }
            let hashedPassword = await bcrypt.hash(newPassword, 12);
            account.password = hashedPassword;
            account.save();
            return res.status(200).json({
                data: account,
                success: true,
                message: "Password Changed Successfully",
            });
        } catch (err) {
            console.log(err);
            if (!err.statusCode) err.statusCode = 500;
            next(err);
        }
    },
};
