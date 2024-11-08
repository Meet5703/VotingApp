/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthFormCustom = ({
  title,
  handleSubmit,
  fields,
  submitLabel,
  linkLabel,
  onLinkClick,
}) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-gradient-to-r from-slate-300 to-slate-500 flex flex-col h-screen justify-center items-center dark:from-purple-800 dark:to-blue-800">
      <div
        style={{
          backdropFilter: "blur(3px)",
        }}
        className="w-full max-w-md bg-transparent border border-gray-700 dark:bg-gray-900/80 shadow-lg rounded-lg p-6"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {title}
          </h2>
        </div>
        <div>
          {fields.map((field, index) => (
            <div key={index} className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                {field.label}
              </label>
              <div className="relative">
                <input
                  id={field.id}
                  name={field.id}
                  type={
                    field.type === "password" && showPassword
                      ? "text"
                      : field.type
                  }
                  placeholder={field.placeholder}
                  required={field.required}
                  onChange={field.onChange}
                  value={field.value}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-800"
                />
                {field.type === "password" && (
                  <button
                    type="button"
                    onClick={() => {
                      if (showPassword) {
                        setShowPassword(false);
                      }
                      if (showPassword === false) {
                        setShowPassword(true);
                      }
                    }}
                    className="absolute right-2 top-2 text-gray-600"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center">
          <button
            onClick={handleSubmit}
            className="w-full py-2 mt-4 bg-zinc-800 text-white rounded-md"
          >
            {submitLabel}
          </button>
          <button
            onClick={() => navigate("/forgot-password")}
            className="mt-3 text-zinc-800 hover:underline text-sm"
          >
            Forgot Password?
          </button>
        </div>
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {submitLabel === "Login"
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <button
              onClick={onLinkClick}
              className="text-zinc-800 hover:underline"
            >
              {linkLabel}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
