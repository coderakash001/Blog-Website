const nodemailer = require("nodemailer");

const greetMail = async (res, user) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: "ay6368013@gmail.com",
        pass: "bidl myat fkcd fnex",
      },
    });

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: "ay6368013@gmail.com", // sender address
        to: user.email, // list of receivers
        subject: "Greeting ", // Subject line
        text: "Thank you for register ", // plain text body
        html: `thank for register as user! <br/>  <img src="https://images.unsplash.com/photo-1720048170970-3848514c3d60?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8" style="width: 200px; height: 200px; border-radius: 20px; " alt="">
`, // html body
        
      });
      res.redirect('/login');
    }
    main().catch(console.error);
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = greetMail;
