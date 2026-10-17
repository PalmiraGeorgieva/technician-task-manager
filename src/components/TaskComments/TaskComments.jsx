import { useEffect, useState } from "react";
import { API_URL } from "../../config/api";
import { useAuth } from "../../contexts/AuthContext";
import { useTasks } from "../../contexts/TasksContext";
import "./TaskComments.css";
import { Trash2 } from "lucide-react";

function TaskComments({ taskId }) {

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { isAuthenticated, user } = useAuth();
    const [content, setContent] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const { setTasks } = useTasks();


    useEffect(() => {
        const controller = new AbortController();

        async function loadComments() {
            setLoading(true);
            setError("");

            try {
                const response = await fetch(
                    `${API_URL}/api/tasks/${taskId}/comments`,
                    {
                        signal: controller.signal,
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to load comments");
                }

                const data = await response.json();
                setComments(data);

            }catch (error) {
                if(error.name !== "AbortError") {
                    setError(error.message);
                }
            } finally {
                if(!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }
        loadComments();

        return () => controller.abort();
    }, [taskId]);

    async function handleSubmit(e) {
        e.preventDefault();

        if(!content.trim() || submitting) return;

        setSubmitting(true);
        setError("")


        try {
            const response = await fetch(
                `${API_URL}/api/tasks/${taskId}/comments`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        content: content.trim(),

                    }),
                }
            );

            if(!response.ok) {
                throw new Error("Failed to add comments");

            }

            const newComment = await response.json();

            setComments((prev) => [newComment, ...prev]);

            setTasks((currentTasks) => currentTasks.map((task) =>
                Number(task.id) === Number(taskId) ? {
                    ...task,
                    _count: {
                        ...task._count,
                        comments: (task._count?.comments ?? 0) + 1,
                    },
                }
                : task
            ));

            setContent("");
        } catch (error) {
            setError(error.message);
        }finally {
            setSubmitting(false);
        }
    }

    async function handleDelete(commentId) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this comment?"
        );

        if(!confirmed || deletingId !== null) {
            return;
        }

        setDeletingId(commentId);
        setError("");

        try {
            const response = await fetch(
                `${API_URL}/api/tasks/comments/${commentId}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Failed to delete comment");
            }

            setComments((prev) =>
                prev.filter((comment) => comment.id !== commentId)
            );

            setTasks((currentTasks) =>
                currentTasks.map((task) =>
                    Number(task.id) === Number(taskId)
                        ? {
                            ...task,
                            _count: {
                                ...task._count,
                                comments: Math.max(
                                    0,
                                    (task._count?.comments ?? 0) - 1
                                ),
                            },
                        }
                        : task
                )
            );


        } catch (error) {
            setError(error.message);

        }finally {
            setDeletingId(null);
        }


    }

    return (
        <div className="task-comments">
            <h3>Comments</h3>
            {isAuthenticated ? (
                <form onSubmit={handleSubmit}>
                    <textarea value={content}
                      onChange={(event) => setContent(event.target.value)}
                      placeholder="Write a comment..."
                      required
                    />
                    <button type="submit" disabled={submitting || !content.trim()}>
                        {submitting ? "Posting..." : "Post Comment"}
                    </button>
                </form>
            ) : (
                <p>Login to leave a comment.</p>
            )}
            {loading && <p>Loading comments...</p>}

            {error && <p className="error">{error}</p>}

            {!loading && !error && comments.length === 0 && (
                <p>No comments yet.</p>
            )}


            {!loading && comments.map((comment) => (
                <div className="comment" key={comment.id}>
                    <p><b>{comment.author.name}</b>:</p>

                    <p>{comment.content}</p>

                    <small>
                        {new Date(comment.createdAt).toLocaleString("bg-BG")}
                    </small>

                    {isAuthenticated &&
                        user != null &&
                        Number(comment.authorId) === Number(user.id) && (
                            <button
                                type="button"
                                className="delete-comment-btn"
                                onClick={() => handleDelete(comment.id)}
                                disabled={deletingId !== null}
                                aria-label="Delete comment"
                                title="Delete comment"
                            >
                                <Trash2 size={17} strokeWidth={2} />
                            </button>
                        )}
                </div>
            ))}

        </div>

    );

}

export default TaskComments;
