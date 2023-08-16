

export default function FormLogin() {
    return (
        // ซ้าย
        <div className="h-screen flex">
            <div className="flex w-1/2 bg-gradient-to-tr bg-[#1F306A] i justify-around items-center">
                <span>
                    <img
                        src="https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/2663e300-1089-4f86-d2bb-77a993ed4700/250"
                        className="w-[200px] h-auto mx-10 "
                        alt=""
                    />
                    <h1 className="text-white font-bold text-2xl font-sans mt-8">
                        วิทยาลัยเทคโนโลยีพนมวันท์
                    </h1>
                    <p className=" m-2 w-[270px] h-[2px] bg-[#FFBF00]"></p>
                    <p className="text-white mt-1 mx-2">
                        Phanomwan College of Technology
                    </p>
                </span>
            </div>

            {/* ขวา */}
            <div className="flex w-1/2 justify-center items-center bg-white">
                <form className="bg-white">
                    <h1 className="text-gray-800 font-bold text-4xl mb-1 text-center">
                        ยินดีต้อนรับ
                    </h1>
                    <p className="text-lg font-normal text-gray-600 mb-7 text-center ">
                        วิทยาลัยเทคโนโลยีพนมวันท์
                    </p>
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 bg-[#1F306A]">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                            />
                        </svg>
                        <input
                            className="pl-2 outline-none border-none bg-[#1F306A] text-[#FFBF00]"
                            type="email"
                            name=""
                            id=""
                            placeholder="ชื่อผู้ใช้"
                        />
                    </div>
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl bg-[#1F306A]">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clip-rule="evenodd"
                            />
                        </svg>
                        <input
                            className="pl-2 outline-none border-none text-[#FFBF00] bg-[#1F306A] "
                            type="password"
                            name=""
                            id=""
                            placeholder="รหัสผ่าน"
                        />
                    </div>
                    <button
                        type="submit"
                        className="block w-full bg-[#1F306A]  mt-4 py-2 rounded-2xl text-[#FFBF00] font-semibold mb-2"
                    >
                        ล็อคอิน
                    </button>

                    {/* <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">Forgot Password ?</span> */}
                </form>
            </div>
        </div>
    );
}