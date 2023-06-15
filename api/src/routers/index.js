function route(app, u) {
  //register
  app.post("/api/register", upload.single("file"), async (req, res) => {
    const { fullName, email, password } = req.body;
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    if ((!fullName, !email, !password)) {
      res.status(400).json("nhập tất cả các trường");
    } else {
      const UserDoc = await Users.findOne({ email });
      if (UserDoc) {
        res.status(400).json("email đã tồn tại");
      } else {
        const newUsers = await Users.create({
          fullName,
          email,
          password: bcrypt.hashSync(password, salt),
          img: newPath,
        });
        res.status(200).json(newUsers);
      }
    }
  });
  //login
  app.post("/api/login", upload.single("file"), async (req, res, next) => {
    try {
      const { email, password } = req.body;
      console.log(email);
      if ((!email, !password)) {
        res.status(400).json("vui lòng nhập tất cả các trường");
      } else {
        const UserDoc = await Users.findOne({ email });
        if (!UserDoc) {
          res.status(400).json("tài khoản hoặc mật khẩu sai");
        } else {
          const isHashPassword = bcrypt.compareSync(password, UserDoc.password);
          if (!isHashPassword) {
            res.status(400).json("mật khẩu sai");
          } else {
            jwt.sign(
              { user: UserDoc.user, email: UserDoc.email },
              secret,
              {},
              async function (err, token) {
                await Users.updateOne({ _id: UserDoc._id }, { token: token });
                next();
              }
            );

            res.status(200).json(UserDoc);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  });

  //convesation
  app.post("/api/conversation", async (req, res) => {
    try {
      const { senderId, receiverId } = req.body;
      const checkConversation = await Conversations.find({
        member: { $all: [senderId, receiverId] },
      });
      if (checkConversation.length > 0) {
        res.status(200).json(checkConversation[0]._id);
      } else {
        const newConversation = new Conversations({
          member: [senderId, receiverId],
        });
        await newConversation.save();
        return res.status(200).json(newConversation);
      }
      /* if (!conversation) {
        const newConversation = new Conversations({
          member: [senderId, receiverId],
        });
        await newConversation.save();
        return res.status(200).json(newConversation);
      } else {
        return res.status(200).json(conversation);
      } */

      /* const newConversation = new Conversations({
        member: [senderId, receiverId],
      });
      await newConversation.save(); */
    } catch (error) {
      console.log(error);
    }
  });
  app.get("/api/conversation/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
      const conversations = await Conversations.find({
        member: { $in: [userId] },
      });
      const conversationUserData = Promise.all(
        conversations.map(async (conversation) => {
          const receiverId = conversation.member.find((mem) => mem !== userId);

          const user = await Users.findById(receiverId);
          return {
            user: {
              id: user._id,
              email: user.email,
              fullName: user.fullName,
              img: user.img,
            },
            conversation: conversation._id,
            receiverId,
          };
        })
      );
      res.json(await conversationUserData);
    } catch (error) {
      res.json(error);
    }
  });
  app.post("/api/message", async (req, res) => {
    try {
      const { conversationId, senderId, message } = req.body;

      if (!senderId || !message)
        return res.status(400).json("Nhập tất cả các trường");
      if (!conversationId) {
        const newConversation = await Conversations.create({
          member: [senderId, receiverId],
        });
        const newMessage = await Messages.create({
          conversationId: newConversation._id,
          senderId,
          message,
        });
        return res.status(200).json("tạo tin nhắn thành công");
      } else {
        const newMessage = await Messages.create({
          conversationId,
          senderId,
          message,
        });
        return res.status(200).json(newMessage);
      }
    } catch (err) {
      console.log(err);
    }
  });
  app.get("/api/message/:conversationId", async (req, res) => {
    const conversationId = req.params.conversationId;
    if (conversationId == "new") return res.status(200).json([]);

    const messages = await Messages.find({ conversationId });
    const messageUserData = Promise.all(
      messages.map(async (message) => {
        const user = await Users.findById(message.senderId);
        const conversation = await Conversations.findById(conversationId);
        const receiverId = conversation.member.find((mem) => mem !== user._id);

        const receiver = await Users.findById(receiverId);
        return {
          user: { id: user._id, email: user.email, fullName: user.fullName },
          message: message.message,
          conversation,
          receiver,
        };
      })
    );
    res.json(await messageUserData);
  });
  app.get("/api/users", async (req, res) => {
    try {
      const users = await Users.find();
      res.status(200).json(users);
    } catch (error) {}
  });
  //Search
  app.get("/api/search/:email", async (req, res) => {
    try {
      const email = req.params.email;
      const user = await Users.findOne({ email });
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
    }
  });
}
module.exports = route;
