import styles from "./Footer.module.scss"

function Footer(){
    const currentYear: number = new Date().getFullYear();
    return(
        <footer className={styles.footer}>
            <p>&copy;Violet Qi {currentYear}</p>
            <p className={styles.pright}>SDE40006 Project Group Wed-16:30-MD-G6</p>
        </footer>
    )
}

export default Footer