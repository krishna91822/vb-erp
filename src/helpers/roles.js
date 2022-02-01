import { useSelector } from "react-redux";

export default function UseRoles() {
  const user = useSelector((state) => state.user.user);
  const onlyUser = user.roles.length === 1 && user.roles[0] === "user" && true;
  const isUser = user.roles.includes("user");
  const isApprover = user.roles.includes("approver");
  const isLeader = user.roles.includes("leader");
  const isHrAdmin = user.roles.includes("hr_admin");
  const isFinanceAdmin = user.roles.includes("finance_admin");
  const isPMSAdmin = user.roles.includes("pms_admin");
  const isSuperAdmin = user.roles.includes("super_admin");

  return {
    onlyUser,
    isUser,
    isApprover,
    isLeader,
    isHrAdmin,
    isFinanceAdmin,
    isPMSAdmin,
    isSuperAdmin,
  };
}
