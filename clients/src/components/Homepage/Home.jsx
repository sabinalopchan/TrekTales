import React, { useState } from "react";
import "./Home.css";
import image from "../../assets/test.jpg";
import { categoryCount, getAllBlogs, getBlogById } from "../../apis/Blogs";
import { usersCount, blogsCount, getUserById } from "../../apis/users";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
} from "react-icons/ti";
import { AiOutlineInstagram } from "react-icons/ai";
import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../../contextProvider/Context";
import { useNavigate } from "react-router-dom";
import loadingAnimation from "../../assets/loading.gif";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
const url = "http://localhost:8000";
export const user = [];
function Blog(props) {
  const [blog1, setBlog1] = useState("");
  const [blog2, setBlog2] = useState("");
  const farhanBlog1 = async () => {
    const res = await getBlogById("666f954cc511a525efddba86");
    setBlog1(res.data.message);
  };
  const farhanBlog2 = async () => {
    const res = await getBlogById("666f9968f436d06cd8fffa2e");
    setBlog2(res.data.message);
  };

  useState(() => {
    farhanBlog1();
    farhanBlog2();
  }, []);
  return <></>;
}
function ShortBlogs(props) {
  const [blogs, setBlogs] = useState([]);

  const getBlogs = async () => {
    const res = await getAllBlogs();
    setBlogs(res.data);
  };
  useEffect(() => {
    getBlogs();
  }, []);
  return (
    <>
      {blogs?.map((e, index) => {
        return (
          <>
            <a href={`/blog/${e._id}`}>
              <div className="short-blog mb-5">
                <a href={`/tag/${e.category}`}>
                  <span className="category">{e.category}</span>
                </a>
                <h3 className="right-blog-title short-blog-title mt-3">
                  {e.title}
                </h3>
                <div className="minor-info pt-2 mb-0">
                  <img className="author-image" src={e.authorImage} alt="" />
                  &nbsp;
                  <div className="icons-flex">
                    | &nbsp;
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 small-icons"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                      />
                    </svg>
                    &nbsp;
                    <p className="publishdate">{e.publishDate}</p>
                  </div>
                  &nbsp;
                  <div className="icons-flex">
                    | &nbsp;
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 small-icons"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    &nbsp;
                    <p className="publishdate"> {e.readtime} </p>
                  </div>
                </div>
                <div
                  className="intro right-intro"
                  dangerouslySetInnerHTML={{
                    __html: e.description.slice(0, 130),
                  }}
                ></div>
              </div>
            </a>
          </>
        );
      })}
    </>
  );
}

function Home() {
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { loginData, setLoginData } = useContext(LoginContext);
  const pageRoute = useNavigate();
  const [totalUsers, setTotalUsers] = useState("");
  const [totalBlogs, setTotalBlogs] = useState("");
  const userCount = async () => {
    let res = await usersCount();
    setTotalUsers(res.data.count);
  };
  const blogCount = async () => {
    let res = await blogsCount();
    setTotalBlogs(res.data.count);
  };
  let i = 0;
  const getBlogs = async () => {
    setLoading(true);
    const res = await getAllBlogs();
    setAllBlogs(res.data);
    setLoading(false);
  };
  const homeValid = async () => {
    let token = localStorage.getItem("JWTFINALTOKEN");
    setLoading(true);
    const res = await axios.get(`${url}/validuser`, {
      headers: { Authorization: token },
    });

    if (res.data.status === 401 || !res.data.status) {
      pageRoute("/login");
    } else {
      pageRoute("/");
      setLoginData(res.data.userValid);
      user.push(res.data.user);
    }
  };
  useEffect(() => {
    homeValid();
    getBlogs();
    userCount();
    blogCount();
  }, []);
  return (
    <>
      <Navbar />

      <div
        style={{ display: loading ? "block" : "none" }}
        className="loading-animation"
      >
        <div className="loading-div">
          <img
            style={{ width: "200px", height: "200px" }}
            src={loadingAnimation}
            alt=""
          />
        </div>
      </div>
      <div className="banner"></div>

      <div
        style={{ display: loading ? "none" : "" }}
        className="container-fluid homepage"
      >
        <section className="left-section">
          <div className="blog">
            <h3 className="featured">
              <span className="backgroundColor">&nbsp;Recently </span>
              &nbsp;Posted
            </h3>
            <div className="featured-blogs">
              {allBlogs.map((e, index) => {
                return (
                  <a href={`/blog/${e._id}`}>
                    <div key={e._id} className="blog-card">
                      <a href={`/tag/${e.category}`}>
                        <span className="category">{e.category}</span>
                      </a>
                      <h3 className="right-blog-title mt-2">{e.title}</h3>
                      <img
                        onClick={() => pageRoute(`/${e._id}`)}
                        className="recent-blog-img"
                        src={e.image}
                        alt=""
                      />{" "}
                      <div className="blogInfo">
                        <a
                          style={{ textDecoration: "none" }}
                          href={`/profile/${e.authorid}`}
                        >
                          <div className="minor-info">
                            <img
                              className="author-image"
                              src={e.authorImage}
                              alt=""
                            />
                            <span className="publishdate">
                              &nbsp;&nbsp;{e.authorName}
                            </span>
                            &nbsp;
                            <div className="icons-flex">
                              {" "}
                              &nbsp;
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6 small-icons"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                                />
                              </svg>
                              &nbsp;
                              <p className="publishdate">{e.publishDate}</p>
                            </div>
                            &nbsp;
                            <div className="icons-flex">
                              {" "}
                              &nbsp;
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6 small-icons"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              &nbsp;
                              <p className="publishdate">{e.readtime}</p>
                            </div>
                          </div>
                        </a>
                        <div
                          className="intro right-intro recent-blogs-intro"
                          dangerouslySetInnerHTML={{
                            __html: e.description.slice(0, 150) + "...",
                          }}
                        ></div>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
        <section className="right-section">
          <div className="right-blog">
            <h3 className="featured">
              <span className="backgroundColor">&nbsp;Popular </span>
              &nbsp;Posted
            </h3>
            <div className="scroll">
              <ShortBlogs />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Home;
