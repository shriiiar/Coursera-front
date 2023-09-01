import { GiTeacher } from "react-icons/gi";
import { FaUserGraduate } from "react-icons/fa";
import { BsX } from "react-icons/bs";
import { Link } from "react-router-dom";
type Props = {
  setIsShow: (isShow: boolean) => void;
};

const AuthDecision = ({ setIsShow }: Props) => {
  return (
    <div className="absolute left-0 top-0 h-full w-full z-10 grid place-items-center bg-slate-100 ">
      <div
        className="absolute right-5 top-5 text-6xl cursor-pointer"
        onClick={() => setIsShow(false)}
      >
        <BsX />
      </div>
      <div className="flex flex-col gap-1 items-center justify-center">
        {/*  <h1 className="text-3xl font-bold text-center mb-4">
          Are you a student or a teacher?
        </h1> */}
        <ul className="flex items-center gap-5">
          <Link to="/register/student" className="">
            <li className="px-9 py-9 rounded shadow bg-white transition-all hover:shadow-sm cursor-pointer hover:scale-105 flex items-center gap-1">
              <FaUserGraduate />
              Student
            </li>
          </Link>
          <Link to="/register/teacher" className="">
            <li className="px-9 py-9 rounded shadow bg-white transition-all hover:shadow-sm cursor-pointer hover:scale-105 flex items-center gap-1">
              <GiTeacher /> Teacher{" "}
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default AuthDecision;
