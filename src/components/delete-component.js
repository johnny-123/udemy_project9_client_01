import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import courseService from "../services/course.service";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const DeleteCourseComponent = ({
  currentUser,
  setCurrentUser,
  currentCourse,
  setCurrentCourse,
}) => {
  let [message, setMessage] = useState("");
  const navigation = useNavigate();
  const handleBackToLogin = () => {
    navigation("/login");
  };
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
      if (currentUser.user.role == "instructor") {
        courseService
          .get(_id)
          .then((data) => {
            setCourseData(data.data);
            console(data);
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (currentUser.user.role == "student") {
        courseService
          .getEnrolledCourses(_id)
          .then((data) => {
            setCourseData(data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, []);

  const pickCourse = (course) => {
    setCurrentCourse(course);
  };

  const deleteCourse = () => {
    courseService
      .delete(currentCourse.course._id)
      .then(() => {
        window.alert("課程已被刪除");
        navigation("/course");
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
          <p>您必須先登入才可以瀏覽課程內容</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleBackToLogin}
          >
            回到登入介面
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role === "instructor" && (
        <div>
          <h1>選擇要刪除的課程</h1>
        </div>
      )}
      {currentUser && currentUser.user.role !== "instructor" && (
        <div>
          <h1>只有該課程講師可以刪除他所擁有的課程。</h1>
        </div>
      )}
      {currentUser && courseData && courseData.length != 0 && (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {courseData.map((course) => {
            return (
              <div className="card" style={{ width: "18rem", margin: "1rem" }}>
                <div className="card-body">
                  <h5 className="card-title">課程名稱:{course.title}</h5>
                  <p className="card-text" style={{ margin: "0.5rem 0rem" }}>
                    {course.description}
                  </p>
                  <p style={{ margin: "0.5rem 0rem" }}>
                    學生人數:{course.students.length}
                  </p>
                  <p style={{ margin: "0.5rem 0rem" }}>
                    課程價格:{course.price}
                  </p>

                  <button
                    style={{ display: "block" }}
                    className="btn btn-danger btn-lg mx-auto"
                    onClick={() => {
                      pickCourse({ course });
                    }}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    刪除該課程
                  </button>
                </div>
                <div
                  class="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog ">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">
                          <FontAwesomeIcon icon={faTriangleExclamation} />{" "}
                          課程刪除後將無法復原資料
                        </h1>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      {currentCourse && (
                        <div
                          class="modal-body"
                          style={{
                            fontSize: "2rem",
                            fontFamily: "Microsoft JhengHei",
                          }}
                        >
                          是否確定刪除:{currentCourse.course.title}
                          <br />
                          學生人數仍有:{currentCourse.course.students.length}人
                          <br />
                          按下確認刪除後將刪除課程
                        </div>
                      )}
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          返回
                        </button>
                        <button
                          type="button"
                          class="btn btn-primary"
                          onClick={deleteCourse}
                          data-bs-dismiss="modal"
                        >
                          確認刪除
                        </button>
                      </div>
                      {message && (
                        <div className="alert alert-warning" role="alert">
                          {message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DeleteCourseComponent;
