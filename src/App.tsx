import Footer from "./components/Footer";
import Header from "./components/Header";
import Profile from './components/Profile'

function App() {
  return (
    <div className="App">
      <Header/>
      <div className="profile-row">
        <Profile 
          name="Violet Grant" 
          role="Project Lead"
        />
        <Profile
          name="Senupama Deshipriya"
          role="Measurement and Metrics Analyst"
        />
        <Profile
          name="Daehyeon Kim"
          role="Jenkins and Deployment Lead"
        />
        <Profile
          name="Kavindu Bopitiya"
          role="AWS Specialist"
        />
      </div>
      
      <Footer/>
    </div>
  );
}

export default App;
