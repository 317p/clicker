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
