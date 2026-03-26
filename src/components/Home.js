import { Search, Send } from "lucide-react";
import Sidebar from "./Sidebar";

const Home = () => {
  return (
    <div className="flex gap-5">
      <Sidebar />
      <div className="w-[70vw] mx-auto my-auto">
        <h2 className="text-black font-bold text-3xl text-center">
          Ask evrything you want!
        </h2>

        <div className="flex flex-col gap-3 mt-10">
          <button className="flex items-center p-1  border hover:border-red-500 rounded-lg gap-4 mx-auto">
            <div className="bg-red-500 px-3 py-1 rounded-sm">
              <Search />
            </div>
            <div>
              Ask detailed questions and DOC Assistant will provide clear
              answers.
            </div>
          </button>
          <button className="flex items-center p-1  border hover:border-red-500 rounded-lg gap-4 mx-auto">
            <div className="bg-red-500 px-3 py-1 rounded-sm">
              <Search />
            </div>
            <div>
              Ask detailed questions and DOC Assistant will provide clear
              answers.
            </div>
          </button>
          <button className="flex items-center p-1  border hover:border-red-500 rounded-lg gap-4 mx-auto">
            <div className="bg-red-500 px-3 py-1 rounded-sm">
              <Search />
            </div>
            <div>
              Ask detailed questions and DOC Assistant will provide clear
              answers.
            </div>
          </button>
          <button className="flex items-center p-1  border hover:border-red-500 rounded-lg gap-4 mx-auto">
            <div className="bg-red-500 px-3 py-1 rounded-sm">
              <Search />
            </div>
            <div>
              Ask detailed questions and DOC Assistant will provide clear
              answers.
            </div>
          </button>
          <button className="flex items-center p-1  border hover:border-red-500 rounded-lg gap-4 mx-auto">
            <div className="bg-red-500 px-3 py-1 rounded-sm">
              <Search />
            </div>
            <div>
              Ask detailed questions and DOC Assistant will provide clear
              answers.
            </div>
          </button>
        </div>

        <div className="fixed bottom-0  w-[70vw] bg-white p-3">
          <div className=" mx-auto flex items-center border border-gray-400 rounded-lg px-3 py-2 gap-2">
            <input
              type="text"
              placeholder="Start typing..."
              className="flex-1 outline-none bg-transparent"
            />

            <button className="p-2 rounded-md hover:bg-gray-200 transition">
              <Send className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
