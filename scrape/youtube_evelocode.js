const ytdl = require('ytdl-core');
const yts = require('secktor-pack');
const fs = require('fs')
//-----EVELOCODE-----
const song = async(text) => {
    let textYt;        
    if (text.startsWith("https://youtube.com/shorts/")) {
        const svid = text.replace("https://youtube.com/shorts/", "https://youtube.com/v=");
        const s2vid = svid.split("?feature")[0];
        textYt = s2vid;
    } else {
        textYt = text;
    }
    let search = await yts(textYt)
    let anu = search.videos[0]
    const getRandom = (ext) => {
        return `${(text)+Math.floor(Math.random() * 10000)}${ext}`;
    };
    let infoYt = await ytdl.getInfo(anu.url);
    if (infoYt.videoDetails.lengthSeconds >= 1300) return `big`
    let titleYt = infoYt.videoDetails.title;
    let randomName = getRandom(".mp3")
    const stream = ytdl(anu.url, {
            filter: (info) => info.audioBitrate == 160 || info.audioBitrate == 128,
        })
        .pipe(fs.createWriteStream(`./${randomName}`));
    await new Promise((resolve, reject) => {
        stream.on("error", reject);
        stream.on("finish", resolve);
    });

    let stats = fs.statSync(`./${randomName}`);
    let fileSizeInBytes = stats.size;
    let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
    if (fileSizeInMegabytes <= 500) {
        let retrnObj = {
            title: anu.title,
            duration: anu.timestamp,
            views: anu.views,
            uploaded: anu.ago,
            author: anu.author.name,
            url: anu.url,
            audio: fs.readFileSync(`./${randomName}`),
            filename: titleYt + ".mp3"
        }
        return retrnObj
    }
}
const video = async(text) => {
    const getRandom = (ext) => {
        return `Video_evelocode_${Math.floor(Math.random() * 10000)}${ext}`;
    }
    try {
        let urlYt = text;
        let infoYt = await ytdl.getInfo(urlYt)
        if(infoYt.videoDetails.lengthSeconds >= 1300) return `big`
        let titleYt = infoYt.videoDetails.title
        let randomName = getRandom(".mp4")
        const stream = ytdl(urlYt, {
                filter: (info) => info.itag == 22 || info.itag == 18,
            })
            .pipe(fs.createWriteStream(`./${randomName}`));
        await new Promise((resolve, reject) => {
            stream.on("error", reject);
            stream.on("finish", resolve);
        })
        let stats = fs.statSync(`./${randomName}`);
        let fileSizeInBytes = stats.size;
        let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
        if (fileSizeInMegabytes <= 500) {
            let yts = require("secktor-pack");
            let search = await yts(text);
            let retrnObj = {
                video: fs.readFileSync(`./${randomName}`),
                filename: titleYt + ".mp4"
            }
            return retrnObj
        } else {
            console.log('File size more than 500mb.');
        }
        return fs.unlinkSync(`./${randomName}`);      
    } catch (e) {
        console.log(e)
    }
}
module.exports = {
  song,
  video,
  copyright:"Kumuthu Prabhasha"
}