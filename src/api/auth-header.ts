export default function authHeader() {
  const userJson = localStorage.getItem("user");
  let user;
  if (userJson) user = JSON.parse(userJson);
  if (user) return { "x-auth-token": user };
  return { "x-auth-token": null };
}
