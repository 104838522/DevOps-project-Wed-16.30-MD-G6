import ProfileContent from "./Profile-content";
import styles from "./Profile.module.scss";

function Profile(){
    return(
        <div>
            <h1 className={styles.profileh1}>Meet The Team</h1>
            <div className={styles["profile-row"]} id="about">
                <ProfileContent
                    name="Violet Grant" 
                    role="Project Lead"
                    imgsrc={require("../../images/profilepictures/vi.png")}
                />
                <ProfileContent
                    name="Senupama Deshipriya"
                    role="Measurement and Metrics Analyst"
                />
                <ProfileContent
                    name="Daehyeon Kim"
                    role="Jenkins and Deployment Lead"
                />
                <ProfileContent
                    name="Kavindu Bopitiya"
                    role="Docker Specialist"
                />
            </div>
        </div>

    )
}

export default Profile