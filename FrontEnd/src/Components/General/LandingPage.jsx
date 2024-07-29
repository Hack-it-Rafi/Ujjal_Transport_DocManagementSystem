const LandingPage = () => {
  return (
    // <div className="w-screen h-screen">
    //     <div className="bg-[#1D1912] h-full">
    //         <div></div>
    //         <div></div>
    //     </div>
    //     <div></div>
    // </div>
    <section className="bg-[#1D1912] h-screen">
      <div className="flex h-full">
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-7 md:gap-16 p-6">
            <img
              src="/ujjal-flour-favicon-color.png"
              alt="logo"
              className="w-28"
            />
            <button className="btn bg-[#F3F3E6] text-black rounded-lg font-koulen px-3 md:px-6 py-1 md:py-2 text-lg md:text-3xl">
              Login
            </button>
          </div>
          <div className="flex flex-1 justify-center items-center -mt-16">
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-[#FFD576] font-merienda text-6xl md:text-9xl font-bold">
                UJJAL
              </h2>
              <div className="text-white md:ml-28 mt-6 space-y-6">
                <h4 className="font-koulen text-3xl md:text-5xl">
                  FLOUR MILLS
                </h4>
                <p className="font-merienda text-xl md:text-3xl">Since 1983</p>
                <button className="btn bg-[#F3F3E6] text-black font-koulen px-2 md:px-6 py-1 md:py-2 text-xl md:text-3xl flex gap-6 rounded-lg">
                  Transports{" "}
                  <img
                    src="delivery (1).png"
                    alt="logo"
                    className="w-7 md:w-9"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        <img src="/banner.png" alt="" className="h-0 md:h-screen" />
      </div>
    </section>
  );
};

export default LandingPage;
