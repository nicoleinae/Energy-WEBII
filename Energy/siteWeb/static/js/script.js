document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");

  // Função para o cadastro de usuário
  form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const username = document.getElementById("name").value;
      const email = document.getElementById("e-mail").value;
      const password = document.getElementById("password").value;

      try {
          const response = await fetch("http://127.0.0.1:8000/register/", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ username, email, password }),
          });

          if (response.ok) {
              const data = await response.json();
              alert("Usuário cadastrado com sucesso!");
              console.log("Resposta da API:", data);
              form.reset();
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

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
  
    // Função para o login de usuário
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const username = document.getElementById("email").value;  
      const password = document.getElementById("senha").value;
  
      try {
        // Enviando uma requisição POST para o endpoint de autenticação
        const response = await fetch("http://127.0.0.1:8000/auth/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
  
        if (response.ok) {
          const data = await response.json();
          
          localStorage.setItem('token', data.access);
  
          alert("Login efetuado com sucesso!");
          console.log("Resposta da API:", data);
  

          window.location.href = 'http://127.0.0.1:8000/home/';
        } else {
          const errorData = await response.json();
          alert("Erro ao fazer login: " + JSON.stringify(errorData));
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro ao se conectar com o servidor.");
      }
    });
  });
