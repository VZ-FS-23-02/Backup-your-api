import fs from "node:fs/promises";

const backup = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const posts = await response.json();

        const arrayOfCommentRequests = posts.map((post) => {
            const id = post.id;
            return fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments
`).then((res) => res.json());
        });

        const comments = await Promise.all(arrayOfCommentRequests);
        const postsWithComments = posts.map((post, index) => {
            post.comments = comments[index] || [];
            return post;
        });

        fs.writeFile(
            "./data/postsWithComments.json",
            JSON.stringify(postsWithComments, null, 2)
        );
    } catch (e) {
        console.log("Something went wrong", e);
    }
};

backup();