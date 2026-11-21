/*
 * 作品資料。要新增作品時，在對應的 world 陣列最後加一筆即可。
 *
 * 欄位說明：
 *   id      圖片資料夾名稱 (img/portfolio/<id>/)
 *   title   作品名稱
 *   thumb   縮圖檔名
 *   fit     縮圖顯示方式：'cover' 滿版 / 'contain' 完整顯示（適合 App Icon）
 *   thumbBg 縮圖底色（contain 時使用，可省略）
 *   shots   作品截圖檔名陣列
 *   type / year / source  作品類型、年份、來源
 *   tech    使用技術
 *   sections  內文段落 [{ h: 標題, html: 內容 }]
 *   jobs    我負責的項目
 *   links   相關連結 [{ label, href, download? }]
 */

function shots(prefix, count, ext) {
    var list = [];
    for (var i = 1; i <= count; i++) list.push(prefix + i + '.' + ext);
    return list;
}

window.WORLDS = [
    {
        key: 'student',
        label: 'WORLD 1',
        title: '學生時期',
        note: '2011 – 2013',
        stages: [
            {
                id: 'DrumBeat',
                title: 'DrumBeat 陣令',
                thumb: 'DrumBeat.png',
                fit: 'cover',
                shots: shots('Demo', 3, 'jpg'),
                type: '互動裝置（團隊作品）',
                year: 2011,
                source: '國際 YDW 新世代設計工作營',
                tech: ['Flash'],
                sections: [
                    { h: 'Concept', html: '古代作戰時以<b>「擊鼓」</b>來發號施令，讓士兵們聽從鼓聲進行陣形的變化；我們讓使用者透過擊鼓的行為以及數位視覺的呈現，從而體驗這樣的過程。' },
                    { h: 'Interactive', html: '使用者進行擊鼓的動作，而畫面會隨著鼓聲的大小呈現不同的潑墨效果；使用者停下動作後，畫面的墨會演變成一種古代的陣形。' }
                ],
                jobs: ['麥克風感測功能', '軟硬體整合串接']
            },
            {
                id: 'EarthBeat',
                title: 'EarthBeat 星跳',
                thumb: 'EarthBeat.png',
                fit: 'cover',
                shots: shots('Demo', 2, 'jpg'),
                type: '互動裝置（團隊作品）',
                year: 2012,
                source: '新一代設計展',
                tech: ['Flash'],
                sections: [
                    { h: 'Concept', html: '每一個大自然的生物都是地球的一個心跳，而人類不斷的開發環境使得地球的心跳失去了色彩，於是我們希望透過關燈這樣簡單又貼近生活的動作來傳達環境保育的重要性。' },
                    { h: 'Interactive', html: '以心電圖的方式呈現整個地球的心跳。當使用者將電源開關開得越多，地球的心跳會出現越來越多工廠、電線桿等人為建築，並且失去了顏色；反之，當電源開關關得越多，地球的心跳又會回到綠意盎然的樣貌。' }
                ],
                jobs: ['互動功能撰寫', '軟硬體整合串接'],
                links: [
                    { label: '裝置畫面（Vimeo）', href: 'https://vimeo.com/67446383' },
                    { label: '現場互動（YouTube）', href: 'https://www.youtube.com/watch?v=W0djrIqbfg8' }
                ]
            },
            {
                id: '4RHero',
                title: '4R Hero',
                thumb: '4RHero.png',
                fit: 'cover',
                shots: shots('Demo', 2, 'jpg'),
                type: 'Web Game（團隊作品）',
                year: 2013,
                source: '微軟潛能創意盃',
                tech: ['Construct 2'],
                sections: [
                    { h: 'Concept', html: '資源該如何處理一直都是國際間關注的事情，而資源回收的觀念也在我們身邊時常被提到，而本遊戲將資源教育向下紮根，以孩童作為遊戲對象，讓其透過遊戲的樂趣去學習資源回收的觀念。' },
                    { h: 'Interactive', html: '遊戲玩法為一般常見的橫向動作過關遊戲，玩家將扮演一隻由寶特瓶組成的機器人來進行闖關。遊戲可以讓使用者輸入回收物上的編碼，並於遊戲中獲得對應的道具，進而強化自己的機器人以達到過關的目的。' }
                ],
                jobs: ['遊戲功能撰寫']
            },
            {
                id: 'FireEscape',
                title: 'Fire x Escape',
                thumb: 'FireEscape.png',
                fit: 'cover',
                shots: shots('Demo', 5, 'jpg'),
                type: 'PC Game',
                year: 2013,
                source: '論文研究',
                tech: ['Unity'],
                sections: [
                    { h: '防災教育遊戲之研究與創作－以火災逃生為例', html: '防災教育｜數位遊戲學習｜教育遊戲設計｜火災應變表現' },
                    { h: 'Concept', html: '有鑑於教育遊戲多數有乏味以及黏著度低的問題，我們期望打造一個有商業遊戲模式的教育遊戲，藉以探討提升遊戲黏著度的可能。遊戲題材則圍繞著火災逃生，除了融入火災逃生的教材以外遊戲本身也依此設計，也希望使用者在沉浸遊戲的過程中能獲得隱含其中的知識。' },
                    { h: 'Interactive', html: '遊戲玩法為第一人稱的 3D 探索遊戲，以<b>「模擬真實」</b>的角度實現火場於遊戲關卡中，並輔以體力、道具、商店及排行榜等系統，提高使用者的遊戲體驗。使用者需面對火場狀況進行逃生選擇，以逃出火場為目的來過關。' }
                ],
                jobs: ['遊戲企劃設定', '遊戲介面設計', '遊戲功能撰寫']
            },
            {
                id: 'DigestiveTract',
                title: '認識消化道',
                thumb: 'DigestiveTract.png',
                fit: 'cover',
                shots: shots('Demo', 3, 'jpg'),
                type: '互動裝置（團隊作品）',
                year: 2011,
                source: '頑石創意（實習）',
                tech: ['Flash', 'Arduino'],
                sections: [
                    { h: 'Introduction', html: '科教館常備展「認識消化道」中的其中一項裝置，透過人形立板上的消化道以及 64 顆 LED 跑燈效果，演出食物進到人體後的旅程。' },
                    { h: 'Interactive', html: '玩家可透過小螢幕解說了解食物進入人體後如何移動（依序是食道、胃、小腸、大腸），而一旁的人形立板也會在對應的部位作 LED 跑燈效果演出，並不斷重覆演出此過程。' }
                ],
                jobs: ['跑燈電路設計及製作', '使用 Arduino 進行軟硬體整合'],
                links: [
                    { label: 'LED 跑燈 DEMO（YouTube）', href: 'https://youtu.be/2ZmkZ8C3CgY' }
                ]
            },
            {
                id: 'DinosaurFight',
                title: '恐龍格鬥遊戲',
                thumb: 'DinosaurFight.png',
                fit: 'cover',
                shots: shots('Demo', 2, 'jpg'),
                type: 'Flash Game',
                year: 2012,
                source: '頑石創意（接案）',
                tech: ['Flash'],
                sections: [
                    { h: 'Introduction', html: '使用者選擇四隻恐龍的其中一隻與其它恐龍 AI 進行格鬥對戰。主要遊玩對象為孩童，是以認識恐龍為主要目標的教育遊戲。' }
                ],
                jobs: ['遊戲功能撰寫']
            },
            {
                id: 'GPS',
                title: '車用導航模擬裝置',
                thumb: 'GPS.png',
                fit: 'cover',
                shots: shots('Demo', 2, 'jpg'),
                type: '互動裝置',
                year: 2012,
                source: '楊元綺（接案）',
                tech: ['Flash'],
                sections: [
                    { h: 'Introduction', html: '使用者透過實體方向盤裝置輸入，並配合導航提示進行駕車模擬。此裝置為研究用的 Prototype，用來研究女性於車用導航的使用者經驗。' }
                ],
                jobs: ['互動功能撰寫']
            },
            {
                id: 'MotionMaker',
                title: 'MotionMaker',
                thumb: 'MotionMaker.png',
                fit: 'cover',
                shots: shots('Demo', 7, 'jpg'),
                type: 'APP',
                year: 2012,
                source: '段綺維（接案）',
                tech: ['Flash'],
                sections: [
                    { h: 'Introduction', html: '一款製作逐格動畫的應用型 APP。透過 APP 中提供的功能（如畫筆、橡皮擦、貼紙、背景等等）即可製作簡單的逐格動畫，也可以匯出影片作分享。另外也提供輔助功能（如透寫、影格選取）來幫助動畫製作上的修改更順利。' }
                ],
                jobs: ['負責程式端之開發'],
                links: [
                    { label: '作品影片（YouTube）', href: 'https://youtu.be/tA1pSLcYGCc' },
                    { label: '下載 MotionMaker.apk', href: 'download/MotionMaker.apk', download: true }
                ]
            },
            {
                id: 'CharPlay',
                title: '漢字遊',
                thumb: 'CharPlay.png',
                fit: 'cover',
                shots: shots('Demo', 4, 'jpg'),
                type: 'APP',
                year: 2013,
                source: '柯智翔（接案）',
                tech: ['Flash'],
                sections: [
                    { h: 'Introduction', html: '一款以學習漢字為主要目的遊戲 APP。遊戲學習內容為與動物相關的漢字，玩家可以透過遊戲過關和收集的要素來掌握對漢字的認識。' },
                    { h: 'Interactive', html: '進入關卡後系統會隨機釋出一種動物的漢字，玩家必須找到並且透過觸碰的方式來進行互動，也就是手指點擊畫面中正確對應於系統所出的動物漢字，且要在遊戲時間內找到系統出的所有漢字。遊戲提供圖鑑讓玩家閱覽找到的漢字說明及動物繪圖，也讓玩家體驗到收集的成就感。' }
                ],
                jobs: ['負責程式端之開發'],
                links: [
                    { label: '下載 CharPlay.apk', href: 'download/CharPlay.apk', download: true }
                ]
            }
        ]
    },
    {
        key: 'work',
        label: 'WORLD 2',
        title: '社畜時期',
        note: '2014 – NOW',
        stages: [
            {
                id: 'BaronBattle',
                title: '叢戰巴龍',
                thumb: 'BaronBattle.jpg',
                fit: 'contain',
                thumbBg: '#ffffff',
                shots: shots('Demo', 4, 'jpg'),
                type: '互動裝置（團隊作品）',
                year: 2015,
                source: '米菲多媒體（接案）',
                tech: ['Unity', 'Kinect'],
                sections: [
                    { h: 'Introduction', html: '玩家在遊戲中將扮演易大師與小龍及巴龍對抗，利用 Kinect 體感裝置偵測玩家「砍劈」的動作，來增加遊戲的互動性，並帶給玩家有自己在與敵人對戰的感受。' },
                    { h: 'Interactive', html: '遊戲一開始會處在待機畫面，當 Kinect 偵測到玩家時便會開始遊戲。遊戲一開始提供一個教學關卡來幫助玩家練習揮砍的動作以及時機點，接著便進入與巴龍的實戰，隨著玩家的 Combo 數越高，揮砍的節奏也會出現的越快。在玩家必殺技量表充滿時，只要做出畫面指定動作就可以施展易大師的必殺技。' }
                ],
                jobs: ['遊戲內容企劃', '遊戲功能實作'],
                links: [
                    { label: '玩家互動（YouTube）', href: 'https://www.youtube.com/watch?v=DCkU95iyAkU' },
                    { label: '臉書粉絲團紀錄', href: 'https://www.facebook.com/media/set/?set=a.463782067140621.1073741831.457677167751111&type=3' }
                ]
            },
            {
                id: 'UnityDDZ',
                title: '鬥地主',
                thumb: 'Logo.png',
                fit: 'contain',
                shots: shots('Demo', 9, 'jpg'),
                type: 'APP（團隊作品）',
                year: 2014,
                source: '鈊象電子',
                tech: ['Unity'],
                sections: [
                    { h: 'Introduction', html: '以中國大陸最多人玩的棋牌遊戲「鬥地主」為遊戲核心，並提供了兩種模式，一種為帶有故事劇情及任務成分的劇情模式；另一種為傳統打錢的街機模式。遊戲中採用了「弱連網」的架構（部分功能須連線，但依然可以單機遊玩），以中國大陸二、三線城市為主要市場。' }
                ],
                jobs: ['負責 Client 端功能製作', '連線功能接駁', '遊戲動態效果設計', '遊戲規格提案']
            },
            {
                id: 'CocosDDZ',
                title: '鬥地主',
                thumb: 'Logo.jpg',
                fit: 'contain',
                thumbBg: '#ffffff',
                shots: shots('Demo', 9, 'jpg'),
                type: 'APP（團隊作品）',
                year: 2015,
                source: '鈊象電子',
                tech: ['Cocos2d-x'],
                sections: [
                    { h: 'Introduction', html: '以中國大陸最多人玩的棋牌遊戲「鬥地主」為遊戲核心，並提供了三種模式，一種為帶有劇情及 RPG 要素的闖關模式；第二種為傳統打錢的街機模式；第三種則為磨練牌技以獲得大量獎勵的試煉模式。遊戲中採用了「弱連網」的架構（部分功能須連線，但依然可以單機遊玩），主打中國大陸二、三線城市的小包市場。' }
                ],
                jobs: ['負責 Client 端功能製作', '連線功能接駁', '遊戲動態效果設計', '遊戲規格提案']
            },
            {
                id: 'SGC',
                title: '金好運娛樂城',
                thumb: 'SGC_Icon.png',
                fit: 'contain',
                thumbBg: '#ffffff',
                shots: [],
                type: 'APP（團隊作品）',
                year: 2017,
                source: '鈊象電子',
                tech: ['Unity'],
                sections: [
                    { h: 'Introduction', html: '不囉嗦！就是個博奕遊戲平台，可點下方的遊戲連結下載體驗。' }
                ],
                jobs: ['平台架構規劃', '平台功能製作', '連線功能接駁', '遊戲動態效果設計', '遊戲規格優化'],
                links: [
                    { label: 'Android（Google Play）', href: 'https://play.google.com/store/apps/details?id=com.goodluck777.panther' },
                    { label: 'iOS（App Store）', href: 'https://itunes.apple.com/tw/app/%E9%87%91%E5%A5%BD%E9%81%8B%E5%A8%9B%E6%A8%82%E5%9F%8E/id1267732467?mt=8' }
                ]
            },
            {
                id: 'GuardianForest',
                title: '守護檜季森林',
                thumb: 'com_img_desktop_logo.png',
                fit: 'contain',
                shots: shots('Demo', 8, 'jpg'),
                type: 'PC（團隊作品）',
                year: 2018,
                source: '元培醫事科技大學',
                tech: ['Unity'],
                sections: [
                    { h: 'Introduction', html: '守護檜季森林是一款以學習會計為主的教育遊戲。玩家在遊戲中扮演一名守護森林的元素使，在森林裡收集自然元素、培養戰鬥精靈、解決村民任務以充實自己的實力，並擊退所有來犯的怪物。遊戲戰鬥以會計題目問答來進行，所答對的題數及答對率會紀錄至排行榜，給老師或學生一個看到學習績效的管道。' }
                ],
                jobs: ['遊戲製作人', '遊戲主企劃', '遊戲主程式']
            },
            {
                id: 'DoTheRightThing',
                title: '做就對了',
                thumb: 'Logo.png',
                fit: 'contain',
                shots: shots('Demo', 6, 'jpg'),
                type: 'PC（團隊作品）',
                year: 2019,
                source: '元培醫事科技大學',
                tech: ['Unity'],
                sections: [
                    { h: 'Introduction', html: '做就對了是一款以經營決策為主的 AVG 教育遊戲。玩家需要不斷的翻開事件卡，事件卡上描述了經營可能會碰到的狀況，以及兩個應對的決策選項，玩家只需要左滑或右滑來選擇便可做出決策。然而，決策的後果有時並不如表面上所看到的那樣，決策會使得玩家的人格參數產生變化，當人格參數低於標準值則會導致經營結束。' }
                ],
                jobs: ['遊戲製作人', '遊戲主企劃', '遊戲主程式']
            },
            {
                id: 'OysterObasan',
                title: '青蚵嫂',
                thumb: 'Logo.png',
                fit: 'contain',
                shots: shots('Demo', 6, 'png'),
                type: 'APP（團隊作品）',
                year: 2019,
                source: '渚心',
                tech: ['Unity'],
                sections: [
                    { h: 'Introduction', html: '體驗了一趟七股採蚵文化後油然而生的遊戲，玩家能夠體驗到從採蚵少女到青蚵嫂的生命故事，遊戲採用的是類似 Tap 的反應力玩法。' }
                ],
                jobs: ['遊戲製作人', '遊戲主企劃', '遊戲主程式']
            },
            {
                id: 'GuardianForest2',
                title: '守護檜季森林 2',
                thumb: 'AppIcon_512.png',
                fit: 'contain',
                shots: shots('ShopPhoto', 4, 'png'),
                type: 'APP（團隊作品）',
                year: 2021,
                source: '元培醫事科技大學',
                tech: ['Unity', 'TopDown Engine'],
                sections: [
                    { h: 'Introduction', html: '守護檜季森林 2 是一款以學習會計為主的教育遊戲。有別於一代，二代提供的是更貼近 RPG 類型的遊戲觀，玩家可以在多樣的場景裡實際的操控角色奔跑並進行戰鬥、學習技能、養成角色，期望增加遊戲的代入感從而讓玩家的學習過程更加沉浸。' },
                    { h: 'My Work', html: '<p>負責整個遊戲的內容規劃以及程式的撰寫，美術的部份有 80% 是透過網路的免費素材加工整合而成（如場景），另外 20% 則是自行製作（如角色點陣圖、頭像、Icon）。程式的部份則是使用 Unity TopDown Engine。</p><p>另外要提的是因遊戲經費來源是學術界，因此除了上述的工作外，還需要和計劃主持人進行學術方面的討論以及迭代。</p>' }
                ],
                jobs: ['遊戲製作人', '遊戲主企劃', '遊戲主程式', '美術素材整合']
            },
            {
                id: 'Barnabus',
                title: 'Barnabus',
                thumb: 'AppIcon_512.png',
                fit: 'contain',
                shots: shots('', 7, 'png'),
                type: 'APP（團隊作品）',
                year: 2023,
                source: 'MEandMine',
                tech: ['Unity'],
                sections: [
                    { h: 'Introduction', html: 'Barnabus 是一款用來教導孩童認識情緒的教育型遊戲，玩家可以透過遊戲中的關卡收集藥水，收集並解鎖可愛的小怪物，每隻小怪物皆有其代表的情緒以及專屬故事書，同時遊戲也提供父母一個平台可用來追蹤孩童的學習進度並給予獎勵。' },
                    { h: 'My Work', html: '<p>在這個敏捷開發的專案裡，我主要負責前端內容製作以及版本的產出。</p><p>前端的部份除了製作其中一款小遊戲外，還負責整個遊戲平台的串接整合，像是遊戲 Flow、影片串流、玩家遊戲進度及行為紀錄、使用者帳號管理流程、第三方登入等等。</p><p>也因為處在新創的環境裡，除了寫程式的工作以外也頻繁的參與產品企劃以及策略的討論。</p>' }
                ],
                jobs: ['遊戲主程式']
            }
        ]
    }
];
