async function submitCode(problemId, subId, code) {
  try {
    const res = await fetch("https://script.google.com/macros/s/AKfycbwKAdXpJwz7ncVjCwAzj1Qz50UJO_iO_5v6F96gRA5J2Xq6rGxiZsLnmX4L_ZexqslmAA/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ problemId, subId, lang: "javascript", code })
    });

    const data = await res.json();
    document.getElementById("result").textContent = data.result;
  } catch (err) {
    document.getElementById("result").textContent = "通信エラー: " + err.message;
  }
}

// サンプルコードの自動提出（テスト用）
const codeExample = "window.alert(2 * Number(window.prompt('入力の指示文')));";
submitCode("1", "A", codeExample);
