// ESモジュール構文を使用
import puppeteer from 'puppeteer';
import axios from 'axios';

// POSTリクエストを送信する関数
async function postListingToAPI(listing) {

  const postData = {
    title: listing.title,
    link: listing.link,
    imageUrl: listing.imageUrl,
    petSubCategory: listing.petSubCategory,
    petSex: listing.petSex,
    petArea: listing.petArea,
    petLimitDate: listing.petLimitDate
  };

  try {
    console.log(listing);
    const response = await axios.post('http://127.0.0.1:8000/api/dogs_create', listing);
    console.log('Data posted successfully:', response.data);
  } catch (error) {
    if (error.response) {
      console.error('Error posting data:', error.response.data);
    } else {
      console.error('Error posting data:', error.message);
    }
  }
}

(async () => {
  const browser = await puppeteer.launch({
    headless: true, // ヘッドレスモードの有効化
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', // Chromeの実行ファイルへのパスを指定
  });
  const baseUrl = 'https://www.pet-home.jp/dogs/shizuoka/keys_静岡県/page';
  const page = await browser.newPage();

  // 最初のページを開いて総結果数を取得（仮の値、実際にはページから取得する）
  await page.goto(`${baseUrl}1/`, { waitUntil: 'networkidle2' });
  const totalResults = await page.evaluate(() => {
    const resultsText = document.querySelector('.page_count_path').innerText; // 例: '394件中 1〜28件'
    const totalMatch = resultsText.match(/(\d+)件中/);
    return totalMatch ? parseInt(totalMatch[1], 10) : 0;
  });

  // 1ページあたりの結果数（この値はページから取得するか、既知の値を使用する）
  const resultsPerPage = 28;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  let listings = [];

  // for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
  for (let pageNum = 1; pageNum <= 1; pageNum++) {
    const pageUrl = `${baseUrl}${pageNum}/`;
    console.log(`Fetching: ${pageUrl}`);
    await page.goto(pageUrl, { waitUntil: 'networkidle2' });

    const newResults = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.contribute_result')).map(element => {
        // 各要素から情報を抽出する処理
        const titleElement = element.querySelector('.title a');
        const imageElement = element.querySelector('.img_container img'); // 画像要素を取得
        const title = titleElement ? titleElement.innerText.trim() : null;
        const link = titleElement ? titleElement.href : null;
        const imageUrl = imageElement ? imageElement.src : null; // 画像URLの抽出
        const petSubCategory = element.querySelector('.pet_sub_cate') ? element.querySelector('.pet_sub_cate').innerText.trim() : null;
        const petSex = element.querySelector('.pet_sex') ? element.querySelector('.pet_sex').innerText.trim() : null;
        const petArea = element.querySelector('.pet_area') ? element.querySelector('.pet_area').innerText.trim() : null;
        const petLimitDate = element.querySelector('.pet_limit_date') ? element.querySelector('.pet_limit_date').innerText.trim() : null;

        return { title, link, imageUrl, petSubCategory, petSex, petArea, petLimitDate };
      });
    });

    listings = listings.concat(newResults);

    // 10秒待機
    console.log(`Waiting for 10 seconds before fetching the next page...`);
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('スクレイピング完了');
  for (const listing of listings) {
    await postListingToAPI(listing);
    // 必要に応じて間隔を開ける
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  console.log('API実行完了');
  // console.log(listings);

  await browser.close();
})();
