import styles from "./Profile.module.scss";

type ProfileProps = {
  name: string;
  role: string;
  imgsrc?: string;
  alt?: string;
};

function ProfileContent({
  name,
  imgsrc = "https://placehold.co/150",
  role,
  alt = `${name}'s profile photo`, 
}: ProfileProps) {
  return (
    <div className={styles.profile}>
      <img src={imgsrc} alt={alt} /> 
      <h2>{name}</h2>
      <h3>{role}</h3>
    </div>
  );
}

export default ProfileContent;
