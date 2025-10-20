import styles from "./HeroBlock.module.scss"

function HeroBlock(){

    return(
        <div className={styles.container}>
            <h1>Software Deployment and Evolution</h1>
            <img src={require('../../images/softdev.jpg')}/>
        </div>
    )
}

export default HeroBlock