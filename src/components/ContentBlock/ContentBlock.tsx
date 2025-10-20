import styles from "./ContentBlock.module.scss"

type ContentBlockProps = {
    title: string,
    content: string,
    image: string,
    left: boolean,
    colour: string
    id?: string 
}

function ContentBlock({title, content, image, left, colour, id = ""}:ContentBlockProps){
    
    let colourprop;
    let idprop = id;

    switch(colour){
        case "purple": {
            colourprop = styles.purple
            break;
        }
        case "grey": {
            colourprop = styles.grey
            break;
        }
        case "red": {
            colourprop = styles.red;
            break;
        }
        case "blue": {
            colourprop = styles.blue;
            break;
        }
        case "orange": {
            colourprop = styles.orange;
            break;
        }
    }

    if (left){
        return(
            <div className={`${styles.container} ${colourprop}`} id={idprop}>
                <div className={styles.textContainer}>
                    <h1>{title}</h1>
                    <p>{content}</p>
                </div>
                
                <img src={image}/>
            </div>
        );
    } else {
        return(
            <div className={`${styles.container} ${colourprop}`} id={idprop}>
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