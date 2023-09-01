import React, { useEffect, useState } from "react";
import {
  useAddAssignmentToModuleMutation,
  useAddVideoToModuleMutation,
  useGetMilestoneByCourseQuery,
  useGetModulesByCourseQuery,
} from "../../../../../../features/coursesSlice/courseApi";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
import {
  useAddAssignmentToVideoMutation,
  useGetVideosByModuleQuery,
} from "../../../../../../features/coursesSlice/teacherApi";
import { useAppContext } from "../../../../../../context/AppContext";
import { useUploadFileMutation } from "../../../../../../features/coursesSlice/googleDriveApi";

type Props = {
  course: any;
};
const AddAssignmentModal = ({ course }: Props) => {
  const { currentUser } = useAppContext();
  // local state for
  const [selectedModule, setSelectedModule] = useState([]);

  const [selectedVideo, setSelectedVideo] = useState([]);
  // get milestone and modules hook here

  const { data: milestones } = useGetMilestoneByCourseQuery(course?._id);
  const { data: modules } = useGetModulesByCourseQuery(course?._id);

  const [
    uploadFile,
    {
      data: uploadResponse,
      isSuccess: uploadSuccess,
      isLoading: uploadLoading,
    },
  ] = useUploadFileMutation();
  // get hook form
  const { handleSubmit, register, reset, watch } = useForm();

  const [milestoneId, setMilestoneId] = useState("");
  const [moduleId, setModuleId] = useState("");
  const [videoId, setVideoId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { data: videos } = useGetVideosByModuleQuery(moduleId);

  // get hook from rtk to save video
  const [SaveAssignment, { isLoading, isError, isSuccess, error }] =
    useAddAssignmentToVideoMutation();

  const add = handleSubmit(async (data) => {
    const file = data.file[0];
    if (!file) {
      toast.error("Add assignment file");
      return;
    }
    let formData = new FormData();
    formData.append("pdf", file);
    uploadFile(formData);
  });

  useEffect(() => {
    if (uploadSuccess) {
      if (!milestoneId && !moduleId && !videoId && !name) {
        toast.error("Fill the input");
        return;
      }

      SaveAssignment({
        courseId: course?._id,
        milestoneId: milestoneId,
        moduleId: moduleId,
        videoId: videoId,
        user: currentUser?._id,
        name: name,
        description: description,
        pdf: uploadResponse?.data,
      });
    }
  }, [uploadSuccess]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Assignment added successfully");
      setMilestoneId("");
      setModuleId("");
      setVideoId("");
      setName("");
      setDescription("");
      reset();
    }
  }, [isSuccess]);

  // filter module
  useEffect(() => {
    const selected = modules?.modules.filter(
      (item: any) => item?.milestoneId == milestoneId
    );
    const selectedV = videos?.data.filter(
      (item: any) => item?.moduleId == moduleId
    );
    setSelectedVideo(selectedV);
    setSelectedModule(selected);
  }, [milestoneId, moduleId, videos]);

  const [fileName, setFileName] = useState(null);

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    setFileName(selectedFile?.name);
  };

  return (
    <form onSubmit={add}>
      <input
        type="checkbox"
        id="add-assignment-modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="add-assignment-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2 btn-primary"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">
            <span className="text-base">Add Assignment</span>
          </h3>

          <div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Milestone List.</span>
              </label>
              <select
                className="select select-bordered w-full"
                onChange={(e) => setMilestoneId(e.target.value)}
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
                onChange={(e) => setModuleId(e.target.value)}
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
                className="select select-bordered w-full"
                onChange={(e) => setVideoId(e.target.value)}
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

            <div className="form-control">
              <label className="label">
                <span className="label-text">Assignment Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Assignment file</span>
              </label>
              <input
                id="file"
                type="file"
                {...register("file", {
                  onChange: (e) => {
                    handleFileChange(e);
                  },
                })}
                className="hidden"
              />
              <label
                htmlFor="file"
                className="bg-gradient-to-tr from-violet-500/90 to-blue-500/90 border-dashed border-white border cursor-pointer text-center text-white py-2 rounded-md font-medium"
              >
                {fileName ? fileName : "Upload"}
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Assignment Description.</span>
              </label>
              <textarea
                className="textarea h-24 textarea-bordered"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="form-control mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading || uploadLoading}
              >
                {isLoading || uploadLoading ? "loading..." : "Add Assignment"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddAssignmentModal;
