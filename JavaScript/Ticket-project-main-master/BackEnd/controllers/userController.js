const { userPost, getUsers, getUserQR, saveBlobToDb } = require("../model/userModel");
const QRcode = require("qrcode");
const fs = require("fs");
const filePath = "../BackEnd/qrCode";
const path = require("path");
const { sql } = require("../dbConnection");


const SERVER_URL = "http://techin.lt";

const generateQr = async (userId) => {
  try {
    const url = `${SERVER_URL}/qr/${userId}.png`
    const qrCodeUrl = await QRcode.toDataURL(url);
    return qrCodeUrl;
  } catch (error) {
    throw new error("Error generating qr code");
  }
};

exports.userPostController = async (req, res, next) => {
  try {
    
    const user = req.body;
    
    const userTicket = await userPost(user);
    const userId = userTicket.id;

    const getCode = await generateQr(userId);

    // get base64-encoded bytes
    const data = getCode.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(data, "base64");
    
  
    fs.writeFile(`../BackEnd/qrCode/${userId}.png`, buffer, async (err) => {
        if (err) {
            console.error(err);
        } else {
            const fileName = `../BackEnd/qrCode/${userId}.png`;
            await saveBlobToDb(userId, fileName);
        }
    });

    res.status(200).json({
      status: "success",
      data: {
        userId: userId,
        user: userTicket,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    const code = await getUserQR(id);

    console.log(code);

    const name = code.name;
    const email = code.email
    const github = code.github

    const qrcodePath = code.qrcode; // get qrcode path from database
    const fileName = path.basename(qrcodePath);
    const publicUrl = `${SERVER_URL}`;

    res.status(200).json({
      status: "success",
      link: publicUrl,
      users: name,
      email: email,
      github: github,
      userId: id
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await getUsers();

    res.status(200).json({
      status: "success",
      allUsers: users,
    });
  } catch (error) {
    next(error);
  }
};
