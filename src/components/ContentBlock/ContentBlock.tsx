import styles from "./ContentBlock.module.scss"

type ContentBlockProps = {
    title: string,
    content: string,
    image: string,
    left: boolean
}

function ContentBlock({title, content, image, left}:ContentBlockProps){
    if (left){
        return(
            <div className={styles.leftContainer}>
                <h1>{title}</h1>
                <p>{content}</p>
                <img src={image}/>
            </div>
        );
    } else {
        return(
            <div>

            </div>
        );
    }

}

export default ContentBlock;