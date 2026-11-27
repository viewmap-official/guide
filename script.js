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
const copyLabels = ['一鍵複製', '一键复制', '한 번에 복사'];
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
        status.textContent = (ok ? ['已複製', '已复制', '복사 완료'] : ['請手動複製', '请手动复制', '직접 복사해 주세요'])[window.guideLang || 0];
    });
});

// 3. 章節導覽
const navLinks = document.querySelectorAll('aside a');
navLinks.forEach(link => link.addEventListener('click', () => {
    navLinks.forEach(item => item.classList.toggle('active', item === link));
}));

// 4. 三語切換
const languageCodes = ['zh-Hant', 'zh-Hans', 'ko'];
function setLanguage(index) {
    const code = languageCodes[index];
    const dictionary = window.guideTranslations?.[code];
    if (!dictionary) return;
    window.guideLang = index;
    document.documentElement.lang = code;
    document.title = dictionary[0];
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const value = dictionary[Number(element.dataset.i18n)];
        if (typeof value === 'string') element.textContent = value;
    });
    document.querySelectorAll('.status').forEach(element => element.textContent = '');
    document.querySelectorAll('[data-lang]').forEach(button => {
        button.setAttribute('aria-pressed', String(Number(button.dataset.lang) === index));
    });
}
document.querySelectorAll('[data-lang]').forEach(button => {
    button.addEventListener('click', () => setLanguage(Number(button.dataset.lang)));
});
setLanguage(0);
