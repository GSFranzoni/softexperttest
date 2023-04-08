import md5 from "md5";

export const makeGravatarUrl = ({ email, size }: { email: string, size: number }) => {
  const hash = md5(email);
  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=robohash`;
}