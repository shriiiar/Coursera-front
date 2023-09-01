import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAddMilestoneMutation } from "../../../../../../features/coursesSlice/courseApi";
import { toast } from "react-hot-toast";

type Props = {
  course: any;
};

const AddMilestoneModal = ({ course }: Props) => {
  // get hook form
  const { handleSubmit, register, reset } = useForm();

  // get rtk hook for api
  const [addMilestone, { isLoading, isSuccess, error }] =
    useAddMilestoneMutation();

  // handle save milestone
  const handleSaveMilestone = handleSubmit(async (data) => {
    await addMilestone({
      body: data,
      id: course._id,
    });
  });

  // handle error and success
  useEffect(() => {
    if (isSuccess) {
      toast.success(`Milestone added to this course`);
      reset();
    }
    if (error) {
      toast.error(`Something went wrong.`);
    }
  }, [isSuccess, error]);
  return (
    <form onSubmit={handleSaveMilestone}>
      {/* Put this part before </body> tag */}
      <input
        type="checkbox"
        id="add-milestone-modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="add-milestone-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2 btn-primary"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">
            <span className="text-base">Add Milestone</span>
          </h3>

          <div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Milestone name.</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                {...register("name", { required: true })}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Milestone Total times.</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                {...register("totalTimes", { required: true })}
              />
            </div>

            <div className="form-control mt-3">
              <button className="btn btn-primary" disabled={isLoading}>
                {isLoading ? "Loading..." : "Add Milestone"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddMilestoneModal;
