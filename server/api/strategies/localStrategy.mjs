import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../mongoose/schema/userSchema.mjs";
import bcrypt from "bcrypt";

passport.serializeUser((user, done) => {
  console.log("inside serializeUser!!");
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("inside deserializeUser!!");
  try {
    const findUser = await User.findById(id);
    if (!findUser) throw new Error("User not found");
    console.log(findUser);
    done(null, findUser);
  } catch (error) {
    done(error, null);
  }
});

export default passport.use(
  new Strategy(async (username, password, done) => {
    console.log(`username : ${username}`);
    console.log(`password : ${password}`);
    try {
      const findUser = await User.findOne({ username: username });
      if (!findUser)
        return done(null, false, { message: "User does not exist!" });
      const storedPassword = findUser.password;
      const match = await bcrypt.compare(password, storedPassword);
      if (match) return done(null, findUser);
      else return done(null, false, { message: "Invalid Credentials" });
    } catch (error) {
      return done(error, null, { message: error });
    }
  })
);
