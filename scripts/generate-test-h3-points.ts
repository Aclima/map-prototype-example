import { parse } from "csv-parse";
import { transform } from 'stream-transform';
import fs from "fs";
import h3 from "h3-js";

// HOW TO: run this with npx tsx ./scripts/generate-test-h3-points.ts
const pm25PointsSampled = {};
const blackCarbonPointsSampled = {};

const __dirname = new URL(".", import.meta.url).pathname;

const transformer = transform((row) => {
    const [timestamp,modality,value,,lat,lon,qualityFlag] = row;
    if (timestamp === "timestamp") {
        // we're in the header row
        return;
    }
    let h3Id;
    try {
        h3Id = h3.latLngToCell(lat, lon, 10)
    } catch (e) {
        console.error("Error converting lat/lon to h3Id", lat, lon);
        return;
    }
    if (modality === "pm_2.5") {
        if (pm25PointsSampled[h3Id] === undefined) {
            pm25PointsSampled[h3Id] = [];
        }
        // let's try to keep the output smallish, only sample first 5 points we find for each h3Id
        if (pm25PointsSampled[h3Id]?.length < 5) {
            pm25PointsSampled[h3Id].push({timestamp, value});
        }
    } else if (modality === "blackcarbon") {
        if (blackCarbonPointsSampled[h3Id] === undefined) {
            blackCarbonPointsSampled[h3Id] = [];
        }
        // let's try to keep the output smallish, only sample first 5 points we find for each h3Id
        if (blackCarbonPointsSampled[h3Id]?.length < 5) {
            blackCarbonPointsSampled[h3Id].push({timestamp, value});
        }
    }
});

fs.createReadStream(__dirname + "/../data/pm_2.5.csv").pipe(parse({ delimiter: "," })).pipe(transformer);
transformer.on("finish", () => {
    fs.writeFile(__dirname + "/../data/pm_2.5_sampled.json", JSON.stringify(pm25PointsSampled), (err) => {
        if (err) {
            console.error("Error writing pm2.5 file", err);
        } else {
            console.log("pm2.5 File written successfully");
        }
    });
});

fs.createReadStream(__dirname + "/../data/blackcarbon.csv").pipe(parse({ delimiter: "," })).pipe(transformer);
transformer.on("finish", () => {
    fs.writeFile(__dirname + "/../data/blackcarbon_sampled.json", JSON.stringify(blackCarbonPointsSampled), (err) => {
        if (err) {
            console.error("Error writing black carbon file", err);
        } else {
            console.log("Black Carbon File written successfully");
        }
    });
});