import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import courseService from "../services/course.service";

const ModifyCourseComponent = (props) => {
  let { currentUser, setCurrentUser, currentCourse, setCurrentCourse } = props;
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [price, setPrice] = useState(0);

  let [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    setTitle(currentCourse.course.title);
    setDescription(currentCourse.course.description);
    setPrice(currentCourse.course.price);
  }, []);

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeDesciption = (e) => {
    setDescription(e.target.value);
  };
  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };
  const modifyCourse = () => {
    // console.log(title, description, price);
    courseService
      .modify(currentCourse.course._id, title, description, price)
      .then(() => {
        window.alert("課程修改成功");
        navigate("/course");
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      });
  };

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>在發布新課程之前，您必須先登錄。</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleTakeToLogin}
          >
            帶我進入登錄頁面。
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role !== "instructor" && (
        <div>
          <p>只有講師可以更改課程。</p>
        </div>
      )}
      {currentUser && currentUser.user.role == "instructor" && (
        <div className="form-group">
          <label for="exampleforTitle">課程標題：</label>
          <input
            name="title"
            type="text"
            className="form-control"
            id="exampleforTitle"
            value={title}
            onChange={handleChangeTitle}
          />
          <br />
          <label for="exampleforContent">內容：</label>
          <textarea
            className="form-control"
            id="exampleforContent"
            aria-describedby="emailHelp"
            name="content"
            // placeholder={currentCourse.course.description}
            value={description}
            onChange={handleChangeDesciption}
          />
          <br />
          <label for="exampleforPrice">價格：</label>
          <input
            name="price"
            type="number"
            className="form-control"
            id="exampleforPrice"
            value={price}
            onChange={handleChangePrice}
          />
          <br />
          <button className="btn btn-primary" onClick={modifyCourse}>
            保存課程更改
          </button>
          <br />
          <br />
          {message && (
            <div className="alert alert-warning" role="alert">
              {message}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ModifyCourseComponent;
