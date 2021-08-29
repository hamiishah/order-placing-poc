const jwt = require("jsonwebtoken");

const Account = require("../models/account");
const verifyToken = async (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        const error = new Error("Not authenticated");
        error.statusCode = 401;
        throw error;
    }

    const token = authHeader.split(" ")[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        const error = new Error("Not authenticated");
        error.statusCode = 401;
        throw error;
    }
    return decodedToken?.user;
};
exports.verifyAuthToken = async (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        const error = new Error("Not authenticated");
        error.statusCode = 401;
        throw error;
    }

    const token = authHeader.split(" ")[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        const error = new Error("Not authenticated");
        error.statusCode = 401;
        throw error;
    }
    return decodedToken?.user;
};
exports.verifyAssistant = async (req, res, next) => {
    try {
        const user = await verifyToken(req, res);
        let account = await Account.findById(user?._id);
        if (!account) {
            const error = new Error("Account Not found");
            error.statusCode = 404;
            throw error;
        }
        if (account.role !== 'ROLE_ASSISTANT') {
            const error = new Error("Forbidden Access");
            error.statusCode = 403;
            throw error;
        }
        if (account?.isDelete) {
            const error = new Error("User Not exist");
            error.statusCode = 404;
            throw error;
        }
        req.loggedInUserId = user?._id;
        next();
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        next(err);
    }
};
exports.verifyAdmin = async (req, res, next) => {
    try {
        const user = await verifyToken(req, res);
        let account = await Account.findById(user?._id);
        if (!account) {
            const error = new Error("Account Not found");
            error.statusCode = 404;
            throw error;
        }
        if (account.role !== 'ROLE_ADMIN') {
            const error = new Error("Forbidden Access");
            error.statusCode = 403;
            throw error;
        }
        if (account?.isDelete) {
            const error = new Error("User Not exist");
            error.statusCode = 404;
            throw error;
        }
        req.loggedInUserId = user?._id;
        next();
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        next(err);
    }
};
exports.verifyClient = async (req, res, next) => {
    try {
        const user = await verifyToken(req, res);
        let account = await Account.findById(user?._id);
        if (!account) {
            const error = new Error("Account Not found");
            error.statusCode = 404;
            throw error;
        }
        if (account?.role !== 'ROLE_CLIENT') {
            const error = new Error("Forbidden Access");
            error.statusCode = 403;
            throw error;
        }
        if (account?.isDelete) {
            const error = new Error("User Not exist");
            error.statusCode = 404;
            throw error;
        }
        req.loggedInUserId = user?._id;
        next();
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        next(err);
    }
};
