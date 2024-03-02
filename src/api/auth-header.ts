export default function authHeader() {
  const userStr = localStorage.getItem("user");
  let user = null;
  if (userStr) user = JSON.parse(userStr);
  if (user) {
    return { "x-auth-token": user };
  } else {
    return { "x-auth-token": null };
  }
}
