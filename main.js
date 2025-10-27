async function submitCode(problemId, subId, code) {
  try {
    const res = await fetch("GASのWebアプリURLをここに貼る", {
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
