import ContentBlock from "./components/ContentBlock/ContentBlock";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HeroBlock from "./components/HeroBlock/HeroBlock";
import Profile from './components/Profile/Profile';

function App() {
  return (
    <div className="App">
      <Header/>
        <HeroBlock/>
        <ContentBlock 
          title="DevOps" 
          content="sdgjkhsdkjghsdjkghjdsk"
          image={require("./images/devops.png")}
          left={true}
        />
        <Profile/>
      <Footer/>
    </div>
  );
}

export default App;
