import { Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App bg">
        <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
    <h1 className="font1 mt-5">Tickety</h1>
    <h3 class="font2 mt-3">Get Your Ticket Now <hr /> What you waiting for?</h3>
    <p class="lead">
      <Link  class="btn btn-lg btn-success fw-bold border-white font-1" to="/signin">Let's go</Link>
    </p>
    </div>

</div>
  );
}

export default App