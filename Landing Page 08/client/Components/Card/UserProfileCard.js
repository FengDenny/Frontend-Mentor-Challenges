function UserProfileCard(userProfileImg, username, datePosted, tag, edited) {
  this.userProfileImg = userProfileImg;
  this.username = username;
  this.datePosted = datePosted;
  this.tag = tag;
  this.edited = edited;
}

UserProfileCard.prototype.createProfileElements = function () {
  const profileSection = document.createElement("div");
  profileSection.className = "profile-section";
  profileSection.dataset.username = this.username;

  const img = document.createElement("img");
  img.src = this.userProfileImg;
  img.alt = `${this.username}'s profile picture`;
  img.className = "profile-img";
  profileSection.appendChild(img);

  const usernameElement = document.createElement("span");
  usernameElement.textContent = this.username;
  usernameElement.className = "profile-username";
  profileSection.appendChild(usernameElement);

  if (this.tag) {
    const tagElement = document.createElement("span");
    tagElement.textContent = this.tag;
    tagElement.className = "auth-tag";
    profileSection.appendChild(tagElement);
  }

  if (this.edited) {
    profileSection.dataset.edited = this.edited;
    let editedPostSpan = profileSection.querySelector(".profile-edited-post");
    if (!editedPostSpan) {
      editedPostSpan = document.createElement("span");
      editedPostSpan.className = "profile-edited-post";
      editedPostSpan.textContent = "edited";
      profileSection.appendChild(editedPostSpan);
    }
  }

  const dateElement = document.createElement("span");
  dateElement.textContent = this.datePosted;
  dateElement.className = "profile-date-posted";
  profileSection.appendChild(dateElement);
  return profileSection;
};

export default UserProfileCard;
