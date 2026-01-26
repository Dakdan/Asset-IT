const userListEl = document.getElementById("userList");

async function loadUsers() {
  showOverlay("กำลังโหลดรายชื่อผู้ใช้งาน...");
  userListEl.innerHTML = "";

  try {
    const res = await callAPI("getPendingUsers");

    if (!res.success || res.data.length === 0) {
      userListEl.innerHTML = "<p style='text-align:center;'>ไม่มีผู้สมัครใหม่</p>";
      return;
    }

    res.data.forEach(u => {
      const div = document.createElement("div");
      div.className = "ticket-card";

      div.innerHTML = `
        <b>${u.name}</b><br>
        Email: ${u.email}<br>
        สถานะ: ${u.active ? "✅ อนุมัติแล้ว" : "⏳ รออนุมัติ"}<br><br>

        <button class="btn-login" onclick="approveUser('${u.email}', true)">
          อนุมัติ
        </button>

        <button class="btn-login" style="background:#aaa;border-color:#aaa"
          onclick="approveUser('${u.email}', false)">
          ระงับ
        </button>
      `;

      userListEl.appendChild(div);
    });

  } catch (e) {
    showPopup("ผิดพลาด", "ไม่สามารถโหลดข้อมูลได้");
  } finally {
    hideOverlay();
  }
}

async function approveUser(email, active) {
  showOverlay("กำลังบันทึกข้อมูล...");

  try {
    const res = await callAPI("approveUser", { email, active });

    if (res.success) {
      showPopup("สำเร็จ", active
        ? "อนุมัติผู้ใช้งานเรียบร้อยแล้ว"
        : "ระงับผู้ใช้งานเรียบร้อยแล้ว"
      );
      loadUsers();
    } else {
      showPopup("ไม่สำเร็จ", res.message);
    }
  } catch (e) {
    showPopup("ผิดพลาด", "ไม่สามารถดำเนินการได้");
  } finally {
    hideOverlay();
  }
}

loadUsers();
