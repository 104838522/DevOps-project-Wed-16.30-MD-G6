
type ContentBlockProps = {
    title: string,
    content: string,
    image: NodeRequire,
    left: boolean
}

function ContentBlock({title, content, image, left}:ContentBlockProps){
    if (left){
        return(
            <div>
                
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