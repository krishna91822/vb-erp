import { useSelector } from "react-redux";

export default function UseRoles() {
  const user = useSelector((state) => state.user.user);

  const isUser = user.roles.includes("user");
  const isApprover = user.roles.includes("approver");
  const isLeader = user.roles.includes("leader");
  const isHrAdmin = user.roles.includes("hr_admin");
  const isFinanceAdmin = user.roles.includes("finance_admin");
  const isPMSAdmin = user.roles.includes("pms_admin");
  const isSuperAdmin = user.roles.includes("super_admin");

  return {
    isUser,
    isApprover,
    isLeader,
    isHrAdmin,
    isFinanceAdmin,
    isPMSAdmin,
    isSuperAdmin,
  };
}
