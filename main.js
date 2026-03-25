async function loadJSON(file) {
    try {
        const res = await fetch(CONFIG.githubRaw + file + "?t=" + Date.now());
        return await res.json();
    } catch { return []; }
}

async function checkUID() {
    const uid = document.getElementById("uid-input").value.trim();
    const device = document.getElementById("device-select").value;
    if (!uid || !device) return alert("Nhập UID và thiết bị!");

    const uids = await loadJSON("uids.json");
    const found = uids.find(u => u.uid === uid && u.device.includes(device));

    const div = document.getElementById("uid-result");
    if (found) {
        div.innerHTML = `<h3>✅ Thành công! UID: ${uid}</h3><button onclick="showDownload()">TẢI PHẦN MỀM</button>`;
    } else {
        div.innerHTML = `<p style="color:red">❌ UID chưa kích hoạt. Liên hệ Admin!</p>`;
    }
}

async function checkKey() {
    const key = document.getElementById("key-input").value.trim();
    if (!key) return alert("Nhập KEY!");
    const keys = await loadJSON("keys.json");
    const found = keys.find(k => k.key === key);
    const div = document.getElementById("key-result");
    if (found) {
        div.innerHTML = `<h3>🎉 Kích hoạt thành công!</h3><button onclick="showDownload()">TẢI NGAY</button>`;
    } else {
        div.innerHTML = `<p style="color:red">❌ KEY không hợp lệ!</p>`;
    }
}

function showDownload() {
    document.getElementById("download-section").innerHTML = `
        <h2>${CONFIG.softwareName} ${CONFIG.version}</h2>
        <button onclick="alert('Tải Android - link sẽ cập nhật sau')">📱 DOWNLOAD ANDROID</button>
        <button onclick="alert('Tải iOS - link sẽ cập nhật sau')">🍎 DOWNLOAD iOS</button>
    `;
}

function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}

window.onload = () => {
    showDownload();
    document.getElementById("uid-section").style.display = "block";
};
