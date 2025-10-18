
function Profile({name, imgsrc = "https://placehold.co/150", role}:{name: string, imgsrc?: string, role: string}){
    return(
        <div className="profile">
            <img src={imgsrc} alt="Profile photo"></img>
            <h2>{name}</h2>
            <h3>{role}</h3>
        </div>
    );
}

export default Profile
