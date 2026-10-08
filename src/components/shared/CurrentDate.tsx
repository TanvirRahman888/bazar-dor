"use client";

import { useEffect, useState } from "react";

const CurrentDate = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    const formattedDate = new Intl.DateTimeFormat("bn-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());

    setDate(formattedDate);
  }, []);

  if (!date) {
    return (
      <span className="inline-block h-6 w-40 animate-pulse rounded-full bg-emerald-100" />
    );
  }

  return <>{date}</>;
};

export default CurrentDate;