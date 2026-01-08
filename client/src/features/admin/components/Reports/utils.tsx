import {
  HiOutlineGlobeAlt,
  HiOutlineChatAlt,
  HiOutlineUser,
  HiOutlineFlag,
} from "react-icons/hi";

export const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "High":
      return "text-red-600 bg-red-50 border-red-100";
    case "Medium":
      return "text-orange-600 bg-orange-50 border-orange-100";
    case "Low":
      return "text-blue-600 bg-blue-50 border-blue-100";
    default:
      return "text-gray-600 bg-gray-50 border-gray-100";
  }
};

export const getTypeIcon = (type: string) => {
  switch (type) {
    case "Website":
      return <HiOutlineGlobeAlt />;
    case "Comment":
      return <HiOutlineChatAlt />;
    case "User":
      return <HiOutlineUser />;
    default:
      return <HiOutlineFlag />;
  }
};
