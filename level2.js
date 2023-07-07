import fs from "node:fs/promises";

async function saveJSONComments() {
    debugger;
    let postComments;

    // fetch the first time to get the main object and preparing for mapping
    const request = await fetch(`https://jsonplaceholder.typicode.com/comments`);
    const comments = await request.json();
    
    // start mapping of the whole json to filter the postId and get access to the specific comments
    const promisesArray = comments.map(async (elt) => {
        const postRequest = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${elt.postId}/comments`
        );
        postComments = await postRequest.json();
        console.log(postComments);
        return postComments;
    });

    postComments = await Promise.all(promisesArray);
    // write all filtered comments in the comments.json which was created as a sub-folder from main folder 'data'
    await fs.writeFile(
        "./data/comments.json",
        JSON.stringify(postComments)
    );
}

saveJSONComments();