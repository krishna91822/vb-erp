import Header from "../../components/rewards/ViewReward/components/HeaderComponent";
import Body from "../../components/rewards/ViewReward/components/BodyComponent";
import Pagination from "../../components/rewards/ViewReward/components/PaginationComponent";
import "./style.css";

const RewardsList = () => {
  const duplicateData = [
    {
      id: 1,
      rewardType: "Birthday",
      assignee: "Raymond Tech. Pvt. Ltd.",
      rewardDate: "12/02/2020",
    },
    {
      id: 2,
      rewardType: "Vimal K",
      assignee: "Vimal & Co",
      rewardDate: "12/02/2020",
    },
    {
      id: 3,
      rewardType: "Harsha Bendi",
      assignee: "Bend Solutions",
      rewardDate: "12/02/2020",
    },
    {
      id: 4,
      rewardType: "Employee",
      assignee: "Assignee Dummy A",
      rewardDate: "12/02/2020",
    },
    {
      id: 5,
      rewardType: "Reward Type Dummy",
      assignee: "Not Decided",
      rewardDate: "12/02/2020",
    },
    {
      id: 6,
      rewardType: "Best HR",
      assignee: "Dummy C",
      rewardDate: "12/02/2020",
    },
  ];

  return (
    <div className="wrapper">
      <Header />
      <Body data={duplicateData} />
      <Pagination />
    </div>
  );
};

export default RewardsList;
