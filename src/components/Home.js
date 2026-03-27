import { Search, Send } from "lucide-react";
import Sidebar from "./Sidebar";

const Home = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-5">
      <Sidebar />
      <div className="w-[70vw] mx-auto my-auto px-4 md:px-6 pb-32 md:pb-20 lg:pb-5">
        <h2 className="text-black font-bold text-2xl md:text-3xl text-center">
          Ask evrything you want!
        </h2>

        <div className="flex flex-col gap-3 mt-10 max-w-2xl mx-auto">
          {[1, 2, 3, 4, 5].map((item) => (
            <button
              key={item}
              className="flex flex-col md:flex-row items-center p-2 md:p-3 border hover:border-black rounded-lg gap-3 md:gap-4 w-full md:w-auto justify-center md:justify-start text-center md:text-left"
            >
              <div className="bg-gray-400 px-2 md:px-3 py-1 rounded-sm flex-shrink-0">
                <Search className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div className="text-xs md:text-sm">
                Ask detailed questions and DOC Assistant will provide clear
                answers.
              </div>
            </button>
          ))}
        </div>

        <div className="fixed bottom-0  w-[70vw] bg-white p-3">
          <div className=" mx-auto flex items-center border border-gray-400 rounded-lg px-3 py-2 gap-2">
            <input
              type="text"
              placeholder="Start typing..."
              className="flex-1 outline-none bg-transparent text-black placeholder-black"
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
