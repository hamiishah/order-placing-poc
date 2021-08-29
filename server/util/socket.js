let io;
const jwt = require("jsonwebtoken");
module.exports = {
  getLoggedInUserId :(data)=>{
    const authHeader = data.get("Authorization");
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
    return decodedToken;
  },
  init: (httpServer) => {
    io = require("socket.io")(httpServer);
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("socket.io is not initialized!");
    }
    return io;
  },
};
