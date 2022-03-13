import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { getFormBody, useFormInputs } from "../utils/index";
function CreateCoupon() {
  const { addToast } = useToasts();
  const name = useFormInputs("");
  const code = useFormInputs("");
  const min_amount = useFormInputs("");
  const start_date = useFormInputs("");
  const end_date = useFormInputs("");
  const type = useFormInputs("");
  const percentage = useFormInputs(0);
  const amount = useFormInputs(0);
  const [loading, setLoading] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    if (
      (name.value === "" ||
        code.value === "" ||
        min_amount.value === "" ||
        end_date.value === "" ||
        type.value === "") &&
      (percentage.value === 0 || amount.value === 0)
    ) {
      return addToast("Plz Fill all the Fields", {
        appearance: "error",
      });
    }

    async function sub() {
      try {
        setLoading(true);
        let URL = "https://create-coupon-backend.herokuapp.com/create";
        let config = {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: getFormBody({
            name: name.value,

            code: code.value,
            min_amount: min_amount.value,
            start_date: start_date.value,
            end_date: end_date.value,
            coupon_type: type.value,
            percentage: percentage.value,
            Amount: amount.value,
          }),
        };
        let response = await fetch(URL, config);
        let result = await response.json();
        console.log(result);
        if (result.message === "success") {
          addToast("Coupon Created Successfully", {
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
  }
  const todayDate = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }
    return yyyy + "-" + mm + "-" + dd;
  };
  return (
    <div id="create-coupon-form">
      <h1>Create Coupon</h1>
      <form>
        <label>
          Coupon Name:
          <input type="text" name="name" {...name} required />
        </label>
        <label>
          coupon code:
          <input type="text" name="code" {...code} required />
        </label>
        <label>
          Minimum purchase:
          <input type="number" name="min_amount" {...min_amount} required />
        </label>
        <label>
          Start date:
          <input
            type="date"
            name="start_date"
            min={todayDate()}
            {...start_date}
          />
        </label>
        <label>
          Expiry date:
          <input
            type="date"
            name="end_date"
            min={todayDate()}
            required
            {...end_date}
          />
        </label>
        <label>
          Type:
          <select
            name="coupon_type"
            value={type.value}
            onChange={type.onChange}
          >
            <option value="" disabled selected>
              Choose your option
            </option>
            <option value="FLAT" label="Flat">
              Flat
            </option>
            <option value="PERCENTAGE" label="percentage">
              Percentage
            </option>
          </select>
        </label>
        <label>
          {type.value === "FLAT" ? "Amount" : "percentage"}:
          {type.value === "FLAT" && <input name="flat" {...amount} required />}
          {type.value !== "FLAT" && (
            <input name="percentage" {...percentage} required />
          )}
        </label>

        <input
          type="submit"
          value="submit"
          onClick={handleSubmit}
          disabled={loading}
        />
      </form>
      <div className="btns">
        <Link to={`/`}>
          <button>Home</button>
        </Link>

        <Link to={`/AllCoupon`}>
          <button id="createCoupon">See All Coupon</button>
        </Link>
      </div>
    </div>
  );
}

export default CreateCoupon;
