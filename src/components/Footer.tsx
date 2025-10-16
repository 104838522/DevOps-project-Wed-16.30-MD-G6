
function Footer(){
    const currentYear: number = new Date().getFullYear();
    return(
        <footer>
            <p>&copy;Violet Qi {currentYear}</p>
        </footer>
    )
}

export default Footer