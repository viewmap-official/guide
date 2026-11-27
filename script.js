// 1. 內容創作方向切換
const tabs = document.querySelectorAll('.tabs button');
const panels = document.querySelectorAll('.panel');
tabs.forEach(button => {
    button.addEventListener('click', () => {
        tabs.forEach(tab => tab.setAttribute('aria-selected', String(tab === button)));
        panels.forEach(panel => panel.hidden = panel.id !== button.dataset.target);
    });
});

// 2. Hashtag 一鍵複製
document.querySelectorAll('.copy').forEach(button => {
    button.addEventListener('click', async () => {
        const box = button.closest('.tagbox');
        const tags = box.querySelector('.tags').textContent;
        const status = box.querySelector('.status');
        let ok = false;
        try {
            await navigator.clipboard.writeText(tags);
            ok = true;
        } catch (error) {
            const field = document.createElement('textarea');
            field.value = tags;
            box.append(field);
            field.select();
            try { ok = document.execCommand('copy'); } catch (error) {}
            if (ok) field.remove();
        }
        status.textContent = ok ? '已複製' : '請手動複製';
    });
});

// 3. 章節導覽
const navLinks = document.querySelectorAll('aside a');
navLinks.forEach(link => link.addEventListener('click', () => {
    navLinks.forEach(item => item.classList.toggle('active', item === link));
}));

