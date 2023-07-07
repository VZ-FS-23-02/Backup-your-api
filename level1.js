import fs from "node:fs/promises";

const backup = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const json = await response.json();
        fs.writeFile("./data/posts.json", JSON.stringify(json, null, 2));
    } catch (e) {
        console.log("Something went wrong", e);
    }
};


backup().then((res) => console.log({ res }));
console.log("Skript fertig");