import React, { useEffect, useState } from "react";
import {
  useAddVideoToModuleMutation,
  useGetMilestoneByCourseQuery,
  useGetModuleByMilestoneQuery,
  useGetModulesByCourseQuery,
} from "../../../../../../features/coursesSlice/courseApi";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

type Props = {
  course: any;
};

const AddVideoModal = ({ course }: Props) => {
  // local state for
  const [selectedModule, setSelectedModule] = useState([]);
  // get milestone and modules hook here
  const { data: milestones } = useGetMilestoneByCourseQuery(course?._id);
  const { data: modules } = useGetModulesByCourseQuery(course?._id);

  // get hook form
  const { handleSubmit, register, reset, watch } = useForm();

  const milestone = watch("milestoneId");

  // get hook from rtk to save video
  const [SaveVideo, { isLoading, isError, isSuccess, error }] =
    useAddVideoToModuleMutation();

  // handle add video
  const handleAddVideo = handleSubmit(async (data) => {
    const { milestoneId, ...other } = data;
    await SaveVideo({
      id: data?.moduleId,
      body: {
        courseId: course?._id,
        ...other,
      },
    });
  });

  // filter module
  useEffect(() => {
    const selected = modules?.modules.filter(
      (item: any) => item?.milestoneId === milestone
    );
    setSelectedModule(selected);
  }, [milestone]);

  // handle error and success
  useEffect(() => {
    if (isSuccess) {
      toast.success(`Video added successfully done.`);
      reset();
    }
    if (isError) {
      toast.error(`Error occur`);
    }
  }, [isSuccess, isError]);
  return (
    <form onSubmit={handleAddVideo}>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="add-video-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="add-video-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2 btn-primary"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">
            <span className="text-base">Add Videos</span>
          </h3>

          <div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Milestone List.</span>
              </label>
              <select
                className="select select-bordered w-full"
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
                className="select select-bordered w-full"
                {...register("moduleId", { required: true })}
              >
                <option value={""} hidden>
                  select milestone
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
                <span className="label-text">Videos Title</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                {...register("name", { required: true })}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Video URL</span>
              </label>
              <input
                type="url"
                className="input input-bordered"
                {...register("url", { required: true })}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Course Description.</span>
              </label>
              <textarea
                className="textarea h-24 textarea-bordered"
                {...register("description", { required: true })}
              ></textarea>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text"> Total Duration.</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                {...register("totalTimes", { required: true })}
              />
            </div>

            <div className="form-control mt-3">
              <button className="btn btn-primary" disabled={isLoading}>
                {isLoading ? "loading..." : "Add Video"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddVideoModal;
