import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Coupons() {
  const [coupons, setCoupons] = useState([]);
  useEffect(() => {
    async function sub() {
      try {
        let URL = "https://create-coupon-backend.herokuapp.com/getCoupon";
        let config = {
          method: "GET",
        };
        let response = await fetch(URL, config);
        let result = await response.json();
        console.log(result.All_coupons);
        setCoupons(result.All_coupons);
      } catch (err) {}
    }
    sub();
  }, []);
  return (
    <div id="Coupons">
      <h1>All Coupons </h1>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Min Amount</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Coupon Type</th>
            <th>Amount/Percentage</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon, index) => {
            return (
              <tr key={coupon._id}>
                <td>{coupon.name}</td>
                <td>{coupon.code}</td>
                <td>{coupon.min_amount}</td>
                <td>{coupon.start_date.substring(0, 10)}</td>
                <td>{coupon.end_date.substring(0, 10)}</td>
                <td>{coupon.coupon_type}</td>
                <td>
                  {coupon.coupon_type.toLowerCase() === "flat"
                    ? coupon.Amount
                    : coupon.percentage}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="btns">
        <Link to={`/create`}>
          <button>create Coupon</button>
        </Link>

        <Link to={`/`}>
          <button id="home">Home</button>
        </Link>
      </div>
    </div>
  );
}
export default Coupons;
