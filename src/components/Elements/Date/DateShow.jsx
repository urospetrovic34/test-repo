import React from "react";

export const DateShow = (props) => {
  const newDate = new Date(props.date);
  console.log(newDate);
  function getOrdinal(n) {
    return (
      n +
      (n > 0
        ? ["th", "st", "nd", "rd"][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
        : "")
    );
  }

  const ordinalDate = getOrdinal(
    newDate.toLocaleString("default", { day: "numeric" })
  );
  return (
    <span>
      <p>
        {newDate.toLocaleString("default", { month: "short" })}{" "}
        {ordinalDate}, {newDate.getFullYear()}
      </p>
    </span>
  );
};
