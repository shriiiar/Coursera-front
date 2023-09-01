import React, { useState } from "react";

type Props = { quizItems: any; serial: any };

export default function QuizItem({ quizItems, serial }: Props) {
  const [quizModalOpen, setQuizModalOpen] = useState(false);

  return (
    <>
      <div
        tabIndex={serial}
        className="collapse collapse-plus rounded-2xl bg-slate-400 mt-2"
      >
        <input type="checkbox" className="peer" />
        <div className="collapse-title text-md font-medium text-white bg-violet-500">
          Quizzes
        </div>
        <div className="collapse-content text-sm bg-violet-300">
          <div
            onClick={() => setQuizModalOpen(true)}
            className="p-3 cursor-pointer text-white rounded-md bg-gradient-to-br from-blue-500 to-purple-500 mt-4"
          >
            Quiz
          </div>
        </div>
      </div>

      {quizModalOpen && (
        <>
          <div className="fixed z-30 inset-0 text-white overflow-auto my-5">
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
                  onClick={() => setQuizModalOpen(false)}
                  className="btn btn-sm btn-circle absolute right-2 top-2 bg-gradient-to-r from-[#EAAAFF] to-[#B5ACFF] text-black"
                >
                  ✕
                </span>
                {quizItems?.map((quiz: any, index: number) => (
                  <div className="p-4" key={quiz._id}>
                    <h2 className="text-lg font-medium">
                      Q : {quiz?.question}
                    </h2>

                    <div className=" mt-5">
                      {quiz?.answers?.map((option: any, index: number) => (
                        <section
                          key={index}
                          className="flex items-center gap-2 border-b-2 border-gray-800"
                        >
                          <p className={` my-1 py-2 text-base`}>
                            <span>{index + 1} : </span>{" "}
                            <span
                              className={`${
                                option?.answered === true &&
                                "text-green-500 font-medium"
                              }`}
                            >
                              {option.name}
                            </span>
                          </p>
                        </section>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
