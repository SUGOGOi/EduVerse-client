import * as jose from "jose";

export const getUserRole = async ({ token }) => {
  try {
    const decoded = await jose.jwtVerify(token, process.env.JWT_SECRET);

    if (decoded.payload?._id) {
      console.log(decoded.payload);
    }
  } catch (error) {
    console.error("isAuthenticated error: ", error);
  }
};
