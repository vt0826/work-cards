import React, { useState, useEffect } from "react";
import Fetch from "isomorphic-unfetch";
import Head from "next/head";
import Switch from "../components/toggleSwitch";
import WorkOrder from "../components/workOrder";

// return the smallest number first
function compareEarliestFn(a, b) {
  const workA = a.deadline;
  const workB = b.deadline;

  let comparison = 0;
  if (workA > workB) {
    comparison = 1;
  } else if (workA < workB) {
    comparison = -1;
  }
  return comparison;
}

// return the largestest number first
function compareLastestFn(a, b) {
  const workA = a.deadline;
  const workB = b.deadline;

  let comparison = 0;
  if (workA < workB) {
    comparison = 1;
  } else if (workA > workB) {
    comparison = -1;
  }
  return comparison;
}

function Home(props) {
  const [lastest, setLastest] = useState(true);
  const [search, setSearch] = useState("");
  const [workOrders, setWorkOrders] = useState(props.orders);

  // sort each work order based on user's selction of lastest first / earliest first
  useEffect(() => {
    console.log(props.orders);
    if (!lastest) {
      let earliestFirst = workOrders;
      earliestFirst.sort(compareLastestFn);
      setWorkOrders(earliestFirst);
    } else {
      let lastestFirst = workOrders;
      lastestFirst.sort(compareEarliestFn);
      setWorkOrders(lastestFirst);
    }
  }, [lastest]);

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>

      <div className="container">
        <div className="search-form">
          <input
            className="search-form_input"
            id="name-input"
            placeholder="Filter by worker name..."
            value={search}
            onChange={e => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <div className="flex-container selector">
          <h2 className="deadline-option-text">Earliest first</h2>
          <Switch isOn={lastest} handleToggle={() => setLastest(!lastest)} />
          <h2 className="deadline-option-text">Lastest first</h2>
        </div>

        <WorkOrder workOrders={workOrders} search={search} />
      </div>

      <style jsx>{`
        .container {
          margin-right: auto;
          margin-left: auto;
          max-width: 1080px;
          width: 80%;
          padding-right: 10px;
          padding-left: 10px;
        }
        .title {
          margin: 0;
          width: 100%;
          padding-top: 80px;
          line-height: 1.15;
          font-size: 48px;
        }
        .title,
        .description {
          text-align: center;
        }
        .flex-container {
          width: 100%;
          padding: 0;
          margin: 0;
          list-style: none;
          display: -webkit-box;
          display: -moz-box;
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
          -webkit-flex-flow: row wrap;
          justify-content: center;
        }
        .flex-item {
          background-color: #dcdcdc;
          padding: 5px;
          flex: 0 0 40%;

          margin-top: 10px;
          text-align: center;
          border: 1px solid black;
        }
        .flex-container.selector {
          margin-top: 40px;
          align-items: center;
        }
        .flex-item.card {
          margin: 20px 20px;
          align-items: center;
        }
        .search-form {
          margin-top: 40px;
        }
        .search-form_input {
          width: 100%;
          height: 40px;
          border-radius: 15px;
          border: 1px solid black;
          font-weight: 200;
          font-size: 30px;
          padding: 20px;
        }
        input:focus {
          outline: none;
        }
        .deadline-option-text {
          font-weight: 300;
          color: gray;
          padding: 0px 20px;
        }
      `}</style>
    </div>
  );
}

// api call GET work orde data
Home.getInitialProps = async ({ req }) => {
  const res = await fetch(API);
  const json = await res.json();
  return json;
};
export default Home;
