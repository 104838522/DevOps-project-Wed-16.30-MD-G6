import ProfileContent from "./Profile-content";
import styles from "./Profile.module.scss";

function Profile(){
    return(
        <div className={styles.profilecontainer}>
            <h1 className={styles.profileh1}>Meet The Team</h1>
            <div className={styles["profile-row"]} id="about">
                <ProfileContent
                    name="Violet Grant" 
                    role="Project Lead"
                    imgsrc={require("../../images/profilepictures/vi.png")} alt=""
                />
                <ProfileContent
                    name="Senupama Deshipriya"
                    role="Measurement and Metrics Analyst"
                    imgsrc={require("../../images/profilepictures/senu.jpg")} alt=""
                />
                <ProfileContent
                    name="Daehyeon Kim"
                    role="Jenkins and Deployment Lead"
                    imgsrc={require("../../images/profilepictures/kim.jpg")} alt=""
                />
                <ProfileContent
                    name="Kavindu Bopitiya"
                    role="Docker Specialist"
                    imgsrc={require("../../images/profilepictures/kaviya.jpg")} alt=""
                />
            </div>
        </div>

    )
}

export default Profile
