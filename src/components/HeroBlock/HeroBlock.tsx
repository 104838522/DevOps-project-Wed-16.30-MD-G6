import styles from "./HeroBlock.module.scss"

function HeroBlock(){

    return(
        <div className={styles.container}>
            <h1>Software Deployment and Evolution</h1>
            <h2>Group Assignment - SDE40006</h2>
            <img src={require('../../images/softdev.jpg')}/>
        </div>
    )
}

export default HeroBlock