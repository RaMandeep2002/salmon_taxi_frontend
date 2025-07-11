"use client";
import { useState } from "react";
import DashboardLayout from "../../DashBoardLayout";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { useSelector } from "react-redux";
import { addUser } from "../../slices/slice/addUserSlice";

export default function AddAdmin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const { isLoading, error, successMessage } = useSelector(
    (state: RootState) => state.addUser
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultAction = dispatch(
      addUser({
        name,
        email,
        password,
        role: "admin",
      })
    );
    if (addUser.fulfilled.match(resultAction)) {
      setName("");
      setEmail("");
      setPassword("");
    }
  };

  const generatePassword = () => {
    const length = 8;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }
    setPassword(newPassword);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <DashboardLayout>
      <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 text-[#F5EF1B]">
          Add New Admin
        </h2>
        <div
          className="max-w-2xl w-full mx-auto bg-[#F5EF1B] p-4 sm:p-6 md:p-8 mt-6 sm:mt-12 rounded-md
          "
        >
          {error && (
              <p className="text-red-500 text-center text-sm sm:text-base">
                {error}
              </p>
            )}
            {successMessage && (
              <p className="text-green-600 text-center text-sm sm:text-base font-semibold">
                {successMessage}
              </p>
            )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-base sm:text-lg font-medium text-zinc-800">
                Admin name
              </label>
              <input
                type="text"
                name="name"
                autoComplete="off"
                placeholder="Enter the name of Admin"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-2 py-3 sm:px-4 sm:py-3 border border-zinc-800 text-zinc-800 text-base sm:text-lg bg-transparent placeholder:text-zinc-800 rounded-md"
              />
            </div>

            <div>
              <label className="block text-base sm:text-lg font-medium text-zinc-800">
                Admin Email
              </label>
              <input
                type="email"
                name="email"
                autoComplete="off"
                placeholder="Enter the Email of Admin"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-2 py-3 sm:px-4 sm:py-3 border border-zinc-800 text-zinc-800 text-base sm:text-lg bg-transparent placeholder:text-zinc-800 rounded-md"
              />
            </div>
            <div>
              <label className="block text-base sm:text-lg font-medium text-zinc-800">
                Admin Password
              </label>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <div className="relative flex-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter the Password for Admin"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-2 py-3 sm:px-4 sm:py-3 border border-zinc-800 text-zinc-800 text-base sm:text-lg bg-transparent placeholder:text-zinc-800 rounded-md"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-blue-600 hover:text-blue-700"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={generatePassword}
                  className="w-full sm:w-auto bg-yellow-600 text-white hover:bg-yellow-500 py-3 sm:py-3 px-3 sm:px-4 text-sm sm:text-base font-semibold rounded-md transition duration-300"
                >
                  Generate Password
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-yellow-600 text-white rounded-md hover:bg-yellow-500 py-2 sm:py-3 text-base sm:text-lg font-semibold transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
               {isLoading ? "Adding..." : "Add Admin"}
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
