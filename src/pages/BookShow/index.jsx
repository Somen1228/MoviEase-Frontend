import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getShowViaId } from "../../calls/shows";
import { Row, Col, Card, Button, message } from "antd";
import moment from "moment";
import "./style.css";
import { bookShow, makePayment } from "../../calls/booking";
import StripeCheckout from "react-stripe-checkout";

function BookShowPage() {
  const params = useParams();
  const [show, setShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const onToken = async (token) => {
    
    const amount = show.ticketPrice * selectedSeats.length;
    const response = await makePayment({token,amount,show, selectedSeats}); 
    
    if(response.success) {
      message.success("Payment Successfull")
      createBooking(response.data)
    } else {
      message.error("Payment Unsuccessfull")
    }
    
  };

  const createBooking = async (transactionId) => {
    const payload = {
      show: show._id,
      seats: [...selectedSeats],
      transactionId: transactionId,
    };
    const response = await bookShow(payload);

    if (response.success) {
      message.success(`Booking Created Successfully`);
      message.success(`Booking details have been sent to your email id`);
      setSelectedSeats(() => []);
      setTimeout(()=> {
        window.location.href = "/";
      }, 5000)
    } else {
      message.error(response.message);
    }
  };

  const getSeats = () => {
    let columns = 20;
    let totalSeats = 120;
    let rows = Math.ceil(totalSeats / columns);
    let allRows = [];

    for (let i = 0; i < rows; i++) {
      allRows.push(i);
    }

    console.log(allRows);

    let allColumns = [];
    for (let i = 0; i < columns; i++) {
      allColumns.push(i);
    }

    console.log(allRows);

    const handleSeatSelect = (seatNumber) => {
      if (show.bookedSeats.includes(seatNumber)) {
        return;
      }

      if (selectedSeats.includes(seatNumber)) {
        const updatedSelectedSeats = selectedSeats.filter((seat) => {
          return seat != seatNumber;
        });

        setSelectedSeats(() => updatedSelectedSeats);
        return;
      }
      setSelectedSeats([...selectedSeats, seatNumber]);
    };

    return (
      <div className="seating">
        <div className="screen">
          <p>Screen this side, you will be watching in this direction</p>
        </div>
        <div className="seating-arrangement">
          {allRows.map((row, index) => {
            return (
              <div>
                {allColumns.map((col) => {
                  let seatNumber = row * columns + col + 1;
                  let seatClass = "seat-btn";

                  //If seat number exceeds totalSeats because of math.ceil
                  if (seatNumber > totalSeats) {
                    return;
                  }
                  if (show.bookedSeats.includes(seatNumber)) {
                    seatClass += " booked";
                  }

                  if (selectedSeats.includes(seatNumber)) {
                    seatClass += " selected";
                  }
                  return (
                    <button
                      onClick={() => handleSeatSelect(seatNumber)}
                      className={seatClass}
                    >
                      {" "}
                      {seatNumber}{" "}
                    </button>
                  );
                })}
                <br />
              </div>
            );
          })}
        </div>
        {selectedSeats.length > 0 ? (
          <>
            <div className="seat-info">
              <div>
                <p style={{ color: "grey", display: "inline" }}>
                  Selected Seats :{" "}
                </p>
                {selectedSeats.map((seat, index) => {
                  return (
                    <span style={{ fontSize: "18px" }}>
                      {index == 0 ? seat : ", " + seat}
                    </span>
                  );
                })}
              </div>
              <div>
                <p style={{ color: "grey", display: "inline" }}>
                  Total Price :
                </p>{" "}
                <p
                  style={{
                    color: "#FF4E4E",
                    display: "inline",
                    fontSize: "18px",
                    fontWeight: "600",
                  }}
                >
                  {"Rs. " + show.ticketPrice * selectedSeats.length + "/-"}
                </p>
              </div>
            </div>
          </>
        ) : (
          <div>
            <h3>Select seats to proceed</h3>
          </div>
        )}
      </div>
    );
  };

  const getData = async () => {
    const response = await getShowViaId(params.id);

    if (response.success) {
      setShow(() => response.data);
    } else {
      message.error("Unable to fetch show details!");
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      {show && (
        <div>
          <Row>
            <Col span={24}>
              <Card
                title={
                  <div>
                    <h1>{show.movie.title}</h1>
                    <p>
                      Theatre : {show.theatre.name}, {show.theatre.address}
                    </p>
                  </div>
                }
                extra={
                  <div className="py-3">
                    <h4>
                      <span style={{ color: "grey" }}>Show Name : </span>
                      <span>{show.name}</span>
                    </h4>
                    <h4>
                      <span style={{ color: "grey" }}>Show time: </span>
                      <span>
                        {moment(show.date).format("Do MMM YYYY")} {show.time}
                      </span>
                    </h4>
                    <h4>
                      <span style={{ color: "grey" }}>Ticket Price : </span>
                      <span>{String(show.ticketPrice + "/-")}</span>
                    </h4>
                    <h4>
                      <span style={{ color: "grey" }}>Total Seats : </span>
                      <span>
                        {show.totalSeats} {"|"}{" "}
                      </span>
                      <span style={{ color: "grey" }}>Available Seats : </span>{" "}
                      <span>{show.totalSeats - show.bookedSeats.length}</span>
                    </h4>
                  </div>
                }
              >
                {getSeats()}

                {selectedSeats.length > 0 && (
                  <div className="stripe-checkout">
                    <StripeCheckout
                      stripeKey="pk_test_51PlbPIRwGirPAie9HtthGBzkM04CxRmvijvqQwe1uzz3MPiMvgP1UBY3m1gFLIb6vJXXFamGbq3mEukxZhpj9nAJ00S2HxaKeW"
                      token={onToken}
                    />
                  </div>
                )}
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default BookShowPage;
