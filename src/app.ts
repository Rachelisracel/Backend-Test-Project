import express from "express";
import router from "./routes";

const app = express();

app.use(express.json());

app.use(router);

app.use((req, res) => {
    res.status(404).json({
        error: {
            code: "NOT_FOUND",
            message: "Route not found"
        }
    });
});

app.listen(3000, () => {
    console.log(
        "Server running at http://localhost:3000"
    );
});