import React, { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoding } from "../redux/alerts.js";
import { SetFaculty } from "../redux/faculty.js";
import DefaultLayout from "../components/DefaultLayout.js";
import { useNavigate } from "react-router-dom";

function ProtectedRoute(props) {
  const navigate = useNavigate();
  const [readyToRender, setReadyToRender] = React.useState(false);
  const dispatch = useDispatch();
  const getFacultyData = async () => {
    try {
      dispatch(ShowLoading());
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/api/faculty/get-faculty-by-id",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(HideLoding());
      if (response.data.success) {
        dispatch(SetFaculty(response.data.data));
        setReadyToRender(true);
      }
    } catch (error) {
      dispatch(HideLoding());
      toast.error("Something Went Wrong");
      navigate("/login");
    }
  };
  useEffect(() => {
    getFacultyData();
  }, []);
  return readyToRender && <DefaultLayout>{props.children}</DefaultLayout>;
}

export default ProtectedRoute;
