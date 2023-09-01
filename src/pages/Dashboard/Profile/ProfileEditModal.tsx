import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";
import { useEditProfileMutation } from "../../../features/api/userApi";
import { toast } from "react-hot-toast";

type Props = { editData: any; setEditData: any };

export default function ProfileEditModal({ editData, setEditData }: Props) {
  const {
    name: initialName,
    phone: initialPhone,
    studentId: initialStudentId,
    section: initialSection,
    batch: initialBatch,
    codeForces: initialCodeForces,
    leetCode: initialLeetCode,
    atCoder: initialAtCoder,
    codeChef: initialCodeChef,
    role,
    specialist: initialSpecialist,
  } = editData || {};

  const [name, setName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);
  const [studentId, setStudentId] = useState(initialStudentId);
  const [section, setSection] = useState(initialSection);
  const [batch, setBatch] = useState(initialBatch);
  const [codeForces, setCodeForces] = useState(initialCodeForces);
  const [leetCode, setLeetCode] = useState(initialLeetCode);
  const [atCoder, setAtCoder] = useState(initialAtCoder);
  const [codeChef, setCodeChef] = useState(initialCodeChef);
  const [specialist, setSpecialist] = useState(initialSpecialist);

  const [batches, setBatches] = useState<any>([
    48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58,
  ]);

  const [editProfile, { data, isSuccess, isLoading }] =
    useEditProfileMutation();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = handleSubmit(async (data) => {
    let finalData = {};
    if (role === "student") {
      finalData = {
        name,
        phone,
        studentId,
        section,
        batch,
        codeForces,
        leetCode,
        atCoder,
        codeChef,
      };
    } else if (role === "teacher") {
      finalData = {
        name,
        phone,
        specialist,
      };
    } else {
      finalData = { name, phone };
    }
    editProfile(finalData);
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Profile updated successfully", { id: "edit-profile" });
      setEditData(false);
    }
  }, [isSuccess]);

  return (
    <div className="fixed w-full h-full inset-0 z-50 bg-black/50 poppins">
      <div className="rounded-lg w-full max-w-lg space-y-5 bg-[#F2F3F8] p-7 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <span
          onClick={() => setEditData(false)}
          className="absolute -right-4 -top-4 cursor-pointer font-semibold text-lg bg-violet-600 h-9 w-9 text-white rounded-full flex items-center justify-center"
        >
          X
        </span>
        <div className="">
          <h3 className="text-center text-xl font-semibold">Update Profile</h3>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="input input-bordered w-full border-primary focus:border-primary h-10"
            />
          </div>

          <div className="flex flex-col gap-2 mt-3">
            <label htmlFor="phone">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone"
              className="input input-bordered w-full border-primary focus:border-primary h-10"
            />
          </div>

          {role === "student" && (
            <>
              <div className="flex gap-5">
                <div className="flex flex-col gap-2 mt-3 w-full">
                  <label htmlFor="batch">
                    Batch <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="batch"
                    value={batch}
                    onChange={(e) => setBatch(e.target.value)}
                    className="h-10 select-bordered px-3 ring-1 ring-primary rounded-md w-full border-primary focus:border-primary outline-none"
                  >
                    <option value="" disabled>
                      Select Batch
                    </option>
                    {batches.map((batch: any) => (
                      <option className="text-sm" key={batch} value={batch}>
                        Batch {batch}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2 mt-3 w-full">
                  <label htmlFor="section">
                    Section <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="section"
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    className="h-10 select-bordered px-3 ring-1 ring-primary rounded-md w-full border-primary focus:border-primary outline-none"
                  >
                    <option value="" disabled>
                      Select Section
                    </option>
                    <option className="text-sm">Section A</option>
                    <option className="text-sm">Section B</option>
                    <option className="text-sm">Section C</option>
                    <option className="text-sm">Section D</option>
                    <option className="text-sm">Section E</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-3">
                <label htmlFor="studentId">
                  Student Id <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="studentId"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="Enter your phone"
                  className="input input-bordered w-full border-primary focus:border-primary h-10"
                />
              </div>

              <div className="flex gap-5">
                <div className="flex flex-col gap-2 mt-3">
                  <label htmlFor="codeForces">
                    Code Forces <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="codeForces"
                    value={codeForces}
                    onChange={(e) => setCodeForces(e.target.value)}
                    placeholder="Enter your phone"
                    className="input input-bordered w-full border-primary focus:border-primary h-10"
                  />
                </div>
                <div className="flex flex-col gap-2 mt-3">
                  <label htmlFor="leetCode">
                    Leet Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="leetCode"
                    value={leetCode}
                    onChange={(e) => setLeetCode(e.target.value)}
                    placeholder="Enter your phone"
                    className="input input-bordered w-full border-primary focus:border-primary h-10"
                  />
                </div>
              </div>

              <div className="flex gap-5">
                <div className="flex flex-col gap-2 mt-3">
                  <label htmlFor="atCoder">
                    At Coder <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="atCoder"
                    value={atCoder}
                    onChange={(e) => setAtCoder(e.target.value)}
                    placeholder="Enter your phone"
                    className="input input-bordered w-full border-primary focus:border-primary h-10"
                  />
                </div>
                <div className="flex flex-col gap-2 mt-3">
                  <label htmlFor="codeChef">
                    Code Chef <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="codeChef"
                    value={codeChef}
                    onChange={(e) => setCodeChef(e.target.value)}
                    placeholder="Enter your phone"
                    className="input input-bordered w-full border-primary focus:border-primary h-10"
                  />
                </div>
              </div>
            </>
          )}

          {role === "teacher" && (
            <div className="flex flex-col gap-2 mt-3">
              <label htmlFor="specialist">
                Specialist
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="specialist"
                value={specialist}
                onChange={(e) => setSpecialist(e.target.value)}
                placeholder="Enter your phone"
                className="input input-bordered w-full border-primary focus:border-primary h-10"
              />
            </div>
          )}

          {isLoading ? (
            <button className="btn btn-primary w-full mt-3" disabled>
              <div className="flex items-center justify-center gap-2">
                <span className="animate-spin">
                  <FaSpinner />
                </span>
                <span>Registering...</span>
              </div>
            </button>
          ) : (
            <button
              onClick={onSubmit}
              className="btn mt-6 text-white btn-primary w-full bg-gradient-to-tr from-blue-500 to-purple-600"
            >
              Update
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
