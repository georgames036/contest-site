async function submitCode(problemId, subId, code) {
  try {
    const res = await fetch("https://script.google.com/macros/s/AKfycbwbr8X1ROvYMzr6FZjg7KhP_H_fG5sNBNTrmuzl-zHu9DXlsrRuSjUasHR7j7K-ImvuJw/exec", {
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
