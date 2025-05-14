import React from 'react';
import { Search } from 'lucide-react';
import { FileSearch2 } from 'lucide-react';
import { ChevronsLeftRightEllipsis } from 'lucide-react';
import { Settings } from 'lucide-react';
const LandingPage = () => {
      const services = [
    {
      title: 'RAG',
      description: 'Tìm kiếm sách với AI, tóm tắt nội dung, và gợi ý sách phù hợp',
      icon: FileSearch2
    },
    {
      title: 'Graph',
      description: '',
      icon: ChevronsLeftRightEllipsis
    },
    {
      title: 'Fine-tune',
      description: '',
      icon: Settings
    },
  ];
  return (
        <>
    <section className="h-[670px] flex flex-col md:flex-row  justify-center bg-black font-">
      {/* Text Content - Left Side */}
    <div className='bg-emerald-900/40 from-black bg-gradient-to-l w-1/2 p-6'>
          <div className="md:w-full space-y-6 text-center md:text-left items-center flex flex-col justify-center h-full">
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Chào mừng đến với Grimoire
        </h1>
        <p className="text-lg md:text-xl text-gray-200 pb-2">
            Nơi bạn có thể khám phá và tìm kiếm những cuốn sách yêu thích của mình.
            <br />
            Tìm kiếm sách với AI và nhận những gợi ý phù hợp nhất với bạn.
        </p>
        <div className="relative flex items-center w-full mx-4 text-lg">
        <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full bg-gray-900 text-white rounded-full py-2 pl-5 pr-4 border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <Search size={24} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-400" />
        </div>
      </div>
    </div>
      
      {/* Image - Right Side */}
      <div className="md:w-1/2 ">
        <img
          src="./src/assets/grimoire.png"
          alt="Landing page illustration"
          className=" w-[670px] h-auto object-cover rounded-lg shadow-lg absolute right-0"
        />
      </div>
    </section>
  <section className=" bg-gray-900 p-6 flex flex-col items-center justify-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div key={index} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col border-t-4 border-green-500">
                <div className="flex justify-center pt-6">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-white mb-2 text-center">
                    {service.title}
                  </h3>
                  <p className="text-gray-200 text-center flex-grow">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
        </>
  );
};

export default LandingPage;