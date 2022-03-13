import { getFormBody, useFormInputs } from "../utils/index";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToasts } from "react-toast-notifications";
function Home() {
  const total = useFormInputs(0);
  const { addToast } = useToasts();
  const code = useFormInputs("");
  const [loading, setLoading] = useState(false);
  const [succ, setSucc] = useState(false);
  const [discount, setDiscount] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    async function sub() {
      try {
        setLoading(true);
        let URL = "https://create-coupon-backend.herokuapp.com/validate";
        let config = {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: getFormBody({
            total: total.value,
            code: code.value,
          }),
        };
        let response = await fetch(URL, config);
        let result = await response.json();
        console.log(result);
        if (result.message === "success") {
          setSucc(true);
          setDiscount(result.Amount);
          addToast(result.message, {
            appearance: "success",
          });
        } else {
          addToast(result.message, {
            appearance: "error",
          });
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    sub();
  };
  return (
    <div>
      <form id="validate-form">
        <label for="total">
          Total Cart value:
          <input name="total" {...total} />
        </label>
        <label for="code">
          Coupon code:
          <input name="code" {...code} />
        </label>
        <input
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          value={loading ? "Submitting..." : "Check if coupon is Valid"}
        />
      </form>
      {succ && (
        <h1> Congratulations!! u have avail a discount of {discount}Ruppes </h1>
      )}
      <div className="btns">
        <Link to={`/create`}>
          <button>create Coupon</button>
        </Link>

        <Link to={`/AllCoupon`}>
          <button id="createCoupon">See All Coupon</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
