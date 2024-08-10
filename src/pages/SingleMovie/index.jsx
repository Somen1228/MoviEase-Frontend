import { message, Input, Row, Col, Button } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getMovie } from '../../calls/movies';
import moment from 'moment';
import { getAllTheatesByMovie} from '../../calls/shows';

function SingleMovie() {
  
  const [movie, setMovie] = useState(null);
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [theatres, setTheatres] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  const handleDate = (e) => {
    setDate(e.target.value);
    navigate(`/movie/${movie._id}?date=${moment(e.target.value).format("YYYY-MM-DD")}`)
  }

  const getMovieDeatils = async () => {
    const response = await getMovie(params.id);

    if (response.success) {
      setMovie(() => ({ ...response.data }))
    } else {
      message.error(response.message)
    }
  }

  const getAllTheatres = async () => {
    const response = await getAllTheatesByMovie(params.id, date);
    console.log(response);
    
    if (response.success) {
      setTheatres(() => response.data)      
    } else {
      message.error(response.data.message)
    }
  }

  useEffect(() => {
    getMovieDeatils();
  }, [])

  useEffect(() => {
    getAllTheatres();
  }, [date])

  return (
    <>
      <div className="inner-container">
        {
          movie && (

            <div className="d-flex">

              <div className="me-0" >
                <img src={movie.poster} width={200} />
              </div>

              <div>
                <h1 className="mt-0"> {movie.title} </h1>

                <p className="movie-data">
                  Language : <span> {movie.language} </span>
                </p>

                <p className="movie-data">
                  Genre : <span> {movie.genre} </span>
                </p>


                <p className="movie-data">
                  Release Date : <span> {moment(movie.releaseDate).format("MMM Do YYYY")} </span>
                </p>


                <p className="movie-data">
                  Duration: <span> {movie.duration} </span>
                </p>

                <hr />

                <div>
                  <label> Choose the date : </label>
                  <Input
                    type="date"
                    placeholder="default"
                    value={date}
                    onChange={handleDate}
                  />
                </div>

              </div>
            </div>
          )}

        <h2 className="mt-3 pt-3"> Theatres </h2>

        {
          theatres && theatres.length === 0 && (
            <div className="pt-3">
              <h2 className="blue-clr">
                Currently, no theatres available for this movie
              </h2>
            </div>
          )
        }
        
        {
          theatres && theatres.length > 0 && (
          <div>
            {
              theatres.map((show) => {                                
                return (
                  <div>
                    <Row>
                      <Col lg={{ span: 5 }} >
                        <h3> {show.theatre.name} </h3>
                        <p> {show.theatre.address} </p>
                      </Col>
                      <Col style={{paddingTop:"20px"}} lg={{ span: 19 }}>
                        <Button
                          onClick={() => navigate(`/book-show/${show._id}`)}
                          className="p-5 m-5">
                          <h5> {show.time} </h5>
                        </Button>
                      </Col>
                    </Row>
                  </div>
                )
              })
            }
          </div>
          )
        }
      </div>
    </>
  )
}

export default SingleMovie