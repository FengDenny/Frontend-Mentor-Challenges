import { api } from "../url";

async function fetchALLComments() {
  try {
    const allComments = await api
      .setEndpoint("/user-comments/all-comments")
      .get();

    return allComments;
  } catch (err) {
    console.error("Error:", err);
  }
}

async function getAuthUser() {
  const response = await api.setEndpoint("/auth-user").get();

  if (response.ok) {
    return response.data;
  } else {
    console.warn("User not found or error:", response.error);
    return null;
  }
}

export { fetchALLComments, getAuthUser };
