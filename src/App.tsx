import ContentBlock from "./components/ContentBlock/ContentBlock";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HeroBlock from "./components/HeroBlock/HeroBlock";
import Profile from './components/Profile/Profile';

function App() {

  const DevOpsContent = `
    DevOps (short for Developer Operations) is a new movement and structure of Software Development that assists developers in creating and deploying software solutions. It aims to improve efficiency for software developer teams, as well as assist in deployment speed using automated tools and processes to quickly and efficiently deploy the solution. This website will serve as our demonstration of DevOps in a professional scenario where we have created a toolchain in order to deploy a simple React website.
  `
  const GitHubContent = `
    GitHub is the most widely used Git-based version management platform worldwide, delivering powerful capabilities for collaboration and automation. Continuous Integration describes the process of frequently updating a central codebase that is merged often and can then be reviewed in meetings. This step is imperative for DevOps as it allows fast and agile software development as well as code review to efficiently create a final product. It is important that the codebase is updated frequently to ensure if anything malfunctions, it is easy to rollback commits to a safer version.
  `

  const JenkinsContent = `
    These front-end projects require stable, automated build environments because code changes are frequent and require repeated build and test processes. Jenkins is a CI/Build server, that will allow us to automate the build process as soon as a new commit is made on our Code Repository server, GitHub, shown above. GitHub and Jenkins are able to integrate seamlessly so that a new build is triggered upon a successful merge into the main branch.
  `
  const DockerContent = `
    Docker is a toolset and combination of Platform as a Service (PaaS) tools that allow developers to create headerless containers in order to effectively test their applications. The application our team is trying to develop is a simple React/TypeScript-based web page, but it contains team member introduction and DevOps information, which can lead to frequent UI modifications and content updates in the future. In this situation, the build and test process must be repeated whenever code changes are made, and it is very important to always perform tests in the same environment.
  `

  const AWSContent = `
    AWS (Amazon Web Services) is a platform that allows developers to easily deploy their applications onto EC2 instances, which are effectively virtual machines. The ultimate goal of our project is to distribute React/TypeScript web pages containing team member introductions and DevOps-related information to external users. This objective cannot be achieved simply by running them locally or checking them in a test environment, so we actually need a server that can service the webpages in production. At this point, we chose AWS EC2 (Elastic Compute Cloud) as our production server.
  `

  return (
    <div className="App">
      <Header/>
        <HeroBlock/>
        <ContentBlock 
          title="Live Code Demonstration" 
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
