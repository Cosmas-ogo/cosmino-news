import apiClient from "./apiClient";

// Universal fetch with retry
const fetchWithRetry = async (fetchFunction, retries = 3, delay = 1000) => {
  try {
    return await fetchFunction();
  } catch (error) {
    if (retries > 0) {
      console.warn(
        `Request failed. Retrying in ${delay}ms... (${retries} retries left)`
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchWithRetry(fetchFunction, retries - 1, delay);
    } else {
      throw error;
    }
  }
};

// Fetch all articles ✅ with backend pagination
export const fetchArticles = async (
  topic,
  sort_by = "created_at",
  order = "desc",
  page = 1,
  limit = 9
) => {
  return fetchWithRetry(async () => {
    let url = "/articles";

    const queryParams = new URLSearchParams();
    if (topic) queryParams.append("topic", topic);
    if (sort_by) queryParams.append("sort_by", sort_by);
    if (order) queryParams.append("order", order);
    if (page) queryParams.append("page", page);
    if (limit) queryParams.append("limit", limit);

    if (queryParams.toString()) {
      url += `?${queryParams.toString()}`;
    }

    const { data } = await apiClient.get(url);
    return {
      articles: data.articles,
      totalCount: data.total_count,
    };
  });
};

// Fetch a single article
export const fetchArticleById = async (article_id) => {
  return fetchWithRetry(async () => {
    const { data } = await apiClient.get(`/articles/${article_id}`);
    return data.article;
  });
};

// Fetch comments for an article
export const fetchCommentsByArticleId = async (article_id) => {
  return fetchWithRetry(async () => {
    const { data } = await apiClient.get(`/articles/${article_id}/comments`);
    return data.comments;
  });
};

// Post a new comment
export const postComment = async (article_id, commentBody, username) => {
  return fetchWithRetry(async () => {
    const { data } = await apiClient.post(`/articles/${article_id}/comments`, {
      username,
      body: commentBody,
    });
    return data.comment;
  });
};

// Vote on an article
export const voteArticle = async (article_id, vote) => {
  return fetchWithRetry(async () => {
    const { data } = await apiClient.patch(`/articles/${article_id}`, {
      inc_votes: vote,
    });
    return data.article;
  });
};

// Delete a comment
export const deleteComment = async (comment_id) => {
  return fetchWithRetry(async () => {
    const { data } = await apiClient.delete(`/comments/${comment_id}`);
    return data;
  });
};

// Fetch users (for login)
export const fetchUsers = async () => {
  return fetchWithRetry(async () => {
    const { data } = await apiClient.get("/users");
    return data.users;
  });
};
