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

  div.innerHTML = `
    <h2>第${pid}問 ${sid}: ${p.title}</h2>
    <p><b>配点:</b> ${p.score}</p>
    <p><b>問題文:</b> ${p.description}</p>
    <p><b>制約:</b><br>${p.constraints.join("<br>")}</p>
    <p><b>入力:</b> ${p.input}</p>
    <p><b>出力:</b> ${p.output}</p>
    <p><b>入力例:</b><pre>${p.samples[0].input}</pre></p>
    <p><b>出力例:</b><pre>${p.samples[0].output}</pre></p>
  `;
}

document.getElementById("runButton").onclick = async () => {
  const pid = document.getElementById("mainProblemSelect").value;
  const sid = document.getElementById("subProblemSelect").value;
  const lang = document.getElementById("languageSelect").value;
  const code = document.getElementById("codeArea").value;

  const res = await fetch("https://script.google.com/macros/s/AKfycbwwkSxDVgX00aAGG-rdh_7WwQRLB7ouBJaiJBUEO8snQl7ButI68blCtCVAkdvjx8whtw/exec", {
    method: "POST",
    body: JSON.stringify({ problemId: pid, subId: sid, lang, code }),
    headers: { "Content-Type": "application/json" }
  });

  const data = await res.json();
  document.getElementById("result").textContent = data.result;
};

loadProblems();
