import logo from './images/hex-crawler-icon.png';
import './App.css';
import TileExplorer from './components/TileExplorer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className='App-title'>Hex Crawler</p>
      </header>
      <div className='App-body'>
        <TileExplorer />
      </div>
    </div>
  );
}

export default App;
