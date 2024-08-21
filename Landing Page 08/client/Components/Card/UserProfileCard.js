function UserProfileCard(userProfileImg, username, datePosted, tag){
    this.userProfileImg = userProfileImg
    this.username = username
    this.datePosted = datePosted
    this.tag = tag
}

UserProfileCard.prototype.createProfileElements = function(){
    const profileSection = document.createElement("div")
    profileSection.className ="profile-section"

    const img = document.createElement("img")
    img.src = this.userProfileImg
    img.alt = `${this.username}'s profile picture`;
    img.className = "profile-img"
    profileSection.appendChild(img)

    const usernameElement = document.createElement("span")
    usernameElement.textContent = this.username
    usernameElement.className = "profile-username"
    profileSection.appendChild(usernameElement)

    if (this.tag){
        const tagElement = document.createElement("span")
        tagElement.textContent = this.tag
        tagElement.className ="auth-tag"
        profileSection.appendChild(tagElement)
    }

    const dateElement = document.createElement("span")
    dateElement.textContent = this.datePosted
    dateElement.className ="profile-date-posted"
    profileSection.appendChild(dateElement)


    return profileSection
}

export default UserProfileCard