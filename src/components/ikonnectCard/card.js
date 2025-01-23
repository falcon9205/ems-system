import React from "react";
import "./card.css";
import Link from "next/link";
const card = (data) => {
  return (
    <>
      <div className="card">
        <div>
          <h1 className="font-bold text-4xl text-white  text-center">
            iKonnect
          </h1>
          <p className="p-5 text-md font-semibold text-center">
            Find the right job-Anytime , Anywhere 1000+ vacancies every day
          </p>
        </div>

        <div className="card__content">
          <p className="card__title">{data.title1}</p>
          <p className="card__description font-bold">{data.description1}</p>
          <Link href={data.link} target="_blank">
            <button className="bg-black rounded-lg px-2 my-2 text-white">
              Get it
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default card;
