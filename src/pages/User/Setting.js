import UpdatePassword from "../../components/Create User/UpdatePassword";
import UpdateRoles from "../../components/Create User/UpdateRoles";
import { useSelector } from "react-redux";

const Setting = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <>
      {user.permissions.includes("view_admin_panel") && <UpdateRoles />}
      <UpdatePassword />
    </>
  );
};

export default Setting;
