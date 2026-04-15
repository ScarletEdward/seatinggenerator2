body {
    margin:0;
    font-family:Arial;
    background:#e9eaec;
    text-align:center;
}

.classroom {
    width:1000px;
    margin:20px auto;
    background:#f7f7f8;
    border-radius:12px;
    padding:20px;
    position:relative;
}

.door {
    position:absolute;
    top:10px;
    left:10px;
    width:60px;
    height:40px;
    border:2px solid #999;
    background:#ddd;
    display:flex;
    justify-content:center;
    align-items:center;
}

.front-wall {
    display:flex;
    justify-content:center;
    gap:30px;
}

.white-board {
    width:50%;
    height:40px;
    background:white;
    border:1px solid #bbb;
    display:flex;
    justify-content:center;
    align-items:center;
}

.black-board {
    width:140px;
    height:40px;
    background:#1f2d1f;
    color:white;
    display:flex;
    justify-content:center;
    align-items:center;
}

.board-tray {
    display:flex;
    gap:6px;
    justify-content:center;
    margin-top:4px;
}

.chalk { width:14px;height:4px;background:white; }
.duster { width:26px;height:10px;background:#c49a6c; }

.teacher-table {
    margin:20px auto;
    width:200px;
    height:50px;
    background:#eee;
    border:2px solid #ccc;
    border-radius:10px;
    display:flex;
    justify-content:center;
    align-items:center;
    font-weight:bold;
}

.seating-grid {
    display:grid;
    grid-template-columns:repeat(11,1fr);
    gap:8px;
}

.spacer { width:6px; }

.desk {
    height:60px;
    border:2px solid #ccc;
    border-radius:10px;
    display:flex;
    justify-content:center;
    align-items:center;
    background:#f0f0f0;
    font-weight:bold;
    cursor:pointer;
}

.green { background:#8bc34a!important; }
.red { background:#f44336!important;color:white; }

.controls { margin-top:20px; }

.row {
    display:flex;
    justify-content:center;
    gap:10px;
    margin:10px;
}

button { padding:10px;border-radius:8px;border:none;cursor:pointer; }
#randomBtn { background:#2196f3;color:white; }
#resetBtn { background:#f44336;color:white; }
#finalizeBtn { background:#1976d2;color:white; }
#newPlanBtn { background:#4caf50;color:white; }

#sidebar {
    position:fixed;
    right:0;
    top:0;
    width:300px;
    height:100%;
    background:#fff;
    border-left:2px solid #ddd;
    padding:15px;
    overflow-y:auto;
    display:none;
}

.student { padding:8px;border-bottom:1px solid #eee; }
.student.green { background:#c8e6c9; }
.student.red { background:#ffcdd2; }

#attendanceBox {
    position:fixed;
    right:320px;
    top:20px;
    background:white;
    padding:10px 14px;
    border-radius:10px;
    border:1px solid #ddd;
    display:none;
}

.stat { margin:4px 0; }
.present { color:#2e7d32; }
.absent { color:#c62828; }
