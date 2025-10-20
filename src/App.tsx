import ContentBlock from "./components/ContentBlock/ContentBlock";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HeroBlock from "./components/HeroBlock/HeroBlock";
import Profile from './components/Profile/Profile';

function App() {

  const DevOpsContent = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
  `
  const GitHubContent = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
  `

  const JenkinsContent = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
  `
  const DockerContent = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
  `

  const AWSContent = `
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
          colour="purple"
          id="devops"
        />
        <ContentBlock 
          title="Continuous Integration: GitHub Repository" 
          content={GitHubContent}
          image={require("./images/github-mark-white.png")}
          left={false}
          colour="grey"
        />
        <ContentBlock 
          title="Continuous Delivery: Jenkins" 
          content={JenkinsContent}
          image={require("./images/Jenkins_logo.svg.png")}
          left={true}
          colour="red"
        />
        <ContentBlock 
          title="Test Server: Docker" 
          content={DockerContent}
          image={require("./images/docker-mark-white.png")}
          left={false}
          colour="blue"
        />
        <ContentBlock 
          title="Continuous Delivery: AWS" 
          content={AWSContent}
          image={require("./images/Amazon_Web_Services_Logo.svg.png")}
          left={true}
          colour="orange"
        />
        <Profile/>
      <Footer/>
    </div>
  );
}

export default App;
