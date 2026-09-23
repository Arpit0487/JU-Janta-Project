import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {

  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="home">

        <section className="hero">

          <h1>
            Connect With JECRC Seniors
          </h1>

          <p>
            Get guidance for DSA, Development,
            Placements and Internships from
            experienced seniors.
          </p>

          <button
            onClick={() => navigate("/mentors")}
          >
            Find Seniors
          </button>

        </section>

        <section className="how-it-works">

          <h2>How It Works</h2>

          <div className="cards">

            <div className="card">
              <h3>Find Seniors</h3>
              <p>
                Browse seniors and view their
                achievements.
              </p>
            </div>

            <div className="card">
              <h3>Ask Questions</h3>
              <p>
                Send doubts directly to mentors.
              </p>
            </div>

            <div className="card">
              <h3>Get Guidance</h3>
              <p>
                Receive personalized help.
              </p>
            </div>

          </div>

        </section>

        <section className="why">

          <h2>Why JU Janta?</h2>

          <div className="cards">

            <div className="card">
              <h3>Verified Seniors</h3>
            </div>

            <div className="card">
              <h3>One-to-One Discussions</h3>
            </div>

            <div className="card">
              <h3>Placement Guidance</h3>
            </div>

          </div>

        </section>

      </div>
      <Footer />
    </>
  );
}

export default Home;