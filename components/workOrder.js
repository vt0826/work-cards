import react from "react";
import WorkCard from "../components/workCard";

class WorkOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workers: [],
      filteredWorkOrders: null
    };
  }

  // fetch fillted worker data
  async componentDidMount() {
    let workersData = [];

    const fetchWorker = async workerId => {
      let url = API + workerId;
      const res = await fetch(url);
      const data = await res.json();
      const worker = await data.worker;
      this.setState({ workers: [...this.state.workers, worker] });
    };

    const filteredWorkOrders = await filteredWorkerFn(this.props.workOrders);
    filteredWorkOrders.map(work => {
      fetchWorker(work.workerId);
    });

    this.setState({ workersData });
    this.setState({ filteredWorkOrders });
  }

  render() {
    const workers = this.state.workers;
    const filteredWorkOrders = this.state.filteredWorkOrders;
    if (filteredWorkOrders && workers && workers.length === filteredWorkOrders.length) {
      return (
        <>
          <div className="flex-container">
            {this.props.workOrders.map(workOrder => {
              const filteredWorker = filterSearchFn(workers, this.props.search);
              const workerIndex = getWorkerFn(workOrder, filteredWorker);

              if (filteredWorker.length > 0 && workerIndex > -1) {
                return (
                  <div className="flex-item card" key={workOrder.id}>
                    <WorkCard workOrder={workOrder} worker={filteredWorker[workerIndex]} />
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
          <style jsx>{`
            .flex-container {
              padding: 0;
              margin: 0;
              list-style: none;
              display: -webkit-box;
              display: -moz-box;
              display: -ms-flexbox;
              display: -webkit-flex;
              display: flex;
              -webkit-flex-flow: row wrap;
              justify-content: flex-start;
            }
            @media only screen and (max-width: 960px) {
              .flex-container {
                justify-content: center;
              }
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
              margin-left: 80px;
              margin-top: 40px;
              align-items: flex-start;
            }
          `}</style>
        </>
      );
    } else {
      return null;
    }
  }
}
export default WorkOrder;

// filter out the duplicated work id from work order
function filteredWorkerFn(arr) {
  const filteredArr = arr.reduce((acc, current) => {
    const x = acc.find(item => item.workerId === current.workerId);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);
  return filteredArr;
}
// retrive worker index in wokers array with matched woker id from workorder
function getWorkerFn(workOrder, workers) {
  return workers.findIndex(worker => workOrder.workerId === worker.id);
}

// filter out the workers once user type in search bar
function filterSearchFn(workers, search) {
  return workers.filter(worker => {
    return worker.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
  });
}
