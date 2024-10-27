import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { HideLoding, ShowLoading } from "../../redux/alerts";
import PageTitle from "../../components/PageTittle";
import StudentForm from "../../components/StudentForm";

function EditStudent() {
  const [student, setStudent] = React.useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const getStudent = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        `/api/student/get-student/${params.roll}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoding());
      if (response.data.success) {
        setStudent(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoding());
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getStudent();
  }, []);
  return (
    <div>
      <PageTitle title="Edit Student" />
      {student && <StudentForm student={student} type="edit" />}
    </div>
  );
}

export default EditStudent;
