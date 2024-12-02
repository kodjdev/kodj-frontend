import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import useEvents from "../../hooks/useEvent"; 

export default function PastEvents() {
  const { data } = useEvents("past"); 
  const { events, loading } = data;

  return (
    <div>
      <div style={{ padding: "10px" }}>
        <div>This is my Past Events Page </div>
        <Button>
          <Link to="/login">Login</Link>
        </Button>
        <div>
          {loading ? (
            <p>Loading events...</p>
          ) : (
            <ul>
              {events.map((event, index) => (
                <li key={index}>{event.name}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}