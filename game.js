let cookieCount = 0; // 現在のクッキーの数
let clickPower = 1;  // 1クリックで増えるクッキーの数
let productionRate = 0; // 1秒間に自動で増えるクッキーの数 (CPS: Cookies Per Second)

// HTML要素を取得
const cookieCountDisplay = document.getElementById('cookie-count');
const mainClickButton = document.getElementById('main-click-button');
const cursorUpgradeButton = document.getElementById('cursor-upgrade');

// スコアを画面に反映する関数
function updateDisplay() {
    cookieCountDisplay.textContent = Math.floor(cookieCount); // 小数点以下は切り捨てて表示
    // アップグレードボタンの有効/無効をチェック
    checkUpgradeButtons();
}

// メインボタンをクリックしたときの処理
mainClickButton.addEventListener('click', () => {
    cookieCount += clickPower;
    updateDisplay();
});

// 初期表示を更新
updateDisplay();

// ... (既存の変数とHTML要素の取得) ...

// 自動生産のための変数
let cursorCost = 10;
let cursorProduction = 1; // 1秒あたり1枚

// ... (updateDisplay関数とmainClickButtonのEventListener) ...

// カーソルアップグレードの購入処理
cursorUpgradeButton.addEventListener('click', () => {
    if (cookieCount >= cursorCost) {
        cookieCount -= cursorCost;
        productionRate += cursorProduction; // 生産レートを増やす
        
        // アップグレードのコストと効果を強化（例: コストは1.5倍、効果は1.5倍）
        cursorCost = Math.ceil(cursorCost * 1.5); 
        cursorProduction = Math.ceil(cursorProduction * 1.5);
        
        // ボタンの表示を更新
        cursorUpgradeButton.textContent = `カーソル (コスト: ${cursorCost}, 効果: ${cursorProduction}枚/秒)`;
        
        updateDisplay();
    }
});

// アップグレードボタンの有効/無効をチェックする関数
function checkUpgradeButtons() {
    // カーソルアップグレード
    if (cookieCount >= cursorCost) {
        cursorUpgradeButton.disabled = false;
    } else {
        cursorUpgradeButton.disabled = true;
    }
}

// 1秒ごとに自動でクッキーを増やす仕組み
setInterval(() => {
    cookieCount += productionRate;
    updateDisplay();
}, 1000); // 1000ミリ秒 = 1秒

// ... (updateDisplay関数とmainClickButtonのEventListener) ...

// ... (既存の変数、HTML要素、関数の定義) ...

// データをLocalStorageに保存する関数
function saveGame() {
    const gameState = {
        cookies: cookieCount,
        clickPower: clickPower,
        rate: productionRate,
        cursorCost: cursorCost,
        cursorProd: cursorProduction
        // 他のアップグレードがあればここに追加
    };
    localStorage.setItem('cookieGameSave', JSON.stringify(gameState));
    console.log("ゲームを保存しました。");
}

// LocalStorageからデータを読み込む関数
function loadGame() {
    const savedData = localStorage.getItem('cookieGameSave');
    if (savedData) {
        const gameState = JSON.parse(savedData);
        
        cookieCount = gameState.cookies || 0;
        clickPower = gameState.clickPower || 1;
        productionRate = gameState.rate || 0;
        cursorCost = gameState.cursorCost || 10;
        cursorProduction = gameState.cursorProd || 1;
        
        // ボタンの表示をロードした値で更新
        cursorUpgradeButton.textContent = `カーソル (コスト: ${cursorCost}, 効果: ${cursorProduction}枚/秒)`;
        
        updateDisplay();
        console.log("ゲームをロードしました。");
    }
}

// ページロード時にゲームをロード
loadGame();

// 10秒ごとに自動で保存
setInterval(saveGame, 10000); // 10000ミリ秒 = 10秒
