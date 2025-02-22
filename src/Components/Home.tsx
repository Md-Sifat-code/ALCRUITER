import React from "react";
import { Outlet } from "react-router-dom";
import LeftSide from "../Pages_component/LeftSide";
import RightSide from "../Pages_component/RightSide";

const Home: React.FC = () => {
  return (
    <section className="mt-12">
      <div className="container mx-auto max-w-6xl gap-8 grid grid-cols-4">
        <div className=" hidden md:flex">
          {/* left side */}
          <LeftSide />
        </div>
        <div className=" col-span-4 md:col-span-2">
          {/* middle */}

          <Outlet />
        </div>
        <div className=" hidden md:flex ">
          {/* right side */}
          <RightSide />
        </div>
      </div>
    </section>
  );
};

export default Home;

// <div className="bg-white p-4 rounded-xl">
//             <div className="flex items-center space-x-4">
//               <div className="w-10 h-10 rounded-full bg-gray-300">
//                 {/* this will be user icon */}
//               </div>
//               <div className="flex-1">
//                 {/* an input field */}
//                 <input
//                   type="text"
//                   className="w-full p-2 rounded border border-gray-300"
//                   placeholder="What's on your mind?"
//                 />
//               </div>
//             </div>
//             <div className="flex flex-row justify-center gap-10 space-x-4 mt-4">
//               <button className="p-2  text-black rounded flex items-center space-x-2">
//                 <span>🎥</span>
//                 <span>Video</span>
//               </button>
//               <button className="p-2 text-black  rounded flex items-center space-x-2">
//                 <span>📷</span>
//                 <span>Photo</span>
//               </button>
//               <button className="p-2 text-black  rounded flex items-center space-x-2">
//                 <span>✍️</span>
//                 <span>Write Article</span>
//               </button>
//             </div>
//           </div>
