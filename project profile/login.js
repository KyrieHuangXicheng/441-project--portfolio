let isLoggedIn = false;
let registeredUsers = {}; // 模拟已注册用户数据库

function toggleFormView(formType) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginHeading = document.getElementById('registerHeading').previousElementSibling;
    const registerHeading = document.getElementById('registerHeading');

    if (formType === 'login') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        loginHeading.style.display = 'block';
        registerHeading.style.display = 'none';
    } else if (formType === 'register') {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        loginHeading.style.display = 'none';
        registerHeading.style.display = 'block';
    }
}

document.getElementById('toRegister').addEventListener('click', function(e) {
    e.preventDefault();
    toggleFormView('register');
});

document.getElementById('toLogin').addEventListener('click', function(e) {
    e.preventDefault();
    toggleFormView('login');
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = e.target.elements[0].value; // 使用索引获取元素，因为没有给输入框设置name属性
        const password = e.target.elements[1].value;

        // 简单的模拟验证逻辑，实际应用中应替换为与服务器的验证
        if (username in registeredUsers && registeredUsers[username].password === password) {
            alert(`Login successful for user ${username}!`);
            e.target.reset(); // 清空表单
            window.location.href = "shopping.html"; // 登录成功后跳转到购物页面
        } else {
            alert('Invalid username or password. Please try again.');
        }
    });

    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = e.target.elements[0].value;
        const email = e.target.elements[1].value;
        const password = e.target.elements[2].value;
        const confirmPassword = e.target.elements[3].value;

        if (!username || !email || !password || !confirmPassword) {
            alert('Please fill in all fields.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match. Please try again.');
            return;
        }

        if (registeredUsers[username]) {
            alert('Username already exists. Please choose another one.');
        } else {
            registeredUsers[username] = { email, password };
            if (confirm(`Registration successful for user ${username}! Click OK to go back to the login page.`)) {
                e.target.reset(); // 清空表单
                toggleFormView('login'); // 注册成功后自动返回登录界面
            }
        }
    });

    // 初始化显示登录界面
    toggleFormView('login');
});