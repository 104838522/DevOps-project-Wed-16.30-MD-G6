import styles from './Header.module.scss';

function Header() {
    return (
        <header className={styles.header}>
            <h1>Software Deployment and Evolution</h1>
            <nav>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">DevOps</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header