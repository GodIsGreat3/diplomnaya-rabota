document.addEventListener("DOMContentLoaded", async () => {
    await loadComments();  // Загружаем комментарии при загрузке страницы
});

async function loadComments() {
    try {
        const response = await fetch('http://localhost:5000/api/comments');
        const comments = await response.json();

        if (response.ok) {
            displayComments(comments);
        } else {
            console.error('Не удалось загрузить комментарии:', comments.message);
        }
    } catch (error) {
        console.error('Ошибка при загрузке комментариев:', error);
    }
}

function displayComments(comments) {
    const commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = '';  // Очищаем список комментариев

    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.textContent = comment.text;
        commentsList.appendChild(commentElement);
    });
}

async function addComment() {
    const commentInput = document.getElementById('comment-input');
    const text = commentInput.value.trim();

    if (!text) {
        alert('Пожалуйста, введите комментарий!');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/comments/add-comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });

        const data = await response.json();

        if (response.ok) {
            commentInput.value = '';  // Очищаем поле ввода
            loadComments();  // Перезагружаем список комментариев
        } else {
            alert('Ошибка при добавлении комментария: ' + data.message);
        }
    } catch (error) {
        console.error('Ошибка при отправке комментария:', error);
        alert('Произошла ошибка при отправке комментария.');
    }
}
