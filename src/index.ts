import fs from 'fs';
import { VideoPartsParser } from './parsers/video/VideoPartsParser.js';
import { RequestFactory } from './requests/RequestFactory.js';

import { YouTubeClient } from './YouTubeClient.js';
import got from 'got';
const folder = "StreamUpcoming"
var player = JSON.parse(fs.readFileSync(`reference-data/Video/${folder}/PlayerResponseBody.json`, 'utf8'));
var next = JSON.parse(fs.readFileSync(`reference-data/Video/${folder}/NextResponseBody.json`, 'utf8'));

const factory = new RequestFactory();
const client = YouTubeClient.createClient();

await got.get("https://youtube.com").json()



