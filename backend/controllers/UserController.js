const { compare } = require("../middleware/encryption");
const { generateToken } = require("../middleware/Token");
const UserModel = require("../models/User");

class AuthCtrl {
  static userLogin(req, res) {
    const { email, password } = req.body;
    UserModel.findOne({ status: "active", email })
      .then((result) => {
        if (!result?._id) {
          return res.status(404).json({
            error: null,
            message: "Invalid email or user is inactive",
          });
        } else if (result?.password && compare(password, result?.password)) {
          const accessToken = generateToken(
            {
              role: result?.role,
              id: result?._id,
              email: result?.email,
            },
            15 * 60
          );
          const refreshToken = generateToken(
            {
              role: result?.role,
              id: result?._id,
              email: result?.email,
            },
            60 * 60
          );
          res.set("x-accessToken", accessToken);
          res.set("x-refreshToken", refreshToken);
          res.status(201).json({
            data: { id: result?._id },
            message: "Login Successful",
          });
        } else {
          res.status(404).json({ message: "Invalid password", error: null });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Server error" });
      });
  }
}

module.exports = AuthCtrl;
