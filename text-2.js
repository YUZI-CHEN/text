const selectedTags = new Set();

// 切換標籤選中狀態
function toggleTag(tagElement) {
    const tag = tagElement.getAttribute('data-tag');
    if (selectedTags.has(tag)) {
        selectedTags.delete(tag);
        tagElement.classList.remove('selected');
    } else {
        selectedTags.add(tag);
        tagElement.classList.add('selected');
    }
    filterItems();
}

// 清除所有選中的標籤
function clearTags() {
    selectedTags.clear();
    const tagElements = document.querySelectorAll('.tag');
    tagElements.forEach(tag => tag.classList.remove('selected'));
    filterItems();
}

// 篩選內容
function filterItems() {
    const items = document.querySelectorAll('#content .item');
    let matchCount = 0;

    items.forEach(item => {
        const tags = item.getAttribute('data-tags').split(' ');

        // 檢查是否匹配選中的標籤
        const matchesTags = selectedTags.size === 0 || [...selectedTags].some(tag => tags.includes(tag));

        if (matchesTags) {
            item.classList.remove('hidden');
            matchCount++;
        } else {
            item.classList.add('hidden');
        }
    });

    document.getElementById('result').textContent = `找到 ${matchCount} 個結果。`;
}