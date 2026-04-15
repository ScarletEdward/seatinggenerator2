let valid = false;
let biasList = [];
const grid = document.getElementById("grid");

/* STUDENTS */
const students = [
"AARAV BAGADI","ANANAY GARG","ANKUSH","ANSHUMAN SAHU","AREEN SAIYED",
"CHIRAYU PARIHAR","DAKSH GULERIA","DARSHIL DAGA","DEVAANSH KHATRI",
"DHANISTHA CHOUDHARY","DHIREN BORANA","DHRITI MATHUR","DHWANI BIRLA",
"DIVNA JAIN","DIVYANSHI","HARSHITA GUPTA","HRIDAY TATIA",
"KANCHAN RAJPUROHIT","KHUSH CHOUDHARY","KINJAL MEHTA",
"KRISHA CHOUDHARY","LAKSHIKA GEHLOT","LEHAR THADANI",
"MADHAVAN TAK","MANASVI SINGH","MITALI PUNGLIA",
"MOHAMMED ZAID KAMDAR","PRIYANK BISSA","ROCHI MEHTA",
"SAMIKSHA MEHTA","SAMRAT CHOUHAN","SHAYAAN ANSARI",
"SHRESTH SHARMA","SHWETA CHOUDHARY","SIDHARTH POONIYA",
"SNEHA CHOUDHARY","TANISHQ TOSHNIWAL","TAVISH RATHI",
"UMESH NATH DEORA","VEDANSH DADHEECH"
];

/* BUILD GRID */
for (let i = 0; i < 40; i++) {

    if (i % 8 === 2 || i % 8 === 4 || i % 8 === 6) {
        let s = document.createElement("div");
        s.className = "spacer";
        grid.appendChild(s);
    }

    let d = document.createElement("div");
    d.className = "desk";

    d.onclick = function () {
        let roll = parseInt(d.textContent);
        if (!roll) return;

        let student = document.getElementById("student-" + roll);

        if (d.classList.contains("green")) {
            d.classList.replace("green", "red");
            if (student) {
                student.classList.remove("green");
                student.classList.add("red");
            }
        } else if (d.classList.contains("red")) {
            d.classList.remove("red");
            if (student) student.classList.remove("red");
        } else {
            d.classList.add("green");
            if (student) student.classList.add("green");
        }

        updateAttendance();
    };

    grid.appendChild(d);
}

/* SIDEBAR */
function buildSidebar() {
    let container = document.getElementById("studentList");
    container.innerHTML = "";

    students.forEach((name, i) => {
        let div = document.createElement("div");
        div.className = "student";
        div.id = "student-" + (i + 1);
        div.textContent = (i + 1) + ". " + name;
        container.appendChild(div);
    });
}

/* CODE */
function checkCode() {
    if (document.getElementById("codeInput").value === "XJ92#40!") {
        valid = true;
        alert("Code accepted");
    } else {
        alert("Wrong code");
    }
}

/* BIAS */
function setBias() {
    let list = biasInput.value.split(",")
        .map(x => parseInt(x.trim()))
        .filter(x => !isNaN(x));

    list = [...new Set(list)].filter(x => x >= 1 && x <= 40);

    biasList = list.filter(x => x !== 4);

    alert("Bias set: " + list.join(", "));
    removeBiasBtn.style.display = "inline-block";
}

function removeBias() {
    biasList = [];
    removeBiasBtn.style.display = "none";
}

/* RANDOMIZE */
function randomize() {

    if (!valid) return alert("Enter code!");

    let desks = document.querySelectorAll(".desk");

    desks.forEach(d => {
        d.textContent = "";
        d.classList.remove("green", "red");
    });

    let pool = [];
    for (let i = 1; i <= 40; i++) pool.push(i);

    pool = pool.filter(x => x !== 4 && !biasList.includes(x));
    shuffle(pool);

    let final = new Array(40).fill(null);

    let middle = [2,3,4,5,10,11,12,13];
    let side = [1,6,9,14,17,22];

    let pos4 = (Math.random() < 0.5 ? side : middle)[Math.floor(Math.random() * 6)];
    final[pos4] = 4;

    let front = [...Array(24).keys()].filter(i => i !== pos4);
    shuffle(front);

    biasList.forEach(n => {
        if (front.length) final[front.pop()] = n;
    });

    let idx = 0;
    for (let i = 0; i < 40; i++) {
        if (final[i] === null) final[i] = pool[idx++];
    }

    desks.forEach((d, i) => d.textContent = final[i]);

    document.getElementById("resetBtn").style.display = "inline-block";
}

/* RESET */
function resetAll() {
    document.querySelectorAll(".desk").forEach(d => {
        d.textContent = "";
        d.classList.remove("green", "red");
    });

    valid = false;
    biasList = [];

    codeInput.value = "";
    biasInput.value = "";
    removeBiasBtn.style.display = "none";
    resetBtn.style.display = "none";
}

/* ATTENDANCE */
function updateAttendance() {
    let p = 0, a = 0;

    document.querySelectorAll(".desk").forEach(d => {
        if (d.classList.contains("green")) p++;
        if (d.classList.contains("red")) a++;
    });

    presentCount.textContent = p;
    absentCount.textContent = a;
}

/* EXCEL DOWNLOAD (SORTED) */
function downloadExcel(){

    let rows = [];

    document.querySelectorAll(".desk").forEach(d=>{
        let roll = parseInt(d.textContent);
        if(!roll) return;

        let name = students[roll-1];

        let status = "Unmarked";
        if(d.classList.contains("green")) status = "Present";
        else if(d.classList.contains("red")) status = "Absent";

        rows.push([roll, name, status]);
    });

    // SORT ASCENDING
    rows.sort((a,b)=>a[0]-b[0]);

    let data = [["Roll No","Name","Status"], ...rows];

    let csv = data.map(e => e.join(",")).join("\n");

    let blob = new Blob([csv], {type:"text/csv"});
    let link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "attendance_sorted.csv";
    link.click();
}

/* FINALIZE */
function finalizePlan(){

    document.getElementById("inputRow").style.display = "none";

    document.getElementById("randomBtn").style.display = "none";
    document.getElementById("resetBtn").style.display = "none";
    document.getElementById("finalizeBtn").style.display = "none";

    document.getElementById("newPlanBtn").style.display = "inline-block";

    buildSidebar();
    document.getElementById("sidebar").style.display = "block";
    document.getElementById("attendanceBox").style.display = "block";

    updateAttendance();
}

/* NEW PLAN */
function newPlan(){

    resetAll();

    document.getElementById("inputRow").style.display = "flex";

    document.getElementById("randomBtn").style.display = "inline-block";
    document.getElementById("finalizeBtn").style.display = "inline-block";

    document.getElementById("newPlanBtn").style.display = "none";

    document.getElementById("sidebar").style.display = "none";
    document.getElementById("attendanceBox").style.display = "none";
}

/* SHUFFLE */
function shuffle(a){
    for(let i=a.length-1;i>0;i--){
        let j=Math.floor(Math.random()*(i+1));
        [a[i],a[j]]=[a[j],a[i]];
    }
}
