// import express from "express";
// import { createReadStream, statSync } from "fs";
// import { dirname } from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// console.log("__dirname", __dirname);
// const app = express();

// app.get("/", (req, res) => {
//     res.send("Hello World");
// });

// app.get("/video", (req, res) => {
//     const filepath = `${__dirname}/public/video.mp4`;
//     const stat = statSync(filepath);
//     const fileSize = stat.size;
    
//     // 1gb -> split into 100mb and then in total 10 parts
//     // range -> 0 to 10mb -> 10mb to 20mb

//     const range = req.headers.range;

//     if(!range) {
//         res.status(400).send("Requires Range header");
//     }

//     const chunkSize = 10**6; // 1mb 1000000
//     const start = Number(range.replace(/\D/g, ""));
//     const end = Math.min(start + chunkSize, fileSize)

//     const contentLength = end - start + 1;

//     const fileStream = createReadStream(filepath, {
//         start,
//         end,
//     });

//     fileStream.pipe(res);

//     const header = {
//         "Content-Range": `bytes ${start}-${end}/${fileSize}`,
//         "Accept-Ranges": "bytes",
//         "Content-Length": contentLength,
//         "Content-Type": "video/mp4",
//     }

//     res.writeHead(206, header)

// });

// app.listen(3000, () => {
//     console.log("Server is running on port 3000");
// });

import express from "express";
import { createReadStream, statSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log("__dirname", __dirname);
const app = express();

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/video", (req, res) => {
    const filepath = `${__dirname}/public/video.mp4`;

    try {
        const stat = statSync(filepath);
        const fileSize = stat.size;

        const range = req.headers.range;

        if (!range) {
            res.status(400).send("Requires Range header");
            return; // Ensure no further processing if the range header is missing
        }

        const chunkSize = 10**6; // 1MB
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + chunkSize - 1, fileSize - 1); // Adjust end to be within file size

        const contentLength = end - start + 1;

        const fileStream = createReadStream(filePath, {
            start,
            end,
        });

        fileStream.pipe(res);

        const header = {
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4",
        };

        res.writeHead(206, header);
        fileStream.pipe(res);

    } catch (error) {
        console.error("Error handling video request:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

