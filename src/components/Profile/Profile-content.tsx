import styles from "./Profile.module.scss";

function ProfileContent({name, imgsrc = "https://placehold.co/150", role}:{name: string, imgsrc?: string, role: string}){
    return(
        <div className={styles.profile}>
            <img src={imgsrc}></img>
            <h2>{name}</h2>
            <h3>{role}</h3>
        </div>
    );
}

export default ProfileContent