import CreateEvent from "../components/CreateEvent";
import Events from "../components/Events";
import "./Dashboard.css";

function Dashboard() {
  return (
    <>
      <div className="dashboard__main-container flex flex-col">
        <div className="dashboard__heading-container flex">
          <div className="dashboard__heading-text flex flex-col">
            <h1 className="dashboard__main-heading">Event Management</h1>
            <h3 className="dashboard__subheading">
              Create and manage events across multiple timezones
            </h3>
          </div>
          <div className="dashboard__heading-action">input here</div>
        </div>
        <section className="dashboard__main-section flex">
          <CreateEvent />
          <Events />
        </section>
      </div>
    </>
  );
}

export default Dashboard;
