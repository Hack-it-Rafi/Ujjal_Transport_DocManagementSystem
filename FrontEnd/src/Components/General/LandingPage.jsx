import { useContext } from "react";
import { AuthContext } from "../Authentication/AuthProvider";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (user) {
      navigate("/home/transportList");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="bg-[#1D1912] h-screen">
      <div className="flex h-full">
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-7 md:gap-16 p-6">
            <img
              src="/ujjal-flour-favicon-color.png"
              alt="logo"
              className="w-28"
            />
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
                <button
                  onClick={handleButtonClick}
                  className="btn bg-[#F3F3E6] text-black font-koulen px-2 md:px-6 py-1 md:py-2 text-xl md:text-3xl flex gap-6 rounded-lg"
                >
                  {user ? (
                    <>
                      Transports{" "}
                      <img
                        src="delivery (1).png"
                        alt="logo"
                        className="w-7 md:w-9"
                      />
                    </>
                  ) : (
                    "Login"
                  )}
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
