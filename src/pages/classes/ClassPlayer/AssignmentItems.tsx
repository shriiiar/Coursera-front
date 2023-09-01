import React, { useEffect, useState } from "react";
import {
  useAddAssignmentMutation,
  useGetAssignmentByVideoIdQuery,
} from "../../../features/coursesSlice/studentApi";
import { BiDetail, BiEditAlt } from "react-icons/bi";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useUploadFileMutation } from "../../../features/coursesSlice/googleDriveApi";
import { SERVER_URL } from "../../../config/config";
import { useAppContext } from "../../../context/AppContext";
import { MdDownload } from "react-icons/md";

type Props = {
  i: any;
};

const AssignmentItems = ({ i }: Props) => {
  const { token } = useAppContext();
  const { data } = useGetAssignmentByVideoIdQuery(i);

  const [user] = data?.assignment || [];

  const [open, setOpen] = useState(false);
  const [UploadAssignment, { isLoading, isError, isSuccess, error }] =
    useAddAssignmentMutation();
  const [
    uploadFile,
    {
      data: uploadResponse,
      isSuccess: uploadSuccess,
      isLoading: uploadLoading,
    },
  ] = useUploadFileMutation();
  const [modalData, setModalData] = useState({ _id: "", pdf: { id: "" } });
  const { handleSubmit, register, reset, watch } = useForm();
  const add = handleSubmit(async (data) => {
    const file = data.file[0];
    if (!file) {
      toast.error("Submit your file");
      return;
    }
    let formData = new FormData();
    formData.append("pdf", file);
    uploadFile(formData);
  });
  console.log(modalData, 49);

  useEffect(() => {
    if (uploadSuccess) {
      const finalData = {
        author: user?.user,
        name: data?.name,
        link: data?.link,
        pdf: uploadResponse?.data,
      };
      UploadAssignment({ data: finalData, id: modalData?._id });
    }
  }, [uploadSuccess]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Assignment submitted successfully", {
        id: "assignment-submission",
      });
      reset();
      setOpen(false);
    } else if (isError) {
      toast.error("Assignment already submitted", {
        id: "assignment-submission",
      });
      reset();
      setOpen(false);
    }
  }, [isSuccess, isError, error]);

  const [fileName, setFileName] = useState(null);

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    setFileName(selectedFile?.name);
  };

  const handleDownloadClick = () => {
    const downloadUrl = `${SERVER_URL}/google-drive/download/${modalData?.pdf?.id}`;
    fetch(downloadUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.blob();
        } else {
          console.error("Error downloading file");
        }
      })
      .then((blob) => {
        if (blob) {
          const url = window.URL.createObjectURL(blob);
          console.log(url);
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          // a.target = "blank";
          a.download = "downloaded_file.pdf";
          document.body.appendChild(a);
          a.click();
          // Clean up
          window.URL.revokeObjectURL(url);
        }
      })
      .catch((error) => {
        console.error("Network error:", error);
      });
  };
  const handleViewClick = () => {
    const downloadUrl = `${SERVER_URL}/google-drive/download/${modalData?.pdf?.id}`;
    fetch(downloadUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.blob();
        } else {
          console.error("Error downloading file");
        }
      })
      .then((blob) => {
        if (blob) {
          const url = window.URL.createObjectURL(blob);
          console.log(url);
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          a.target = "blank";
          // a.download = "downloaded_file.pdf";
          document.body.appendChild(a);
          a.click();
          // Clean up
          window.URL.revokeObjectURL(url);
        }
      })
      .catch((error) => {
        console.error("Network error:", error);
      });
  };

  return (
    <>
      {data?.assignment?.length > 0 && (
        <div className=" m-4 rounded-md text-blacks ">
          {data?.assignment?.map((ite: any) => (
            <div
              key={ite?._id}
              className=" text-xs font-medium bg-[#67d0f9] rounded-md  cursor-pointer my-2"
              onClick={(e) => {
                setOpen(true);
                setModalData(ite);
              }}
            >
              <li className="p-2 cursor-pointer font-medium text-sm ">
                <h1 className="text-slate-600">Assignment : {ite?.name}</h1>
              </li>
            </div>
          ))}
        </div>
      )}
      {open && (
        <form onSubmit={add}>
          <div className="fixed z-10 inset-0   ">
            <div className="flex items-center justify-center min-h-screen px-4">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <div
                className="bg-white rounded-md  shadow-xl transform transition-all sm:w-full sm:max-w-lg py-5"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <h3 className="text-xl font-bold text-center">
                  Upload Assignment
                </h3>
                <div className="bg-white overflow-hidden pt-5 pb-4 sm:p-6 sm:pb-4 relative">
                  <div className="absolute top-3 right-3 flex gap-5">
                    <span
                      title="Download Task"
                      onClick={handleDownloadClick}
                      className="bg-violet-400 hover:bg-violet-600 h-7 w-7 flex items-center justify-center p-1 rounded-full text-white cursor-pointer"
                    >
                      <MdDownload size={30} />
                    </span>
                    <span
                      title="View Task"
                      onClick={handleViewClick}
                      className="bg-violet-400 hover:bg-violet-600 h-7 w-7 flex items-center justify-center p-1 rounded-full text-white cursor-pointer"
                    >
                      <BiDetail size={25} />
                    </span>
                  </div>
                </div>

                <div className="bg-white overflow-hidden pb-4 px-6">
                  <div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Your file</span>
                      </label>
                      <input
                        className="hidden"
                        type="file"
                        id="file"
                        {...register("file", {
                          onChange: (e) => {
                            handleFileChange(e);
                          },
                        })}
                      />
                      <label
                        htmlFor="file"
                        className="bg-gradient-to-tr from-violet-500/90 to-blue-500/90 border-dashed border-white border cursor-pointer text-center text-white py-2 rounded-md font-medium"
                      >
                        {fileName ? fileName : "Upload"}
                      </label>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    onClick={() => setOpen(false)}
                    type="button"
                    className="bg-gradient-to-tr from-violet-500 to-blue-500 px-4 py-1.5 rounded-md text-white font-medium mx-2"
                  >
                    Close
                  </button>

                  <div className="form-control ">
                    <button
                      type="submit"
                      className="bg-gradient-to-tr from-violet-500 to-blue-500 px-4 py-1.5 rounded-md text-white font-medium mx-2"
                      disabled={isLoading || uploadLoading}
                    >
                      {isLoading || uploadLoading ? "loading..." : "Submit"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
        </form>
      )}
    </>
  );
};

export default AssignmentItems;
