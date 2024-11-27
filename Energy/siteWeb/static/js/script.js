// Função para fazer uma requisição POST de cadastro
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registerForm");
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const nome = document.getElementById("name").value;
      const email = document.getElementById("e-mail").value;
      const senha = document.getElementById("password").value;
  
      try {
        const response = await fetch("http://127.0.0.1:8000/usuario/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nome, email, senha }),
        });
  
        if (response.ok) {
          const data = await response.json();
          alert("Usuário cadastrado com sucesso!");
          console.log("Resposta da API:", data);
          form.reset(); // Limpa o formulário após o sucesso
        } else {
          const errorData = await response.json();
          alert("Erro ao cadastrar usuário: " + JSON.stringify(errorData));
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro ao se conectar com o servidor.");
      }
    });
});

// Função para fazer uma requisição POST de login
async function loginUser(event) {
    event.preventDefault();

    // Coleta os dados do formulário de login
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const loginData = {
        username: email,  // Alterado de 'email' para 'username', já que o Django usa 'username'
        password: senha,
    };

    try {
        const response = await fetch("http://127.0.0.1:8000/auth/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);  // Salva o token no localStorage
            alert("Login bem-sucedido!");

            // Redireciona para a página home após o login
            window.location.href = home;  // Certifique-se de que a URL esteja correta
        } else {
            const data = await response.json();
            alert("Erro no login: " + (data.non_field_errors || "Erro desconhecido."));
        }
    } catch (error) {
        alert("Erro de rede: " + error);
    }
}

// Adicionando eventos para alternar entre o formulário de login e cadastro
document.getElementById("loginBtn").addEventListener("click", function() {
    document.getElementById("loginForm").classList.add("active-form");
    document.getElementById("registerForm").classList.remove("active-form");
});

document.getElementById("registerBtn").addEventListener("click", function() {
    document.getElementById("registerForm").classList.add("active-form");
    document.getElementById("loginForm").classList.remove("active-form");
});
