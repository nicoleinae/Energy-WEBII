document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");

  // Função para o cadastro de usuário
  form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const nome = document.getElementById("name").value;
      const email = document.getElementById("e-mail").value;  // Corrigido o ID do e-mail
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
              form.reset();  // Limpa o formulário após o sucesso
          } else {
              const errorData = await response.json();
              alert("Erro ao cadastrar usuário: " + JSON.stringify(errorData));
          }
      } catch (error) {
          console.error("Erro na requisição:", error);
          alert("Erro ao se conectar com o servidor.");
      }
  });

  // Alternar entre os formulários de login e cadastro
  document.getElementById("loginBtn").addEventListener("click", function() {
      document.getElementById("loginForm").classList.add("active-form");
      document.getElementById("registerForm").classList.remove("active-form");
  });

  document.getElementById("registerBtn").addEventListener("click", function() {
      document.getElementById("registerForm").classList.add("active-form");
      document.getElementById("loginForm").classList.remove("active-form");
  });

  // Adicionando o evento de clique para o botão de login
  document.getElementById("loginButton").addEventListener("click", loginUser);
});

// Função genérica para requisição fetch com erro tratado
async function makeRequest(url, method, body = null) {
  try {
      const options = {
          method,
          headers: {
              "Content-Type": "application/json",
          },
      };

      if (body) {
          options.body = JSON.stringify(body);
      }

      const response = await fetch(url, options);

      if (response.ok) {
          return await response.json();
      } else {
          const errorData = await response.json();
          throw new Error(errorData.detail || "Erro na requisição.");
      }
  } catch (error) {
      console.error("Erro na requisição:", error);
      throw new Error("Erro ao se conectar com o servidor.");
  }
}

// Função de login
async function loginUser(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;  // Corrigido o ID do campo senha

  const loginData = {
      username: email,  // 'username' é o campo correto no Django, se não foi personalizado
      password: senha,
  };

  try {
      const data = await makeRequest("http://127.0.0.1:8000/auth/", "POST", loginData);
      localStorage.setItem('token', data.token);  // Armazena o token no localStorage
      alert("Login bem-sucedido!");
      window.location.href = 'home';
      } catch (error) {
      alert("Erro no login: " + error.message);
  }
}
