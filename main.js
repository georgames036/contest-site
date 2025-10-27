let problems = {};

async function loadProblems() {
  const res = await fetch("problems.json");
  problems = await res.json();

  const mainSelect = document.getElementById("mainProblemSelect");
  for (let pid in problems) {
    const opt = document.createElement("option");
    opt.value = pid;
    opt.textContent = `第${pid}問`;
    mainSelect.appendChild(opt);
  }
  mainSelect.addEventListener("change", loadSubProblems);
  loadSubProblems();
}

function loadSubProblems() {
  const pid = document.getElementById("mainProblemSelect").value;
  const subSelect = document.getElementById("subProblemSelect");
  subSelect.innerHTML = "";
  for (let sid in problems[pid]) {
    const opt = document.createElement("option");
    opt.value = sid;
    opt.textContent = sid + " - " + problems[pid][sid].title;
    subSelect.appendChild(opt);
  }
  subSelect.addEventListener("change", showProblem);
  showProblem();
}

function showProblem() {
  const pid = document.getElementById("mainProblemSelect").value;
  const sid = document.getElementById("subProblemSelect").value;
  const p = problems[pid][sid];
  const div = document.getElementById("problem");

  const samplesHTML = p.samples.map(s => 
    `<pre>入力: ${s.input}\n出力: ${s.output}</pre>`).join("");

  div.innerHTML = `
    <h2>第${pid}問 ${sid}: ${p.title}</h2>
    <p><b>配点:</b> ${p.score}</p>
    <p><b>問題文:</b> ${p.description}</p>
    <p><b>制約:</b><br>${p.constraints.join("<br>")}</p>
    <p><b>入力:</b> ${p.input}</p>
    <p><b>出力:</b> ${p.output}</p>
    <p><b>サンプル:</b><br>${samplesHTML}</p>
  `;
}

// 提出ボタン
document.getElementById("runButton").onclick = async () => {
  const pid = document.getElementById("mainProblemSelect").value;
  const sid = document.getElementById("subProblemSelect").value;
  const lang = document.getElementById("languageSelect").value;
  const code = document.getElementById("codeArea").value;

  document.getElementById("result").textContent = "⏳ 採点中...";

  try {
    const res = await fetch("https://script.google.com/macros/s/AKfycbzPOAG0gpzhTYA2WFfGIvqoy9-bK1Fn7aH9fSwrk6qtm1dL2qx3O4tVK0FfdBwUReRzoQ/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ problemId: pid, subId: sid, lang, code })
    });
    const data = await res.json();
    document.getElementById("result").textContent = data.result;
  } catch (err) {
    document.getElementById("result").textContent = "通信エラー: " + err.message;
  }
};

loadProblems();
