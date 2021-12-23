import { useSelector } from "react-redux";

export default function UseRoles() {
  const user = useSelector((state) => state.user.user);

  const isHrAdmin = user.roles.includes("hr_admin");

  const isUser = user.roles.includes("user");
  const isSuperAdmin = user.roles.includes("super_admin");

  return {
    isHrAdmin,
    isUser,
    isSuperAdmin,
  };
}
