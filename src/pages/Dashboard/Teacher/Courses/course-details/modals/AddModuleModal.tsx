import React, { useEffect } from "react";
import {
  useAddModuleToMilestoneMutation,
  useGetMilestoneByCourseQuery,
} from "../../../../../../features/coursesSlice/courseApi";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

type Props = {
  course: any;
};

const AddModuleModal = ({ course }: Props) => {
  // get milestone
  const { data: milestones } = useGetMilestoneByCourseQuery(course?._id);

  // api hook for save module
  const [addModule, { isLoading, isError, error, isSuccess }] =
    useAddModuleToMilestoneMutation();

  // get form using hook form
  const { register, handleSubmit, reset } = useForm();
  // handle add module
  const handleAddModule = handleSubmit(async (data) => {
    const { milestoneId, ...other } = data;
    await addModule({
      body: other,
      id: milestoneId,
    });
  });

  // handle error and success
  useEffect(() => {
    if (isSuccess) {
      toast.success(`module added successfully to this milestone.`);
      reset();
    }
    if (isError) {
      toast.error(`Something went wrong.`);
    }
  }, [isSuccess, isError]);
  return (
    <form onSubmit={handleAddModule}>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="add-module-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="add-module-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2 btn-primary"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">
            <span className="text-base">Add Module</span>
          </h3>

          <div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Milestone List.</span>
              </label>
              <select
                className="select select-bordered w-full"
                {...register("milestoneId", {
                  required: true,
                })}
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
                <span className="label-text">Module name.</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                {...register("name", {
                  required: true,
                })}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Module Total times.</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                {...register("totalTimes", {
                  required: true,
                })}
              />
            </div>

            <div className="form-control mt-3">
              <button className="btn btn-primary" disabled={isLoading}>
                {isLoading ? "Loading..." : "Add Module"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddModuleModal;
