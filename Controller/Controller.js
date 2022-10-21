const userModel = require("../Model/UserModel/userModel");
const bcrypt = require("bcryptjs");
const Joi = require("@hapi/joi");
const JWT = require("jsonwebtoken");

exports.testServer = (req, res) => {
  res.send("server is running");
};

exports.userSignUp = async (req, res) => {
  const emailExist = await userModel.findOne({ email: req.body.email });
  if (emailExist) {
    res.send("User Already exists");
    return;
  }

  const salt = await bcrypt.genSalt(11);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

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

    if (error) {
      res.send(error.details[0].message);
    }

    const userData = new userModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: hashedPassword,
      email: req.body.email,
      phoneNo: req.body.phoneNo,
    });

    const saveUser = await userData.save();
    res.send("User Created Successfully");
  } catch (error) {
    res.send(error);
  }
};

exports.userSignIn = async (req,res) => {
    const userDetail = await userModel.findOne({email:req.body.email})

    if(!userDetail){
        res.send('Please SignUp first !!')
        return;
    }

    const validatePassword = await bcrypt.compare(req.body.password, userDetail.password)
    if(!validatePassword){
        return res.status(400).send('worng password')
        
    }

    try {
        const userSchema = Joi.object({
            email: Joi.string().min(3).email().required(),
            password: Joi.string().min(8).required()
        })

        const {error} = await userSchema.validateAsync(req.body, {
                abortEarly: false,
          
                
        })

        if(error) return res.send(error.details[0].message)

        else{
            const token = JWT.sign({_id: userDetail._id}, process.env.USER_KEY)

            res.header('auth-token', token)
            res.send({token,userDetail})
        }
    } catch (error) {
        res.send(error)
    }
}
