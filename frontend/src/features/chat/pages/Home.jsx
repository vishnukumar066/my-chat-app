import { useSelector } from "react-redux";
import NoChatSelected from "../components/NoChatSelected";
import Sidebar from "./Sidebar";
import ChatContainer from "../components/ChatContainer";

const Home = () => {
  const { selectedUser } = useSelector((state) => state.chat);

  return (
    <div className="h-full w-full bg-gray-100 overflow-hidden">
      <div className="h-full flex">
        {/* Sidebar */}
        <div className="w-72 bg-white border-r hidden md:flex flex-col">
          <Sidebar />
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </div>
      </div>
    </div>
  );
};

export default Home;
