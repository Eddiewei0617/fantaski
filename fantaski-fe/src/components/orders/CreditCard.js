import React, { useState, useEffect } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

function CreditCard({ step, progressAnimation }) {
  let storage = localStorage;
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [focus, setFocus] = useState("");

  useEffect(() => {
    if (
      (storage["number"],
      storage["name"],
      storage["expiry"],
      storage["cvc"] === null)
    ) {
      setNumber(storage["number"]);
      setName(storage["name"]);
      setExpiry(storage["expiry"]);
      setCvc(storage["cvc"]);
    }
  }, [step]);

  // if (number.length > 16) {
  //   alert("信用卡號碼最多不能超過16位數哦");
  // }
  return (
    <>
      <div
        className={`
          ${progressAnimation === 2 && "slit-in-vertical"}
          credit_content_bg`}
      >
        <h2>信用卡資訊</h2>
        <div className="credit_content">
          <Cards
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focus}
          />
          <form
            action=""
            className="card_input d-flex flex-column justify-content-center h5 "
          >
            <label htmlFor="">
              卡片號碼
              <input
                type="tel"
                name="number"
                className="card_number"
                placeholder="Card Number"
                value={step ? storage["number"] : number}
                onChange={(e) => {
                  setNumber(e.target.value);
                  storage.setItem("number", e.target.value);
                }}
                onFocus={(e) => setFocus(e.target.name)}
              />
            </label>
            <label htmlFor="">
              持卡人姓名
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={step ? storage["name"] : name}
                onChange={(e) => {
                  setName(e.target.value);
                  storage.setItem("name", e.target.value);
                }}
                onFocus={(e) => {
                  setFocus(e.target.name);
                }}
              />
            </label>
            <label htmlFor="">
              卡片到期日
              <input
                type="text"
                name="expory"
                placeholder="MM/YY Expiry Date"
                value={step ? storage["expiry"] : expiry}
                onChange={(e) => {
                  setExpiry(e.target.value);
                  storage.setItem("expiry", e.target.value);
                }}
                onFocus={(e) => setFocus(e.target.name)}
              />
            </label>
            <label htmlFor="">
              安全碼
              <input
                type="tel"
                name="cvc"
                className="cvc"
                placeholder="CVC"
                value={step ? storage["cvc"] : cvc}
                onChange={(e) => {
                  setCvc(e.target.value);
                  storage.setItem("cvc", e.target.value);
                }}
                onFocus={(e) => setFocus(e.target.name)}
              />
            </label>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreditCard;
