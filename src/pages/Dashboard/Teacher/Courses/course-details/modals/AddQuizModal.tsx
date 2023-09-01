import React, { useEffect, useState } from "react";
import {
  useAddAssignmentToModuleMutation,
  useAddVideoToModuleMutation,
  useGetMilestoneByCourseQuery,
  useGetModulesByCourseQuery,
} from "../../../../../../features/coursesSlice/courseApi";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
import {
  useAddAssignmentToVideoMutation,
  useAddQuizMutation,
  useGetVideosByModuleQuery,
} from "../../../../../../features/coursesSlice/teacherApi";
import { useAppContext } from "../../../../../../context/AppContext";

type Props = {
  course: any;
};
const AddQuizModal = ({ course }: Props) => {
  const { currentUser } = useAppContext();

  // local state for
  const [selectedModule, setSelectedModule] = useState([]);

  const [selectedVideo, setSelectedVideo] = useState([]);
  // get milestone and modules hook here

  const { data: milestones } = useGetMilestoneByCourseQuery(course?._id);
  const { data: modules } = useGetModulesByCourseQuery(course?._id);
  // get hook from rtk to save quiz
  const [addQuiz, { isLoading, isError, isSuccess }] = useAddQuizMutation();

  // get hook form

  const { handleSubmit, register, reset, watch, control } = useForm();
  const {
    fields: questionFields,
    append: questionAppend,
    remove: questionRemove,
  } = useFieldArray({ control, name: "quizzes" });

  const milestone = watch("milestoneId");
  const module = watch("moduleId");
  const { data: videos } = useGetVideosByModuleQuery(module);

  const add = handleSubmit(async (data) => {
    const formattedData = data.quizzes.map((question: any) => ({
      question: question.question,
      answers: [
        {
          name: question.option1,
          answered: question.option1Answered === "true",
        },
        {
          name: question.option2,
          answered: question.option2Answered === "true",
        },
        {
          name: question.option3,
          answered: question.option3Answered === "true",
        },
        {
          name: question.option4,
          answered: question.option4Answered === "true",
        },
      ],
    }));

    const finalData = {
      videos: data.videos,
      quizzes: formattedData,
      user: currentUser._id,
    };
    addQuiz(finalData);
  });

  // filter module
  useEffect(() => {
    const selected = modules?.modules.filter(
      (item: any) => item?.milestoneId === milestone
    );
    const selectedV = videos?.data.filter(
      (item: any) => item?.moduleId === module
    );
    setSelectedVideo(selectedV);
    setSelectedModule(selected);
  }, [milestone, module, videos]);

  // handle error and success
  useEffect(() => {
    if (isSuccess) {
      toast.success(`Quiz added successfully.`);
      reset();
    }
    if (isError) {
      toast.error(`Error occur`);
    }
  }, [isSuccess, isError]);

  return (
    <form onSubmit={add}>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="add-quiz-modal" className="modal-toggle" />
      <div className="modal bg-black/50 overflow-y-auto p-5">
        <div className="bg-white overflow-y-auto p-7 relative w-full max-w-4xl max-h-full rounded-md">
          <label
            htmlFor="add-quiz-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2 btn-primary"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">
            <span className="text-base">Add Quiz</span>
          </h3>

          <div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Milestone List.</span>
              </label>
              <select
                className="px-3 w-full cursor-pointer h-10 border rounded-lg border-primary outline-none focus:border-primary"
                {...register("milestoneId")}
              >
                <option value={""} hidden>
                  select milestone
                </option>
                {milestones?.milestones?.map((item: any, ind: number) => (
                  <option value={item?._id} key={item?._id}>
                    Milestone {ind + 1} - {item?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Module List.</span>
              </label>
              <select
                className="px-3 w-full cursor-pointer h-10 border rounded-lg border-primary outline-none focus:border-primary"
                {...register("moduleId", { required: true })}
              >
                <option value={""} hidden>
                  select module
                </option>
                {selectedModule?.map((item: any, ind: number) => (
                  <option value={item?._id} key={item?._id}>
                    Module {ind + 1} - {item?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Video List</span>
              </label>
              <select
                className="px-3 w-full cursor-pointer h-10 border rounded-lg border-primary outline-none focus:border-primary"
                {...register("videos", { required: true })}
              >
                <option value={""} hidden>
                  select Video
                </option>
                {selectedVideo?.map((item: any, ind: number) => (
                  <option value={item?._id} key={item?._id}>
                    Module {ind + 1} - {item?.name}
                  </option>
                ))}
              </select>
            </div>

            {questionFields?.map((question, index) => {
              return (
                <>
                  <section className="">
                    <div className="form-control mt-3 " key={index}>
                      <label className="label">
                        <span className="label-text">Question Name</span>
                      </label>
                      <div className="flex justify-between items-center">
                        <input
                          type="text"
                          placeholder="Your Question"
                          className="input input-bordered w-full h-10 border-primary focus:border-primary"
                          {...register(`quizzes[${index}].question`, {
                            required: true,
                          })}
                        />
                        <span
                          onClick={() => questionRemove(index)}
                          className="bg-red-500 text-white h-8 w-9 flex justify-center items-center rounded-full font-semibold cursor-pointer mx-5"
                        >
                          X
                        </span>
                      </div>
                    </div>
                    <div></div>
                  </section>
                  <section className="flex justify-between items-center">
                    <div className="flex items-center gap-3 my-4">
                      <div className="form-control w-full">
                        <input
                          placeholder="Option 1"
                          type="text"
                          className="input input-bordered h-10 border-primary focus:border-primary"
                          {...register(`quizzes[${index}].option1`, {
                            required: true,
                          })}
                        />
                      </div>
                      <div className="form-control w-32">
                        <select
                          className="input input-bordered h-10 border-primary focus:border-primary"
                          {...register(`quizzes[${index}].option1Answered`, {
                            required: true,
                          })}
                        >
                          <option value="" selected disabled>
                            Default
                          </option>
                          <option value="false">No</option>
                          <option value="true">Yes</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 my-4">
                      <div className="form-control w-full">
                        <input
                          type="text"
                          placeholder="Option 2"
                          className="input input-bordered h-10 border-primary focus:border-primary"
                          {...register(`quizzes[${index}].option2`, {
                            required: true,
                          })}
                        />
                      </div>
                      <div className="form-control w-32 h-10 border-primary focus:border-primary">
                        <select
                          className="input input-bordered h-10 border-primary focus:border-primary"
                          {...register(`quizzes[${index}].option2Answered`, {
                            required: true,
                          })}
                        >
                          <option value="" selected disabled>
                            Default
                          </option>
                          <option value="false">No</option>
                          <option value="true">Yes</option>
                        </select>
                      </div>
                    </div>
                  </section>
                  <section className="flex justify-between items-center gap-5">
                    <div className="flex items-center gap-3 my-4">
                      <div className="form-control w-full">
                        <input
                          type="text"
                          placeholder="Option 3"
                          className="input input-bordered h-10 border-primary focus:border-primary"
                          {...register(`quizzes[${index}].option3`, {
                            required: true,
                          })}
                        />
                      </div>
                      <div className="form-control w-32">
                        <select
                          className="input input-bordered h-10 border-primary focus:border-primary"
                          {...register(`quizzes[${index}].option3Answered`, {
                            required: true,
                          })}
                        >
                          <option value="" selected disabled>
                            Default
                          </option>
                          <option value="false">No</option>
                          <option value="true">Yes</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 my-4">
                      <div className="form-control w-full">
                        <input
                          type="text"
                          placeholder="Option 4"
                          className="input input-bordered h-10 border-primary focus:border-primary"
                          {...register(`quizzes[${index}].option4`, {
                            required: true,
                          })}
                        />
                      </div>
                      <div className="form-control w-32">
                        <select
                          className="input input-bordered h-10 border-primary focus:border-primary"
                          {...register(`quizzes[${index}].option4Answered`, {
                            required: true,
                          })}
                        >
                          <option value="" selected disabled>
                            Default
                          </option>
                          <option value="false">No</option>
                          <option value="true">Yes</option>
                        </select>
                      </div>
                    </div>
                  </section>
                </>
              );
            })}

            <div className="mt-10 flex justify-between">
              <button
                onClick={() => questionAppend("")}
                className="w-40 py-2 bg-gradient-to-br from-purple-500 to-blue-500 text-white font-medium rounded-md"
              >
                Add Question
              </button>

              <button
                type="submit"
                className="w-40 py-2 bg-gradient-to-tr from-blue-500 to-purple-500 text-white font-medium rounded-md"
                disabled={isLoading}
              >
                {isLoading ? "loading..." : "Add Quiz"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddQuizModal;
