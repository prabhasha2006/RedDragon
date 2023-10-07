const cheerio = require('cheerio')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const axios = require('axios')

async function fbdl(Link) {
	return new Promise (async (resolve, reject) => {
		const BodyForm = {
			url: Link
		}
		await axios({
			url: "https://www.getfvid.com/downloader",
			method: "POST",
			data:  new URLSearchParams(Object.entries(BodyForm)),
			headers: {
				"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
				"accept-language": "en-US,en;q=0.9,id;q=0.8",
				"cache-control": "max-age=0",
				"content-type": "application/x-www-form-urlencoded",
				"sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\"",
				'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36'
			}
		}).then(respon => {
			const $ = cheerio.load(respon.data)
			let hd = $("body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered > div > div:nth-child(3) > div > div.col-md-4.btns-download > p:nth-child(1) > a").attr('href')
			let Normal = $("body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered").find('div > div:nth-child(3) > div > div.col-md-4.btns-download > p:nth-child(2) > a').attr("href")
			let AU = $("body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered > div > div:nth-child(3) > div > div.col-md-4.btns-download > p:nth-child(3) > a").attr("href")
            let tt = $("body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered > div > div:nth-child(3) > div > div.col-md-5.no-padd > div > h5 > a").text()
			const result = {
				title: tt,
				hd: hd,
				sd: Normal,
				audio: AU
			}
			resolve(result)
		}).catch(reject)
	})
}

module.exports = { fbdl }