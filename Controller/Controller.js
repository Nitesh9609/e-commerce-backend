const userModel = require("../Model/UserModel/userModel");
const bcrypt = require("bcryptjs");
const Joi = require("@hapi/joi");
const JWT = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require('../Utils/sendEmail')

exports.testServer = (req, res) => {
  res.send("server is running");
};

exports.userSignUp = async (req, res) => {
  const emailExist = await userModel.findOne({ email: req.body.email });
  if (emailExist) {
    res.send("User Already exists");
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
 

  try {
    const userSchema = Joi.object({
      firstName: Joi.string().min(3).required(),
      lastName: Joi.string().min(3).required(),
      password: Joi.string().min(8).required(),
      
      email: Joi.string().min(3).email().required(),
      phoneNo: Joi.number().min(10).required(),
    });

    const { error } = await userSchema.validateAsync(req.body, {
      abortEarly: false,
    });

    // if (error) {
    //   res.send(error.details[0].message);
    // }

    if (hashedPassword === confirmHashedPassword) {
      const userData = new userModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashedPassword,
        email: req.body.email,
        phoneNo: req.body.phoneNo,
      });

      const saveUser = await userData.save();
      res.send("User Created Successfully");
    } else {
      res.send("Please recheck your password");
    }
  } catch (error) {
    res.send("Something went wrong please try again");
  }
};

exports.userSignIn = async (req, res) => {
  const userDetail = await userModel.findOne({ email: req.body.email });

  if (!userDetail) {
    res.send("Please SignUp first !!");
    return;
  }

  const validatePassword = await bcrypt.compare(
    req.body.password,
    userDetail.password
  );
  if (!validatePassword) {
    return res.send("wrong password");
  }

  try {
    const userSchema = Joi.object({
      email: Joi.string().min(3).email().required(),
      password: Joi.string().min(8).required(),
    });

    const { error } = await userSchema.validateAsync(req.body, {
      abortEarly: false,
    });

    if (error) return res.send(error.details[0].message);
    else {
      const token = JWT.sign({ _id: userDetail._id }, process.env.USER_KEY, {
        expiresIn: process.env.JWT_Expires,
      });

      res.header("auth-token", token);
      res.send({ token, userDetail });
    }
  } catch (error) {
    res.send(error);
  }
};

// Forget Password

exports.forgetPassword = async (req, res, next) => {
  const user = await userModel.findOne({ email: req.body.email });

  if (!user) {
    return next(res.send("User Not Found"));
  }

  const resetToken = crypto.randomBytes(20).toString("hex");
  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  await user.save({ validateBeforeSave: false })

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Reset`,
      message
    })

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
    
  } catch (error) {
    req.body.resetPasswordToken = undefined
    req.body.resetPasswordExpire = undefined

    await user.save({ validateBeforeSave: false });

    return next(error);
  }
};

// Reset Password

exports.resetPassword = async (req,res,next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest('hex')

    const user = await userModel.findOne({
      resetPasswordToken,
      resetPasswordExpire: {$gt: Date.now() }
    })

    if (!user) {
      return next(res.send("User Not Found"));
    }

    if(req.body.password !== req.body.confirmPassword){
      return next(res.send('Password do not match'))
    }

    const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

    user.password = hashedPassword

    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()
    res.send("password updated successfully")
}
