async function submitCode(problemId, subId, code) {
  try {
    const res = await fetch("https://script.google.com/macros/s/AKfycbwrPymcUjrVSrwqiE5oEuw9eCzB3wLRB-kJ4-qQHh8dyiD8TadoTdnSStgwE5IWqy3J0Q/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ problemId, subId, lang: "javascript", code })
    });

    const data = await res.json();
    document.getElementById(`result${problemId}${subId}`).textContent = data.result;
  } catch (err) {
    document.getElementById(`result${problemId}${subId}`).textContent = "通信エラー: " + err.message;
  }
}

// ボタンイベント登録
document.getElementById("submit1A").addEventListener("click", () => {
  const code = document.getElementById("code1A").value;
  submitCode("1", "A", code);
});
