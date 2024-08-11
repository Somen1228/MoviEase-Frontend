import { Col, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import { getAllMovies } from "../../calls/movies";
import { useNavigate } from "react-router-dom";
import moment from "moment";

function Home() {
  const [movies, setMovies] = useState(null);
  const navigate = useNavigate();

  const getData = async () => {
    const response = await getAllMovies();
    if (response.success) {
      setMovies(response.data);
    } else {
      message.error(response.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="mt-[60px] flex flex-wrap gap-[40px] justify-center ">
        {movies &&
          movies.map((movie) => {
            return (
              <div>
                <div className="flex-col">
                  <img
                    className="scale-up h-[400px] w-[250px] transition-transform cursor-pointer rounded-2xl hover:scale-110 duration-300
                    "
                    onClick={() => {
                      navigate(
                        `/movie/${movie._id}?date=${moment().format(
                          "YYYY-MM-DD"
                        )}`
                      );
                    }}
                    src={movie.poster}
                    alt="movie poster"
                  />
                  <h1 className="cursor-pointer move-up duration-300 transition-transform  flex justify-center items-center mt-2 h-[50px] bg-stone-100 backdrop-blur bg-blur rounded-2xl font-bold text-[20px] text-blue-900">
                    {movie.title}
                  </h1>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Home;
