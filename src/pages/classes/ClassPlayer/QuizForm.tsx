import React, { useEffect, useState } from "react";
import {
  useAddAssignmentMutation,
  useGetQuizByVideoIdQuery,
} from "../../../features/coursesSlice/studentApi";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAnswer,
  handleNext,
  handlePrev,
  resetAll,
  updateAnswer,
} from "../../../features/coursesSlice/quizSlice";
import { useAppContext } from "../../../context/AppContext";
import { BsFillTrophyFill } from "react-icons/bs";
import {
  useAddQuizMarkMutation,
  useGetQuizMarkByStudentQuery,
} from "../../../features/coursesSlice/teacherApi";
import { AiOutlineCheckCircle } from "react-icons/ai";

type Props = {
  vId: any;
};

export default function QuizForm({ vId }: Props) {
  const dispatch = useDispatch();
  const { quiz }: any = useSelector((state) => state);
  const { questionPosition } = quiz || {};
  const { handleSubmit, register, reset, watch } = useForm();
  const { data } = useGetQuizByVideoIdQuery(vId);
  const [open, setOpen] = useState(false);
  const [singleQuiz, setSingleQuiz] = useState<{
    question: string | undefined;
    answers: Array<{ name: string }>;
  } | null>(null);
  const { quizzes, _id: videoId, user } = data?.data || {};
  const { currentUser } = useAppContext();
  const [check1, setCheck1] = useState(undefined);
  const [checked, setChecked] = useState(undefined);
  const [currentCheck, setCurrentCheck] = useState(undefined);
  const [resultOpen, setResultOpen] = useState(false);
  const [addQuizMark, { isLoading, isSuccess }] = useAddQuizMarkMutation();
  const { data: studentQuizMarks, isLoading: quizMarkLoading } =
    useGetQuizMarkByStudentQuery(currentUser._id);

  const filteredQuiz = studentQuizMarks?.data?.filter(
    (item: any) => item.videoId._id === vId
  );
  const [singleQuizMark] = filteredQuiz || [];

  let marks = 0;

  if (quizzes) {
    for (let i = 0; i < quizzes.length; i++) {
      const answers = quizzes[i].answers;
      const correctAnswerIndex = quiz.answers[i];
      if (correctAnswerIndex >= 0 && correctAnswerIndex < answers.length) {
        if (answers[correctAnswerIndex].answered) {
          marks++;
        }
      }
    }
  }

  useEffect(() => {
    if (filteredQuiz?.length > 0) {
      setResultOpen(true);
    }
  }, [studentQuizMarks]);

  useEffect(() => {
    dispatch(updateAnswer({ questionPosition, checked }));
  }, [checked]);

  useEffect(() => {
    if (quizzes?.length > 0) {
      setSingleQuiz(quizzes[questionPosition]);
    }
  }, [quizzes, questionPosition]);

  const add = handleSubmit(async (data) => {
    if (
      (check1 === undefined && !quiz.answers[questionPosition]) ||
      quiz.answers.length < 1
    ) {
      return toast.error("Please select option");
    }

    const finalData = {
      studentId: currentUser._id,
      videoId,
      user,
      marks: marks,
      total: quiz?.answers?.length,
    };
    addQuizMark(finalData);
    setResultOpen(true);
  });

  const handleOnchange = (index: any) => {
    if (quiz.answers.length <= questionPosition) {
      dispatch(handleAnswer(check1));
    }
    dispatch(updateAnswer({ questionPosition, checked }));
    setCheck1(index);
    setChecked(index);
    setCurrentCheck(index);
  };

  const handleNextFunc = () => {
    if (
      (check1 === undefined && !quiz.answers[questionPosition]) ||
      quiz.answers.length < 1
    ) {
      return toast.error("Please select option");
    }
    dispatch(handleNext({}));

    setCheck1(undefined);
    setCurrentCheck(undefined);
  };

  const handlePreviousButton = () => {
    dispatch(handlePrev({}));
    setCurrentCheck(undefined);
  };

  const handleCloseModal = () => {
    setOpen(false);
    dispatch(resetAll({}));
    setCurrentCheck(undefined);
  };

  return (
    <>
      {quizzes?.length > 0 && (
        <div
          onClick={(e) => {
            setOpen(true);
          }}
          className=" m-4 text-white rounded-md bg-gradient-to-br from-blue-500 to-purple-500 text-blacks "
        >
          <p className="p-2  cursor-pointer font-medium text-sm">Quiz</p>
        </div>
      )}

      {open && (
        <form>
          <div className="fixed z-10 inset-0 text-white">
            <div className="flex items-center justify-center min-h-screen px-4">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
              </div>
              <div
                className="bg-[#150F2D] p-3 rounded-lg shadow-xl transform transition-all sm:w-full sm:max-w-lg"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <span
                  onClick={handleCloseModal}
                  className="btn btn-sm btn-circle absolute right-2 top-2 bg-gradient-to-r from-[#EAAAFF] to-[#B5ACFF] text-black"
                >
                  ✕
                </span>

                {resultOpen ? (
                  <div>
                    <p>
                      <BsFillTrophyFill
                        className=" text-purple-500 mx-auto mt-5"
                        size={100}
                      />
                    </p>

                    <div className="bg-gradient-to-tr from-blue-500 to-purple-600 w-32 flex flex-col justify-center items-center mx-auto my-5 p-2 rounded-md">
                      <p>Your Score</p>
                      <p className="text-3xl font-bold tracking-widest mt-2">
                        {quizMarkLoading ? (
                          <span>Loading...</span>
                        ) : (
                          <span>
                            {singleQuizMark?.marks} / {singleQuizMark?.total}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-4">
                    <h2 className="text-lg font-medium">
                      Q : {singleQuiz?.question}
                    </h2>

                    <div className=" mt-10">
                      {singleQuiz?.answers?.map((option: any, index: number) => (
                        <section
                          key={index}
                          className="flex items-center gap-2 border-b-2 border-gray-800"
                        >
                          <input
                            type="radio"
                            required
                            name="quiz"
                            id={`q${index}-option`}
                            className="hidden"
                            onChange={() => handleOnchange(index)}
                            checked={false}
                          />
                          <label
                            htmlFor={`q${index}-option`}
                            className={`cursor-pointer w-full my-1 py-2 ${
                              quiz.answers[questionPosition] == index
                                ? "checked text-green-500"
                                : ""
                            } ${currentCheck === index && "text-green-500"} `}
                          >
                            <p className="flex items-center gap-3">
                              <span>
                                <AiOutlineCheckCircle
                                  size={22}
                                  className={`${
                                    quiz.answers[questionPosition] == index
                                      ? "checked text-green-500"
                                      : ""
                                  } ${
                                    currentCheck === index && "text-green-500"
                                  } `}
                                />{" "}
                              </span>
                              <span> {option.name}</span>
                            </p>
                          </label>
                        </section>
                      ))}
                    </div>
                  </div>
                )}

                {resultOpen ? (
                  <div className="flex justify-center px-4 py-3">
                    <span
                      onClick={handleCloseModal}
                      className="w-24 block text-center cursor-pointer rounded-md py-1.5 mx-3 text-black font-medium bg-gradient-to-r from-[#EAAAFF] to-[#B5ACFF]"
                    >
                      Done
                    </span>
                  </div>
                ) : (
                  <div className="bg-[#150F2D] px-4 py-3">
                    <div className="flex justify-center items-center mt-10">
                      {questionPosition > 0 && (
                        <span
                          onClick={handlePreviousButton}
                          className="w-24 block text-center cursor-pointer rounded-md py-1.5 mx-3 text-black font-medium bg-gradient-to-r from-[#EAAAFF] to-[#B5ACFF]"
                        >
                          Previous
                        </span>
                      )}
                      {quizzes?.length === questionPosition + 1 ? (
                        <div className="">
                          <button
                            onClick={add}
                            type="submit"
                            className="w-24 block text-center cursor-pointer rounded-md py-1.5 mx-3 text-black font-medium bg-gradient-to-r from-[#EAAAFF] to-[#B5ACFF]"
                          >
                            Submit
                          </button>
                        </div>
                      ) : (
                        <span
                          onClick={handleNextFunc}
                          className="w-24 block text-center cursor-pointer rounded-md py-1.5 mx-3 text-black font-medium bg-gradient-to-r from-[#EAAAFF] to-[#B5ACFF]"
                        >
                          Next
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
