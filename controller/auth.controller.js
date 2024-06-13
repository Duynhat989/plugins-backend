const { create_new_token } = require("../midleware/manage_token");
const { encryption, compare } = require("../utils/encode");
const User = require("../models/user.model");
let debug = true;
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === undefined || password === undefined) {
      res.status(501).send({
        status: false,
        user: null,
      });
      return;
    }
    console.log("____");
    var result = await User.login(email);
    if (result == null) {
      res.status(501).send({
        status: false,
        user: null,
      });
      return;
    }
    var isValid = await compare(password, result.password);
    if (!isValid) {
      res.status(501).send({
        status: false,
        user: null,
        error: "password",
      });
      return;
    }
    const auth = await create_new_token({ user_id: result.id });
    res.send({
      status: true,
      auth: auth,
    });
  } catch (error) {
    if (debug) {
      res.send({
        status: false,
        user: null,
        error: error,
      });
    } else {
      res.send({
        status: false,
        user: null,
      });
    }
  }
};
exports.register = async (req, res) => {
  const { email, password,referral_code  } = req.body;
  if (
    email === undefined ||
    password === undefined ||
    email.length < 5 ||
    password.length < 5
  ) {
    res.status(501).send({
      status: false,
      user: null,
      msg: "parameter miss",
    });
    return;
  }
  if (await contains_mail(email)) {
    res.status(501).send({
      status: false,
      user: null,
      error: "email exits",
    });
    return;
  }
  const hash_password = await encryption(password);
  var result = await User.register(
    referral_code,
    email,
    hash_password
  );
  var payload = { user_id: result.id, expired: Date.now() };
  const auth = await create_new_token(payload);
  res.send({
    status: true,
    auth: auth,
    payload: payload,
  });
};
exports.info = async (req, res) => {
  try {
    const { user_id } = req.user;
    var user = await User.info_person(user_id);
    delete user.password;
    delete user.createdAt;
    delete user.ip_address;
    delete user.role;
    res.send({
      status: true,
      user: user,
    });
  } catch (error) {
    res.send({
      status: false,
      user: null,
      error: error,
    });
  }
};
exports.avaliable = async (req, res) => {
  try {
    const { email } = req.body;
    if (email === undefined) {
      res.send({
        status: false,
        user: null,
      });
      return;
    }
    if (await contains_mail(email)) {
      res.send({
        status: false,
      });
      return;
    }
    res.send({
      status: true, //khả dụng
    });
  } catch (error) {
    res.send({
      status: false, // khoong khả dụng
    });
  }
};
exports.changepassword = async (req, res) => {
  try {
    const { password, password_old } = req.body;
    const { user_id } = req.user;
    if (password === undefined || password_old === undefined) {
      res.send({
        status: false,
        msg: "msg",
      });
      return;
    }
    var result = await User.get_user_with_id_one(user_id);
    if (result) {
      var info = result.toJSON();
      var isValid = await compare(password_old, info.password);
      if (!isValid) {
        res.send({
          status: false,
          error: "password",
        });
        return;
      }
      const hash_password = await encryption(password);
      user.update({
        password: hash_password,
        verify: "",
      });
      res.send({
        status: true, //khả dụng
      });
    } else {
      res.send({
        status: false, //khả dụng
      });
    }
  } catch (error) {
    res.send({
      status: false, // khoong khả dụng
    });
  }
};
exports.resendcode = async (req, res) => {
  try {
    const { id } = req.body;
    if (id === undefined || id.length < 1) {
      res.send({
        status: false,
        msg: "miss",
      });
      return;
    }
    var user = await User.get_user_with_id_one(id);
    console.log(user);
    if (user) {
      var info = user.toJSON();
      var codeVerify = info.verify;
      if (codeVerify.length != 8) {
        res.send({
          status: false, // khoong khả dụng
          msg: "request forget password", //khả dụng
        });
      } else {
        //gửi code về bằng info.verify
        sendInfoToEmail(info.email);
        //
        res.send({
          status: true,
          msg: "send to email " + info.email,
        });
      }
    } else {
      res.send({
        status: false, // khoong khả dụng
        msg: "error code", //khả dụng
      });
    }
  } catch (error) {
    res.send({
      status: false, // khoong khả dụng
      error: error,
    });
  }
};

exports.forgetpassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (email === undefined) {
      res.send({
        status: false,
        user: null,
      });
      return;
    }
    if (!(await contains_mail(email))) {
      res.send({
        status: false,
        msg: "not contains",
      });
      return;
    }
    //==
    var codeVerify = generateRandom8DigitNumber();
    //send to mail email
    sendInfoToEmail(email);
    // NODE

    //================
    const user = await User.get_user_with_email(email);
    if (user) {
      // Cập nhật dữ liệu cho người dùng
      await user.update({ verify: codeVerify });
      //lưu vào data basae
      res.send({
        status: true, //khả dụng
      });
    } else {
      //lưu vào data basae
      res.send({
        status: false, //khả dụng
      });
    }
  } catch (error) {
    res.send({
      status: false, // khoong khả dụng
    });
  }
};
exports.changepassword_code = async (req, res) => {
  try {
    const { code, password, id } = req.body;
    if (
      code === undefined ||
      password === undefined ||
      code.length != 8 ||
      id.length < 1
    ) {
      res.send({
        status: false,
        msg: "miss",
      });
      return;
    }
    const hash_password = await encryption(password);
    var user = await User.get_user_with_id(id, code);
    if (user) {
      user.update({
        password: hash_password,
        verify: "",
      });
      res.send({
        status: true,
      });
    } else {
      res.send({
        status: false, // khoong khả dụng
        msg: "error code", //khả dụng
      });
    }
  } catch (error) {
    res.send({
      status: false, // khoong khả dụng
    });
  }
};
async function contains_mail(email) {
  var result = await User.check_contains_email(email);
  if (result == null) {
    return false;
  }
  return true;
}
function generateRandom8DigitNumber() {
  const min = Math.pow(10, 7); // 10^7
  const max = Math.pow(10, 8) - 1; // 10^8 - 1
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
}
function sendInfoToEmail(email) {
  console.log("Đã gửi email: " + email);
}
