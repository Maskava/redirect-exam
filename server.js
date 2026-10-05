const express = require("express");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

app.post("/collect", (req, res) => {
    const visitor = {
        date: new Date().toISOString(),
        ip: req.ip,
        userAgent: req.get("user-agent") || null,
        language: req.get("accept-language") || null,
        referer: req.get("referer") || null,
        browserData: req.body
    };

    fs.appendFileSync(
        "visitors.jsonl",
        JSON.stringify(visitor) + "\n"
    );

    res.sendStatus(204);
});

app.get("/redirect", (req, res) => {
    res.redirect(302, "https://www.youtube.com/");
});

app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});