import styles from "./ContentBlock.module.scss"

type ContentBlockProps = {
    title: string,
    content: string,
    image: string,
    left: boolean,
    colour: string
}

function ContentBlock({title, content, image, left, colour}:ContentBlockProps){
    
    let colourprop;

    switch(colour){
        case "blue": {
            colourprop = styles.blue
            break;
        }
    }
    
    if (left){


        return(
            <div className={`${styles.global} ${styles.leftContainer} ${colourprop}`}>
                <div className={styles.textContainer}>
                    <h1>{title}</h1>
                    <p>{content}</p>
                </div>
                
                <img src={image}/>
            </div>
        );
    } else {
        return(
            <div className={`${styles.global} ${styles.rightContainer} ${colourprop}`}>
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