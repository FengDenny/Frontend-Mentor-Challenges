import { api } from "../url";

async function fetchALLComments() {
  try {
    const allComments = await api
      .setEndpoint("/user-comments/all-comments")
      .setHeader("Content-Type", "application/json")
      .get();

    console.log(allComments);
  } catch (err) {
    console.error("Error:", err);
  }
}

fetchALLComments();
