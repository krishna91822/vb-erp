import { useSelector } from "react-redux";

export default function UseRoles() {
  const user = useSelector((state) => state.user.user);

  const isHrAdmin = () => {
    return user.roles.includes("hr_admin");
  };

  const isUser = () => {
    return user.roles.includes("user");
  };

  return {
    isHrAdmin,
    isUser,
  };
}
