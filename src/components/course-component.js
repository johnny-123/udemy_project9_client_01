import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import courseService from "../services/course.service";

const CourseComponent = ({
  currentUser,
  setCurrentUser,
  currentCourse,
  setCurrentCourse,
}) => {
  const navigation = useNavigate();
  const handleBackToLogin = () => {
    navigation("/login");
  };

  const [courseData, setCourseData] = useState(null);
  const [ModifyFlag, setModifyFlag] = useState(false);

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

  const handleModifyFlag = () => {
    console.log("請選擇要修改的課程");
    if (ModifyFlag) {
      setModifyFlag(false);
    } else {
      setModifyFlag(true);
    }
  };
  const modifyCourse = (course) => {
    setCurrentCourse(course);
    navigation("/ModifyCourse");
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
      {currentUser && currentUser.user.role == "instructor" && (
        <div>
          {!ModifyFlag && <h1>歡迎來到講師的課程頁面</h1>}
          {!ModifyFlag && (
            <button
              className="btn btn-primary btn-lg"
              onClick={handleModifyFlag}
            >
              修改課程內容
            </button>
          )}
          {ModifyFlag && <h1>修改課程頁面，點選要修改的課程內容</h1>}
          {ModifyFlag && (
            <button className="btn btn-light btn-lg" onClick={handleModifyFlag}>
              返回
            </button>
          )}
        </div>
      )}
      {currentUser && currentUser.user.role == "student" && (
        <div>
          <h1>歡迎來到學生的課程頁面</h1>
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
                    <p style={{ margin: "0.5rem 0rem" }}>
                      學生人數:{course.students.length}
                    </p>
                    <p style={{ margin: "0.5rem 0rem" }}>
                      課程價格:{course.price}
                    </p>
                    {ModifyFlag && (
                      <button
                        style={{ display: "block" }}
                        className="btn btn-secondary btn-lg mx-auto"
                        onClick={() => {
                          modifyCourse({ course });
                        }}
                      >
                        修改該課程資訊
                      </button>
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CourseComponent;
