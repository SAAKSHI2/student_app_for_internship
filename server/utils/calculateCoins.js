
export const calculateCoins = ({profile, education, projects, experiences })=>{

    let educationCoins  = 0;


    education && education.forEach((ele) =>
    educationCoins+=(ele.type?5:0) + (ele.startDate? 2:0)+ (ele.endDate? 2:0) + (ele.name?5:0)
    )

    let projectsCoins = 0;
    
    projects && projects.forEach((ele)=>{
        projectsCoins+=(ele.name?5:0) + (ele.description? 6:0)+ (ele.solo? 4:0) + (ele.link?10:0)
    })

    let experiencesCoins = 0;
    experiences && experiences.forEach((ele)=>{
        experiencesCoins+=(ele.type?5:0) + (ele.companyName? 10:0)+ (ele.companyWebsite? 10:0) + (ele.role?8:0)+ (ele.startDate? 2:0)+ (ele.endDate? 2:0) + (ele.cover?20:0)
    })


    

    
    let coinsEarned =
    profile?
    1 * (profile.name ? 1 : 0) +
    15 * (profile.mobile ? 1 : 0) +
    5 * (profile.profilePic ? 1 : 0) +
    3 * (profile.linkedinLink ? 1 : 0) +
    5 * (profile.githubLink ? 1 : 0) +
    20 * (profile.resume ? 1 : 0):0;

    coinsEarned = coinsEarned+experiencesCoins+projectsCoins+educationCoins;


    return coinsEarned;

}