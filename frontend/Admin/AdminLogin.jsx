import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const usenavigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // console.log(formData);
  };
  // 수정된 코드
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("서버로 보내는 데이터:", formData); // 👈 이 로그를 추가해서 확인!
      // axios.post(URL, 데이터, 설정) 형태로 수정합니다.
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData, // ❗ 두 번째 인자로 formData를 전달합니다.
        {
          withCredentials: true, // ❗ 세 번째 인자로 설정 객체를 전달합니다.
        }
      );

      if (response.data.user) {
        usenavigate("/admin/posts");
      }
    } catch (error) {
      // 💡 추가: 여기서도 'messsage' -> 'message' 오타가 있었습니다.
      const errorMessage =
        error.response?.data?.message || "로그인에 실패했습니다";
      const remainingAttempts = error.response?.data?.remainingAttempts;

      // 💡 추가: 여기도 'messsage' -> 'message' 오타 수정
      setError({
        message: errorMessage,
        remainingAttempts: remainingAttempts,
      });
    }
  };
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 ">
      <div className="w-lg space-y-8 p-10 bg-white rounded-2xl shadow-xl ">
        <div>
          <h2 className="mt-6 text-center text-3xl font-semibold text-gray-900">
            관리자 로그인
          </h2>
          <p className="mt-2 text-center text-lg text-gray-600">
            관리자 전용 페이지입니다.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-xm font-medium text-gray-700"
              >
                관리자 아이디
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus: ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                placeholder="관리자 아이디"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-xm font-medium text-gray-700"
              >
                관리자 비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus: ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                placeholder="관리자 비밀번호"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-lg text-base font-bold text-center">
              {typeof error === "string" ? error : error.messsage}
              {error.remainingAttempts !== undefined && (
                <div className="mt-1">
                  남은 시도 횟수: {error.remainingAttempts}회
                </div>
              )}
            </div>
          )}
          <button
            type="submit"
            className="w-full items-center px-4 py-3 border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 font-medium transition-colors duration-300"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
