import styles from './Header.module.scss';

function Header() {
    return (
        <header className={styles.header}>
            <nav>
                <ul>
                    <li><a href="/home">Home</a></li>
                    <li><a href="/DevOps">DevOps</a></li>
                    <li><a href="/about">About</a></li>
                    <p>Created with React</p>
                </ul>
            </nav>
        </header>
    );
}

export default Header
