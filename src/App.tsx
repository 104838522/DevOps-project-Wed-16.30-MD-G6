import ContentBlock from "./components/ContentBlock/ContentBlock";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HeroBlock from "./components/HeroBlock/HeroBlock";
import Profile from './components/Profile/Profile';

function App() {

  const DevOpsContent = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
  `

  return (
    <div className="App">
      <Header/>
        <HeroBlock/>
        <ContentBlock 
          title="What Is DevOps?" 
          content={DevOpsContent}
          image={require("./images/devops.png")}
          left={true}
        />
        <ContentBlock 
          title="What Is DevOps?" 
          content={DevOpsContent}
          image={require("./images/devops.png")}
          left={false}
        />
        <Profile/>
      <Footer/>
    </div>
  );
}

export default App;
