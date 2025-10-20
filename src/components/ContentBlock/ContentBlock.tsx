import styles from "./ContentBlock.module.scss"

type ContentBlockProps = {
    title: string,
    content: string,
    image: string,
    left: boolean,
}

function ContentBlock({title, content, image, left}:ContentBlockProps){
    if (left){
        return(
            <div className={`${styles.global} ${styles.leftContainer}`}>
                <div className={styles.textContainer}>
                    <h1>{title}</h1>
                    <p>{content}</p>
                </div>
                
                <img src={image}/>
            </div>
        );
    } else {
        return(
            <div className={`${styles.global} ${styles.rightContainer}`}>
                <img src={image}/>
                <div className={styles.textContainer}>
                    <h1>{title}</h1>
                    <p>{content}</p>
                </div>
            </div>
        );
    }

}

export default ContentBlock;