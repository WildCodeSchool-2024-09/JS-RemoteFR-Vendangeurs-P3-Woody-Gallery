import jwt from "jsonwebtoken";

type User = {
  userId: number;
  isAdmin: boolean;
};

const generateToken = ({ user }: { user: User }) => {
  return jwt.sign(
    { userId: user.userId, isAdmin: user.isAdmin },
    process.env.APP_SECRET as string,
    { expiresIn: "24h" },
  );
};

export { generateToken };
